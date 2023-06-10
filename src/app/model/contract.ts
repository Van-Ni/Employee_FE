export class Contract {
    Id?: number;
    Type: string;
    StartDate: Date;
    EndDate: Date;
    Note: string;


    constructor(data: any) {
      this.Id = data.Id;
      this.Type = data.Type;
      this.StartDate = new Date(data.StartDate);
      this.EndDate = new Date(data.EndDate);
      this.Note = data.Note;

    }
  }
