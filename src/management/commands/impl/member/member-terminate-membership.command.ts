import { ICommand } from '@nestjs/cqrs';
export class MemberTerminateMembership  implements ICommand {
    constructor(
        public readonly id: string,
        public readonly terminateDate: Date
    ) { }
}