import { Component, Input, OnInit } from '@angular/core';
import { Trips } from '../trip/trip.component';
import { GetInformationService } from '../services/get-information.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  constructor(private getInfo: GetInformationService) { }

  ngOnInit(): void {
  }

  @Input()
  trip: any;

  deleteTrip(trip : Trips) {
    this.getInfo.removeTrip(trip);
  }
}
