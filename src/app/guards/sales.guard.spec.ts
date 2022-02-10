import { TestBed } from '@angular/core/testing';

import { SalesGuard } from './sales.guard';

describe('SalesGuard', () => {
  let guard: SalesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
