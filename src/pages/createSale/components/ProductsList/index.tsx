import { Input } from '@components/useFull/Input';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ProductModelResponse } from '@modules/Products/presenters/types';
import { useProducts } from '@store/Products';
import { useTags } from '@store/Tags';
import { Barcode, Boxes } from 'lucide-react';
import { useState } from 'react';

interface ProductListProps {
  selectedProductsFrom: { id: string; quantity: string }[];
  handleAddProduct: (product: ProductModelResponse) => void;
}

export function ProductsList({
  selectedProductsFrom,
  handleAddProduct,
}: ProductListProps) {
  const [search, setSearch] = useState('');
  const [parentProducts] = useAutoAnimate();
  const { products } = useProducts((state) => ({
    products: state.products,
  }));
  const { tags } = useTags((state) => ({
    tags: state.tags,
  }));

  const filteredProducts = products.filter(
    (product) =>
      (product.barCode.toString().includes(search) ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())) &&
      !selectedProductsFrom?.find((prod) => prod.id === product.id),
  );

  return (
    <div
      className="flex flex-col max-w-xs w-full h-full max-h-full border-l gap-2 border-zinc-600 px-6 overflow-y-auto"
      ref={parentProducts}
    >
      <Input.Root>
        <Input.Header>
          <Input.Label>
            Encontrar produto (nome, marca, código de barras)
          </Input.Label>
        </Input.Header>

        <Input.Input size="sm">
          <Input.TextInput onChange={(e) => setSearch(e.target.value)} />
        </Input.Input>
      </Input.Root>

      <h1 className="text-lg font-bold opacity-30">Lista de produtos</h1>

      {filteredProducts[0] ? (
        filteredProducts.map((product) => {
          const tag = tags.find((tag) => tag.id === product.tagId);

          return (
            <button
              key={product.id}
              onClick={() => handleAddProduct(product)}
              type="button"
              className="bg-gray100 flex flex-col gap-2 rounded-md shadow-sm shadow-emerald-700/90 p-2"
            >
              <div className="flex justify-between">
                <span className="text-sm font-body opacity-80">
                  {product.name} | {product.brand}
                </span>
                <span className="text-xs font-bold opacity-60">
                  {(product.price / 1000).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-xxs opacity-60">
                  <Barcode size={12} />
                  {product.barCode} | {tag?.name}
                </span>
                <span className="flex gap-2 text-xs opacity-60">
                  {product.quantityInStock}
                  <Boxes size={18} />
                </span>
              </div>
            </button>
          );
        })
      ) : (
        <span className="my-auto text-center text-sm opacity-60">
          Não há produtos encontrados
        </span>
      )}
    </div>
  );
}
