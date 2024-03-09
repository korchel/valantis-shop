import React, { useEffect, useState } from 'react';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';
import { type LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  type BaseQueryFn, type FetchArgs, type QueryDefinition,
  type FetchBaseQueryError, type FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';

import { type IQueryFilter, type IResponseFilter } from '../types/types';

interface ISelectOption {
  label: string | null,
  value: string | null,
}

interface filterProps {
  triggerFilter: LazyQueryTrigger<QueryDefinition<IQueryFilter, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, FetchBaseQueryMeta>, never, IResponseFilter, 'items'>>,
  onSearchClear: () => void,
  brands: Array<string | null>,
}

const selectStyles: StylesConfig = {
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#F0F0F0',
    height: '60px',
    width: '200px',
  }),
  option: (baseStyles, { isSelected, isFocused }) => ({
    ...baseStyles,
    cursor: 'pointer',
    backgroundColor: isSelected || isFocused
      ? '#bababa'
      : '#F0F0F0',
  }),
};

const Filter: React.FC<filterProps> = ({ triggerFilter, onSearchClear, brands }) => {
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  const selectOptions: ISelectOption[] = brands
    .filter((brand, index) => brand !== null && brands.indexOf(brand) === index)
    .map((brand) => ({ label: brand, value: brand }));

  const handleSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>): void => {
    console.log(newValue, 'newValue');
    if (newValue === null) {
      setSelected(null);
    } else {
      setSelected(newValue as ISelectOption);
    }
  };

  useEffect(() => {
    selected ? triggerFilter({ brand: selected?.value as string }) : onSearchClear();
  }, [selected, triggerFilter]);

  return (
    <Select
      styles={selectStyles}
      className="select"
      classNamePrefix="react-select"
      options={selectOptions}
      placeholder="brand"
      isClearable={true}
      isSearchable={false}
      value={selected}
      onChange={handleSelect}
    />
  );
};

export default Filter;
