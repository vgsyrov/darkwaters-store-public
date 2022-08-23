import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListResolver } from '../../resolvers/product-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      productList: ProductListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListRoutingModule {}
