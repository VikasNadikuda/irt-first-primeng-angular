import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganisationsComponent } from './view-organisations.component';

describe('ViewOrganisationsComponent', () => {
  let component: ViewOrganisationsComponent;
  let fixture: ComponentFixture<ViewOrganisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrganisationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
