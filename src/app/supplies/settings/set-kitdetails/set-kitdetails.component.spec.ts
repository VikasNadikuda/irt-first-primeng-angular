import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetKitdetailsComponent } from './set-kitdetails.component';

describe('SetKitdetailsComponent', () => {
  let component: SetKitdetailsComponent;
  let fixture: ComponentFixture<SetKitdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetKitdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetKitdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
