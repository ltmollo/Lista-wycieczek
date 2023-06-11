import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { History } from '../services/history.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private getInfo: HistoryService, private auth: AuthService) { }

  trips: History[] = []
  filterTrips: number[] = []

  ngOnInit(): void {
    this.getInfo.getTrips().subscribe(change => {
      this.trips = []
      for(let p of change){
        if(p.Account === this.auth.userData.email)
        this.trips.push({
          name: p.Name,
          imageLink: p.ImageLink,
          destination: p.Destination,
          beginDate: p.BeginDate,
          endDate: p.EndDate,
          price: p.Price,
          currency: p.Currency,
          amount: p.Amount,
          description: p.Description,
          stars:p.Stars,
          boughtDate: p.BoughtDate,
        } as History)
      }
    });
  }

  checkStatus(trip: History): number{
    let c_date = new Date().toISOString().slice(0, 10);

      if(trip.beginDate <= c_date && c_date <= trip.endDate){
      return 0;
      }
    if(c_date > trip.endDate){
      return 1
    }
    return -1
  }

  addTrips(position: number){
    if(this.filterTrips.includes(position)){
      this.filterTrips = this.filterTrips.filter(elem => elem != position)
    }
    else{
      this.filterTrips.push(position)
    }
  }
}
