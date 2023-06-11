import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilterByEndDate'
})
export class TripFilterByEndDatePipe implements PipeTransform {

  transform(value : string, toCompare : string) {
    if(!toCompare){
      return true;
    }
    if(value <= toCompare){
      return true;
    }
    return false;
  }

}
