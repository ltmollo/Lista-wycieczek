import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilterByMaxPrice'
})
export class TripFilterByMaxPricePipe implements PipeTransform {

  transform(value: number, price: number){
    if(price == 0 || value <= price){
      return true
    }
    return false
  }

}
