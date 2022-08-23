import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IState } from '../../../store/reducers';
import {
  addAddress,
  resetAddress,
} from '../../../store/actions/address.actions';
import { Subscription } from 'rxjs';
import { addressFeatureSelector } from '../../../store/reducers/address.reducer';
import { MessageService } from 'primeng/api';
import { resetBasket } from '../../../store/actions/products.actions';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class AddressComponent implements OnInit, OnDestroy {
  private address$: Subscription | null = null;
  addressForm = this.formBuilder.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    homeInfo: this.formBuilder.group({
      block: ['', []],
      number: ['', [Validators.required]],
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IState>,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.address$ = this.store
      .pipe(select(addressFeatureSelector))
      .subscribe((address) => {
        this.addressForm.setValue(address);
      });
  }

  ngOnDestroy() {
    this.address$?.unsubscribe();
  }

  onPush() {
    if (this.addressForm.valid) {
      this.store.dispatch(addAddress(this.addressForm.getRawValue()));
      this.messageService.add({
        severity: 'success',
        summary: 'Заказ оформлен',
        detail: 'Ожидайте доставку по указанному адресу.',
      });
      this.store.dispatch(resetBasket());
    }
  }

  onReset() {
    this.store.dispatch(resetAddress());
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
