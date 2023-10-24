import { CreateProductResolver } from '@modules/Products/resolvers/CreateProduct';
import { GetProductsResolver } from '@modules/Products/resolvers/GetProducts';
import { CreateSaleResolver } from '@modules/Sales/resolvers/CreateSale';
import { CreateTagResolver } from '@modules/Tags/resolvers/CreateTag';
import { GetTagsResolver } from '@modules/Tags/resolvers/GetTags';
import { BrowserWindow } from 'electron';
import { container } from 'tsyringe';

const createTagResolver = container.resolve(CreateTagResolver);
const getTagsResolver = container.resolve(GetTagsResolver);
const getProductsResolver = container.resolve(GetProductsResolver);
const createProductResolver = container.resolve(CreateProductResolver);
const createSaleResolve = container.resolve(CreateSaleResolver);

type AccessorsType = {
  [x: string]: (props: {
    _data: any;
    win: BrowserWindow | null;
  }) => Promise<any>;
};

const accessors: AccessorsType = {
  // 'get-user': (props: {_data: any, win: BrowserWindow | null}) => {
  //   console.log({ _data, win });
  // },

  'create-tag': (props) => createTagResolver.handle(props),
  'get-tags': (props) => getTagsResolver.handle(props),
  'get-products': (props) => getProductsResolver.handle(props),
  'create-product': (props) => createProductResolver.handle(props),
  'create-sale': (props) => createSaleResolve.handle(props),
};

export type Accessors = keyof typeof accessors;

export { accessors };
