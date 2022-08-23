import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../models/product-info.model';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { IState } from '../../../store/reducers';
import { addToBasket } from '../../../store/actions/products.actions';

@Component({
  selector: 'app-product-card-full',
  templateUrl: './product-card-full.component.html',
  styleUrls: ['./product-card-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardFullComponent implements OnInit {
  public readonly currencies: string[] = environment.config.supportedCurrencies;
  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<IState>
  ) {}

  public product: IProduct = <IProduct>{};

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((resolved: any) => {
      this.product = resolved.product;
    });
  }

  onAddToBasket() {
    this.store.dispatch(addToBasket(this.product!.id));
  }
}
