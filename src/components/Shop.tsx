import React from 'react';

import {
  useGetIdsQuery as getIds,
  useGetItemsQuery as getItems,
  useGetFieldsQuery as getFields,
  useFilterQuery as filter,
} from '../store/itemsApi';

import ItemCard from './ItemCard';

const Shop: React.FC = () => {
  const { data: ids, isLoading: isLoadingIds } = getIds({ offset: 10, limit: 10 });
  console.log(ids?.result, 'ids')

  const { data: items, isLoading: isLoadingItems } = getItems({ ids: ids?.result });
  console.log(items, 'items')

  const fields = getFields({ field: 'brand', offset: 10, limit: 10 })
  console.log(fields, 'fields')

  const { data } = filter({ price: 17500.0 })
  console.log(data, 'filter')

  return (
    <div className="grid-container container">
      {isLoadingIds && 'Идет загрузка...'}
      {isLoadingItems && 'Идет загрузка...'}
      {
        items?.result.map((item) => (
          <ItemCard key={item.id} {...item}/>
        ))
      }
    </div>
  );
};

export default Shop;
