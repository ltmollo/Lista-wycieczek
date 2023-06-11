import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetInformationService } from './get-information.service';
import { Roles, User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null;
  userRoles: Roles = {
    guest: true,
    admin: false,
    manager: false,
    client: false,
    banned: false,
  };
  persistenceSetting: string = 'local';

  constructor(private afAuth: AngularFireAuth, private router: Router, private fb: GetInformationService) {
    afAuth.authState.subscribe(async (event: any) => {;
      if (event) {
        this.userData = event;
        const roles = await this.fb.getUserRoles(event?.uid);
        this.userRoles = roles as Roles;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          manager: false,
          client: false,
          banned: false,
        };
      }
    });
  }

  signInEmailPass(email: any, password: any) {
    return this.afAuth.setPersistence(this.persistenceSetting).then((_) => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((_) => {
          this.router.navigate(['trips']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  registerEmailPass(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userData = new User(res.user);
        this.fb.addNewUser(userData);
        this.router.navigate(['trips']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  signOut() {
    return this.afAuth.signOut().then((_) => {
      this.router.navigate(['']);
    });
  }

  changePersistence(newSetting: string) {
    this.persistenceSetting = newSetting;
  }
}