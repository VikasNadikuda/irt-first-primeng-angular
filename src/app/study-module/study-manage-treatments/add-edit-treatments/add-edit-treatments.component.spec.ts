import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTreatmentsComponent } from './add-edit-treatments.component';

describe('AddEditTreatmentsComponent', () => {
  let component: AddEditTreatmentsComponent;
  let fixture: ComponentFixture<AddEditTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
