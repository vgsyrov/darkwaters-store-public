import { Pipe, PipeTransform } from '@angular/core';

const translate = new Map<string, string>([
  ['OUTOFSTOCK', 'Отсутствует'],
  ['INSTOCK', ''],
  ['LOWSTOCK', 'Остатки'],
]);

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    return translate.has(value) ? <string>translate.get(value) : value;
  }
}
