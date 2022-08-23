import { createAction } from '@ngrx/store';
import { IProduct } from '../../models/product-info.model';

enum ProductsActionTypes {
  SetProducts = '[Products] Set products',
  ResetProducts = '[Products] Reset products',
  UpdateProductsCount = '[Products] Update products count',
  LoadProducts = '[Products] Load products',
  SetCategories = '[Products] Get categories list',
  AddToBasket = '[Products] Add to basket',
  RemoveFromBasket = '[Products] Remove from basket',
  GetBasketList = '[Products] Get basket list',
  ResetBasket = '[Products] Reset basket',
}

export const setProducts = createAction(
  ProductsActionTypes.SetProducts,
  (products: IProduct[]) => ({ products })
);
export const resetProducts = createAction(ProductsActionTypes.ResetProducts);
export const updateProductsCount = createAction(
  ProductsActionTypes.UpdateProductsCount,
  (id: string, count: number) => ({ id, count })
);

export const addToBasket = createAction(
  ProductsActionTypes.AddToBasket,
  (id: string) => ({ id })
);

export const removeFromBasket = createAction(
  ProductsActionTypes.RemoveFromBasket,
  (id: string) => ({ id })
);

export const loadProducts = createAction(ProductsActionTypes.LoadProducts);

export const setCategories = createAction(
  ProductsActionTypes.SetCategories,
  (categories: string[]) => ({ categories })
);

export const resetBasket = createAction(ProductsActionTypes.ResetBasket);

export const getBasketList = createAction(ProductsActionTypes.GetBasketList);
