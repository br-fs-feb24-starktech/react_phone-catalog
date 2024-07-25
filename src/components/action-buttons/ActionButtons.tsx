import React, { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './ActionButtons.scss';
import { ProductType } from '../../types/ProductType';
import classNames from 'classnames';

type Props = {
  product: ProductType;
};

export const ActionButtons: React.FC<Props> = ({ product }) => {
  const { addToFavorites, removeFromFavorites, cart, addToCart, removeFromCart, ids } =
    useAppContext();
  const [isFavourited, setIsFavourited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const userId = 5;

  useEffect(() => {
    setIsFavourited(ids.some(favProduct => favProduct === product.id));
    setIsInCart(cart.some(cartItem => cartItem.product.id === product.id));
  }, [cart, product.id, ids]);

  const handleFavoriteClick = useCallback(() => {
    if (isFavourited) {
      removeFromFavorites(userId, product.id);
      setIsFavourited(false);
    } else {
      addToFavorites(product.id, product);
      setIsFavourited(true);
    }
  }, [isFavourited, product, addToFavorites, removeFromFavorites]);

  const handleCartClick = useCallback(() => {
    if (isInCart) {
      removeFromCart(product.id);
      setIsInCart(false);
    } else {
      addToCart(product);
      setIsInCart(true);
    }
  }, [isInCart, product, addToCart, removeFromCart]);

  return (
    <div className="actions-button">
      <button
        className={classNames('actions-button__add-to-cart', {
          'actions-button__add-to-cart--active': isInCart,
        })}
        onClick={handleCartClick}
      >
        {isInCart ? 'Remove' : 'Add to cart'}
      </button>

      <button
        className={classNames('actions-button__favourite', {
          'actions-button__favourite--filled': isFavourited,
        })}
        onClick={handleFavoriteClick}
        aria-label={isFavourited ? 'Remove from favorites' : 'Add to favorites'}
      ></button>
    </div>
  );
};
