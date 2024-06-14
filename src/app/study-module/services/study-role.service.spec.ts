import { TestBed } from '@angular/core/testing';

import { StudyRoleService } from './study-role.service';

describe('StudyRoleService', () => {
  let service: StudyRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
