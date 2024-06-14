import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSiteConfigurationComponent } from './view-site-configuration.component';

describe('ViewSiteConfigurationComponent', () => {
  let component: ViewSiteConfigurationComponent;
  let fixture: ComponentFixture<ViewSiteConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSiteConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSiteConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
