import { LucideIcon } from 'lucide-react';

interface ButtonItemProps {
  Icon: LucideIcon;
  text: string;
  onClick: () => void;
}

export function ButtonItem({ Icon, text, onClick }: ButtonItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-zinc-900 font-body text-white text-xs font-bold gap-2 uppercase py-6 flex flex-col items-center justify-center rounded-md shadow-xl shadow-black/40"
    >
      {text}
      <Icon size={18} />
    </button>
  );
}
