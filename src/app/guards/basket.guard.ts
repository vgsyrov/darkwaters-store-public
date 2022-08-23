import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getBasketList } from '../store/reducers/products.reducer';

@Injectable({
  providedIn: 'root',
})
export class BasketGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getBasketList),
      map((basketList) => {
        if (basketList.length === 0) {
          this.router.navigate(['/']);
        }
        return basketList.length > 0;
      }),
      take(1)
    );
  }
}
