import { container } from 'tsyringe';
import { InjectableKeys } from '../keys';
import { TagsKnexRepository } from '@database/repositories/Tags/TagsKnexRepository';
import { ProductsKnexRepository } from '@database/repositories/Products/ProductsKnexRepository';
import { CustomersKnexRepository } from '@database/repositories/Customers/CustomersKnexRepository';
import { SalesKnexRepository } from '@database/repositories/Sales/SalesKnexRepository';
import { SalesProductsKnexRepository } from '@database/repositories/Sales/SalesProductsKnexRepository';
import { TagsRepository } from '@modules/Tags/repositories/TagsRepository';
import { ProductsRepository } from '@modules/Products/repositories/ProductsRepository';
import { CustomersRepository } from '@modules/Customers/repositories/CustomersRepository';
import { SalesRepository } from '@modules/Sales/repositories/SalesRepository';
import { SalesProductsRepository } from '@modules/Sales/repositories/SalesProductsRepository';

container.registerSingleton<TagsRepository>(
  InjectableKeys.TagsRepository,
  TagsKnexRepository,
);
container.registerSingleton<ProductsRepository>(
  InjectableKeys.ProductsRepository,
  ProductsKnexRepository,
);
container.registerSingleton<CustomersRepository>(
  InjectableKeys.CustomersRepository,
  CustomersKnexRepository,
);
container.registerSingleton<SalesRepository>(
  InjectableKeys.SalesRepository,
  SalesKnexRepository,
);
container.registerSingleton<SalesProductsRepository>(
  InjectableKeys.SalesProductsRepository,
  SalesProductsKnexRepository,
);
