import { TestBed } from '@angular/core/testing';

import { BudgetDataServiceService } from './budget-data-service.service';

describe('BudgetDataServiceService', () => {
  let service: BudgetDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
