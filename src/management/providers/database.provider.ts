import { DataSource } from "typeorm";
import { Applicant } from "../model/applicants/applicant.model";

export const databaseProviders = [
  {
    provide: "APPLICANT_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Applicant),
    inject: ["DATA_SOURCE"],
  },
];
