import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSiteDetailsComponent } from './add-edit-site-details.component';

describe('AddEditSiteDetailsComponent', () => {
  let component: AddEditSiteDetailsComponent;
  let fixture: ComponentFixture<AddEditSiteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSiteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
