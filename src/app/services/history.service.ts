import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Trips } from '../trip/trip.component';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  trips: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { 
    this.trips = this.db.list('historia').valueChanges();
  }

  getTrips(): Observable<any[]>{
    return this.trips;
  }

  addTrip(trip: Trips, account: string, boughtDate: string){
    let data = new Date();
    let number = data.getTime().toString()
    console.log("Ok")
    this.db.database.ref('historia/' + trip.name.toLocaleLowerCase() + number).set({
      Account: account,
      BeginDate: trip.beginDate,
      Currency: trip.currency,
      Description: trip.description,
      Destination: trip.destination,
      EndDate: trip.endDate,
      ImageLink: trip.imageLink,
      Price: trip.price,
      Name: trip.name,
      Amount: trip.amount,
      BoughtDate: boughtDate,
      Stars: trip.stars,
      Rate: 0,
      Uid: trip.name.toLocaleLowerCase() + number
    })
  }

  modifyRating(uid: any, value: number){
    this.db.list('historia').update(uid, {Rate: value})
  }
}

export interface History{
  name:string;
  imageLink:string;
  destination:string;
  beginDate:string;
  endDate:string;
  price:number;
  currency:string;
  amount:number;
  description:string;
  stars:number;
  boughtDate:string;
}