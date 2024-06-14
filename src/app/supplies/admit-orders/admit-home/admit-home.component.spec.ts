import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitHomeComponent } from './admit-home.component';

describe('AdmitHomeComponent', () => {
  let component: AdmitHomeComponent;
  let fixture: ComponentFixture<AdmitHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
