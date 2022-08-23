import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Subject,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

interface ICarouselContext<T> {
  $implicit: T;
  index: number;
  next: () => void;
  back: () => void;
}

@Directive({
  selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnInit, OnDestroy {
  @Input() set appCarouselOf(items: T[] | undefined) {
    if (!items?.length) {
      this.viewContainerRef.clear();
      return;
    }

    this.items$.next(items);
    this.currentIndex$.next(0);
  }

  private items$ = new BehaviorSubject<T[] | null>(null);
  private currentIndex$ = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<ICarouselContext<T>>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.listenIndexChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenIndexChange() {
    this.currentIndex$
      .pipe(
        withLatestFrom(this.items$.pipe(filter(Boolean))),
        map(([index, items]) => this.getCurrentContext(index, items)),
        takeUntil(this.destroy$)
      )
      .subscribe((context) => {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef, context);
      });
  }

  private getCurrentContext(index: number, items: T[]): ICarouselContext<T> {
    return {
      index,
      $implicit: items[index] as T,
      next: () => {
        this.next();
      },
      back: () => {
        this.back();
      },
    };
  }

  private next() {
    const nextIndex = this.currentIndex$.value + 1;
    const itemsLen = (this.items$.value as T[]).length;

    if (nextIndex < itemsLen) {
      this.currentIndex$.next(nextIndex);

      return;
    }

    this.currentIndex$.next(0);
  }

  private back() {
    const prevIndex = this.currentIndex$.value - 1;
    const itemsLen = (this.items$.value as T[]).length;

    if (prevIndex >= 0) {
      this.currentIndex$.next(prevIndex);

      return;
    }

    this.currentIndex$.next(itemsLen - 1);
  }
}
