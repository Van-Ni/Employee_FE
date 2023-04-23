export class Employee {
  Id?: number;
  Fullname: string;
  Gender: number;
  Email: string;
  Phone: string;
  Address: string;
  Birthday: Date;
  Joindate: Date;
  Avatar?: string;
  Status: number;
  Department_id: number;
  Position_id: number;
  Contract_Id: number;
  UserId?: number;
  UserName?: string;

  constructor(data: any) {
    this.Id = data.Id;
    this.Fullname = data.Fullname;
    this.Gender = data.Gender;
    this.Email = data.Email;
    this.Phone = data.Phone;
    this.Address = data.Address;
    this.Birthday = new Date(data.Birthday);
    this.Joindate = new Date(data.Joindate);
    this.Avatar = data.Avatar;
    this.Status = data.Status;
    this.Department_id = data.Department_id;
    this.Position_id = data.Position_id;
    this.Contract_Id = data.Contract_Id;
    this.UserId = data.UserId;
    this.UserName = data.UserName;
  }
  
}
