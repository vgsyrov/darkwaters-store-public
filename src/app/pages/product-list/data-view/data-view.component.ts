import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

import { IProduct } from '../../../models/product-info.model';
import { IState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { CurrencyPipe } from '../../../pipes/currency.pipe';
import { addToBasket } from '../../../store/actions/products.actions';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe],
})
export class DataViewComponent implements OnInit {
  @Input()
  public products!: IProduct[];

  @Input()
  public storeCurrency!: string;

  @Input()
  public userCurrency!: string;

  @Output()
  public sortOptions!: SelectItem[];

  public sortOrder: number = -1;
  public sortField: string = '';
  public sortKey: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IState>
  ) {}

  ngOnInit() {
    this.sortOptions = [
      { label: 'Сначала дорогие', value: '!price' },
      { label: 'Сначала дешевые', value: 'price' },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onProductDetails(event: MouseEvent, id: string) {
    this.router.navigate([`product-card-full`, id]);
  }

  onAddToCart(event: any, selectedProduct: IProduct) {
    event.stopPropagation();
    this.store.dispatch(addToBasket(selectedProduct.id));
  }
}
