import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesAndRolesComponent } from './studies-and-roles.component';

describe('StudiesAndRolesComponent', () => {
  let component: StudiesAndRolesComponent;
  let fixture: ComponentFixture<StudiesAndRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudiesAndRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesAndRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
