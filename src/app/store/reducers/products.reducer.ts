import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  resetProducts,
  setProducts,
  updateProductsCount,
  addToBasket,
  removeFromBasket,
  setCategories,
  resetBasket,
} from '../actions/products.actions';
import {
  IProductsState,
  productsEntityAdapter,
  productsInitialState,
} from '../state/products.state';
import { IProduct } from '../../models/product-info.model';
import { Dictionary } from '@ngrx/entity';

export const PRODUCTS_FEATURE = 'products';

export const productsReducer = createReducer<IProductsState>(
  productsInitialState,
  on(setProducts, (state, { products }) => ({
    ...productsEntityAdapter.upsertMany(products, state),
    isLoaded: true,
  })),
  on(resetProducts, (state) => productsEntityAdapter.removeAll(state)),
  on(updateProductsCount, (state, { id, count }) =>
    productsEntityAdapter.updateOne(
      {
        id,
        changes: {
          count,
        },
      },
      state
    )
  ),
  on(setCategories, (state, { categories }) => ({
    ...state,
    categories: categories,
  })),
  on(resetBasket, (state) => ({
    ...state,
    basketIds: [],
  })),
  on(addToBasket, (state, { id }) => ({
    ...state,
    basketIds: [...new Set([...state.basketIds, id])],
  })),
  on(removeFromBasket, (state, { id }) => ({
    ...state,
    basketIds: [
      ...new Set([...state.basketIds.filter((oldId) => oldId !== id)]),
    ],
  }))
);

export const productsFeatureSelector =
  createFeatureSelector<IProductsState>(PRODUCTS_FEATURE);

export const {
  selectAll: getProducts,
  selectIds: getProductsIds,
  selectEntities: getProductsEntities,
} = productsEntityAdapter.getSelectors(productsFeatureSelector);

export const getProduct = (productId: string) =>
  createSelector(
    getProductsEntities,
    (products: Dictionary<IProduct>) => products[productId]
  );

export const getIsLoaded = createSelector(
  productsFeatureSelector,
  (productsState: IProductsState) => productsState.isLoaded
);

export const getCategories = createSelector(
  productsFeatureSelector,
  (productsState: IProductsState) => productsState.categories
);

export const getBasketList = createSelector(
  productsFeatureSelector,
  (productsState: IProductsState) => productsState.basketIds
);

export const getBasketProducts = createSelector(
  getProducts,
  getBasketList,
  (products, basketList) => {
    return products.filter((product) => basketList.indexOf(product.id) > -1);
  }
);
