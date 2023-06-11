import { Component, OnInit } from '@angular/core';
import { GetInformationService } from '../services/get-information.service';
import { Trips } from '../trip/trip.component';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private getInfo: GetInformationService, private shop: ShopService) { }
  trips: Trips[] = []

  ngOnInit(): void {

    this.getInfo.getTrips().subscribe(change => {
      this.trips = []
      for(let p of change){
        this.trips.push({
          name: p.Name,
          imageLink: p.ImageLink,
          destination: p.Destination,
          beginDate: p.BeginDate,
          endDate: p.EndDate,
          price: p.Price,
          currency: p.Currency,
          amount: p.Amount,
          maxSpots: p.MaxSpots,
          description: p.Description,
          stars: p.Rate,
          bought: p.Bought,
        } as Trips)
      }
    this.shop.updateTrips(this.trips)
    });
  }

}
