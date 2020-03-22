export class Student {
  constructor(
    public firstname: string,
    public lastname: string,
    public hash: string,
    public type: Number,
    public dayPlanId: string,
    public password?: string,
    public data?: []
  ) {}
}
