import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilterByStars'
})
export class TripFilterByStarsPipe implements PipeTransform {

  transform(stars: number, minStars: number, maxStars : number){
    if(( stars <= maxStars && stars >= minStars) || maxStars == 0){
      return true;
    }
    return false
  }

}
