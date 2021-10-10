import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMotivationComponent } from './single-motivation.component';

describe('SingleMotivationComponent', () => {
  let component: SingleMotivationComponent;
  let fixture: ComponentFixture<SingleMotivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMotivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
