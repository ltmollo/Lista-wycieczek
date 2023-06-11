import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip-filters',
  templateUrl: './trip-filters.component.html',
  styleUrls: ['./trip-filters.component.css']
})
export class TripFiltersComponent implements OnInit {

  constructor() { }

  @Input()
  trips: any;

  @Output()
  emitDestination = new EventEmitter<String[]>();

  @Output()
  emitStars = new EventEmitter<number>();

  @Output()
  emitMaxStars = new EventEmitter<number>()

  @Output()
  emitBeginDate = new EventEmitter<string>();

  @Output()
  emitEndDate = new EventEmitter<string>();

  destinationOfFilteredTrips: string[] = [];

  ngOnInit(): void { }

  @Input()
  minimumPrice: any;

  @Input()
  latestMaxPriceWanted: any;

  @Input()
  latestMinPriceWanted: any;

  @Input()
  maximumPrice: any;

  addFilteredTrips(tripDestination: string): void{
    let index = this.destinationOfFilteredTrips.indexOf(tripDestination.toUpperCase());
    if(index == (-1)){
      let newDestinations: string[] = [];
      newDestinations = this.destinationOfFilteredTrips.map((x) => x)
      newDestinations.push(tripDestination.toUpperCase());
      this.destinationOfFilteredTrips = newDestinations;
    }
    else{
        this.destinationOfFilteredTrips = this.destinationOfFilteredTrips.filter(item => item !== tripDestination.toUpperCase())
    }
    this.emitDestination.emit(this.destinationOfFilteredTrips);
  }

  @Output()
  EmitMaxPrice = new EventEmitter<number>();

  @Output()
  EmitMinPrice = new EventEmitter<number>();

  filterPrice(value: any){
    let newValue = value
    this.EmitMaxPrice.emit(newValue)
  }

  filterMinPrice(value: any){
    let newValue = value
    this.EmitMinPrice.emit(newValue)
  }
  
  filterStars(value : any){
    let newValue = value;
    this.emitStars.emit(newValue);
  }

  filterMaxStars(value : any){
    let newValue = value;
    this.emitMaxStars.emit(newValue);
  }

  filterBeginDate(value: any){
    let newValue = value;
    this.emitBeginDate.emit(newValue)
  }

  filterEndDate(value: any){
    let newValue = value;
    this.emitEndDate.emit(newValue)
  }
}
