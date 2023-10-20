import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { CreateProductGateway } from '@modules/Products/gateways/CreateProduct';
import { ProductPresenter } from '@modules/Products/presenters/ProductPresenter';
import { CreateProductService } from '@modules/Products/services/CreateProduct';
import { InjectableKeys } from '@shared/container/keys';
import { RequestType } from '@shared/req/RequestType';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProductResolver {
  constructor(
    @inject(InjectableKeys.CreateProductService)
    private readonly createProductService: CreateProductService,
  ) {}

  async handle({ _data }: RequestType<CreateProductGateway>) {
    const data = new CreateProductGateway(_data);

    const validationErrors = await validate(data);
    const productPresente = ProductPresenter.create();

    if (validationErrors.length >= 1) {
      return productPresente.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.createProductService.execute(data);

    if (serviceResponse.isLeft()) {
      return productPresente.send({
        status: serviceResponse.value.status,
        message: serviceResponse.value.message,
      });
    }

    return productPresente.send({
      status: statusCodeMapper.Created,
      data: {
        product: serviceResponse.value.product,
      },
    });
  }
}
