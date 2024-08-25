import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { ApplicantApplied } from '../events/impl/applicant/applicant-applied.event';
import { ApplicantVerifyRecommendations } from '../commands/impl/applicant/applicant-verify-recommendations';
import { ApplicantApplicationAccepted } from '../events/impl/applicant/applicant-application-accepted.event';
import { ApplicantsRepository } from '../repository/applicant.repository';
import { MapperService } from '../services/maper.service';
import { MemberCreate } from '../commands/impl/member/member-create.command';
@Injectable()
export class ApplicantSaga {

    @Saga()
    applied = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ApplicantApplied),
            map((event) => {
                return new ApplicantVerifyRecommendations(event.id);
            }),
        );
    }

    @Saga()
    accepted = (events$: Observable<any>, applicantRepository: ApplicantsRepository, mapper: MapperService): Observable<ICommand> => {
        return events$.pipe(
            ofType(ApplicantApplicationAccepted),
            map(async (event) => {
                var applicant = await applicantRepository.get(event.id);
                if (applicant == null) {
                    return null;
                }
                return new MemberCreate(
                    applicant.firstName,
                    applicant.lastName,
                    applicant.email,
                    applicant.birthDate,
                    applicant.applyDate,
                    mapper.mapToDomainObject(applicant.address),
                    event.acceptedDate,
                    applicant.phone,
                );
            }),
        );
    }

}