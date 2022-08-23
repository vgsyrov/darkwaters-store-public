import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardFullResolver } from '../../resolvers/product-card-full.resolver';
import { ProductCardFullComponent } from './product-card-full/product-card-full.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductCardFullComponent,
    resolve: {
      product: ProductCardFullResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductCardFullResolver],
})
export class ProductRoutingModule {}
