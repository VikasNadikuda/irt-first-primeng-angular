import { TestBed } from '@angular/core/testing';

import { StudyServiceService } from './study-service.service';

describe('StudyServiceService', () => {
  let service: StudyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
