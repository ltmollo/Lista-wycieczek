import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { GetInformationService } from '../services/get-information.service';
import { ShopService } from '../services/shop.service';
import { Trips } from '../trip/trip.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private auth: AuthService, private getInfo: GetInformationService, private shop: ShopService) { }

  
  showError: boolean = false;
  showOk: boolean = false;
  showLoader: boolean = false;

  trips: Trips[] = [];

  ngOnInit(): void {
    this.trips = this.shop.getTrips();
    this.trips.forEach(p => {
      this.getInfo.restartAmount(p.name.toLocaleLowerCase())
    })
  }

  logInForm = new FormGroup({
    login: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required ])});

  submitForm(){
    if (!this.logInForm.valid) {
      this.showError = true;
      this.showLoader = false;
      return;
    }
    this.showLoader = true;
    this.showError = false;
    let login = this.logInForm.get('login')!.value
    let pass = this.logInForm.get('password')!.value
    this.auth.signInEmailPass(login,pass)
    this.logInForm.reset()
    this.showLoader = false;
  }

}
