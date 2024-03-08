import React from 'react';

import { type Item } from '../types/types';

const ItemCard: React.FC<Item> = ({ brand, id, price, product }) => {
  return (
    <div className="card" id={id}>
      <div className="card-image">
        <img src="./dummy.png" alt="ring" />
      </div>
      <h3 className="card-title">{product}</h3>
      <p>{brand}</p>
      <p className="price">{price} руб.</p>
    </div>
  );
};

export default ItemCard;
