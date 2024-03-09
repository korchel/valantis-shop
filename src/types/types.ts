export interface IResponseIds {
  result: string[],
}

export interface IQueryIds {
  offset: number,
  limit: number,
}

export interface Item {
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

export interface IResponseFields {
  result: Array<string | null>,
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
}; // ?????
