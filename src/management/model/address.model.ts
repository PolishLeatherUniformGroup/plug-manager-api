import { Column } from "typeorm";

export class Address {
  @Column({ length: 50, default: "" })
  country: string;

  @Column({ length: 50, default: "" })
  city: string;

  @Column({ length: 50, nullable: true })
  region?: string;

  @Column({ length: 8, default: "" })
  postalCode: string;

  @Column({ length: 50, default: "" })
  street: string;

  @Column({ length: 10, default: "" })
  house: string;

  @Column({ length: 10, nullable: true })
  apartment?: string;
}
