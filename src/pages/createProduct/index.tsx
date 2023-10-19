import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@components/ui/select';
import { Button } from '@components/useFull/Button';
import { Checkbox } from '@components/useFull/Checkbox';
import { Input } from '@components/useFull/Input';
import {
  Barcode,
  Boxes,
  CircleDollarSign,
  Package,
  PackagePlus,
  Tag,
  Weight,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTags } from '@store/Tags';

const newProductFormSchema = z.object({
  barCode: z.coerce
    .number({
      invalid_type_error: 'Código de barras invalido',
    })
    .optional()
    .nullable(),
  name: z
    .string({
      invalid_type_error: 'Nome inválido',
      required_error: 'Campo obrigatório',
    })
    .min(2, 'O nome precisa de pelo menos 2 caracteres')
    .max(90, 'O nome não pode ter mais de 90 caractere'),
  price: z.coerce
    .number({
      invalid_type_error: 'Preço inválido',
      required_error: 'Campo obrigatório',
    })
    .min(0.01, 'O preço deve ser maior de zero'),
  tagId: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .uuid(),
  inStock: z.coerce
    .number({
      invalid_type_error: 'Estoque inválido',
      required_error: 'Campo obrigatório',
    })
    .min(1, 'A quantidade em estoque precisa ser pelo menos 1'),
  isHeavy: z.boolean().default(false),
});

type NewProductData = z.infer<typeof newProductFormSchema>;

export function CreateProductPage() {
  const { tags } = useTags((state) => ({
    tags: state.tags,
  }));

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewProductData>({
    resolver: zodResolver(newProductFormSchema),
  });

  async function handleCreateProduct(data: NewProductData) {
    console.log(data);
  }

  function handleSelectTag(tagId: string) {
    setValue('tagId', tagId);
  }

  return (
    <form
      className="max-w-4xl w-full mx-auto pt-8 flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateProduct)}
    >
      <h3 className="text-white/30 font-bold text-xxs">
        <strong className="mr-2">*</strong> Quer dizer que o campo é obrigatório
      </h3>

      <Input.Root>
        <Input.Header>
          <Input.Label>Código de barras</Input.Label>
          <Input.Error>{errors.barCode?.message}</Input.Error>
        </Input.Header>

        <Input.Input size="sm">
          <Input.Icon>
            <Barcode />
          </Input.Icon>
          <Input.TextInput {...register('barCode')} />
        </Input.Input>
      </Input.Root>

      <div className="grid grid-cols-2 gap-4">
        <Input.Root>
          <Input.Header>
            <Input.Label>Nome do produto *</Input.Label>
            <Input.Error>{errors.name?.message}</Input.Error>
          </Input.Header>

          <Input.Input size="sm">
            <Input.Icon>
              <Package />
            </Input.Icon>
            <Input.TextInput {...register('name')} />
          </Input.Input>
        </Input.Root>

        <Input.Root>
          <Input.Header>
            <Input.Label>Preço do produto *</Input.Label>
            <Input.Error>{errors.price?.message}</Input.Error>
          </Input.Header>

          <Input.Input size="sm">
            <Input.Icon>
              <CircleDollarSign />
            </Input.Icon>
            <Input.TextInput {...register('price')} />
          </Input.Input>
        </Input.Root>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input.Root>
          <Input.Header>
            <Input.Label>Selecione uma tag para o produto *</Input.Label>
            <Input.Error>{errors.tagId?.message}</Input.Error>
          </Input.Header>

          <Select.Select onValueChange={(e) => handleSelectTag(e)}>
            <Input.Input size="sm">
              <Input.Icon>
                <Tag />
              </Input.Icon>
              <Select.SelectTrigger>
                <Select.SelectValue placeholder="Tag: " />
              </Select.SelectTrigger>
            </Input.Input>

            <Select.SelectContent className="mt-4">
              {tags[0] ? (
                tags.map((tag) => (
                  <Select.SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </Select.SelectItem>
                ))
              ) : (
                <span className="text-sm w-full text-center p-4 opacity-50">
                  Nenhuma tag está disponível
                </span>
              )}
            </Select.SelectContent>
          </Select.Select>
        </Input.Root>

        <Input.Root>
          <Input.Header>
            <Input.Label>Quantidade em estoque *</Input.Label>
            <Input.Error>{errors.inStock?.message}</Input.Error>
          </Input.Header>

          <Input.Input size="sm">
            <Input.Icon>
              <Boxes />
            </Input.Icon>
            <Input.TextInput {...register('inStock')} />
          </Input.Input>
        </Input.Root>
      </div>

      <Checkbox.Root>
        <Checkbox.CheckerRoot
          onCheckedChange={(e) => setValue('isHeavy', e as boolean)}
        >
          <Checkbox.CheckerIndicator></Checkbox.CheckerIndicator>
        </Checkbox.CheckerRoot>

        <Checkbox.Icon>
          <Weight />
        </Checkbox.Icon>

        <Checkbox.Label className="text-sm">Por peso?</Checkbox.Label>
      </Checkbox.Root>

      <Button.Root
        type="submit"
        size="xs"
        className="mt-auto"
        disabled={!isDirty || isSubmitting}
      >
        <Button.Icon>
          <PackagePlus />
        </Button.Icon>
        <Button.Text>Criar produto</Button.Text>
      </Button.Root>
    </form>
  );
}
