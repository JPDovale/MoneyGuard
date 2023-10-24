import { Customer } from '@modules/Customers/entities/Customer';
import { CustomersRepository } from '@modules/Customers/repositories/CustomersRepository';
import { Product } from '@modules/Products/entities/Product';
import { ProductsRepository } from '@modules/Products/repositories/ProductsRepository';
import { Sale } from '@modules/Sales/entities/Sale';
import { SaleProduct } from '@modules/Sales/entities/SaleProduct';
import { SalesRepository } from '@modules/Sales/repositories/SalesRepository';
import { InjectableKeys } from '@shared/container/keys';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { Either, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';
import { GenerateSaleReportService } from '../GenerateSaleReport';

interface Request {
  customerName: string;
  paymentType: 'MONEY' | 'CARD' | 'NOT-PAYED';
  paymentValue?: number;
  products: {
    id: string;
    quantity: number;
  }[];
}

type Response = Either<
  null,
  {
    sale: Sale;
  }
>;

@injectable()
export class CreateSaleService {
  constructor(
    @inject(InjectableKeys.CustomersRepository)
    private readonly customersRepository: CustomersRepository,

    @inject(InjectableKeys.SalesRepository)
    private readonly salesRepository: SalesRepository,

    @inject(InjectableKeys.ProductsRepository)
    private readonly productsRepository: ProductsRepository,

    @inject(InjectableKeys.GenerateSaleReportService)
    private readonly generateSaleReportService: GenerateSaleReportService,
  ) {}

  async execute({
    customerName,
    paymentType,
    products: productsReceived,
    paymentValue,
  }: Request): Promise<Response> {
    const customerExistes = await this.customersRepository.findByName(
      customerName.trim().toLowerCase().replaceAll(' ', '-'),
    );
    let customer: Customer;

    if (!customerExistes) {
      const newCustomer = Customer.create({
        name: customerName,
      });

      await this.customersRepository.create(newCustomer);
      customer = newCustomer;
    } else {
      customer = customerExistes;
    }

    const productsFind = await Promise.all(
      productsReceived.map((productReceived) =>
        this.productsRepository.findById(productReceived.id),
      ),
    );
    const products = productsFind.filter(
      (product) => product !== null,
    ) as Product[];

    const sale = Sale.create({
      customerId: customer.id,
      paymentType,
      paymentValue: paymentValue ?? 0,
    });

    let total = 0;
    productsReceived.forEach((productReceived) => {
      const product = products.find((product) =>
        product.id.equals(new UniqueEntityId(productReceived.id)),
      );

      if (!product) return;

      sale.products.add(
        SaleProduct.create({
          productId: product.id,
          quantity: productReceived.quantity,
          saleId: sale.id,
          total: product.price * productReceived.quantity,
        }),
      );
      total = total + product.price * productReceived.quantity;
    });

    this.generateSaleReportService.execute({
      sale,
      products,
    });

    this.salesRepository.create(sale);

    sale.products.getItems().forEach((prod, i) => {
      const product = products.find((p) => p.id.equals(prod.productId));

      if (!product) return;
    });

    if (sale.paymentType === 'NOT-PAYED') {
      customer.owing = total;
    }

    return right({
      sale,
    });
  }
}
