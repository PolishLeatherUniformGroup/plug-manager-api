import { Column } from "typeorm";

export class Address {
  @Column({ length: 50 })
  public country: string;

  @Column({ length: 50 })
  public city: string;

  @Column({ length: 50 })
  public region?: string;

  @Column({ length: 8 })
  public postalCode: string;

  @Column({ length: 50 })
  public street: string;

  @Column({ length: 10 })
  public house: string;

  @Column({ length: 10 })
  public apartment?: string;
}
