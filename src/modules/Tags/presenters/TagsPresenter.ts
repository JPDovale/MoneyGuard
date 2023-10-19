import { Presenter, PresenterProps } from '@shared/res/Presenter';
import { TagsResponsePartied } from './types';
import { Tag } from '../entities/Tag';
import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { tagParser } from './parsers/tagParser';

export class TagsPresenter extends Presenter<
  TagsResponsePartied,
  TagsPresenter,
  Tag[]
>() {
  static create() {
    return new TagsPresenter();
  }

  sendErrorValidation(errors: ValidationError[]): TagsPresenter {
    return new TagsPresenter(makeValidationErrors(errors));
  }

  send(props: PresenterProps<{ tags: Tag[] }>): TagsPresenter {
    const data = this.parse(props.data!.tags);
    const propsToResponse: PresenterProps<TagsResponsePartied> = {
      ...props,
      data,
    };

    return new TagsPresenter(propsToResponse);
  }

  parse(tags: Tag[]): TagsResponsePartied {
    const responsePartied: TagsResponsePartied = {
      tags: tags.map(tagParser),
    };

    return responsePartied;
  }
}
