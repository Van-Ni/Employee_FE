/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpSalaryService } from '../emp-salary.service';

describe('Service: EmpSalary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpSalaryService]
    });
  });

  it('should ...', inject([EmpSalaryService], (service: EmpSalaryService) => {
    expect(service).toBeTruthy();
  }));
});
