import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BasketComponent } from './basket/basket.component';
import { HistoryComponent } from './history/history.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { TripComponent } from './trip/trip.component';
import { AdminGuard } from './guard/admin.guard';
import { IsAuthGuard } from './guard/is-auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientGuard } from './guard/client.guard';
import { ManagerGuard } from './guard/manager.guard';
import { AddTripGuard } from './guard/add-trip.guard';

const routes: Routes = [
  { path: 'mainPage', component: MainPageComponent},
  { path: 'trips', component: TripComponent},
  { path: 'trips/:id', component: SingleTripComponent, canActivate: [ClientGuard]},
  { path: 'addTrip', component: AddTripComponent, canActivate: [AddTripGuard]},
  { path: 'basket', component: ShopComponent,  canActivate: [ClientGuard]},
  { path: 'history', component: HistoryComponent,  canActivate: [ClientGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [IsAuthGuard]},
  { path: 'logIn', component: LogInComponent, canActivate: [IsAuthGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  { path: '', redirectTo: "/mainPage", pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
