import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitDepotComponent } from './admit-depot.component';

describe('AdmitDepotComponent', () => {
  let component: AdmitDepotComponent;
  let fixture: ComponentFixture<AdmitDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
