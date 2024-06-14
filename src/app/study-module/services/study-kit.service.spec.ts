import { TestBed } from '@angular/core/testing';

import { StudyKitService } from './study-kit.service';

describe('StudyKitService', () => {
  let service: StudyKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
