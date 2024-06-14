import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVisitsComponent } from './schedule-visits.component';

describe('ScheduleVisitsComponent', () => {
  let component: ScheduleVisitsComponent;
  let fixture: ComponentFixture<ScheduleVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
