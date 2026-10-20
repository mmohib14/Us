import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface QuoteSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  linearFeet?: number;
  estimatedCost?: number;
  material?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'scheduled';
}

interface InspectionBooking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate?: string;
  createdAt: string;
  status: 'confirmed';
}

const quotesStore: QuoteSubmission[] = [
  {
    id: 'APX-7821',
    name: 'Robert Klein',
    email: 'robert.k@example.com',
    phone: '(512) 555-0182',
    service: 'Seamless Gutter Installation',
    message: 'Looking for 6" matte black seamless gutters on a two-story home.',
    linearFeet: 180,
    estimatedCost: 1980,
    material: 'Aluminum 6" K-Style',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'scheduled'
  },
  {
    id: 'APX-7822',
    name: 'Jessica Miller',
    email: 'jess.miller@example.com',
    phone: '(512) 555-0199',
    service: 'Leaf Guard Protection',
    message: 'Heavy oak tree leaves continually clogging downspouts every autumn.',
    linearFeet: 140,
    estimatedCost: 1250,
    material: 'Micro-Mesh Stainless Steel',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'contacted'
  }
];

const inspectionStore: InspectionBooking[] = [];
const newsletterSubscribers: Set<string> = new Set(['homeowner@metrocity.com']);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Endpoints
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Calculate instant ballpark estimate
  app.post('/api/calculate', (req: Request, res: Response) => {
    const {
      linearFeet = 150,
      stories = 1,
      material = 'aluminum_k6',
      leafGuards = true,
      downspouts = 4
    } = req.body;

    const feet = Math.max(20, Math.min(1000, Number(linearFeet) || 150));
    const storyNum = Math.max(1, Math.min(3, Number(stories) || 1));
    const downspoutCount = Math.max(1, Math.min(12, Number(downspouts) || 4));

    // Base rates per linear foot
    let materialRate = 8.5; // default 5" aluminum
    let materialLabel = '5" Seamless Aluminum K-Style';

    if (material === 'aluminum_k6') {
      materialRate = 10.5;
      materialLabel = '6" Seamless Aluminum Heavy Gauge (0.032")';
    } else if (material === 'copper') {
      materialRate = 28.0;
      materialLabel = 'Solid 16oz Custom Copper Seamless';
    } else if (material === 'half_round') {
      materialRate = 14.0;
      materialLabel = 'European Style Seamless Half-Round';
    }

    const storyMultiplier = storyNum === 1 ? 1.0 : storyNum === 2 ? 1.25 : 1.45;
    const baseGutterCost = feet * materialRate * storyMultiplier;
    const downspoutCost = downspoutCount * (storyNum * 95);
    const guardCost = leafGuards ? feet * 7.5 : 0;

    const totalEstimate = Math.round(baseGutterCost + downspoutCost + guardCost);
    const lowEstimate = Math.round(totalEstimate * 0.92);
    const highEstimate = Math.round(totalEstimate * 1.10);

    res.json({
      success: true,
      breakdown: {
        linearFeet: feet,
        stories: storyNum,
        material: materialLabel,
        hasGuards: Boolean(leafGuards),
        downspouts: downspoutCount,
        baseGutterCost: Math.round(baseGutterCost),
        downspoutCost: Math.round(downspoutCost),
        guardCost: Math.round(guardCost),
        estimatedTotal: totalEstimate,
        range: {
          low: lowEstimate,
          high: highEstimate
        }
      }
    });
  });

  // Quote submission
  app.post('/api/quote', (req: Request, res: Response) => {
    const { name, email, phone, service, message, linearFeet, estimatedCost, material } = req.body;

    if (!name || !email || !phone || !service) {
      res.status(400).json({
        success: false,
        error: 'Please provide full name, email, phone number, and requested service.'
      });
      return;
    }

    const quoteId = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote: QuoteSubmission = {
      id: quoteId,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      service: String(service).trim(),
      message: message ? String(message).trim() : undefined,
      linearFeet: linearFeet ? Number(linearFeet) : undefined,
      estimatedCost: estimatedCost ? Number(estimatedCost) : undefined,
      material: material ? String(material) : undefined,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    quotesStore.unshift(newQuote);

    res.json({
      success: true,
      referenceId: quoteId,
      message: `Thank you, ${name}! Your quote request (${quoteId}) has been received. A senior gutter specialist will call you at ${phone} within 2 business hours with your itemized proposal.`
    });
  });

  // 21-point free inspection request
  app.post('/api/inspection', (req: Request, res: Response) => {
    const { name, phone, email, service = '21-Point Gutter Health Inspection', preferredDate } = req.body;

    if (!name || !phone) {
      res.status(400).json({
        success: false,
        error: 'Please provide your full name and contact phone number.'
      });
      return;
    }

    const bookingId = `INS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: InspectionBooking = {
      id: bookingId,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      service: String(service).trim(),
      preferredDate: preferredDate ? String(preferredDate) : undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    inspectionStore.unshift(newBooking);

    res.json({
      success: true,
      bookingId,
      message: `Your free 21-point on-site inspection (${bookingId}) is scheduled! Our local crew lead will reach out to confirm your slot.`
    });
  });

  // Newsletter signup with seasonal promo code
  app.post('/api/newsletter', (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || !String(email).includes('@')) {
      res.status(400).json({ success: false, error: 'A valid email address is required.' });
      return;
    }

    const cleanEmail = String(email).toLowerCase().trim();
    newsletterSubscribers.add(cleanEmail);

    res.json({
      success: true,
      promoCode: 'APEX10FALL',
      message: 'Subscribed successfully! Use promo code APEX10FALL for $150 off any full seamless gutter installation or micro-mesh upgrade.'
    });
  });

  // Live stats & aggregate numbers
  app.get('/api/stats', (req: Request, res: Response) => {
    res.json({
      projectsCompleted: 15480 + quotesStore.length,
      yearsExperience: 25,
      satisfactionRate: 99.4,
      masterTechnicians: 50,
      activeQuotesToday: 8 + quotesStore.length,
      warrantyCoverage: 'Lifetime Transferable'
    });
  });

  // Recent submissions preview
  app.get('/api/submissions', (req: Request, res: Response) => {
    res.json({
      quotes: quotesStore.slice(0, 5),
      inspections: inspectionStore.slice(0, 5)
    });
  });

  // Vite Integration in Dev / Static Serving in Prod
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApexGutters Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
