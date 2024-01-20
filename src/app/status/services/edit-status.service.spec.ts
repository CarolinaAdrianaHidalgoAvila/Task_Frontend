import { TestBed } from '@angular/core/testing';

import { EditStatusService } from './edit-status.service';

describe('EditStatusService', () => {
  let service: EditStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
