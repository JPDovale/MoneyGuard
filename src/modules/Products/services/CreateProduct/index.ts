import { Product } from '@modules/Products/entities/Product';
import { AlreadyExistsProductWithSamaBarCode } from '@modules/Products/errors/AlreadyExistsProductWithSamaBarCode';
import { AlreadyExistsProductWithSamaName } from '@modules/Products/errors/AlreadyExistsProductWithSamaName';
import { ProductsRepository } from '@modules/Products/repositories/ProductsRepository';
import { TagNotFound } from '@modules/Tags/errors/TagNotFound';
import { TagsRepository } from '@modules/Tags/repositories/TagsRepository';
import { InjectableKeys } from '@shared/container/keys';
import { Either, left, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';

interface Request {
  barCode?: number;
  name: string;
  price: number;
  brand: string;
  description?: string;
  quantityInStock: number;
  tagId: string;
  isHeavy: boolean;
}

type Response = Either<
  | AlreadyExistsProductWithSamaName
  | AlreadyExistsProductWithSamaBarCode
  | TagNotFound,
  {
    product: Product;
  }
>;

@injectable()
export class CreateProductService {
  constructor(
    @inject(InjectableKeys.ProductsRepository)
    private readonly productsRepository: ProductsRepository,

    @inject(InjectableKeys.TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async execute({
    brand,
    isHeavy,
    name,
    price,
    quantityInStock,
    tagId,
    barCode,
    description,
  }: Request): Promise<Response> {
    const productWithSameName = await this.productsRepository.findByName(name);
    if (productWithSameName) {
      return left(new AlreadyExistsProductWithSamaName());
    }

    if (barCode) {
      const productWithSameBarCode =
        await this.productsRepository.findByBarCode(barCode);

      if (productWithSameBarCode) {
        return left(new AlreadyExistsProductWithSamaBarCode());
      }
    }

    const tag = await this.tagsRepository.findById(tagId);

    if (!tag) {
      return left(new TagNotFound());
    }

    const product = Product.create({
      brand,
      isHeavy,
      name,
      price,
      quantityInStock,
      tagId: tag.id,
      barCode,
      description,
    });

    await this.productsRepository.create(product);

    return right({
      product,
    });
  }
}
