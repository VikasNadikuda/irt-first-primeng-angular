import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSiteConfigurationComponent } from './add-update-site-configuration.component';

describe('AddUpdateSiteConfigurationComponent', () => {
  let component: AddUpdateSiteConfigurationComponent;
  let fixture: ComponentFixture<AddUpdateSiteConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSiteConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSiteConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
