import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilterByDestination'
})
export class TripFilterByNamePipe implements PipeTransform {

  transform(tripDestination: string, lookingForCountry: string[]) {
    if(!tripDestination){
      return false
    }
    if(!lookingForCountry || lookingForCountry.length == 0){
      return true
    }
    return lookingForCountry.indexOf(tripDestination.toUpperCase()) != (-1);
  }

}
