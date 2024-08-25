import { Injectable } from '@nestjs/common';
import { Applicant } from '../domain/applicant/applicant.aggregate';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { ApplicantApplied } from '../events/impl/applicant/applicant-applied.event';
import { ApplicantVerifyRecommendations } from '../commands/impl/applicant/applicant-verify-recommendations';
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

}