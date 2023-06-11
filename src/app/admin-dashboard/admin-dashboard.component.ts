import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GetInformationService } from '../services/get-information.service';
import { User, Roles} from "../User"

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(protected auth: AuthService, private getInfo: GetInformationService) { }

  users: User[] = []
  ngOnInit(): void {
    this.getInfo.getUsers().subscribe(change => {
      this.users = []
      for (let user of change) {
        let userToAdd = new User(user.payload.val());
        userToAdd.uid = user.payload.key || 'undefined';
        this.users.push(userToAdd);
      }
    });
   
  }

  currentPersitence = this.auth.persistenceSetting;

  choosePersistence() {
    this.auth.changePersistence(this.currentPersitence);
  }

  givePermission(uid: string, role: string, value: boolean){
    this.getInfo.changeUserRole(uid, role, value.toString())
  }

}
