import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Trips } from '../trip/trip.component';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class GetInformationService {

  trips: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.trips = this.db.list('wycieczki').valueChanges();
   }

   getTrips(): Observable<any[]>{
    return this.trips;
  }

  addTrip(trip: Trips){
    this.db.database.ref('wycieczki/' + trip.name.toLocaleLowerCase()).set({
      BeginDate: trip.beginDate,
      Currency: trip.currency,
      Description: trip.description,
      Destination: trip.destination,
      EndDate: trip.endDate,
      ImageLink: trip.imageLink,
      MaxSpots: trip.maxSpots,
      Price: trip.price,
      Name: trip.name,
      Amount: trip.amount,
      Bought: trip.bought,
      Rate: 0,
    })
    this.db.database.ref('wycieczki/' + trip.name.toLocaleLowerCase() + '/SlideImg').set({
      Img1: trip.imageLink,
      Img2: trip.imageLink2,
      Img3: trip.imageLink3,
    })
  }

  removeTrip(trip: Trips){
    this.db.list('wycieczki').remove(trip.name.toLocaleLowerCase())
  }

  updateAmount(trip: Trips){
    this.db.list('wycieczki').update(trip.name.toLowerCase(), {Amount: trip.amount})
  }

  modifyDest(tripName: any, value: any){
    this.db.list('wycieczki').update(tripName.toLocaleLowerCase(), {Destination: value})
  }

  modifyBegin(tripName: any, value: any){
    this.db.list('wycieczki').update(tripName.toLocaleLowerCase(), {BeginDate: value})
  }

  modifyEnd(tripName: any, value: any){
    this.db.list('wycieczki').update(tripName.toLocaleLowerCase(), {EndDate: value})
  }

  modifyDesc(tripName: any, value: any){
    this.db.list('wycieczki').update(tripName.toLocaleLowerCase(), {Description: value})
  }

  modifyPrice(tripName: any, value: any){
    this.db.list('wycieczki').update(tripName.toLocaleLowerCase(), {Price: value})
  }

  modifySpots(tripName: any, value: any){
    this.db.list('wycieczki').update(tripName.toLocaleLowerCase(), {MaxSpots: value})
  }

  restartAmount(trip: string){
    this.db.list('wycieczki').update(trip.toLocaleLowerCase(), {Amount: 0})
  }

  updateMaxSpots(trip: Trips){
    this.db.list('wycieczki').update(trip.name.toLowerCase(), {MaxSpots: trip.maxSpots - trip.amount, Amount: 0, Bought: true})
  }

  updateRating(trip: Trips, rating: number){
    this.db.list('wycieczki').update(trip.name.toLowerCase(), {Rate: rating});
  }

  addNewUser(user: User) {
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
    });
  }

  async getUserRoles(uid: string) {
    return firstValueFrom(
      this.db.object('/users/' + uid + '/roles').valueChanges()
    );
  }

  getUserRoles$(uid: string) {
    return this.db.object('/users/' + uid + '/roles').valueChanges();
  }

  getUsers() {
    return this.db.list('users').snapshotChanges();
  }

  changeUserRole(uid: string, role: string, value: string) {
    let change = '{"' + role + '"' + ':' + value + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(change));
  }

  addReviev(tripName: string, nick: string, uid: string, review: any){
    this.db.object('wycieczki/' + tripName + "/Reviews/" + uid).set({
      Review: review
    })

    this.db.object('wycieczki/' + tripName + "/Reviews/" + uid).update({User: nick})
  }
}