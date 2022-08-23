import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { DataViewComponent } from './data-view/data-view.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RatingModule } from 'primeng/rating';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    DataViewComponent,
    SideMenuComponent,
    TranslatePipe,
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    ToolbarModule,
    ButtonModule,
    DataViewModule,
    RatingModule,
    HttpClientModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RippleModule,

    FormsModule,
    TieredMenuModule,
    ProgressSpinnerModule,
    CarouselModule,
    TabViewModule,
    SharedModule,
  ],
})
export class ProductListModule {}
