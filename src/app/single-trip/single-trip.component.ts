import { Component, OnInit } from '@angular/core';
import { Trips } from '../trip/trip.component';
import { GetInformationService } from '../services/get-information.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {

  constructor(private route: ActivatedRoute, private getInfo: GetInformationService, protected auth: AuthService) { }
  
  trips: Trips[] = [];
  link1: string = "";
  link2: string = "";
  link3: string = "";
  index = 0;
  myId: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(elem => {this.myId = elem['id']});
    this.getInfo.getTrips().subscribe(change => {
      this.trips = []
      for(let p of change){
        if(p.Name.toLowerCase() == this.myId){
        this.trips.push({
          name: p.Name,
          destination: p.Destination,
          beginDate: p.BeginDate,
          endDate: p.EndDate,
          price: p.Price,
          currency: p.Currency,
          description: p.Description,
          amount: p.Amount,
          maxSpots: p.MaxSpots,
          stars:p.Rate,
          bought: p.Bought,
        } as Trips)
        this.link1 =  p.SlideImg.Img1;
        this.link2 = p.SlideImg.Img2;
        this.link3 = p.SlideImg.Img3;
      }}
    });
  }

  addClick(trip: Trips): void {
    console.log(trip)
    trip.amount++;
    this.getInfo.updateAmount(trip);
  }

  removeClick(trip: Trips): void{
    trip.amount--;
    this.getInfo.updateAmount(trip);
}

  swipRight(){
    this.index = (this.index + 1)%3
  }

  swipLeft(){
    if(this.index == 0){
      this.index = 2
    }
    else{
      this.index = (this.index - 1)%3
    }
  }

  changeLink(){
    if(this.index == 0){
      return this.link1;
    }
    if(this.index == 1){
      return this.link2;
    }
    return this.link3;
  }
}
