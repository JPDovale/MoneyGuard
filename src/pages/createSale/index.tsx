import { useState } from 'react';
import { ProductModelResponse } from '@modules/Products/presenters/types';
import { ProductsList } from './components/ProductsList';
import { SaleForm } from './components/SaleForm';

export function CreateSalePage() {
  const [selectedProductsFrom, setSelectedProductsFrom] = useState<
    { id: string; quantity: string }[]
  >([]);

  function handleAddProduct(product: ProductModelResponse) {
    setSelectedProductsFrom([
      ...selectedProductsFrom,
      {
        id: product.id,
        quantity: '1',
      },
    ]);
  }

  function handleRemoveProduct(product: ProductModelResponse) {
    const filteredProducts = selectedProductsFrom.filter(
      (prod) => prod.id !== product.id,
    );

    setSelectedProductsFrom(filteredProducts);
  }

  function handleUpdateProduct(
    product: ProductModelResponse,
    quantity: string,
  ) {
    const productToUpdateIndex = selectedProductsFrom.findIndex(
      (prod) => prod.id === product.id,
    );

    if (productToUpdateIndex < 0) return;
    const updatedProducts = selectedProductsFrom;
    updatedProducts[productToUpdateIndex].quantity = product.isHeavy
      ? quantity
      : Math.floor(Number(quantity)).toString();
    console.log(updatedProducts);

    setSelectedProductsFrom(() => [...updatedProducts]);
  }

  return (
    <div className="max-w-5xl w-full h-[88vh] mx-auto pt-8 flex ">
      <SaleForm
        handleRemoveProduct={handleRemoveProduct}
        handleUpdateProduct={handleUpdateProduct}
        selectedProductsFrom={selectedProductsFrom}
      />
      <ProductsList
        handleAddProduct={handleAddProduct}
        selectedProductsFrom={selectedProductsFrom}
      />
    </div>
  );
}
