import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { MemberResinstated } from "../events/impl/member/member-reinstated.events";
import { Observable, map } from "rxjs";
import { MemberRequestFeePayment } from "../commands/impl/member/member-request-fee-payment.command";

@Injectable()
export class MemberSaga {

    @Saga()
    reinstated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(MemberResinstated),
            map((event) => {
                // TODO: Implement logic to decide if member need to pay fee
                return new MemberRequestFeePayment(event.id, 1, 1, new Date());
            }),
        );
    }
}