import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, first, Observable, switchMap, tap } from 'rxjs';
import { IProduct } from '../models/product-info.model';
import { select, Store } from '@ngrx/store';
import { getIsLoaded, getProducts } from '../store/reducers/products.reducer';
import { loadProducts } from '../store/actions/products.actions';
import { IState } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class ProductListResolver implements Resolve<IProduct[]> {
  constructor(private store: Store<IState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct[]> {
    return this.store.pipe(
      select(getIsLoaded),
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(loadProducts());
        }
      }),
      filter((loaded) => loaded),
      switchMap(() => {
        return this.store.pipe(select(getProducts));
      }),
      first()
    );
  }
}
