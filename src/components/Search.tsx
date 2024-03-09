import React, { useEffect, useState } from 'react';
import { type LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  type BaseQueryFn, type FetchArgs, type QueryDefinition,
  type FetchBaseQueryError, type FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { useDebounceValue } from 'usehooks-ts';

import { type IQueryFilter, type IResponseFilter } from '../types/types';

interface searchProps {
  triggerFilter: LazyQueryTrigger<QueryDefinition<IQueryFilter, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, FetchBaseQueryMeta>, never, IResponseFilter, 'items'>>,
  onSearchClear: () => void,
}

const Search: React.FC<searchProps> = ({ triggerFilter, onSearchClear }): JSX.Element => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    setDebouncedValue(event.target.value);
  };

  useEffect(() => {
    debouncedValue ? triggerFilter({ product: debouncedValue }) : onSearchClear();
  }, [debouncedValue]);

  return (
    <div className="search">
      <label htmlFor="search">Фильтрация по названию:</label>
      <input
        id="search"
        type="search"
        placeholder="product"
        value={value}
        onChange={handleSearch}
        autoComplete="off"
      />
    </div>
  );
};

export default Search;
