import { TestBed } from '@angular/core/testing';

import { ManageStudyService } from './manage-study.service';

describe('ManageStudyService', () => {
  let service: ManageStudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
