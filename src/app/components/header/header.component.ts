import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../models/user.model';
import { IProduct } from '../../models/product-info.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input()
  public currencies!: string[];

  @Input()
  public user: IUser | null = null;

  @Input()
  public basketProducts: IProduct[] | null = [];

  @Output()
  public basketClicked = new EventEmitter<void>();

  public readonly applicationName: string = environment.applicationName;
  public readonly mainCurrency = environment.config.mainCurrency;

  public getBasketSize(): number {
    return this.basketProducts!.length;
  }

  public calcBasketSum(): number {
    let totalSum = 0;
    this.basketProducts!.forEach((product) => {
      totalSum += product.count * product.price;
    });
    return totalSum;
  }
}
