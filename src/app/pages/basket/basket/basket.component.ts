import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';
import { IProduct } from '../../../models/product-info.model';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IState } from '../../../store/reducers';
import { getBasketProducts } from '../../../store/reducers/products.reducer';
import { updateProductsCount } from '../../../store/actions/products.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit, OnDestroy {
  public basket$: Observable<IProduct[]> = new Observable<IProduct[]>();

  public form = this.formBuilder.group({
    id: this.formBuilder.array([]),
    counters: this.formBuilder.array(
      [],
      [Validators.max(10), Validators.min(0)]
    ),
  });

  private basketSubscription: Subscription = new Subscription();
  private basketProducts: IProduct[] = [];

  constructor(private formBuilder: FormBuilder, private store: Store<IState>) {}

  ngOnInit(): void {
    this.basket$ = this.store.pipe(select(getBasketProducts));
    this.form.valueChanges.subscribe((formChangeed) => {
      if (formChangeed.id.length === formChangeed.counters.length) {
        let updatedProducts: { id: string; count: number }[] = [];
        formChangeed.counters.forEach((counter: number, index: number) => {
          updatedProducts.push({
            id: formChangeed.id[index],
            count: formChangeed.counters[index],
          });
        });

        updatedProducts.forEach((updatetd) => {
          this.store.dispatch(updateProductsCount(updatetd.id, updatetd.count));
        });
      }
    });

    this.basketSubscription = this.store
      .pipe(
        select(getBasketProducts),
        filter((basket) =>
          BasketComponent.isArrayDiffers(basket, this.basketProducts)
        )
      )
      .subscribe((basket) => {
        this.basketProducts = basket;
        this.form.setControl(
          'id',
          this.formBuilder.array(
            new Array(basket.length).fill(0).map((_, index) => basket[index].id)
          )
        );
        this.form.setControl(
          'counters',
          this.formBuilder.array(
            new Array(basket.length)
              .fill(1)
              .map((value, index) => [
                basket[index].count,
                [Validators.max(10), Validators.min(0)],
              ])
          )
        );
      });
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe();
    }
  }

  private static isArrayDiffers(
    array1: IProduct[],
    array2: IProduct[]
  ): boolean {
    return array1.length !== array2.length;
  }
}
