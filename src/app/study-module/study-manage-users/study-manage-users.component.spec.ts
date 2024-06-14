import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyManageUsersComponent } from './study-manage-users.component';

describe('StudyManageUsersComponent', () => {
  let component: StudyManageUsersComponent;
  let fixture: ComponentFixture<StudyManageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyManageUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
