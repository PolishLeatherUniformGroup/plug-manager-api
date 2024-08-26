import { Column, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { Address } from "../address.model";
import { MembershipFee } from "./membership-fee.model";
import { Suspension } from "./suspension.model";
import { Expulsion } from "./expulsion.model";

@Entity()
export class Member {
  @PrimaryColumn()
  public id: string;

  @Column()
  @Unique(["cardNumber"])
  public cardNumber: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public email: string;

  @Column()
  public phoneNumber?: string;

  @Column()
  public birthDate: Date;

  @Column((type) => Address)
  public address: Address;

  @Column()
  public joinDate: Date;

  @Column()
  public status: number;

  @Column()
  public terminationDate?: Date;

  @OneToMany((type) => MembershipFee, (membershipFee) => membershipFee.member, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public membershipFees: MembershipFee[];

  @OneToMany((type) => Suspension, (suspension) => suspension.member, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public suspensions: Suspension[] = [];

  @OneToMany((type) => Expulsion, (expulsion) => expulsion.member, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public expulsions: Expulsion[] = [];

  public currentSuspension(): Suspension | undefined {
    return this.suspensions.find((suspension) => suspension.finished === false);
  }

  public currentExpulsion(): Expulsion | undefined {
    return this.expulsions.find((expulsion) => expulsion.finished === false);
  }
}
