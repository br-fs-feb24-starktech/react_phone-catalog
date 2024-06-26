import { useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { getHotPriceProducts } from '../../services/Products';
import { ProductsSlider } from '../product-slider/ProductSlider';

export const HotPrices = () => {
  const [products, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    getHotPriceProducts().then(product => setProduct(product));
  }, [products]);

  return <ProductsSlider products={products} title="Hot prices" />;
};
