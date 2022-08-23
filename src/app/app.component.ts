import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './models/user.model';
import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IState } from './store/reducers';
import { select, Store } from '@ngrx/store';
import { userFeatureSelector } from './store/reducers/user.reducer';
import { getBasketProducts } from './store/reducers/products.reducer';
import { IProduct } from './models/product-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  private readonly title = environment.applicationName;
  public readonly currencies: string[] = environment.config.supportedCurrencies;
  public user$: Observable<IUser> = new Observable<IUser>();
  public basketProducts$: Observable<IProduct[]> = new Observable<IProduct[]>();

  constructor(
    private titleService: Title,
    private router: Router,
    private store: Store<IState>
  ) {
    const startMode = !environment.production ? ' DEV' : '';
    this.titleService.setTitle(this.title + startMode);
  }

  ngOnInit(): void {
    this.user$ = this.getUser$();
    this.basketProducts$ = this.store.pipe(select(getBasketProducts));
  }

  public getUser$(): Observable<IUser> {
    return this.store.pipe(select(userFeatureSelector));
  }

  onBasketClicked() {
    this.router.navigate([`basket`]);
  }
}
