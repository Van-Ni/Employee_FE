export class EmployeeSalary {
  Id?: number;
  Month: Date;
  Year: Date;
  TotalWorkDay: number;
  TotalHolidayDay: number;
  TotalPaidLeaveDay: number;
  TotalOverHoursDay:number;
  TotalSalary: number;
  EmployeeId: number;

  constructor(data: any) {
    this.Id = data.Id;
    this.Month = data.Month;
    this.Year = data.Year;
    this.TotalWorkDay = data.TotalWorkDay;
    this.TotalHolidayDay = data.TotalHolidayDay;
    this.TotalPaidLeaveDay = data.TotalPaidLeaveDay;
    this.TotalOverHoursDay = data.TotalOverHoursDay;
    this.TotalSalary = data.TotalSalary;
    this.EmployeeId = data.EmployeeId;
  }
}
