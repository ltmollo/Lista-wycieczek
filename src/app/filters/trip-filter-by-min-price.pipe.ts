import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilterByMinPrice'
})
export class TripFilterByMinPricePipe implements PipeTransform {

  transform(value: number, price: number){
    if(price == 0 || value >= price){
      return true
    }
    return false
  }
}
