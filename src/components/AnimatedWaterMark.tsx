import { Lottie } from 'lottie-react';
import waterDropAnimation from '../data/water-drop-animation.json';

interface AnimatedWaterMarkProps {
  reducedMotion: boolean;
}

export default function AnimatedWaterMark({ reducedMotion }: AnimatedWaterMarkProps) {
  return (
    <div
      aria-hidden="true"
      className="animate__animated animate__fadeIn animate__faster absolute right-4 top-4 h-12 w-12 rounded-full border border-white/80 bg-white/90 p-1 shadow-lg backdrop-blur-sm"
    >
      <Lottie
        src={waterDropAnimation}
        loop={!reducedMotion}
        autoplay={!reducedMotion}
        renderer="svg"
        className="h-full w-full"
      />
    </div>
  );
}
