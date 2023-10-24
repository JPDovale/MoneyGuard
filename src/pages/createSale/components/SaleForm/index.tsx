import { Button } from '@components/useFull/Button';
import { Checkbox } from '@components/useFull/Checkbox';
import { Input } from '@components/useFull/Input';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductModelResponse } from '@modules/Products/presenters/types';
import { useProducts } from '@store/Products';
import { useSales } from '@store/Sales';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const newSaleFormSchema = z.object({
  customerName: z
    .string()

    .min(1, 'O nome do cliente precisa ter pelo menos 2 caracteres')
    .max(60, 'O nome do cliente não pode ter mais de 60 caracteres'),
  products: z
    .array(
      z.object({
        id: z.string().uuid(),
        quantity: z.coerce.number(),
      }),
    )
    .optional(),
  paymentValue: z.coerce.number().optional(),
  paymentType: z.enum(['MONEY', 'CARD', 'NOT-PAYED']).default('MONEY'),
});

type NewSaleData = z.infer<typeof newSaleFormSchema>;

const translation = {
  MONEY: 'Dinheiro',
  CARD: 'Cartão',
  'NOT-PAYED': 'NÃO PAGO',
};

interface SaleFormProps {
  selectedProductsFrom: { id: string; quantity: string }[];
  handleRemoveProduct: (product: ProductModelResponse) => void;
  handleUpdateProduct: (
    product: ProductModelResponse,
    quantity: string,
  ) => void;
}

export function SaleForm({
  handleRemoveProduct,
  handleUpdateProduct,
  selectedProductsFrom,
}: SaleFormProps) {
  const [parentSelectedProducts] = useAutoAnimate();

  const { products } = useProducts((state) => ({
    products: state.products,
  }));
  const { createSale } = useSales((state) => ({
    createSale: state.createSale,
  }));

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<NewSaleData>({
    resolver: zodResolver(newSaleFormSchema),
  });

  const paymentType = watch('paymentType');
  const paymentValue = watch('paymentValue') ?? 0;

  let total = 0;

  selectedProductsFrom.forEach((productSelected) => {
    const product = products.find(
      (product) => product.id === productSelected.id,
    );

    total = total + product!.price * Number(productSelected.quantity);
  });

  async function handleCreateSale(data: NewSaleData) {
    if (selectedProductsFrom.length <= 0) {
      setError('products', {
        message:
          'Você precisa selecionar pelo menos um item para finalizar a venda',
        type: 'required',
      });
      return;
    }

    selectedProductsFrom.forEach((product) => {
      if (isNaN(Number(product.quantity))) {
        setError('products', {
          message: 'Algum produto tem uma quantidade inválida',
          type: 'number',
        });

        return;
      }

      if (Number(product.quantity) <= 0) {
        setError(`products`, {
          message: 'Algum produto tem a quantidade zero',
        });

        return;
      }
    });

    await createSale({
      customerName: data.customerName,
      paymentType: data.paymentType,
      paymentValue: (data?.paymentValue ?? 0) * 1000,
      products: selectedProductsFrom.map((prod) => ({
        id: prod.id,
        quantity: Number(prod.quantity),
      })),
    });
  }
  return (
    <form
      className="flex flex-col w-full px-6 h-full max-h-full overflow-y-auto pb-40"
      onSubmit={handleSubmit(handleCreateSale)}
    >
      <Input.Root>
        <Input.Header>
          <Input.Label>Nome do cliente</Input.Label>
          <Input.Error>{errors.customerName?.message}</Input.Error>
        </Input.Header>

        <Input.Input size="sm">
          <Input.TextInput {...register('customerName')} />
        </Input.Input>
      </Input.Root>

      <div className="flex flex-col mt-6 gap-4" ref={parentSelectedProducts}>
        <Input.Error>{errors.products?.message}</Input.Error>

        {selectedProductsFrom.map((prod) => {
          const productIndex = products.findIndex((p) => p.id === prod.id);
          const product = products[productIndex];
          console.log(product);

          return (
            <div
              key={product.id + product.barCode}
              className="flex gap-6 justify-between items-end"
            >
              <div className="flex flex-col w-full gap-0.5">
                <span className="text-xs uppercase font-bold opacity-70">
                  {product.name}
                </span>
                <Input.Root>
                  <Input.Input size="xxs">
                    <Input.Prefix>
                      {product.isHeavy ? 'KG' : 'QTD'}
                    </Input.Prefix>
                    <Input.TextInput
                      onChange={(e) => {
                        console.log(e.target.value);

                        Number(e.target.value) <= product.quantityInStock &&
                          handleUpdateProduct(product, e.target.value);
                      }}
                      value={prod.quantity}
                    />
                  </Input.Input>
                </Input.Root>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-bold text-sm opacity-70">
                  {(
                    (product.price * Number(prod.quantity)) /
                    1000
                  ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>

                <button
                  type="button"
                  className="bg-red-700 p-1 rounded-sm"
                  onClick={() => handleRemoveProduct(product)}
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col gap-2">
          <span className="font-bold text-sm opacity-60">
            Tipo de pagamento
          </span>

          <div className="grid grid-cols-3">
            <Checkbox.Root>
              <Checkbox.CheckerRoot
                checked={paymentType === 'MONEY'}
                onCheckedChange={(e) => e && setValue('paymentType', 'MONEY')}
              >
                <Checkbox.CheckerIndicator />
              </Checkbox.CheckerRoot>
              <Checkbox.Label className="text-sm uppercase opacity-60">
                Dinheiro
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root>
              <Checkbox.CheckerRoot
                checked={paymentType === 'CARD'}
                onCheckedChange={(e) => e && setValue('paymentType', 'CARD')}
              >
                <Checkbox.CheckerIndicator />
              </Checkbox.CheckerRoot>
              <Checkbox.Label className="text-sm uppercase opacity-60">
                Cartão
              </Checkbox.Label>
            </Checkbox.Root>

            <Checkbox.Root>
              <Checkbox.CheckerRoot
                checked={paymentType === 'NOT-PAYED'}
                onCheckedChange={(e) =>
                  e && setValue('paymentType', 'NOT-PAYED')
                }
              >
                <Checkbox.CheckerIndicator />
              </Checkbox.CheckerRoot>
              <Checkbox.Label className="text-sm uppercase opacity-60">
                Não pago
              </Checkbox.Label>
            </Checkbox.Root>
          </div>
        </div>

        <div className="flex justify-between items-end mt-10">
          <span className="uppercase font-bold opacity-60">
            Pagamento | {translation[paymentType]}
          </span>
          {paymentType === 'MONEY' && (
            <Input.Root>
              <Input.Input size="xxs">
                <Input.Prefix>R$</Input.Prefix>
                <Input.TextInput {...register('paymentValue')} />
              </Input.Input>
            </Input.Root>
          )}

          {paymentType === 'CARD' && (
            <span className="font-bold text-green-500">
              {(total / 1000).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          )}

          {paymentType === 'NOT-PAYED' && (
            <span className="font-bold text-red-500">
              {(0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          )}
        </div>

        <div className="flex justify-between items-end -mt-2">
          <span className="uppercase font-bold opacity-60">TOTAl</span>
          <span className="font-bold text-green-500">
            {(total / 1000).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="flex justify-between items-end ">
          <span className="uppercase font-bold text-lg opacity-60">TROCO</span>

          {paymentType === 'MONEY' && (
            <span className="text-lg font-bold text-green-500">
              {((paymentValue * 1000 - total) / 1000 <= 0
                ? 0
                : (paymentValue * 1000 - total) / 1000
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          )}

          {paymentType === 'CARD' && (
            <span className="text-lg font-bold text-green-500">
              {(0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          )}

          {paymentType === 'NOT-PAYED' && (
            <span className="text-lg font-bold text-red-500">
              {(0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          )}
        </div>
      </div>

      <Button.Root type="submit" className="mt-4" size="xs">
        <Button.Text>Finalizar venda</Button.Text>
      </Button.Root>
    </form>
  );
}
