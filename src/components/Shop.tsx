import React from 'react';

import {
  useGetIdsQuery as getIds,
  useGetItemsQuery as getItems,
  useGetFieldsQuery as getFields,
  useFilterQuery as filter,
} from '../store/itemsApi';

const Shop: React.FC = () => {
  const ids = getIds({ offset: 10, limit: 10 });
  console.log(ids, 'ids')
  const iems = getItems({ ids: ['1789ecf3-f81c-4f49-ada2-83804dcc74b0'] });
  console.log(iems, 'items')
  const fields = getFields({ field: 'brand', offset: 10, limit: 10 })
  console.log(fields, 'fields')
  const { data } = filter({ price: 17500.0 })
  console.log(data, 'filter')
  return (
    <div>

    </div>
  );
};

export default Shop;
