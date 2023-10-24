import {
  BarChart3,
  Boxes,
  Briefcase,
  Calendar,
  PackagePlus,
  ShoppingBag,
  ShoppingCart,
  TagsIcon,
  Users,
} from 'lucide-react';
import { ButtonItem } from './components/ButtonItem';
import { useNav } from '@hooks/useNav';
import { RoutesAvailable } from '@config/routes/routesAvailable';

export function HomePage() {
  const { navigate } = useNav();

  return (
    <section className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="font-bold text-xl uppercase text-white/40">Vendas:</h3>
        <div className="grid grid-cols-8 gap-4">
          <ButtonItem
            onClick={() => navigate(RoutesAvailable.createSale.path)}
            text="Nova venda"
            Icon={ShoppingBag}
          />
          <ButtonItem onClick={() => {}} text="Clients" Icon={Users} />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-xl uppercase text-white/40">Compras:</h3>
        <div className="grid grid-cols-8 gap-4">
          <ButtonItem
            onClick={() => {}}
            text="Nova compra"
            Icon={ShoppingCart}
          />
          <ButtonItem onClick={() => {}} text="Vendedores" Icon={Briefcase} />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-xl uppercase text-white/40">Produtos:</h3>
        <div className="grid grid-cols-8 gap-4">
          <ButtonItem
            onClick={() => navigate(RoutesAvailable.createProduct.path)}
            text="Novo produto"
            Icon={PackagePlus}
          />
          <ButtonItem onClick={() => {}} text="Todos os produto" Icon={Boxes} />
          <ButtonItem
            onClick={() => navigate(RoutesAvailable.createTag.path)}
            text="Criar tag"
            Icon={TagsIcon}
          />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-xl uppercase text-white/40">
          Financeiro:
        </h3>
        <div className="grid grid-cols-8 gap-4">
          <ButtonItem onClick={() => {}} text="Plano mensal" Icon={Calendar} />
          <ButtonItem onClick={() => {}} text="Resumo" Icon={BarChart3} />
        </div>
      </div>
    </section>
  );
}
