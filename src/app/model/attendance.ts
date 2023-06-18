export class Attendance {
  Id?: number;
  Date: Date;
  CheckInTime: number;
  CheckOutTime: number;
  OvertimeHours: number;
  Status: number;
  EmployeeId: number;

  constructor(data: any) {
    this.Id = data.Id;
    this.Date = new Date(data.Date);
    this.CheckInTime = data.CheckInTime;
    this.CheckOutTime = data.CheckOutTime;
    this.OvertimeHours = data.OvertimeHours;
    this.Status = data.Status;
    this.EmployeeId = data.EmployeeId;
  }
}
