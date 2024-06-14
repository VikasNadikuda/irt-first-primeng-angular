import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepotsComponent } from './add-edit-depots.component';

describe('AddEditDepotsComponent', () => {
  let component: AddEditDepotsComponent;
  let fixture: ComponentFixture<AddEditDepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDepotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
