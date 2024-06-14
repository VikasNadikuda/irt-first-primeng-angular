import { TestBed } from '@angular/core/testing';

import { CohartService } from './cohart.service';

describe('CohartService', () => {
  let service: CohartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CohartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
