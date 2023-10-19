import { Button } from '@components/useFull/Button';
import { Input } from '@components/useFull/Input';
import { Toast } from '@components/useFull/Toast';
import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTags } from '@store/Tags';
import { Tag } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const newTagFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Nome inválido',
      required_error: 'Campo obrigatório',
    })
    .min(2, 'O nome precisa de pelo menos 2 caracteres')
    .max(90, 'O nome não pode ter mais de 90 caractere'),
});

type NewTagData = z.infer<typeof newTagFormSchema>;

export function CreateTagForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const messageRef = useRef<string>('');

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<NewTagData>({
    resolver: zodResolver(newTagFormSchema),
  });

  const { createTag } = useTags((state) => ({
    createTag: state.createTag,
  }));

  async function handleCreateTag(data: NewTagData) {
    const { message, status } = await createTag(data);

    const possibleResults: { [x: number]: () => void } = {};

    possibleResults[statusCodeMapper.Conflict] = () => {
      setError(true);
      messageRef.current = message;
    };

    possibleResults[statusCodeMapper.Created] = () => {
      reset();
      setError(false);
      setSuccess(true);
    };

    possibleResults[status]();
  }
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateTag)}
    >
      <h3 className="text-white/30 font-bold text-xxs">
        <strong className="mr-2">*</strong> Quer dizer que o campo é obrigatório
      </h3>

      <Toast
        message="Tag criada com sucesso"
        title="Sucesso"
        open={success}
        setOpen={setSuccess}
      />

      <Toast
        message={messageRef.current}
        open={error}
        setOpen={setError}
        title="Erro"
        type="error"
      />

      <Input.Root>
        <Input.Header>
          <Input.Label>Nome da tag *</Input.Label>
          <Input.Error>{errors.name?.message}</Input.Error>
        </Input.Header>

        <Input.Input size="sm">
          <Input.Icon>
            <Tag />
          </Input.Icon>
          <Input.TextInput {...register('name')} />
        </Input.Input>
      </Input.Root>

      <Button.Root
        type="submit"
        size="xs"
        className="mt-auto"
        disabled={!isDirty || isSubmitting}
      >
        <Button.Icon>
          <Tag />
        </Button.Icon>
        <Button.Text>Criar tag</Button.Text>
      </Button.Root>
    </form>
  );
}
