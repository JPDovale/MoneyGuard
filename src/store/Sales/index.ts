import { Requester } from '@config/requests/requester';
import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { CreateSaleGateway } from '@modules/Sales/gateways/CreateSale';
// import { SaleModelResponse } from '@modules/Sales/presenters/types';
import { create } from 'zustand';

interface UseSales {
  // sales: SaleModelResponse[];
  isLoading: boolean;

  createSale: (
    data: CreateSaleGateway,
  ) => Promise<{ status: number; message: string }>;
  loadSales: () => Promise<void>;
}

export const useSales = create<UseSales>((set, get) => {
  return {
    // sales: [],
    isLoading: true,

    createSale: async (data) => {
      const response = await Requester.request({
        access: 'create-sale',
        data: {
          customerName: data.customerName,
          paymentType: data.paymentType,
          paymentValue: data.paymentValue,
          products: data.products,
        },
      });

      // if (response.status === statusCodeMapper.Created) {
      //   const { sales } = get();

      //   const updatedSales = [response.data.sale, ...sales];

      //   set({ sales: updatedSales });
      // }

      return { status: response.status, message: response.message };
    },

    loadSales: async () => {
      // const response = await Requester.request({
      //   access: 'get-sales',
      //   data: null,
      // });
      // if (response.status === statusCodeMapper.OK) {
      //   set({
      //     sales: response.data.sales,
      //   });
      // }
      // set({ isLoading: false });
    },
  };
});
