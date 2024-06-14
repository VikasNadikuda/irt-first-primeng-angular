import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSitesComponent } from './add-or-update-sites.component';

describe('AddOrUpdateSitesComponent', () => {
  let component: AddOrUpdateSitesComponent;
  let fixture: ComponentFixture<AddOrUpdateSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
