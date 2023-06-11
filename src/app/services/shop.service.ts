import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Trips } from '../trip/trip.component';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  trips: Trips[] = []

  constructor() {}

  updateTrips(trips: Trips[]){
    this.trips = trips;
  }

  getTrips(){
    return this.trips;
  }
}
