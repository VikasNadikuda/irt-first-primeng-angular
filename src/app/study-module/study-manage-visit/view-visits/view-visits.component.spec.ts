import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitsComponent } from './view-visits.component';

describe('ViewVisitsComponent', () => {
  let component: ViewVisitsComponent;
  let fixture: ComponentFixture<ViewVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
