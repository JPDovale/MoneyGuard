import { X } from 'lucide-react';
import * as ToastRadix from '@radix-ui/react-toast';

interface IToastProps {
  open: boolean;
  setOpen: (newState: boolean) => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}

export function Toast({
  open,
  setOpen,
  title,
  message,
  type = 'success',
}: IToastProps) {
  return (
    <ToastRadix.Root
      open={open}
      onOpenChange={setOpen}
      className="relative flex text-white flex-col gap-2 px-4 py-2 rounded-md w-80 h-auto bg-zinc-900 border border-green-400 data-[state='open']:animate-slideIn data-[state='closed']:animate-hideAnimation data-[state='end']:animate-swipeOut"
    >
      <ToastRadix.ToastTitle>
        <span
          data-type={type}
          className='font-bold font-body text-sm data-[type="success"]:text-green-500 data-[type="error"]:text-red-500'
        >
          {title}
        </span>
      </ToastRadix.ToastTitle>

      <ToastRadix.ToastDescription>
        <span className="font-body text-xs">{message}</span>
      </ToastRadix.ToastDescription>

      <ToastRadix.ToastClose className="absolute right-4 cursor-pointer">
        <X />
      </ToastRadix.ToastClose>
    </ToastRadix.Root>
  );
}
