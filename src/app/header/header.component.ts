import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { History } from '../services/history.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private getInfo: HistoryService, protected auth: AuthService) { }

  ngOnInit(): void {
   this.auth.getAuthenticated().subscribe(_ => {
    this.getInfo.getTrips().subscribe(change => {
      this.trips = []
      for(let p of change){
      if(p.Account === this.auth.userData.email) 
          this.trips.push({
            name: p.Name,
            price: p.Price,
            currency: p.Currence,
            beginDate: p.BeginDate
        } as History)
      }
    });
   })
  }

  date = new Date();
  trips: History[] = [];
  counter = 0;
  authentication: any;

  getDay(){
    return this.date.getDate();
  }

  getMonth(){
    return this.date.getMonth() + 1;
  }

  getYear(){
    return this.date.getFullYear();
  }

  checkAmount(){
    this.counter = 0;
    for( let trip of this.trips){
      if(this.notifications(trip)){
        this.counter++;
      }
    }
    return this.counter
  }

  notifications(trip: History): boolean{
    let c_year = this.getYear();
    let c_month = this.getMonth();
    let c_day = this.getDay();
    let year = parseInt(trip.beginDate.slice(0,4))
    let month = parseInt(trip.beginDate.slice(5, 7))
    let day = parseInt(trip.beginDate.slice(8, 12))

    if(c_year == year){

      if(month == c_month && day-c_day <= 14 && 0 <= day-c_day){
        return true;
      }
      else if(month == c_month + 1 && 30 - c_day + day <= 14){
        return true;
      }
    }
    else if(c_year == year - 1 && c_month == 12 && month == 1&& 30 - c_day + day <= 14){
      return true
    }
    return false
  }

}
