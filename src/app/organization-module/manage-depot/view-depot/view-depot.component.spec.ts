import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepotComponent } from './view-depot.component';

describe('ViewDepotComponent', () => {
  let component: ViewDepotComponent;
  let fixture: ComponentFixture<ViewDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
