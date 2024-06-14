import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureVisitsComponent } from './configure-visits.component';

describe('ConfigureVisitsComponent', () => {
  let component: ConfigureVisitsComponent;
  let fixture: ComponentFixture<ConfigureVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
