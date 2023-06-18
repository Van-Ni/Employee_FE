export class Salary {
  Id?: number;
  BasicSalary: number;
  Allowance: number;
  Coefficient: number;
  HourlyRate: number;
  EmployeeId: number;

  constructor(data: any) {
    this.Id = data.Id;
    this.BasicSalary = data.BasicSalary;
    this.Allowance = data.Allowance;
    this.Coefficient = data.Coefficient;
    this.HourlyRate = data.HourlyRate;
    this.EmployeeId = data.EmployeeId;
  }
}
