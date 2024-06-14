import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitSiteComponent } from './admit-site.component';

describe('AdmitSiteComponent', () => {
  let component: AdmitSiteComponent;
  let fixture: ComponentFixture<AdmitSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
