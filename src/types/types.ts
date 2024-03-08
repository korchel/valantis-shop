export interface IResponseIds {
  result: string[],
}

export interface IQueryIds {
  offset: number,
  limit: number,
}

export type Item = {
  brand: null | string,
  id: string,
  price: number,
  product: string,
}

export interface IResponseItems {
  result: Item[],
}

export interface QueryItems {
  ids: string[] | undefined,
};

type Field = null | 'brand' | 'id' | 'price' | 'product';

export interface IResponseFields {
  result: Field[],
}

export interface IQueryFields extends IQueryIds {
  field: string,
}

export interface IResponseFilter {
  result: string[],
}

export type IQueryFilter = {
  brand: null | string
} |
{
  id: string
} |
{
  price: number
} |
{
  product: string
};                                  // ?????

