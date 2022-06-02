import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatPrice'
})
export class FloatPricePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value + ' (USD)';
  }

}
