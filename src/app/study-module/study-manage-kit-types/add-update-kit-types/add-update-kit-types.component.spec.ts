import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateKitTypesComponent } from './add-update-kit-types.component';

describe('AddUpdateKitTypesComponent', () => {
  let component: AddUpdateKitTypesComponent;
  let fixture: ComponentFixture<AddUpdateKitTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateKitTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateKitTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
