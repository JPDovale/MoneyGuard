import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { ProductsPresenter } from '@modules/Products/presenters/ProductsPresenter';
import { GetProductsService } from '@modules/Products/services/GetProducts';
import { InjectableKeys } from '@shared/container/keys';
import { RequestType } from '@shared/req/RequestType';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetProductsResolver {
  constructor(
    @inject(InjectableKeys.GetProductsService)
    private readonly getProductsService: GetProductsService,
  ) {}

  async handle({}: RequestType<null>) {
    const productsPresenter = ProductsPresenter.create();

    const serviceResponse = await this.getProductsService.execute();

    if (serviceResponse.isLeft()) {
      return productsPresenter.send({
        status: statusCodeMapper.InternalServerError,
        message: 'Internal server error',
      });
    }

    return productsPresenter.send({
      status: statusCodeMapper.OK,
      data: {
        products: serviceResponse.value.products,
      },
    });
  }
}
