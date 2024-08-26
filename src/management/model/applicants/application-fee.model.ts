import { Column } from "typeorm";

export class ApplicationFee {
  @Column()
  public dueAmount?: number;
  @Column()
  public paidAmount?: number;
  @Column()
  public paidDate?: Date;
}
