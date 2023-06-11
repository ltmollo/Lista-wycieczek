import { Component, OnInit } from '@angular/core';
import { Trips } from '../trip/trip.component';
import { GetInformationService } from '../services/get-information.service';
import { HistoryService } from '../services/history.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private getInfo: GetInformationService, private history: HistoryService, protected auth: AuthService) { }

  itemsInBasket: Trips[] = [];
  date = new Date();

  getCurrentDate(){
    return new Date().toISOString().slice(0, 10)
  }

  ngOnInit(): void {
    this.getInfo.getTrips().subscribe(change => {
      this.itemsInBasket = []
      for(let p of change){
        if(p.Amount > 0){
        this.itemsInBasket.push({
          name: p.Name,
          destination: p.Destination,
          price: p.Price,
          currency: p.Currency,
          amount: p.Amount,
          imageLink: p.ImageLink,
          maxSpots: p.MaxSpots,
          beginDate: p.BeginDate,
          description: p.Description,
          endDate: p.EndDate,
          stars: p.Rate
        } as Trips)
      }}
    });
  }

  countAmount(){
    let amount = 0;
    this.itemsInBasket.forEach(element => {
      amount += element.amount
    });
    return amount;
  }

  countPrice(){
    let price = 0;
    this.itemsInBasket.forEach(element =>{
      price += element.amount*element.price
    })
    return price
  }

  buy(){
    this.itemsInBasket.forEach(element => {
      this.history.addTrip(element, this.auth.userData.email,this.getCurrentDate());
      this.getInfo.updateMaxSpots(element);
    })
  }

  addClick(trip: Trips): void {
    trip.amount++;
    this.getInfo.updateAmount(trip);
  }

  removeClick(trip: Trips): void{
      trip.amount--;
      this.getInfo.updateAmount(trip);
  }

}
