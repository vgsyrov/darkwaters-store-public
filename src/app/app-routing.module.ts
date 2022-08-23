import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/product-list/product-list.module').then(
        (m) => m.ProductListModule
      ),
  },
  {
    path: 'product-card-full',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./pages/basket/basket.module').then((m) => m.BasketModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
