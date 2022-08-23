import { Pipe, PipeTransform } from '@angular/core';

const currencySigns = new Map<string, string>([
  ['RUR', '₽'],
  ['USD', '$'],
  ['EUR', '€'],
  ['CUP', '-'],
]);

@Pipe({
  name: 'currencyConv',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencyFrom: string, currencyTo: string): string {
    return (
      currencySigns.get(currencyTo) +
      ' ' +
      CurrencyPipe.calculateSum(value, currencyFrom, currencyTo).toFixed(2)
    );
  }

  public static calculateSum(
    value: number,
    currencyFrom: string,
    currencyTo: string
  ): number {
    return (
      (value * CurrencyPipe.getCurs(currencyFrom)) /
      CurrencyPipe.getCurs(currencyTo)
    );
  }

  // это имитация сервиса курсов валют
  private static getCurs(currency: string): number {
    switch (currency) {
      case 'USD':
        return 70;
      case 'EUR':
        return 80;
      case 'RUR':
        return 1;
      case 'CUP':
        return 100;
      default:
        return 0;
    }
  }
}
