import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TripComponent } from './trip/trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripFilterByNamePipe } from './filters/trip-filter-by-destination.pipe';
import { TripFiltersComponent } from './trip-filters/trip-filters.component';
import { TripFilterByMaxPricePipe } from './filters/trip-filter-by-max-price.pipe';
import { TripFilterByStarsPipe } from './filters/trip-filter-by-stars.pipe';
import { TripFilterByBeginDatePipe } from './filters/trip-filter-by-begin-date.pipe';
import { TripFilterByEndDatePipe } from './filters/trip-filter-by-end-date.pipe';
import { BasketComponent } from './basket/basket.component';
import { DoubleSlideBarComponent } from './double-slide-bar-price/double-slide-bar-price.component';
import { TripFilterByMinPricePipe } from './filters/trip-filter-by-min-price.pipe';
import { DoubleSlideBarStarsComponent } from './double-slide-bar-stars/double-slide-bar-stars.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryComponent } from './history/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopComponent } from './shop/shop.component';
import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { HeaderComponent } from './header/header.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { ShowRatingComponent } from './show-rating/show-rating.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TripComponent,
    AddTripComponent,
    TripRatingComponent,
    TripFilterByNamePipe,
    TripFiltersComponent,
    TripFilterByMaxPricePipe,
    TripFilterByStarsPipe,
    TripFilterByBeginDatePipe,
    TripFilterByEndDatePipe,
    BasketComponent,
    DoubleSlideBarComponent,
    TripFilterByMinPricePipe,
    DoubleSlideBarStarsComponent,
    MainPageComponent,
    HistoryComponent,
    PageNotFoundComponent,
    ShopComponent,
    HeaderComponent,
    SingleTripComponent,
    ShowRatingComponent,
    RegisterComponent,
    LogInComponent,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    EditTripComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
