import { ICommand } from "@ocoda/event-sourcing";

export class ApplicantRequestFeePayment implements ICommand {
  constructor(public id: string,public year:number) { }
}