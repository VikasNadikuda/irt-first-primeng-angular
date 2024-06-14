import { TestBed } from '@angular/core/testing';

import { SettKitListService } from './sett-kit-list.service';

describe('SettKitListService', () => {
  let service: SettKitListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettKitListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
