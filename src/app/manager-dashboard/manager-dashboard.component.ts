import { Component, Input, OnInit,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trips } from '../trip/trip.component';
import { GetInformationService } from '../services/get-information.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  constructor(protected getInfo: GetInformationService) { }

  @Input()
  trip: any;
  name: string = '';

  ngOnInit(): void {
   this.name = this.trip.name;
  }

  canAdd = true;

  changeDest = new FormGroup({
    destination: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
  });

  changeBegin = new FormGroup({
    beginDate: new FormControl('', [Validators.required,]),
  });

  changeEnd = new FormGroup({
    endDate: new FormControl('', [Validators.required,]),
  })

  changeMaxSpots = new FormGroup({
    maxSpots: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern("[0-9]*")]),
  })

  changeDescription = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(1),Validators.maxLength(60)]),
  })

  changePrice = new FormGroup({
    price: new FormControl('', [Validators.required, Validators.pattern("[0-9]*\.?[0-9]+")]),
  })

  checkDest(){
    if (!this.changeDest.valid){
      this.canAdd = false;
      return
    }
    this.getInfo.modifyDest(this.trip.name, this.changeDest.get("destination")?.value)
    this.canAdd = true;
    this.changeDest.reset();
  }

  checkBegin(){
    if (!this.changeBegin.valid){
      this.canAdd = false;
      return
    }
    this.getInfo.modifyBegin(this.trip.name, this.changeBegin.get("beginDate")?.value)
    this.canAdd = true;
    this.changeBegin.reset();
  }

  checkEnd(){
    if (!this.changeEnd.valid){
      this.canAdd = false;
      return
    }
    this.getInfo.modifyEnd(this.trip.name, this.changeEnd.get("endDate")?.value)
    this.canAdd = true;
    this.changeEnd.reset();
  }

  checkSpots(){
    if (!this.changeMaxSpots.valid){
      this.canAdd = false;
      return
    }
    this.getInfo.modifySpots(this.trip.name, this.changeMaxSpots.get("maxSpots")?.value)
    this.canAdd = true;
    this.changeMaxSpots.reset();
  }
  
  checkDesc(){
    if (!this.changeDescription.valid){
      this.canAdd = false;
      return
    }
    this.getInfo.modifyDesc(this.trip.name, this.changeDescription.get("description")?.value)
    this.canAdd = true;
    this.changeDescription.reset();
  }

  checkPrice(){
    if (!this.changePrice.valid){
      this.canAdd = false;
      return
    }
    this.getInfo.modifyPrice(this.trip.name, this.changePrice.get("price")?.value)
    this.canAdd = true;
    this.changePrice.reset();
  }

}

