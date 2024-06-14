import { TestBed } from '@angular/core/testing';

import { StudyGuard } from './study.guard';

describe('StudyGuard', () => {
  let guard: StudyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
