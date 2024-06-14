import { TestBed } from '@angular/core/testing';

import { StudyUsersServService } from './study-users-serv.service';

describe('StudyUsersServService', () => {
  let service: StudyUsersServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyUsersServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
