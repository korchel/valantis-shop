import React, { useState } from 'react';

import {
  useGetIdsQuery as getIds,
  useGetItemsQuery as getItems,
  useGetFieldsQuery as getFields,
  useFilterQuery as filter,
} from '../store/itemsApi';

import ItemCard from './ItemCard';

const Shop: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: ids, isLoading: isLoadingIds } = getIds({ offset: currentPage * 50, limit: 50 });
  console.log(ids?.result, 'ids')

  const { data: items, isLoading: isLoadingItems } = getItems({ ids: ids?.result });
  console.log(items, 'items')

  const fields = getFields({ field: 'brand', offset: 10, limit: 10 })
  console.log(fields, 'fields')

  const { data } = filter({ price: 17500.0 })
  console.log(data, 'filter')

  const nextPage = (): void => {
    console.log(currentPage, '!!!!')
    setCurrentPage(currentPage + 1);
  };

  const previousPage = (): void => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      {isLoadingIds && 'Идет загрузка...'}
      {isLoadingItems && 'Идет загрузка...'}
      <div className="grid-container">
        {
          items?.result.map((item) => (
            <ItemCard key={item.id} {...item}/>
          ))
        }
      </div>
      <div className="pagination">
        <button
          className="btn"
          onClick={previousPage}
          disabled={currentPage === 0}
        >
          {'<'}
        </button>
        <button
          className="btn"
          onClick={nextPage}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Shop;
