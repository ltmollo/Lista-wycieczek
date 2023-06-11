import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSlideBarStarsComponent } from './double-slide-bar-stars.component';

describe('DoubleSlideBarStarsComponent', () => {
  let component: DoubleSlideBarStarsComponent;
  let fixture: ComponentFixture<DoubleSlideBarStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleSlideBarStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleSlideBarStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
