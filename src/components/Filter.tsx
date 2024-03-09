import React, { useEffect, useState } from 'react';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';
import { type LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  type BaseQueryFn, type FetchArgs, type QueryDefinition,
  type FetchBaseQueryError, type FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';

import { type IQueryFilter, type IResponseFilter } from '../types/types';

interface ISelectOption {
  label: string | null | number,
  value: string | null | number,
}

interface filterProps {
  triggerFilter: LazyQueryTrigger<QueryDefinition<IQueryFilter, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, FetchBaseQueryMeta>, never, IResponseFilter, 'items'>>,
  onSearchClear: () => void,
  options: Array<string | null | number>,
  type: 'price' | 'brand';
}

const selectStyles: StylesConfig = {
  control: (baseStyles) => ({
    ...baseStyles,

    height: '20px',
    width: '310px',
  }),
  option: (baseStyles, { isSelected, isFocused }) => ({
    ...baseStyles,
    cursor: 'pointer',
    backgroundColor: isSelected || isFocused
      ? '#bababa'
      : 'white',
  }),
};

const Filter: React.FC<filterProps> = ({ triggerFilter, onSearchClear, options, type }) => {
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  const selectOptions: ISelectOption[] = options
    .filter((brand, index) => brand !== null && options.indexOf(brand) === index)
    .map((brand) => ({ label: brand, value: brand }));

  const handleSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>): void => {
    if (newValue === null) {
      setSelected(null);
    } else {
      setSelected(newValue as ISelectOption);
    }
  };

  useEffect(() => {
    const filterParam = type === 'price' ? { price: selected?.value as number } : { brand: selected?.value as string };

    selected ? triggerFilter(filterParam) : onSearchClear();
  }, [selected, triggerFilter]);

  return (
    <div className="filter">
      <p>{`Фильтрация по ${type === 'price' ? 'цене' : 'бренду'}:`}</p>
      <Select
        styles={selectStyles}
        className="select"
        classNamePrefix="react-select"
        options={selectOptions}
        placeholder={type}
        isClearable={true}
        isSearchable={false}
        value={selected}
        onChange={handleSelect}
      />
    </div>
  );
};

export default Filter;
