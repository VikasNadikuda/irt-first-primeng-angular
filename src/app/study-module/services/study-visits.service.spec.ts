import { TestBed } from '@angular/core/testing';

import { StudyVisitsService } from './study-visits.service';

describe('StudyVisitsService', () => {
  let service: StudyVisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyVisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
