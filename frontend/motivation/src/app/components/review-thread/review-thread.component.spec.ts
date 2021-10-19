import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewThreadComponent } from './review-thread.component';

describe('ReviewThreadComponent', () => {
  let component: ReviewThreadComponent;
  let fixture: ComponentFixture<ReviewThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
