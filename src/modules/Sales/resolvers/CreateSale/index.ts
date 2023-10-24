import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { CreateSaleGateway } from '@modules/Sales/gateways/CreateSale';
import { CreateSaleService } from '@modules/Sales/services/CreateSale';
import { InjectableKeys } from '@shared/container/keys';
import { RequestType } from '@shared/req/RequestType';
import { EmptyResponse } from '@shared/res/EmptyResponse';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateSaleResolver {
  constructor(
    @inject(InjectableKeys.CreateSaleService)
    private readonly createSaleService: CreateSaleService,
  ) {}

  async handle({ _data }: RequestType<CreateSaleGateway>) {
    const data = new CreateSaleGateway(_data);

    const validationErrors = await validate(data);
    const SalePresenter = EmptyResponse.create();

    if (validationErrors.length >= 1) {
      return SalePresenter.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.createSaleService.execute({
      customerName: data.customerName,
      paymentType: data.paymentType,
      products: data.products,
      paymentValue: data.paymentValue,
    });

    if (serviceResponse.isLeft()) {
      return SalePresenter.send({
        error: 'Ocorreu um erro',
        status: statusCodeMapper.BadRequest,
      });
    }

    return SalePresenter.send({
      status: statusCodeMapper.Created,
      // data: {
      //   Sale: serviceResponse.value.Sale,
      // },
    });
  }
}
