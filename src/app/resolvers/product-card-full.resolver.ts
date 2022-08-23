import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, first, Observable, switchMap, tap } from 'rxjs';
import { IState } from '../store/reducers';
import { select, Store } from '@ngrx/store';
import { IProduct } from '../models/product-info.model';
import { getIsLoaded, getProduct } from '../store/reducers/products.reducer';
import { loadProducts } from '../store/actions/products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductCardFullResolver implements Resolve<IProduct | undefined> {
  constructor(private store: Store<IState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct | undefined> {
    const productId = route.paramMap.get('id') as string;

    return this.store.pipe(
      select(getIsLoaded),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(loadProducts());
        }
      }),
      filter((loaded) => loaded),
      switchMap(() => {
        return this.store.pipe(select(getProduct(productId)));
      }),
      first()
    );
  }
}
