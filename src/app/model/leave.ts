export class Leave {
  Id?: number;
  LeaveDate: Date;
  Reason: string;
  Approved: number;
  LeaveType: string;
  EmployeeId: number;
  EmployeeName: string;

  constructor(data: any) {
    this.Id = data.Id;
    this.LeaveDate = new Date(data.LeaveDate);
    this.Reason = data.Reason;
    this.Approved = data.Approved;
    this.LeaveType = data.LeaveType;
    this.EmployeeId = data.EmployeeId;
    this.EmployeeName = data.EmployeeName;
  }
}
