export class Holiday {
  Id?: number;
  HolidayDate: Date;
  Description: string;
  DayOff: number;

  constructor(data: any) {
    this.Id = data.Id;
    this.HolidayDate = new Date(data.HolidayDate);
    this.Description = data.Description;
    this.DayOff = data.DayOff;
  }
}
