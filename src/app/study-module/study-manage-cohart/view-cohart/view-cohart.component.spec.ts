import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCohartComponent } from './view-cohart.component';

describe('ViewCohartComponent', () => {
  let component: ViewCohartComponent;
  let fixture: ComponentFixture<ViewCohartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCohartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCohartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
