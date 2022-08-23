import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityInputComponent } from './quantity-input.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [QuantityInputComponent],
  imports: [CommonModule, ButtonModule],
  exports: [QuantityInputComponent],
})
export class QuantityInputModule {}
