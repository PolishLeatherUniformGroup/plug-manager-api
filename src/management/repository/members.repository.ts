export class MembersRepository {
    constructor() { }
    async exists(idOrCard: string): Promise<boolean> {
        return true;
    }
}