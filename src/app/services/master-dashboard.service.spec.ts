import { TestBed } from '@angular/core/testing';

import { MasterDashboardService } from './master-dashboard.service';

describe('MasterDashboardService', () => {
  let service: MasterDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
