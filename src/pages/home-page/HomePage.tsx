import { useEffect, useState } from 'react';
import { Category } from '../../components/category/Category';
import { ProductType } from '../../types/ProductType';
import { fetchProducts } from '../../services/serviceAPI';
import { Banner } from '../../components/banner/Banner';
import './HomePage.scss';
import { HotPrices } from '../../components/hot-prices/HotPrices';
import { NewModels } from '../../components/new-models/NewModels';
import { SkeletonHome } from '../../components/skeleton-home/SkeletonHome';

export const HomePage = () => {
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const phonesQuantity = productsList.filter(item => item.category === 'phones').length;

  const tabletsQuantity = productsList.filter(item => item.category === 'tablets').length;

  const accessoriesQuantity = productsList.filter(item => item.category === 'accessories').length;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(1, 100);
        setProductsList(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonHome />
      ) : (
        <div className="home-page">
          <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>

          <div className="home-page__banner">
            <Banner />
          </div>

          <div className="home-page__slider">
            <NewModels />
          </div>

          <div className="home-page__category">
            <Category
              phonesQuantity={phonesQuantity}
              tabletsQuantity={tabletsQuantity}
              accessoriesQuantity={accessoriesQuantity}
            />
          </div>

          <div className="home-page__slider">
            <HotPrices />
          </div>
        </div>
      )}
    </>
  );
};
