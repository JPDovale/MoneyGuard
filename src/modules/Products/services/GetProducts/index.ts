import { Product } from '@modules/Products/entities/Product';
import { ProductsRepository } from '@modules/Products/repositories/ProductsRepository';
import { InjectableKeys } from '@shared/container/keys';
import { Either, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';

type Response = Either<
  null,
  {
    products: Product[];
  }
>;
@injectable()
export class GetProductsService {
  constructor(
    @inject(InjectableKeys.ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(): Promise<Response> {
    const products = await this.productsRepository.findAll();
    return right({
      products,
    });
  }
}
