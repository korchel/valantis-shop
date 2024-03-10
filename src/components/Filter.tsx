import React, { useEffect, useState } from 'react';
import Select, { type StylesConfig, type ActionMeta } from 'react-select';
import { type IQueryFilter, FilterEnum } from '../types/types';
// import { type LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
// import {
//   type BaseQueryFn, type FetchArgs, type QueryDefinition,
//   type FetchBaseQueryError, type FetchBaseQueryMeta
// } from '@reduxjs/toolkit/query';

// import { type IQueryFilter, type IResponseFilter } from '../types/types';

interface ISelectOption {
  label: string | null | number,
  value: string | null | number,
}

interface filterProps {
  triggerFilter: (filterParam: IQueryFilter) => void,
  onSearchClear: () => void,
  options: Array<string | null | number>,
  type: FilterEnum,
  currentFilter: FilterEnum | null,
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterEnum | null>>,
}

const selectStyles: StylesConfig = {
  control: (baseStyles) => ({
    ...baseStyles,
    height: '20px',
    maxWidth: '310px',
  }),
  option: (baseStyles, { isSelected, isFocused }) => ({
    ...baseStyles,
    cursor: 'pointer',
    backgroundColor: isSelected || isFocused
      ? '#bababa'
      : 'white',
  }),
};

const sortCallback = (a: number | string, b: number | string): number => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

const Filter: React.FC<filterProps> = ({ triggerFilter, onSearchClear, options, type, currentFilter, setCurrentFilter }) => {
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  const selectOptions: ISelectOption[] = options
    .filter((option, index): option is number | string => option !== null && options.indexOf(option) === index)
    .sort(sortCallback)
    .map((brand) => ({ label: brand, value: brand }));

  const handleSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>): void => {
    if (newValue === null) {
      setSelected(null);
    } else {
      setSelected(newValue as ISelectOption);
      setCurrentFilter(type);
    }
  };

  useEffect(() => {
    if (currentFilter !== type) {
      setSelected(null);
    }
  }, [currentFilter, type]);

  useEffect(() => {
    const filterParam = type === FilterEnum.PRICE ? { price: selected?.value as number } : { brand: selected?.value as string };

    selected ? triggerFilter(filterParam) : onSearchClear();
  }, [selected]);

  return (
    <div className="filter">
      <p>{`Фильтрация по ${type === FilterEnum.PRICE ? 'цене' : 'бренду'}:`}</p>
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
