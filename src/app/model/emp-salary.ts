export class EmpSalary {
    Id?: number;
    Month: number;
    Year: number;
    TotalWorkDays: number;
    TotalHolidayDays: number;
    TotalPaidLeaveDays: number;
    TotalOverTimeHours: number;
    TotalSalary: number;
    EmployeeName: string;

    constructor(data: any) {
      this.Id = data.Id;
      this.Month = data.Month;
      this.Year = data.Year;
      this.TotalWorkDays = data.TotalWorkDays;
      this.TotalHolidayDays = data.TotalHolidayDays;
      this.TotalOverTimeHours = data.TotalOverTimeHours;
      this.TotalPaidLeaveDays = data.TotalPaidLeaveDays;
      this.TotalSalary = data.TotalSalary;
      this.EmployeeName = data.EmployeeName;
    }
}
