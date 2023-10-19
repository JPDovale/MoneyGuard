import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { Presenter, PresenterProps } from './Presenter';

export class EmptyResponse extends Presenter<null, EmptyResponse, null>() {
  static create() {
    return new EmptyResponse();
  }

  sendErrorValidation(errors: ValidationError[]): EmptyResponse {
    return new EmptyResponse(makeValidationErrors(errors));
  }

  send(props: PresenterProps<{ nothing: null }>): EmptyResponse {
    return new EmptyResponse({ ...props, data: null });
  }

  parse(nothing: null): null {
    return nothing;
  }
}
