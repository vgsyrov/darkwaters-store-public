import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concat,
  delay,
  EMPTY,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProductService } from '../../services/product.service';
import {
  addToBasket,
  loadProducts,
  removeFromBasket,
  resetBasket,
  setCategories,
  setProducts,
  updateProductsCount,
} from '../actions/products.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IState } from '../reducers';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductService,
    private store$: Store<IState>,
    private router: Router
  ) {}

  loadProductsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        concat(
          this.productsService
            .getCategories()
            .pipe(map((categories) => setCategories(categories))),
          this.productsService
            .getProducts()
            .pipe(map((products) => setProducts(products)))
        )
      )
    )
  );

  addToBasketEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(addToBasket),
      switchMap((action) => {
        return of(updateProductsCount(action.id, 1));
      })
    )
  );

  removeProductFromBasketEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductsCount),
      withLatestFrom(this.store$),
      switchMap(([action, state]) => {
        if (action.count === 0) {
          if (
            !state.products.basketIds ||
            state.products.basketIds.length === 1
          ) {
            this.router.navigate(['/']);
          }
          return of(removeFromBasket(action.id));
        } else {
          return EMPTY;
        }
      })
    )
  );

  resetBasketEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetBasket),
        delay(3000), // для красоты
        tap((_) => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
