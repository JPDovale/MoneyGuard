import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { CreateTagGateway } from '@modules/Tags/gateways/CreateTag';
import { TagPresenter } from '@modules/Tags/presenters/TagPresenter';
import { CreateTagService } from '@modules/Tags/services/CreateTag';
import { InjectableKeys } from '@shared/container/keys';
import { RequestType } from '@shared/req/RequestType';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateTagResolver {
  constructor(
    @inject(InjectableKeys.CreateTagService)
    private readonly createTagService: CreateTagService,
  ) {}

  async handle({ _data }: RequestType<CreateTagGateway>) {
    const data = new CreateTagGateway(_data);

    const validationErrors = await validate(data);
    const tagPresenter = TagPresenter.create();

    if (validationErrors.length >= 1) {
      return tagPresenter.sendErrorValidation(validationErrors);
    }

    const serviceResponse = await this.createTagService.execute({
      name: data.name,
    });

    if (serviceResponse.isLeft()) {
      return tagPresenter.send({
        status: serviceResponse.value.status,
        message: serviceResponse.value.message,
      });
    }

    return tagPresenter.send({
      status: statusCodeMapper.Created,
      data: {
        tag: serviceResponse.value.tag,
      },
    });
  }
}
