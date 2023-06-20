import { EmployeeSalaryService } from './employee-salary.service';

describe('EmployeeSalaryService', () => {
  const service: EmployeeSalaryService = new EmployeeSalaryService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
