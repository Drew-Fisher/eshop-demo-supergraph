import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Book  {

  @Property()
  title!: string;

  @PrimaryKey()
  id!: number;

}