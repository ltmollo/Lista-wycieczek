import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilterByBeginDate'
})
export class TripFilterByBeginDatePipe implements PipeTransform {

  transform(value : string, toCompare : string) {
    
    if(!toCompare){
      return true;
    }
    if(value >= toCompare){
      return true;
    }
    return false;
  }

}
