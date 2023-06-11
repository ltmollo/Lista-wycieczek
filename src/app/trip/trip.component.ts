import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GetInformationService } from '../services/get-information.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  constructor(private getInfo: GetInformationService, protected auth: AuthService, private shop: ShopService) { }

  trips: Trips[] = [];

  destinationOfFilteredTrips: any;

  maxPricetoFilter :number = 0;

  minPricetoFilter :number = 0;

  latestMaxPriceWanted :number = 0;

  latestMinPriceWanted :number = 0;

  minStarsWanted :number = 0;

  maxStarsWanted :number = 0;

  minBeginDate :string ="";
  
  maxEndDate :string="";

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
    });
  }

  addClick(trip: Trips): void {
    trip.amount++;
    this.getInfo.updateAmount(trip);
  }

  removeClick(trip: Trips): void{
      trip.amount--;
      this.getInfo.updateAmount(trip);
  }

  getMaxPrice(){
    let maks = 0
    for (let trip of this.trips){
        if(this.checkDestination()){
          if(this.checkIfContainsDes(trip) && this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
            maks = Math.max(maks, trip.price)
          }
        }
        else if (this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
          maks = Math.max(maks, trip.price);
        }
    }
    if(this.destinationOfFilteredTrips && this.destinationOfFilteredTrips.length == 1){
      this.maxPriceToFilter(maks);
    }
    return maks;
  }

  checkAmount(trip : Trips){
    return trip.maxSpots - trip.amount > 0;
  }

  checkDestination(){
    return this.destinationOfFilteredTrips && this.destinationOfFilteredTrips.length > 0
  }

  checkIfContainsDes(trip: Trips){
    return this.destinationOfFilteredTrips.indexOf(trip.destination.toUpperCase()) != (-1);
  }

  checkStars(trip: Trips){
    return (trip.stars >= this.minStarsWanted && trip.stars <= this.maxStarsWanted) || this.maxStarsWanted == 0;
  }

  checkBeginDate(trip : Trips){
    return this.minBeginDate == '' || trip.beginDate >= this.minBeginDate;
  }

  checkEndDate( trip : Trips){
    return this.maxEndDate == "" || trip.endDate <= this.maxEndDate;
  }

  maxPriceToDisplay(){
    let maks = 0;
    for (let trip of this.trips){
      if(this.checkAmount(trip)){
        if(this.checkDestination()){
          if(this.checkIfContainsDes(trip) && this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
            if(trip.price <= this.latestMaxPriceWanted || this.latestMaxPriceWanted == 0){
              maks = Math.max(maks, trip.price)

            }
          }
        }
        else if (this.checkStars(trip)){
          if((trip.price <= this.latestMaxPriceWanted || this.latestMaxPriceWanted == 0) && this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
            maks = Math.max(maks, trip.price)
          }
        }
      }
    }
    return maks;
  }

  minPricetoDisplay(){
    let minimum = 10**5
    for (let trip of this.trips){
      if(this.checkAmount(trip)){
        if(this.checkDestination()){
          if(this.checkIfContainsDes(trip) && this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
            if(trip.price >= this.latestMinPriceWanted)
              minimum = Math.min(minimum, trip.price)
          }
        }
        else if(trip.price >= this.latestMinPriceWanted && this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
          minimum = Math.min(minimum, trip.price)
        }
      }
    }
      if(minimum == 10**5){
        return 0;
      }
      return minimum;
    }

  
  getMinPrice(){
    let minimum = 10**5
    for (let trip of this.trips){
        if(this.checkDestination()){
          if(this.checkIfContainsDes(trip) && this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
              minimum = Math.min(minimum, trip.price)
          }
        }
        else if(this.checkStars(trip) && this.checkBeginDate(trip) && this.checkEndDate(trip)){
          minimum = Math.min(minimum, trip.price)
        }
    }
      if(minimum == 10**5){
        return 0;
      }
      return minimum;
    }

  getAmountOfReservations(){
    let sum = 0;
    for(let trip of this.trips){
      sum += trip.amount
    }
    return sum;
  }

  takeFilteredDestinations(destinations : String[]) :void{
    this.destinationOfFilteredTrips = destinations;
  }

  maxPriceToFilter(maxPricetoFilter: number){
    this.latestMaxPriceWanted = maxPricetoFilter;
    this.maxPricetoFilter = maxPricetoFilter;
  }

  minPriceToFilter(minPriceToFilter: number){
    this.latestMinPriceWanted = minPriceToFilter
    this. minPricetoFilter = minPriceToFilter;
  }

  getMinNumberOfStars(value: number){
    this.minStarsWanted = value;
  }
  
  getMaxNumberOfStars(value :number){
    this.maxStarsWanted = value;
  }

  getMinBeginDate(value : string){
    this.minBeginDate = value;
  }

  getMaxEndDate(value : string){
    this.maxEndDate = value;
  }
}

export interface Trips{
  name:string;
  imageLink:string;
  destination:string;
  beginDate:string;
  endDate:string;
  price:number;
  currency:string;
  amount:number;
  maxSpots:number;
  description:string;
  stars:number;
  bought:boolean;
  imageLink2:string;
  imageLink3:string;
  reviews: string[];
}