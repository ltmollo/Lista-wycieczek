import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { GetInformationService } from '../services/get-information.service';
import { Trips } from '../trip/trip.component';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private getInfo: GetInformationService, private shop: ShopService) {}

  showError: boolean = false;
  showOk: boolean = false;

  trips: Trips[] = []

  ngOnInit(): void {
    this.trips = this.shop.getTrips();
    this.trips.forEach(p => {
      this.getInfo.restartAmount(p.name.toLocaleLowerCase())
    })
  }

  regForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submitForm() {
    if (!this.regForm.valid) {
      this.showError = true;
      return;
    }
    let login = this.regForm.get('login')!.value
    let pass = this.regForm.get('password')!.value;
    this.showError = false;
    this.auth.registerEmailPass(login, pass);
    this.regForm.reset();
  }
}
