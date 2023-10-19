import { ApplicationError } from '@shared/errors/ApplicationError';
import { ValidationError } from 'class-validator';

export interface Redirector {
  isToRedirect: boolean;
  path: string;
}

export interface PresenterProps<TypePresenterData> {
  status: number;
  data?: TypePresenterData | null;
  error?: string | null;
  errors?: ApplicationError[] | null;
  message?: string | null;
  redirector?: Redirector;
}

/**
 * @type TypePresenterData: final return
 * @type Class: Class what extends this
 * @type TypePrimitiveData: Data without transforms
 */

export function Presenter<TypePresenterData, Class, TypePrimitiveData>() {
  abstract class Res {
    status: number;

    data?: TypePresenterData | null;

    error?: string | null;

    errors?: ApplicationError[] | null;

    message?: string | null;

    redirector?: Redirector;

    protected constructor(
      props?: PresenterProps<TypePresenterData> | null | undefined,
    ) {
      this.status = props?.status ?? 400;
      this.data = props?.data;
      this.error = props?.error;
      this.message = props?.message;
      this.errors = props?.errors;
      this.redirector = props?.redirector;
    }

    abstract sendErrorValidation(errors: ValidationError[]): Class;

    abstract send(
      props: PresenterProps<{ [x: string]: TypePrimitiveData }>,
    ): Class;

    abstract parse(
      primitiveData: TypePrimitiveData | null,
    ): TypePresenterData | null;
  }

  return Res;
}
