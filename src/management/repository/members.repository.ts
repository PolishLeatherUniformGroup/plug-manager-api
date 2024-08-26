export class MembersRepository {
    constructor() { }

    async exists(idOrCard: string): Promise<boolean> {
        return true;
    }

    async nextCard() {
        return 'PLUG-9999';
    }
}