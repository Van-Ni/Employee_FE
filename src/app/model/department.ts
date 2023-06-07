export class Department {
  Id?: number;
  Name: string;
  Description: string;


  constructor(data: any) {
    this.Id = data.Id;
    this.Name = data.Name;
    this.Description = data.Description;

  }
}
