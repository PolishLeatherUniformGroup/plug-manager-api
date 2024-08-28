import { Column } from "typeorm";

export class Address {
  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50, nullable: true })
  region?: string;

  @Column({ length: 8 })
  postalCode: string;

  @Column({ length: 50 })
  street: string;

  @Column({ length: 10 })
  house: string;

  @Column({ length: 10, nullable: true })
  apartment?: string;
}
