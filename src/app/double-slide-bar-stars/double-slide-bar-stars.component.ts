import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-double-slide-bar-stars',
  templateUrl: './double-slide-bar-stars.component.html',
  styleUrls: ['./double-slide-bar-stars.component.css']
})
export class DoubleSlideBarStarsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  maxStarsWanted= 0;
  @Input()
  lowestStarsWanted = 0;

  @Output()
  emitMaxStarsWanted = new EventEmitter<number>;

  @Output()
  emitMinStarsWanted = new EventEmitter<number>;

  slideOne(slider : any, sliderTrack : any){
     this.lowestStarsWanted = parseInt(slider.value);
      if(this.maxStarsWanted <= this.lowestStarsWanted){
          this.lowestStarsWanted = this.maxStarsWanted
          slider.value = this.maxStarsWanted
      }
      if(slider.value == 5){
        slider.value = 4
      }
      this.emitMinStarsWanted.emit(this.lowestStarsWanted)
      
      this.fillColor(sliderTrack);
    
  }
  
  slideTwo(slider : any, sliderTrack : any){
      this.maxStarsWanted = parseInt(slider.value);
      if(this.maxStarsWanted <= this.lowestStarsWanted){
          this.maxStarsWanted = this.lowestStarsWanted 
          slider.value = this.maxStarsWanted
      }
      this.emitMaxStarsWanted.emit(this.maxStarsWanted)

      this.fillColor(sliderTrack);
  }
  fillColor( sliderTrack : any){
    let percent1 = ((this.lowestStarsWanted) / 5) * 100;
    let percent2 = ((this.maxStarsWanted) / 5) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }

  loadPage( sliderOne : any, sliderTwo : any, sliderTrack : any){
    this.slideOne( sliderOne, sliderTrack)
    this.slideTwo (sliderTwo, sliderTrack)
  }
}

