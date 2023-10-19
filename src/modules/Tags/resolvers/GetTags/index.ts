import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { TagsPresenter } from '@modules/Tags/presenters/TagsPresenter';
import { GetTagsService } from '@modules/Tags/services/GetTags';
import { InjectableKeys } from '@shared/container/keys';
import { RequestType } from '@shared/req/RequestType';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetTagsResolver {
  constructor(
    @inject(InjectableKeys.GetTagsService)
    private readonly getTagsService: GetTagsService,
  ) {}

  async handle({}: RequestType<null>) {
    const tagsPresenter = TagsPresenter.create();

    const serviceResponse = await this.getTagsService.execute();

    if (serviceResponse.isLeft()) {
      return tagsPresenter.send({
        status: statusCodeMapper.InternalServerError,
        message: 'Internal server error',
      });
    }

    return tagsPresenter.send({
      status: statusCodeMapper.OK,
      data: {
        tags: serviceResponse.value.tags,
      },
    });
  }
}
