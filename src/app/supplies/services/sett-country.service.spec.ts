import { TestBed } from '@angular/core/testing';

import { SettCountryService } from './sett-country.service';

describe('SettCountryService', () => {
  let service: SettCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
