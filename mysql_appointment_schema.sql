CREATE DATABASE IF NOT EXISTS gutter_booking;
USE gutter_booking;

CREATE TABLE IF NOT EXISTS customers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(180) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  preferred_contact_method ENUM('email','phone','sms') DEFAULT 'email',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customers_email (email),
  KEY idx_customers_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS service_areas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  zip_code VARCHAR(10) NOT NULL,
  city VARCHAR(120) DEFAULT NULL,
  state_code VARCHAR(10) DEFAULT NULL,
  service_name VARCHAR(120) DEFAULT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_service_areas_zip (zip_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS service_catalog (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  service_slug VARCHAR(80) NOT NULL,
  service_name VARCHAR(120) NOT NULL,
  duration_minutes INT NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_service_slug (service_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO service_catalog (service_slug, service_name, duration_minutes, is_active)
VALUES
  ('gutter-cleaning', 'Gutter Cleaning', 120, 1),
  ('gutter-installation', 'Gutter Installation', 240, 1),
  ('gutter-repair', 'Gutter Repair', 180, 1),
  ('gutter-guard-installation', 'Gutter Guard Installation', 210, 1),
  ('downspout-installation-repair', 'Downspout Installation & Repair', 150, 1),
  ('gutter-inspection', 'Gutter Inspection', 90, 1),
  ('emergency-gutter-service', 'Emergency Gutter Service', 180, 1)
ON DUPLICATE KEY UPDATE service_name = VALUES(service_name), duration_minutes = VALUES(duration_minutes), is_active = VALUES(is_active);

CREATE TABLE IF NOT EXISTS business_hours (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  day_of_week TINYINT NOT NULL,
  opens_at TIME NOT NULL,
  closes_at TIME NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  timezone_name VARCHAR(80) NOT NULL DEFAULT 'America/New_York',
  PRIMARY KEY (id),
  UNIQUE KEY uq_business_hours_day (day_of_week)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS business_closures (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  closure_date DATE NOT NULL,
  reason VARCHAR(200) DEFAULT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_business_closure_date (closure_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blocked_dates (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  date_value DATE NOT NULL,
  reason VARCHAR(200) DEFAULT NULL,
  block_type ENUM('date','time_slot','service','all_day') NOT NULL DEFAULT 'date',
  start_time TIME DEFAULT NULL,
  end_time TIME DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_blocked_date (date_value)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS appointments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_ref VARCHAR(50) NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED NOT NULL,
  service_area_id BIGINT UNSIGNED DEFAULT NULL,
  zip_code VARCHAR(10) NOT NULL,
  service_address TEXT NOT NULL,
  appointment_start DATETIME NOT NULL,
  appointment_end DATETIME NOT NULL,
  preferred_contact_method ENUM('email','phone','sms') NOT NULL DEFAULT 'email',
  description TEXT,
  access_instructions TEXT,
  alt_date_time VARCHAR(120) DEFAULT NULL,
  consent_privacy TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('pending','confirmed','reschedule_requested','cancelled','completed','no_show') NOT NULL DEFAULT 'pending',
  notification_status ENUM('not_sent','sent','failed','skipped') NOT NULL DEFAULT 'not_sent',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  cancelled_at DATETIME DEFAULT NULL,
  cancellation_reason TEXT,
  admin_notes TEXT,
  assigned_technician VARCHAR(120) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_appointment_ref (appointment_ref),
  KEY idx_customer_id (customer_id),
  KEY idx_service_id (service_id),
  KEY idx_appointment_start (appointment_start),
  KEY idx_status (status),
  CONSTRAINT fk_appointments_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
  CONSTRAINT fk_appointments_service FOREIGN KEY (service_id) REFERENCES service_catalog(id) ON DELETE RESTRICT,
  CONSTRAINT fk_appointments_service_area FOREIGN KEY (service_area_id) REFERENCES service_areas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS appointment_slots (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id BIGINT UNSIGNED NOT NULL,
  slot_start DATETIME NOT NULL,
  slot_end DATETIME NOT NULL,
  status ENUM('reserved','released','completed') NOT NULL DEFAULT 'reserved',
  reserved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_appointment_slot (appointment_id, slot_start),
  KEY idx_slot_start (slot_start),
  KEY idx_slot_status (status),
  CONSTRAINT fk_slot_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS appointment_status_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id BIGINT UNSIGNED NOT NULL,
  previous_status ENUM('pending','confirmed','reschedule_requested','cancelled','completed','no_show') NOT NULL,
  new_status ENUM('pending','confirmed','reschedule_requested','cancelled','completed','no_show') NOT NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  changed_by ENUM('customer','admin','system') NOT NULL DEFAULT 'system',
  note TEXT,
  PRIMARY KEY (id),
  KEY idx_appointment_status_history (appointment_id, changed_at),
  CONSTRAINT fk_appt_status_history_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notification_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id BIGINT UNSIGNED DEFAULT NULL,
  customer_id BIGINT UNSIGNED DEFAULT NULL,
  channel ENUM('email','sms') NOT NULL,
  message_type VARCHAR(80) NOT NULL,
  status ENUM('queued','sent','failed','retrying') NOT NULL DEFAULT 'queued',
  provider VARCHAR(80) DEFAULT NULL,
  payload JSON DEFAULT NULL,
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_notification_appointment (appointment_id),
  KEY idx_notification_customer (customer_id),
  CONSTRAINT fk_notification_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
  CONSTRAINT fk_notification_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS reminder_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id BIGINT UNSIGNED NOT NULL,
  reminder_type ENUM('24h','2h') NOT NULL,
  scheduled_for DATETIME NOT NULL,
  sent_at DATETIME DEFAULT NULL,
  status ENUM('pending','sent','failed','skipped') NOT NULL DEFAULT 'pending',
  provider VARCHAR(80) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_reminder_appointment (appointment_id, reminder_type),
  UNIQUE KEY uq_reminder_once (appointment_id, reminder_type, scheduled_for),
  CONSTRAINT fk_reminder_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS appointment_conflicts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id BIGINT UNSIGNED NOT NULL,
  conflicting_appointment_id BIGINT UNSIGNED NOT NULL,
  reason VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_conflict_appointment (appointment_id),
  KEY idx_conflict_target (conflicting_appointment_id),
  CONSTRAINT fk_conflict_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
  CONSTRAINT fk_conflict_target FOREIGN KEY (conflicting_appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO business_hours (day_of_week, opens_at, closes_at, is_active, timezone_name)
VALUES
  (0, '08:00:00', '17:00:00', 1, 'America/New_York'),
  (1, '08:00:00', '17:00:00', 1, 'America/New_York'),
  (2, '08:00:00', '17:00:00', 1, 'America/New_York'),
  (3, '08:00:00', '17:00:00', 1, 'America/New_York'),
  (4, '08:00:00', '17:00:00', 1, 'America/New_York'),
  (5, '09:00:00', '15:00:00', 1, 'America/New_York'),
  (6, '00:00:00', '00:00:00', 0, 'America/New_York')
ON DUPLICATE KEY UPDATE opens_at = VALUES(opens_at), closes_at = VALUES(closes_at), is_active = VALUES(is_active), timezone_name = VALUES(timezone_name);

CREATE VIEW IF NOT EXISTS v_appointment_conflicts AS
SELECT a1.id AS appointment_id, a2.id AS conflicting_appointment_id,
       TIMESTAMPDIFF(MINUTE, GREATEST(a1.appointment_start, a2.appointment_start), LEAST(a1.appointment_end, a2.appointment_end)) AS overlap_minutes
FROM appointments a1
JOIN appointments a2
  ON a2.id > a1.id
 AND a2.status IN ('pending','confirmed','reschedule_requested')
 AND a1.status IN ('pending','confirmed','reschedule_requested')
 AND a2.appointment_start < a1.appointment_end
 AND a2.appointment_end > a1.appointment_start;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS sp_validate_slot(
  IN p_start DATETIME,
  IN p_end DATETIME,
  IN p_service_area_id BIGINT,
  IN p_appointment_id BIGINT
)
BEGIN
  SELECT CASE
    WHEN EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.status IN ('pending','confirmed','reschedule_requested')
        AND a.service_area_id = p_service_area_id
        AND a.appointment_start < p_end
        AND a.appointment_end > p_start
        AND (p_appointment_id IS NULL OR a.id <> p_appointment_id)
    ) THEN 0 ELSE 1 END AS slot_available;
END$$
DELIMITER ;
