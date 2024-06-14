import { TestBed } from '@angular/core/testing';

import { SubjectSettingsService } from './subject-settings.service';

describe('SubjectSettingsService', () => {
  let service: SubjectSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
