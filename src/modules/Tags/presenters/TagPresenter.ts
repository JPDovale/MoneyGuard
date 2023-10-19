import { Presenter, PresenterProps } from '@shared/res/Presenter';
import { TagResponsePartied } from './types';
import { Tag } from '../entities/Tag';
import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { tagParser } from './parsers/tagParser';

export class TagPresenter extends Presenter<
  TagResponsePartied,
  TagPresenter,
  Tag
>() {
  static create() {
    return new TagPresenter();
  }

  sendErrorValidation(errors: ValidationError[]): TagPresenter {
    return new TagPresenter(makeValidationErrors(errors));
  }

  send(props: PresenterProps<{ tag: Tag }>): TagPresenter {
    const data = this.parse(props.data?.tag ?? null);
    const propsToResponse: PresenterProps<TagResponsePartied> = {
      ...props,
      data,
    };

    return new TagPresenter(propsToResponse);
  }

  parse(tag: Tag | null): TagResponsePartied | null {
    if (!tag) return null;

    const responsePartied: TagResponsePartied = {
      tag: tagParser(tag),
    };

    return responsePartied;
  }
}
