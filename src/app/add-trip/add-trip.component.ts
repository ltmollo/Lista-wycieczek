import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetInformationService } from '../services/get-information.service';
import { Trips } from '../trip/trip.component'

// .. parent directory
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  constructor(private getInfo: GetInformationService ) { }

  trips: Trips[] = [];

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

  canAdd = true;

  addNewTrip = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    destination: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
    beginDate: new FormControl('', [Validators.required,]),
    endDate: new FormControl('', [Validators.required]),
    maxSpots: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern("[0-9]*")]),
    description: new FormControl('', [Validators.required, Validators.minLength(1),Validators.maxLength(60)]),
    price: new FormControl('', [Validators.required, Validators.pattern("[0-9]*\.?[0-9]+")]),
    imageLink: new FormControl('', [Validators.required, Validators.minLength(2)]),
    imageLink2: new FormControl('', [Validators.required, Validators.minLength(2)]),
    imageLink3: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  checkForm(){
    if (!this.addNewTrip.valid){
      this.canAdd = false;
      return
    }
    let newTrip = {
      name: this.addNewTrip.get("name")?.value,
      imageLink: this.addNewTrip.get("imageLink")?.value,
      imageLink2: this.addNewTrip.get("imageLink2")?.value,
      imageLink3: this.addNewTrip.get("imageLink3")?.value,
      destination: this.addNewTrip.get("destination")?.value,
      beginDate: this.addNewTrip.get("beginDate")?.value,
      endDate: this.addNewTrip.get("endDate")?.value,
      price: this.addNewTrip.get("price")?.value,
      currency: "$",
      amount: 0,
      maxSpots: this.addNewTrip.get("maxSpots")?.value,
      description: this.addNewTrip.get("description")?.value,
      stars:0,
      bought:false,
    } as unknown as Trips;
    this.getInfo.addTrip(newTrip)
    this.canAdd = true;
    this.addNewTrip.reset();
  }
}


