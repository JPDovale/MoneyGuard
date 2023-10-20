import { Requester } from '@config/requests/requester';
import { statusCodeMapper } from '@config/responses/statusCodeMapper';
import { CreateProductGateway } from '@modules/Products/gateways/CreateProduct';
import { ProductModelResponse } from '@modules/Products/presenters/types';
import { create } from 'zustand';

interface UseProducts {
  products: ProductModelResponse[];
  isLoading: boolean;

  createProduct: (
    data: CreateProductGateway,
  ) => Promise<{ status: number; message: string }>;
  loadProducts: () => Promise<void>;
}

export const useProducts = create<UseProducts>((set, get) => {
  return {
    products: [],
    isLoading: true,

    createProduct: async (data) => {
      const response = await Requester.request({
        access: 'create-product',
        data,
      });

      if (response.status === statusCodeMapper.Created) {
        const { products } = get();

        const updatedProducts = [response.data.product, ...products];

        set({ products: updatedProducts });
      }

      return { status: response.status, message: response.message };
    },

    loadProducts: async () => {
      const response = await Requester.request({
        access: 'get-products',
        data: null,
      });
      if (response.status === statusCodeMapper.OK) {
        set({
          products: response.data.products,
        });
      }
      set({ isLoading: false });
    },
  };
});
