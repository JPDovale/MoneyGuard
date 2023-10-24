import { Product } from '@modules/Products/entities/Product';
import { Sale } from '@modules/Sales/entities/Sale';
import { Either, right } from '@shared/core/error/Either';
import { BrowserWindow } from 'electron';
import jsPDF from 'jspdf';
import path from 'path';
import fs from 'fs';
import { getPrinter, getPrinters, printDirect } from 'printer';
import { injectable } from 'tsyringe';

interface Request {
  sale: Sale;
  products: Product[];
}

type Response = Either<null, null>;

const translation = {
  MONEY: 'Dinheiro',
  CARD: 'Cartão',
  'NOT-PAYED': 'NÃO PAGO',
};

@injectable()
export class GenerateSaleReportService {
  async execute({ sale, products }: Request): Promise<Response> {
    let total = 0;

    const doc = new jsPDF();

    doc.setFont('helvetica', '', 700);
    doc.setFontSize(32);
    doc.text('MERCADO FAMILIA', 5, 10);

    doc.setFontSize(14);
    doc.text('PRODUTO', 5, 30);
    doc.text('QNTD |', 70, 30);
    doc.text('VLR UNT |', 120, 30);
    doc.text('VLR TOTAL', 170, 30);

    let finalIndex = 0;

    sale.products.getItems().forEach((prod, i) => {
      const product = products.find((p) => p.id.equals(prod.productId));

      if (!product) return;

      doc.text(product.name, 5, 39 + i * 6);
      doc.text(prod.quantity.toString(), 70, 39 + i * 6);
      doc.text(
        (product.price / 1000).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        120,
        39 + i * 6,
      );

      doc.text(
        ((product.price * prod.quantity) / 1000).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        170,
        39 + i * 6,
      );

      finalIndex = i + 1;
      total = total + product.price * prod.quantity;
    });

    doc.text(
      `Pago em: ${translation[sale.paymentType]}`,
      5,
      48 + finalIndex * 6,
    );
    finalIndex++;

    if (sale.paymentType === 'NOT-PAYED') {
      doc.text(
        `Atenção: Valores não pagos acima de R$ 50,00 serão cobrados um juro de 5% `,
        5,
        48 + finalIndex * 6,
      );
      finalIndex++;

      doc.text(`sobre o valor total da compra`, 5, 48 + finalIndex * 6);

      finalIndex += 2;
    }

    doc.text(`Pagamento: `, 5, 48 + finalIndex * 6);
    doc.text(
      (Number(sale.paymentValue ?? 0) / 1000).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      170,
      48 + finalIndex * 6,
    );
    finalIndex++;

    doc.text(`Valor total: `, 5, 48 + finalIndex * 6);
    doc.text(
      (total / 1000).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      170,
      48 + finalIndex * 6,
    );
    finalIndex++;

    doc.text(`Troco: `, 5, 48 + finalIndex * 6);
    doc.text(
      ((sale.paymentValue - total) / 1000 <= 0
        ? 0
        : (sale.paymentValue - total) / 1000
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      170,
      48 + finalIndex * 6,
    );

    doc.save(path.join(__dirname, 'pdf.pdf'));
    const newWindow = new BrowserWindow({
      width: 1024,
      height: 728,
    });
    newWindow.loadURL(path.join(__dirname, 'pdf.pdf'));
    newWindow.show();

    newWindow.on('close', () => {
      fs.rmSync(path.join(__dirname, 'pdf.pdf'));
    });

    return right(null);
  }
}
