import { Injectable } from "@nestjs/common";
import { Address as AddressDto } from "../dto/address.dto";
import { Address } from "../domain/address.value-object";
import { Address as AddressModel } from "../model/address.model";
import { ICommand } from '@nestjs/cqrs';
import { ApplicantApply } from "../commands/impl/applicant/applicant-apply.command";
import { Apply } from "../dto/requests/apply.request";
import { RecommendationDecision } from "../dto/requests/recommendation-decision.request";
import { ApplicantApproveRecommendation } from "../commands/impl/applicant/applicant-approve-recommendation.command";
import { ApplicantRejectRecommendation } from "../commands/impl/applicant/applicant-reject-recommendation.comand";
import { ApplicantRegisterFeePayment } from "../commands/impl/applicant/applicant-register-fee-payment.command";
import { ApplicationFee } from "../dto/requests/application-fee.request";
import { AppealDecision, Decision } from "../dto/requests/decision.request";
import { ApplicantAcceptApplication } from "../commands/impl/applicant/applicant-accept-application.command";
import { ApplicantRejectApplication } from "../commands/impl/applicant/applicant-reject-application.command";
import { Appeal } from "../dto/requests/appeal.request";
import { ApplicantAppealRejection } from "../commands/impl/applicant/applicant-appeal-rejection.command";
import { ApplicantAppealAccept } from "../commands/impl/applicant/applicant-appeal-accept.command";
import { GetApplicant } from "../queries/impl/applicant/get-applicant.query";
import { Applicant } from "../model/applicants/applicant.model";
import { Applicant as ApplicantDto } from "../dto/responses/applicant.response";
import { Recommendation } from "../model/applicants/recommendation.model";
import { Recommendation as RecommendationDto } from "../dto/responses/recommendation.response";
import { RequiredFee } from "../dto/responses/required-fee.response";
import { ApplicationFee as ApplicationFeeModel } from "../model/applicants/application-fee.model";
import { GetAwaitingRecommendations } from "../queries/impl/applicant/get-awaiting-recommendations.query";
import { ApplicantRecommendation } from "../dto/responses/applicant-recommendation";
import { GetApplicationStatus } from "../queries/impl/applicant/get-application-status.query";
import { ApplicationStatus } from "../model/applicants/application-status.model";
import { ApplicationStatus as ApplicationStatusDto } from "../dto/responses/application-status";
import { ApplicantStatus } from "../domain/applicant/applicant-status.enum";
import { GetApplicants } from "../queries/impl/applicant/get-applicants.query";
import { MembershipFee } from "../dto/requests/membership-fee";
import { MemberRequestFeePayment } from "../commands/impl/member/member-request-fee-payment.command";
import { MembershipFeePayment } from "../dto/requests/membership-fee-payment";
import { MemberRegisterFeePayment } from "../commands/impl/member/member-register-fee-payment.command";
import { Suspension } from "../dto/requests/suspension.request";
import { Suspension as SuspensionModel } from './../model/members/suspension.model';
import { MemberSuspendMembership } from "../commands/impl/member/member-suspend-membership.command";
import { MemberSuspensionAppeal } from "../commands/impl/member/member-suspension-appeal.command";
import { MemberAcceptSuspensionAppeal } from "../commands/impl/member/member-accept-suspension-appeal.command";
import { MemberRejectSuspensionAppeal } from "../commands/impl/member/member-reject-suspension-appeal.commanf";
import { Expulsion } from "../dto/requests/expulsion.request";
import { MemberExpell } from "../commands/impl/member/member-expell.command";
import { MemberExpulsionAppeal } from "../commands/impl/member/member-expulsion-appeal.command";
import { MemberAcceptExpulsionAppeal } from "../commands/impl/member/member-accept-expulsion-appeal.command";
import { MemberRejectExpulsionAppeal } from "../commands/impl/member/member-reject-expulsion-appeal.command";
import { ContactData } from "../dto/requests/contact-data.request";
import { MemberUpdateContactData } from "../commands/impl/member/member-update-contact-data.command";
import { Member as MemberModel } from "../model/members/member.model";
import { Member } from "../dto/responses/member";
import { GetMember } from "../queries/impl/member/get-member.query";
import { GetMembers } from "../queries/impl/member/get-members.query";
import { MemberStatus } from "../domain/member/member-status.enum";
import { GetMemberFees } from "../queries/impl/member/get-member-fees.query";
import { YearlyFee } from "../dto/responses/yearly-fee";
import { MembershipFee as MembershipFeeModel } from "../model/members/membership-fee.model";
import { GetMemberSuspensions } from "../queries/impl/member/get-member-suspensions.query";
import { GetMemberExpulsions } from "../queries/impl/member/get-member-expulsions.query";
import { SuspensionHistory } from "../dto/responses/suspension-history";
import { Expulsion as ExpulsionModel } from '../model/members/expulsion.model';
import { ExpulsionHistory } from '../dto/responses/expulsion-history';

@Injectable()
export class MapperService {

  public mapToDomainObject(
    addressDto?: AddressDto | AddressModel,
  ): Address | undefined {
    if (!addressDto) return undefined;
    return Address.create(
      addressDto.country,
      addressDto.city,
      addressDto.postalCode,
      addressDto.street,
      addressDto.house,
      addressDto.region,
      addressDto.apartment,
    );
  }

  public mapToViewObject(
    address?: Address | AddressDto,
  ): AddressModel | undefined {
    if (!address) return undefined;
    return {
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      street: address.street,
      house: address.house,
      region: address.region,
      apartment: address.apartment,
    } as AddressModel;
  }

  public mapToAddressDto(
    address?: Address | AddressModel,
  ): AddressDto | undefined {
    if (!address) return undefined;
    return {
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
      street: address.street,
      house: address.house,
      region: address.region,
      apartment: address.apartment,
    } as AddressDto;
  }

  public mapToApplyCommand(request: Apply): ApplicantApply {
    return new ApplicantApply(
      request.firstName,
      request.lastName,
      request.email,
      this.mapToDomainObject(request.address),
      request.birthDate,
      request.applyDate,
      request.recommenders,
      request.phoneNumber
    );
  }

  public mapToRecommendationCommand(id: string, recommender: string, request: RecommendationDecision): ICommand {
    if (request.accepted) {
      return new ApplicantApproveRecommendation(id, recommender);
    } else {
      return new ApplicantRejectRecommendation(id, recommender);
    }
  }

  public mapToFeePaymentCommand(id: string, request: ApplicationFee): ApplicantRegisterFeePayment {
    return new ApplicantRegisterFeePayment(id, request.paymentDate);
  }

  public mapToDecisionCommand(applicantId: string, decision: Decision): ICommand {
    if (decision.accepted) {
      return new ApplicantAcceptApplication(applicantId, decision.date);
    } else {
      return new ApplicantRejectApplication(applicantId, decision.date, decision.reason, decision.appealDeadline);
    }
  }

  public mapToAppealCommand(applicantId: string, appeal: Appeal) {
    return new ApplicantAppealRejection(applicantId, appeal.date, appeal.justification);
  }

  public mapToAppealDecisionCommand(applicantId: string, decision: AppealDecision): ICommand {
    if (decision.accepted) {
      return new ApplicantAppealAccept(applicantId, decision.date);
    } else {
      return new ApplicantAppealRejection(applicantId, decision.date, decision.reason);
    }
  }

  public buildGetApplicantQuery(id: string): GetApplicant {
    return new GetApplicant(id);
  }

  public mapToApplicantDto(applicant: Applicant): ApplicantDto | undefined {
    if (!applicant) return undefined;
    return {
      id: applicant.id,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      email: applicant.email,
      address: this.mapToAddressDto(applicant.address),
      birthDate: applicant.birthDate,
      applyDate: applicant.applyDate,
      phoneNumber: applicant.phone,
      recommendations: applicant.recommendations.map(this.mapToRecommendationDto),
      fee: this.mapToRequiredFee(applicant.applicationFee)
    } as ApplicantDto;
  }

  public mapToRecommendationDto(recommendation: Recommendation): RecommendationDto {
    return {
      id: recommendation.id.toString(),
      recommender: recommendation.cardNumber,
      accepted: recommendation.isRecommended
    } as RecommendationDto;
  }

  public mapToRequiredFee(fee: ApplicationFeeModel): RequiredFee {
    return {
      requiredAmount: fee.dueAmount,
      paidAmount: fee.paidAmount,
      paymentDate: fee.paidDate
    } as RequiredFee;
  }

  public buildGetAwaitingRecommendationsQuery(cardOrId: string): GetAwaitingRecommendations {
    return new GetAwaitingRecommendations(cardOrId);
  }

  public mapToAwaitingApplicantDto(applicant?: Applicant): ApplicantRecommendation | undefined {
    if (!applicant) return undefined;
    return {
      id: applicant.id,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      applyDate: applicant.applyDate,
    } as ApplicantRecommendation;
  }

  public buildGetApplicationStatusQuery(id: string): GetApplicationStatus {
    return new GetApplicationStatus(id);
  }

  public mapToApplicationStatusDto(status: ApplicationStatus): ApplicationStatusDto {
    return {
      order: 0,
      occured: status.date,
      status: status.status,
      statusText: this.mapApplicantStatusEnumToText(status.status),
      comment: status.comment,
    } as ApplicationStatusDto;
  }

  private mapApplicantStatusEnumToText(status: ApplicantStatus): string {
    switch (status) {
      case ApplicantStatus.New:
        return "Wpłynął";
      case ApplicantStatus.Validated:
        return "Zweryfikowany";
      case ApplicantStatus.InRecommendation:
        return "W trakcie rekomendacji";
      case ApplicantStatus.AwaitPayment:
        return "Oczekuje na płatność";
      case ApplicantStatus.AwaitDecision:
        return "Oczekuje na decyzję";
      case ApplicantStatus.Accepted:
        return "Zaakceptowany";
      case ApplicantStatus.Rejected:
        return "Odrzucony";
      case ApplicantStatus.Appealed:
        return "Odwołanie złożone";
      case ApplicantStatus.Cancelled:
        return "Anulowany";
    }
  }

  public buildGetApplicantsQuery(status?: number): GetApplicants {
    return new GetApplicants(status);
  }

  public mapToMemberFeeRequested(idOrCard: string, body: MembershipFee): MemberRequestFeePayment {
    return new MemberRequestFeePayment(idOrCard, body.year, body.dueAmount, body.dueDate);
  }

  public mapToMemberFeePaymentRequested(idOrCard: string, year: number, body: MembershipFeePayment): MemberRegisterFeePayment {
    return new MemberRegisterFeePayment(idOrCard, year, body.date, body.amount);
  }

  public mapToMemberSuspended(idOrCard: string, body: Suspension): MemberSuspendMembership {
    return new MemberSuspendMembership(idOrCard, body.startDate, body.reason, body.endDate, body.appealDeadline);
  }

  public mapToMemberAppealSuspended(idOrCard: string, body: Appeal): MemberSuspensionAppeal {
    return new MemberSuspensionAppeal(idOrCard, body.date, body.justification);
  }

  public mapToMemberSuspendedAppealDecision(idOrCard: string, body: AppealDecision): ICommand {
    if (body.accepted) {
      return new MemberAcceptSuspensionAppeal(idOrCard, body.date);
    } else {
      return new MemberRejectSuspensionAppeal(idOrCard, body.date, body.reason);
    }
  }

  public mapToMemberExpelled(idOrCard: string, body: Expulsion): MemberExpell {
    return new MemberExpell(idOrCard, body.startDate, body.reason, body.appealDeadline);
  }

  public mapToMemberAppealExpelled(idOrCard: string, body: Appeal): MemberExpulsionAppeal {
    return new MemberExpulsionAppeal(idOrCard, body.date, body.justification);
  }

  public mapToMemberExpelledAppealDecision(idOrCard: string, body: AppealDecision): ICommand {
    if (body.accepted) {
      return new MemberAcceptExpulsionAppeal(idOrCard, body.date);
    } else {
      return new MemberRejectExpulsionAppeal(idOrCard, body.date, body.reason);
    }
  }

  public mapToMemberContactDataUpdated(idOrCard: string, body: ContactData): ICommand {
    return new MemberUpdateContactData(idOrCard, body.email, body.phone, this.mapToDomainObject(body.address));
  }

  public buildGetMemberQuery(idOrCard: string): GetMember {
    return new GetMember(idOrCard);
  }

  public mapToMemberDto(member?: MemberModel): Member | null {
    if (!member) return null;
    return {
      id: member.id,
      cardNumber: member.cardNumber,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phoneNumber: member.phoneNumber,
      address: this.mapToAddressDto(member.address),
    } as Member;
  }

  public buildGetMembersQuery(status?: MemberStatus): GetMembers {
    return new GetMembers(status);
  }

  public buildGetMemberFeesQuery(idOrCard: string): GetMemberFees {
    return new GetMemberFees(idOrCard);
  }

  public mapToYearlyFee(fee: MembershipFeeModel): YearlyFee {
    return {
      year: fee.year,
      dueAmount: fee.dueAmount,
      paidAmount: fee.paidAmount,
      dueDate: fee.dueDate,
      paidDate: fee.paidDate,
    } as YearlyFee;
  }

  public buildGetMemberSuspensionsQuery(idOrCard: string): GetMemberSuspensions {
    return new GetMemberSuspensions(idOrCard);
  }

  public buildGetMemberExpulsionsQuery(idOrCard: string): GetMemberExpulsions {
    return new GetMemberExpulsions(idOrCard);
  }

  public mapToSuspension(suspension: SuspensionModel): SuspensionHistory {
    return {
      startDate: suspension.startDate,
      reason: suspension.justification,
      endDate: suspension.endDate,
      appealDeadline: suspension.appealDeadline,
      appealDate: suspension.appealDate,
      appealJustification: suspension.appealJustification,
      appealDecisionDate: !suspension.appealAcceptDate ? suspension.appealRejectDate : suspension.appealAcceptDate,
      appealDecisionJustification: suspension.appealRejectionJustification,
      appealDecision: suspension.finished && suspension.appealAcceptDate !== undefined,
    } as SuspensionHistory;
  }

  public mapToExpulsion(suspension: ExpulsionModel): ExpulsionHistory {
    return {
      startDate: suspension.startDate,
      reason: suspension.justification,
      appealDeadline: suspension.appealDeadline,
      appealDate: suspension.appealDate,
      appealJustification: suspension.appealJustification,
      appealDecisionDate: !suspension.appealAcceptDate ? suspension.appealRejectDate : suspension.appealAcceptDate,
      appealDecisionJustification: suspension.appealRejectionJustification,
      appealDecision: suspension.finished && suspension.appealAcceptDate !== undefined,
    } as ExpulsionHistory;
  }

}
