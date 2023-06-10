export class Position {
    Id?: number;
    Name: string;
    Description: string;
    Gender: any;

    constructor(data: any) {
      this.Id = data.Id;
      this.Name = data.Name;
      this.Description = data.Description;
    }
  }
