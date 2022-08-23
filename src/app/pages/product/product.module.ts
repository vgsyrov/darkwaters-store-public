import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { RatingModule } from 'primeng/rating';
import { ProductCardFullComponent } from './product-card-full/product-card-full.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CarouselDirective } from '../../directives/carousel.directive';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCardFullComponent, CarouselDirective],
  exports: [CarouselDirective],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RatingModule,
    CarouselModule,
    ButtonModule,
    SharedModule,
    FormsModule,
  ],
})
export class ProductModule {}
