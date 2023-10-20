import { Presenter, PresenterProps } from '@shared/res/Presenter';
import { ProductsResponsePartied } from './types';
import { Product } from '../entities/Product';
import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';
import { productParser } from './parsers/productParser';

export class ProductsPresenter extends Presenter<
  ProductsResponsePartied,
  ProductsPresenter,
  Product[]
>() {
  static create() {
    return new ProductsPresenter();
  }

  sendErrorValidation(errors: ValidationError[]): ProductsPresenter {
    return new ProductsPresenter(makeValidationErrors(errors));
  }

  send(props: PresenterProps<{ products: Product[] }>): ProductsPresenter {
    const data = this.parse(props.data!.products);
    const propsToResponse: PresenterProps<ProductsResponsePartied> = {
      ...props,
      data,
    };

    return new ProductsPresenter(propsToResponse);
  }

  parse(products: Product[]): ProductsResponsePartied {
    const responsePartied: ProductsResponsePartied = {
      products: products.map(productParser),
    };

    return responsePartied;
  }
}
