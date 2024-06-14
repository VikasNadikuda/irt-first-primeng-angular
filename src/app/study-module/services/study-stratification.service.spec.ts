import { TestBed } from '@angular/core/testing';

import { StudyStratificationService } from './study-stratification.service';

describe('StudyStratificationService', () => {
  let service: StudyStratificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyStratificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
