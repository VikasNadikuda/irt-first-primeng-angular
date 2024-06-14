import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTrailComponent } from './login-trail.component';

describe('LoginTrailComponent', () => {
  let component: LoginTrailComponent;
  let fixture: ComponentFixture<LoginTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
