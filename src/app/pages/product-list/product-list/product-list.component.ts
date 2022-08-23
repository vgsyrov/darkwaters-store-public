import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { IProduct } from '../../../models/product-info.model';
import { select, Store } from '@ngrx/store';
import { IState } from '../../../store/reducers';
import { getCategories } from '../../../store/reducers/products.reducer';
import { environment } from '../../../../environments/environment';
import { userFeatureSelector } from '../../../store/reducers/user.reducer';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  public mainCurrency: string = '';

  private products: IProduct[] = [];
  public products$: Observable<IProduct[]> = new Observable<IProduct[]>();
  public categories$: Observable<string[]> = new Observable<string[]>();
  public userCurrency$: Observable<string> = new Observable<string>();
  public categoryChanges$: Subject<string> = new BehaviorSubject<string>('');

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<IState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((resolved: any) => {
      this.products = resolved.productList;
    });

    this.products$ = this.categoryChanges$.pipe(
      map((category) => {
        if (!!category && category.length > 0) {
          return this.products.filter(
            (product) => product.category === category
          );
        }
        return this.products;
      })
    );

    this.activatedRoute.queryParams.subscribe((params) => {
      this.categoryChanges$.next(params['category']);
    });

    this.mainCurrency = environment.config.mainCurrency;
    this.categories$ = this.store.pipe(select(getCategories));
    this.userCurrency$ = this.store
      .pipe(select(userFeatureSelector))
      .pipe(map((userState) => userState.shopSum.defaultCurrency));
  }
}
