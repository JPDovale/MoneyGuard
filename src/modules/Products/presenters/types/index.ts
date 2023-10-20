export abstract class ProductModelResponse {
  abstract id: string;
  abstract name: string;
  abstract brand: string;
  abstract description: string | null;
  abstract price: number;
  abstract barCode: number;
  abstract quantityInStock: number;
  abstract createdAt: Date;
  abstract updatedAt: Date | null;
  abstract tagId: string;
  abstract isHeavy: boolean;
}

export abstract class ProductResponsePartied {
  abstract product: ProductModelResponse | null;
}

export abstract class ProductsResponsePartied {
  abstract products: ProductModelResponse[];
}
