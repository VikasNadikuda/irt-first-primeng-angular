import { TestBed } from '@angular/core/testing';

import { MenuSharedService } from './menu-shared.service';

describe('MenuSharedService', () => {
  let service: MenuSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
