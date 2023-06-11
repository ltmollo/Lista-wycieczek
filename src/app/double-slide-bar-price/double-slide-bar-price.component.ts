import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-double-slide-bar-price',
  templateUrl: './double-slide-bar-price.component.html',
  styleUrls: ['./double-slide-bar-price.component.css']
})
export class DoubleSlideBarComponent implements OnInit {
  @Input()
  minValue = 0;
  @Input()
  maxValue = 0;
  @Input()
  lowestPriceWanted = 0;
  @Input()
  maxPriceWanted = 0;

  @Output()
  emitMaxPriceWanted = new EventEmitter<number>;

  @Output()
  emitMinPriceWanted = new EventEmitter<number>;

  slideOne(slider : any, sliderTrack : any, update :boolean){
     this.lowestPriceWanted = parseInt(slider.value);
      if(this.maxPriceWanted <= this.lowestPriceWanted && update){
          this.maxPriceWanted = this.maxValue
          this.lowestPriceWanted = this.minValue
          slider.value = this.minValue
      }
      this.emitMinPriceWanted.emit(this.lowestPriceWanted)
      this.emitMaxPriceWanted.emit(this.maxPriceWanted)
      this.fillColor(sliderTrack);
    
  }
  
  slideTwo(slider : any, sliderTrack : any, update : boolean){
      
      this.maxPriceWanted = parseInt(slider.value);
      if(this.maxPriceWanted <= this.lowestPriceWanted && update){
          this.maxPriceWanted = this.maxValue
          this.lowestPriceWanted = this.minValue
          slider.value = this.maxPriceWanted
      }
      if(this.lowestPriceWanted == 0){
        this.lowestPriceWanted = this.minValue
      }
      this.emitMaxPriceWanted.emit(this.maxPriceWanted)
      this.emitMinPriceWanted.emit(this.lowestPriceWanted)
      this.fillColor(sliderTrack);
  }
  fillColor( sliderTrack : any){
    let percent1 = ((this.lowestPriceWanted - this.minValue) / (this.maxValue-this.minValue)) * 100;
    let percent2 = ((this.maxPriceWanted - this.minValue) / (this.maxValue-this.minValue)) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }

  loadPage( sliderOne : any, sliderTwo : any, sliderTrack : any, update : boolean){
    this.slideOne( sliderOne, sliderTrack, update)
    this.slideTwo (sliderTwo, sliderTrack, update)
  }
  ngOnInit(): void {}

  
}