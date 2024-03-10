import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import {
  useGetIdsQuery as getIds,
  useGetFieldsQuery as getFields,
  useLazyGetItemsQuery as getItems,
  useLazyFilterQuery as filter,
} from '../store/itemsApi';
import ItemCard from './ItemCard';
import { type IQueryFilter, type Item, FilterEnum } from '../types/types';
import Search from './Search';
import Filter from './Filter';

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
  const [currentFilter, setCurrentFilter] = useState<FilterEnum | null>(null);
  const [isFailedSearch, setFailedSearch] = useState(false);

  const { data: ids, isLoading: isLoadingIds, isFetching: isFetchingIds } = getIds({ offset: currentPage * 50, limit: 50 });
  const { data: brands } = getFields({ field: 'brand', offset: 0, limit: 1000 });
  const { data: prices } = getFields({ field: 'price', offset: 0, limit: 1000 });

  const [triggerGetItems, { data: items, isLoading: isLoadingItems, isFetching: isFetchingItems }] = getItems();
  const [triggerFilter, { data: filteredItems, isLoading: isLoadingFilter, isFetching: isFetchingFilter }] = filter();

  useEffect(() => {
    if (currentIds.length > 0) {
      triggerGetItems({ ids: currentIds });
    }
    setFailedSearch(currentIds.length === 0);
  }, [currentIds]);

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

  const isLoadingState = (): boolean => {
    return isLoadingIds || isFetchingIds || isLoadingItems || isFetchingItems || isLoadingFilter || isFetchingFilter;
  };

  return (
    <div className="container">
      <div className="controls">
        <Search
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          triggerFilter={triggerFilter as (filterParam: IQueryFilter) => void}
          onSearchClear={onSearchClear}
        />
        <Filter
          triggerFilter={triggerFilter as (filterParam: IQueryFilter) => void}
          onSearchClear={onSearchClear}
          options={brands?.result ?? []}
          type={FilterEnum.BRAND}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        <Filter
          triggerFilter={triggerFilter as (filterParam: IQueryFilter) => void}
          onSearchClear={onSearchClear}
          options={prices?.result ?? []}
          type={FilterEnum.PRICE}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      </div>
      {isLoadingState() && <TailSpin color="#bababa" wrapperClass="spinner" />}
      {isFailedSearch && !isLoadingState() && <p>Ничего не найдено</p>}
      {!isFailedSearch && !isLoadingState() && items && (
        <>
          <div className="grid-container">
          {
            removeDoubles(items?.result).map((item) => (
              <ItemCard key={item.id} {...item} />
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
              disabled={isLoadingIds || isLoadingItems || items.result.length <= 50}
            >
              {'>'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
