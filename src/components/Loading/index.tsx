import { Currency, DollarSign } from 'lucide-react';

export function Loading() {
  return (
    <main className="w-screen h-screen fixed bg-gray100 flex items-center gap-8 justify-center">
      <span className="text-7xl font-title text-text100">Money Guard</span>
      <div className="fill-mode-both w-[64px] h-[64px] bg-green-600 animate-square-spin shadow-largestShadow shadow-green-600 rounded-[10px] flex items-center justify-center">
        <DollarSign className="fill-green-300 stroke-white/30" size={40} />
      </div>
    </main>
  );
}
