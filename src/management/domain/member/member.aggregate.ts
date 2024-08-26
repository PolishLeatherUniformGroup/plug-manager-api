import { AggregateRoot } from "@nestjs/cqrs";
import { Address } from "../address.value-object";
import { MembershipFee } from "./membership-fee.entity";
import { MemberCreated } from "../../events/impl/member/member-created.event";
import { MemberStatus } from "./member-status.enum";
import { MemberMembershipFeePaymentRequested } from "../../events/impl/member/member-membership-fee-payment-requested.event";
import { MemberMembershipFeePaid } from "../../events/impl/member/member-membership-fee-paid.event";
import { MemberContactDataUpdated } from "../../events/impl/member/member-contact-data-updated.event";
import { MemberSuspended } from "../../events/impl/member/member-suspended.event";
import { MemberExpelled } from "../../events/impl/member/member-expelled.event";
import { MemberResinstated } from "../../events/impl/member/member-reinstated.events";
import { MemberMembershipTerminated } from "../../events/impl/member/member-membership-terminated.event";
import { MemberSuspensionApealed } from "../../events/impl/member/member-suspension-apealed.event";
import { MemberSuspensionApealAccepted } from "../../events/impl/member/member-suspension-appeal-accepted.event";
import { MemberSuspensionApealRejected } from "../../events/impl/member/member-suspension-appeal-rejected.event";
import { MemberExpulsionApealed } from "../../events/impl/member/member-expulsion-appealed.event";
import { MemberExpulsionApealAccepted } from "../../events/impl/member/member-expulsion-appeal-accepted.event";
import { MemberExpulsionApealRejected } from "../../events/impl/member/member-expulsion-appeal-rejected.event";

export class Member extends AggregateRoot {
  public static readonly AGGREGATE_NAME = "member";

  constructor(public readonly id: string) {
    super();
  }

  private _cardNumber: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phoneNumber?: string;
  private _address: Address;
  private _applyDate: Date;
  private _birthDate: Date;
  private _joinDate: Date;
  private _membershipFees: MembershipFee[];
  private _status: MemberStatus;
  private _appealDeadline?: Date;

  get cardNumber(): string {
    return this._cardNumber;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get phoneNumber(): string | undefined {
    return this._phoneNumber;
  }

  get address(): Address {
    return this._address;
  }

  get applyDate(): Date {
    return this._applyDate;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  get joinDate(): Date {
    return this._joinDate;
  }

  get membershipFees(): MembershipFee[] {
    return this._membershipFees;
  }

  get status(): MemberStatus {
    return this._status;
  }

  public static create(
    id: string,
    cardNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    address: Address,
    applyDate: Date,
    birthDate: Date,
    joinDate: Date,
    paidAmount: number,
    phone?: string,
  ): Member {
    const member = new Member(id);
    var created = new MemberCreated(
      id,
      cardNumber,
      firstName,
      lastName,
      email,
      address,
      applyDate,
      birthDate,
      joinDate,
      paidAmount,
    );
    member.apply(created);
    return member;
  }

  public requestMembershipFeePayment(
    year: number,
    dueAmount: number,
    dueDate: Date,
  ) {
    this.mustHaveStatus(MemberStatus.Active);
    var feeRequest = new MemberMembershipFeePaymentRequested(
      this.id,
      year,
      dueAmount,
      dueDate,
    );
    this.apply(feeRequest);
  }

  public registerMembershipFeePayment(
    year: number,
    paidAmount: number,
    paidDate: Date,
  ) {
    this.mustHaveStatus(MemberStatus.Active);
    this.feeMustBeRequested(year);
    this.feeMustNotBePaid(year);
    var paid = new MemberMembershipFeePaid(this.id, year, paidAmount, paidDate);
    this.apply(paid);
  }

  public updateContactData(
    email?: string,
    phoneNumber?: string,
    address?: Address,
  ) {
    this.mustHaveStatus(MemberStatus.Active);
    var updated = new MemberContactDataUpdated(
      this.id,
      email ?? this.email,
      phoneNumber ?? this._phoneNumber,
      address ?? this._address,
    );
    this.apply(updated);
  }

  public suspendMember(
    suspendedDate: Date,
    suspendedUntil: Date,
    reason: string,
    appealDeadline: Date,
  ) {
    this.mustHaveStatus(MemberStatus.Active);
    var suspended = new MemberSuspended(
      this.id,
      suspendedDate,
      suspendedUntil,
      reason,
      appealDeadline,
    );
    this.apply(suspended);
  }

  public expellMember(
    expelledDate: Date,
    reason: string,
    appealDeadline: Date,
  ) {
    this.mustHaveStatus(MemberStatus.Active);
    var expelled = new MemberExpelled(
      this.id,
      expelledDate,
      reason,
      appealDeadline,
    );
    this.apply(expelled);
  }

  public reinstateMember(reisntateDate: Date) {
    this.mustBeInStatuses([MemberStatus.Expelled, MemberStatus.Suspended]);
    var reinstated = new MemberResinstated(this.id, reisntateDate);
    this.apply(reinstated);
  }

  public terminateMembership(terminationDate: Date) {
    this.mustBeInStatuses([
      MemberStatus.Active,
      MemberStatus.Expelled,
      MemberStatus.Suspended,
    ]);
    this.apply(new MemberMembershipTerminated(this.id, terminationDate));
  }

  public appealSuspension(justification: string, appealDate: Date) {
    this.mustHaveStatus(MemberStatus.Suspended);
    if (!this.isBeBeforeDeadline(appealDate)) {
      throw new Error("Cannot appeal suspension after deadline");
    }
    var appeal = new MemberSuspensionApealed(
      this.id,
      justification,
      appealDate,
    );
    this.apply(appeal);
  }

  public acceptSuspensionAppeal(acceptDate: Date) {
    this.mustHaveStatus(MemberStatus.SuspensionAppealed);
    this.apply(new MemberSuspensionApealAccepted(this.id, acceptDate));
    this.apply(new MemberResinstated(this.id, acceptDate));
  }

  public rejectSuspensionAppeal(rejectDate: Date, justification: string) {
    this.mustHaveStatus(MemberStatus.SuspensionAppealed);
    this.apply(
      new MemberSuspensionApealRejected(this.id, rejectDate, justification),
    );
  }

  public appealExpulsion(justificative: string, appealDate: Date) {
    this.mustHaveStatus(MemberStatus.Suspended);
    if (!this.isBeBeforeDeadline(appealDate)) {
      throw new Error("Cannot appeal suspension after deadline");
    }
    var appeal = new MemberExpulsionApealed(this.id, justificative, appealDate);
    this.apply(appeal);
  }

  public acceptExpulsionAppeal(acceptDate: Date) {
    this.mustHaveStatus(MemberStatus.SuspensionAppealed);
    this.apply(new MemberExpulsionApealAccepted(this.id, acceptDate));
    this.apply(new MemberResinstated(this.id, acceptDate));
  }

  public rejectExpulsionAppeal(rejectDate: Date, justification: string) {
    this.mustHaveStatus(MemberStatus.SuspensionAppealed);
    this.apply(
      new MemberExpulsionApealRejected(this.id, justification, rejectDate),
    );
  }

  public onMemberCreated(event: MemberCreated): void {
    this._cardNumber = event.cardNumber;
    this._firstName = event.firstName;
    this._lastName = event.lastName;
    this._email = event.email;
    this._address = event.address;
    this._applyDate = event.applyDate;
    this._birthDate = event.birthDate;
    this._joinDate = event.joinDate;
    this._status = MemberStatus.Active;
    this._membershipFees = [
      new MembershipFee(
        event.joinDate.getFullYear(),
        event.paid,
        event.joinDate,
      ),
    ];
  }

  public onMemberMembershipFeePaymentRequested(
    event: MemberMembershipFeePaymentRequested,
  ): void {
    var fee = new MembershipFee(event.year, event.amount, new Date());
    this._membershipFees.push(fee);
  }

  public onMemberMembershipFeePaid(event: MemberMembershipFeePaid): void {
    var fee = this._membershipFees.find((fee) => fee.year === event.year);
    fee.registerPayment(event.amount, event.date);
  }

  public onMemberContactDataUpdated(event: MemberContactDataUpdated): void {
    this._email = event.email;
    this._phoneNumber = event.phoneNumber;
    this._address = event.address;
  }

  public onMemberSuspended(event: MemberSuspended): void {
    this._status = MemberStatus.Suspended;
  }

  public onMemberExpelled(event: MemberExpelled): void {
    this._status = MemberStatus.Expelled;
  }

  public onMemberReinstated(event: MemberResinstated): void {
    this._status = MemberStatus.Active;
  }

  public onMemberMembershipTerminated(event: MemberMembershipTerminated): void {
    this._status = MemberStatus.Terminated;
  }

  public onMemberSuspensionApealed(event: MemberSuspensionApealed): void {
    this._status = MemberStatus.SuspensionAppealed;
  }

  public onMemberSuspensionApealAccepted(
    event: MemberSuspensionApealAccepted,
  ): void {
    this._status = MemberStatus.Active;
  }

  public onMemberSuspensionApealRejected(
    event: MemberSuspensionApealRejected,
  ): void {
    this._status = MemberStatus.Suspended;
  }

  public onMemberExpulsionApealed(event: MemberExpulsionApealed): void {
    this._status = MemberStatus.ExpulsionAppealed;
  }

  public onMemberExpulsionApealAccepted(
    event: MemberExpulsionApealAccepted,
  ): void {
    this._status = MemberStatus.Active;
  }

  public onMemberExpulsionApealRejected(
    event: MemberExpulsionApealRejected,
  ): void {
    this._status = MemberStatus.Terminated;
  }

  private mustHaveStatus(status: MemberStatus) {
    if (this._status !== status) {
      throw new Error(`Member status is not ${status}`);
    }
  }

  private mustBeInStatuses(statuses: MemberStatus[]) {
    if (statuses.filter((status) => status === this._status).length === 0) {
      throw new Error(`Member status is ${this.status}`);
    }
  }

  private feeMustBeRequested(year: number) {
    if (!this._membershipFees.some((fee) => fee.year === year)) {
      throw new Error(`Membership fee for year ${year} is not requested`);
    }
  }

  private feeMustNotBePaid(year: number) {
    if (
      this._membershipFees.some((fee) => fee.year === year && fee.isBalanced())
    ) {
      throw new Error(`Membership fee for year ${year} is already paid`);
    }
  }

  private isBeBeforeDeadline(date: Date): boolean {
    return this._appealDeadline && date < this._appealDeadline;
  }
}
