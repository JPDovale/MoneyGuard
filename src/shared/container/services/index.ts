import { container } from 'tsyringe';
import { InjectableKeys } from '../keys';
import { CreateTagService } from '@modules/Tags/services/CreateTag';
import { GetTagsService } from '@modules/Tags/services/GetTags';
import { CreateProductService } from '@modules/Products/services/CreateProduct';
import { GetProductsService } from '@modules/Products/services/GetProducts';
import { GenerateSaleReportService } from '@modules/Sales/services/GenerateSaleReport';
import { CreateSaleService } from '@modules/Sales/services/CreateSale';

container.registerSingleton(
  InjectableKeys.CreateProductService,
  CreateProductService,
);
container.registerSingleton(
  InjectableKeys.GetProductsService,
  GetProductsService,
);

container.registerSingleton(InjectableKeys.CreateTagService, CreateTagService);
container.registerSingleton(InjectableKeys.GetTagsService, GetTagsService);

container.registerSingleton(
  InjectableKeys.CreateSaleService,
  CreateSaleService,
);
container.registerSingleton(
  InjectableKeys.GenerateSaleReportService,
  GenerateSaleReportService,
);
