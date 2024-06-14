import { TestBed } from '@angular/core/testing';

import { InventorySetService } from './inventory-set.service';

describe('InventorySetService', () => {
  let service: InventorySetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
