import { TestBed } from '@angular/core/testing';

import { OrgLibraryService } from './org-library.service';

describe('OrgLibraryService', () => {
  let service: OrgLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
