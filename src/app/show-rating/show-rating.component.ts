import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-rating',
  templateUrl: './show-rating.component.html',
  styleUrls: ['./show-rating.component.css']
})
export class ShowRatingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  trip: any;
}
