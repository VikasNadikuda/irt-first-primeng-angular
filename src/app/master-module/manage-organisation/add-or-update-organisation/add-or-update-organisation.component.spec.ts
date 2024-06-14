import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateOrganisationComponent } from './add-or-update-organisation.component';

describe('AddOrUpdateOrganisationComponent', () => {
  let component: AddOrUpdateOrganisationComponent;
  let fixture: ComponentFixture<AddOrUpdateOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
