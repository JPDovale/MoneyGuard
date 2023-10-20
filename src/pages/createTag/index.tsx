import { useTags } from '@store/Tags';
import { CreateTagForm } from './components/CreateTagForm';
import { Tag } from 'lucide-react';

export function CreateTagPage() {
  const { tags } = useTags((state) => ({
    tags: state.tags,
  }));

  return (
    <section className="max-w-5xl w-full mx-auto pt-8 flex flex-col gap-4">
      <CreateTagForm />

      <span className="font-bold pt-6 opacity-30">
        Algumas tags já criadas:
      </span>
      <div className=" w-full grid grid-cols-6 gap-1.5">
        {tags.map((tag) => (
          <div
            className="bg-zinc-900 text-xs flex items-center justify-center p-2 gap-1.5 rounded-sm border border-green-800"
            key={tag.id}
          >
            <Tag size={14} />
            {tag.name}
          </div>
        ))}
      </div>
    </section>
  );
}
