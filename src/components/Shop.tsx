import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import {
  useGetIdsQuery as getIds,
  useLazyGetItemsQuery as getItems,
  useLazyFilterQuery as filter,
} from '../store/itemsApi';
import ItemCard from './ItemCard';
import { type Item } from '../types/types';
import Search from './Search';

const removeDoubles = (items: Item[]): Item[] => {
  const objectWithoutDoubles = items.reduce((acc: Record<string, Item>, item: Item) => {
    acc[item.id] ??= item;
    return acc;
  }, {});
  return Object.values(objectWithoutDoubles);
};

const Shop: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIds, setCurrentsIds] = useState<string[]>([]);

  const { data: ids, isLoading: isLoadingIds } = getIds({ offset: currentPage * 50, limit: 50 });

  const [triggerGetItems, { data: items, isLoading: isLoadingItems }] = getItems();
  const [triggerFilter, { data: filteredItems }] = filter();

  useEffect(() => {
    currentIds.length > 0 && triggerGetItems({ ids: currentIds });
  }, [currentIds, triggerGetItems]);

  useEffect(() => {
    setCurrentsIds(filteredItems?.result ?? []);
  }, [filteredItems]);

  useEffect(() => {
    setCurrentsIds(ids?.result ?? []);
  }, [ids]);

  const getNextPage = (): void => {
    setCurrentPage(currentPage + 1);
  };

  const getPreviousPage = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const onSearchClear = (): void => {
    setCurrentsIds(ids?.result ?? []);
  };

  return (
    <div className="container">
      <div className="controls">
        <Search triggerFilter={triggerFilter} onSearchClear={onSearchClear}/>
      </div>
      {(isLoadingIds || isLoadingItems) && <TailSpin color="#bababa" wrapperClass="spinner" />}
      {<TailSpin color="#bababa" wrapperClass="spinner" />}
      <div className="grid-container">
        {
          items && removeDoubles(items?.result).map((item) => (
            <ItemCard key={item.id} {...item}/>
          ))
        }
      </div>
      <div className="pagination">
        <button
          className="btn"
          onClick={getPreviousPage}
          disabled={currentPage === 0}
        >
          {'<'}
        </button>
        <button
          className="btn"
          onClick={getNextPage}
          disabled={isLoadingIds || isLoadingItems}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Shop;
