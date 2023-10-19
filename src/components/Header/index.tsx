import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useNav } from '@hooks/useNav';
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowLeftFromLine,
  Delete,
  TrendingUp,
} from 'lucide-react';

export function Header() {
  const { pathname, navigate } = useNav();

  return (
    <header className="w-full bg-zinc-950 p-4 text-white flex gap-8 shadow-lg shadow-black/30">
      <span className="flex items-center gap-2 font-bold text-green-400">
        <ArrowBigUp className="fill-green-600 stroke-green-400" size={28} />
        <span>R$4.930,00</span>
      </span>

      <span className="flex items-center gap-2 font-bold text-red-400">
        <ArrowBigDown className="fill-red-600 stroke-red-400" size={28} />
        <span>R$730,00</span>
      </span>

      <span className="flex items-center gap-2 font-bold text-green-400 ml-auto">
        <TrendingUp className="fill-green-600 stroke-green-400" size={28} />
        <span>R${4930 - 730},00</span>
      </span>

      <div className="flex items-center justify-center gap-4">
        {pathname !== '/' && (
          <button
            type="button"
            onClick={() => navigate(RoutesAvailable.home.path)}
            className="flex items-center text-xxs gap-2 font-bold"
          >
            <ArrowLeftFromLine size={16} />
            <span>Voltar</span>
          </button>
        )}

        <span className="flex items-center gap-2 text-xxs font-bold text-red-400">
          <Delete className="fill-red-600 stroke-red-400" size={16} />
          <span>Sair</span>
        </span>
      </div>
    </header>
  );
}
