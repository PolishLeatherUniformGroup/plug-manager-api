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

  public mapToDtot(
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
      address: this.mapToDtot(applicant.address),
      birthDate: applicant.birthDate,
      applyDate: applicant.applyDate,
      phoneNumber: applicant.phone,
      recommendations: applicant.recommendations.map(this.mapToRecommendationDto),
      fee: this.mapToRequiredFee(applicant.applicationFee)
    } as ApplicantDto;
  }

  public mapToRecommendationDto(recommendation: Recommendation): RecommendationDto {
    return {
      id: recommendation.id,
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
}

