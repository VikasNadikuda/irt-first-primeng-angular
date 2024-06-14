import { TestBed } from '@angular/core/testing';

import { StudyDepotService } from './study-depot.service';

describe('StudyDepotService', () => {
  let service: StudyDepotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyDepotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
