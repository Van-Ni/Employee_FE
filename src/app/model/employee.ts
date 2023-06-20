export class Employee {
  Id?: number;
  Fullname: string;
  Gender: number;
  Email: string;
  Phone: string;
  Address: string;
  Birthday: Date;
  JoinDate: Date;
  Avatar?: string;
  Status: number;
  DepartmentId: number;
  PositionId: number;
  ContractId: number;
  UserId?: number;
  UserName?: string;
  UserRole?: string;

  constructor(data: any) {
    this.Id = data.Id;
    this.Fullname = data.Fullname;
    this.Gender = data.Gender;
    this.Email = data.Email;
    this.Phone = data.Phone;
    this.Address = data.Address;
    this.Birthday = new Date(data.Birthday);
    this.JoinDate = new Date(data.JoinDate);
    this.Avatar = data.Avatar;
    this.Status = data.Status;
    this.DepartmentId = data.DepartmentId;
    this.PositionId = data.PositionId;
    this.ContractId = data.ContractId;
    this.UserId = data.UserId;
    this.UserName = data.UserName;
    this.UserRole = data.UserRole;
  }
  
}
