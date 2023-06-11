import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSlideBarComponent } from './double-slide-bar-price.component';

describe('DoubleSlideBarComponent', () => {
  let component: DoubleSlideBarComponent;
  let fixture: ComponentFixture<DoubleSlideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleSlideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleSlideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
