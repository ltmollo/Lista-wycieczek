
import { Component, OnInit } from '@angular/core';
import { Trips } from "../trip/trip.component";
import { GetInformationService } from '../services/get-information.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private getInfo: GetInformationService) {}

  ngOnInit(): void {
    this.getInfo.getTrips().subscribe(change => {
      this.trips = []
      for(let p of change){
        if(p.Amount > 0){
        this.trips.push({
          name: p.Name,
          price: p.Price,
          currency: p.Currency,
          amount: p.Amount,
        } as Trips)
      }}
    });
  }

  trips: Trips[] = [];

  countAmount() : number {
    let amount = 0
    this.trips.forEach(trip => {
      amount += trip.amount
    });
    return amount;
  }

  countPrice() : number{
    let price = 0
    this.trips.forEach(trip => {
      price += trip.price*trip.amount;
    })
    return price
  }

  checkIfAnygthingInBasket(): boolean{
    for(let trip of this.trips){
      if(trip.amount > 0) 
      {return true};
    }
    return false
  }

  closeBasket(button: any){
    button.checked = false;
  }

}
