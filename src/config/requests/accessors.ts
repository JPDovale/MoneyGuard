import { CreateTagResolver } from '@modules/Tags/resolvers/CreateTag';
import { GetTagsResolver } from '@modules/Tags/resolvers/GetTags';
import { BrowserWindow } from 'electron';
import { container } from 'tsyringe';

const createTagResolver = container.resolve(CreateTagResolver);
const getTagsResolver = container.resolve(GetTagsResolver);

const accessors = {
  'get-user': (_data: any, win: BrowserWindow | null) => {
    console.log({ _data, win });
  },

  'create-tag': (_data: any, win: BrowserWindow | null) => {
    return createTagResolver.handle({ _data, win });
  },

  'get-tags': (_data: any, win: BrowserWindow | null) => {
    return getTagsResolver.handle({ _data, win });
  },
};

export type Accessors = keyof typeof accessors;

export { accessors };
