export class Rewarddiscipline {
  Id?: number;
  TransactionDate: Date;
  RewardAmount: number;
  Reason: string;
  EmployeeId: number;

  constructor(data: any) {
    this.Id = data.Id;
    this.TransactionDate = new Date(data.TransactionDate);
    this.RewardAmount = data.RewardAmount;
    this.Reason = data.Reason;
    this.EmployeeId = data.EmployeeId;
  }
}
