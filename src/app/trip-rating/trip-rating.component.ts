import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { History, HistoryService } from '../services/history.service';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent implements OnInit {

  constructor(protected auth: AuthService, private history: HistoryService) { }

  canRate: boolean = false;

  ngOnInit(): void {
    this.history.getTrips().subscribe(change => {
      this.canRate = false;
      for(let p of change){
        if(p.Account === this.auth.userData.email && p.Name === this.trip.name){
        this.rate = p.Rate,
        this.uid = p.Uid,
        console.log(new Date().toISOString().slice(0, 10), p.EndDate)
        this.canRate = new Date().toISOString().slice(0, 10) > p.EndDate;
        break;
        }
      }
    });
  }

  @Input()
  trip: any;

  uid: any;
  rate: number = 0;
  hover = 0;

  changeRating(starNumber: number){
    this.rate = starNumber;
    this.history.modifyRating(this.uid, starNumber)
  }

  hoverTheElements(starNumber: number){
    this.hover = starNumber;
  }

  reviews: review[] = [];
  canAdd = true;

  review = new FormGroup({
    date: new FormControl(''),
    review: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500),]),
  });

  submitForm() {
    if (!this.review.valid){
      this.canAdd = false;
      return
    }
    let newReview = ({
      nick: this.auth.userData.email,
      date: this.review.get('date')!.value,
      review: this.review.get('review')!.value,
    } as review);
    this.reviews.push(newReview)
    console.log(this.reviews)
    this.canAdd = true;
    this.review.reset();
  }

}

interface review {
  nick: string;
  date: string;
  review: string;
}
