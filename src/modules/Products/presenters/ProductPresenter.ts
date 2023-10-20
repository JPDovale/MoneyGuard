import { Presenter, PresenterProps } from '@shared/res/Presenter';
import { ProductResponsePartied } from './types';
import { Product } from '../entities/Product';
import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { productParser } from './parsers/productParser';

export class ProductPresenter extends Presenter<
  ProductResponsePartied,
  ProductPresenter,
  Product
>() {
  static create() {
    return new ProductPresenter();
  }

  sendErrorValidation(errors: ValidationError[]): ProductPresenter {
    return new ProductPresenter(makeValidationErrors(errors));
  }

  send(props: PresenterProps<{ product: Product }>): ProductPresenter {
    const data = this.parse(props.data?.product ?? null);
    const propsToResponse: PresenterProps<ProductResponsePartied> = {
      ...props,
      data,
    };

    return new ProductPresenter(propsToResponse);
  }

  parse(product: Product | null): ProductResponsePartied | null {
    if (!product) return null;

    const responsePartied: ProductResponsePartied = {
      product: productParser(product),
    };

    return responsePartied;
  }
}
