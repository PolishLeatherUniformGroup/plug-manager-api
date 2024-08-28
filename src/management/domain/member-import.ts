
export class ImportedMember {
    constructor(
        public cardNumber: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public joinDate: Date,
        public birthDate?: Date,
        public phone?: string,
    ) { }
}