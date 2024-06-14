import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEditRolesComponent } from './creat-edit-roles.component';

describe('CreatEditRolesComponent', () => {
  let component: CreatEditRolesComponent;
  let fixture: ComponentFixture<CreatEditRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatEditRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatEditRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
