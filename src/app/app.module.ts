import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { ProductModule } from './pages/product/product.module';
import { SharedModule } from './shared/shared.module';
import { BadgeModule } from 'primeng/badge';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const storeDevtools = [];
if (!environment.production) {
  storeDevtools.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    ProgressSpinnerModule,
    ButtonModule,
    ProductModule,
    SharedModule,
    BadgeModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    ...storeDevtools,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
