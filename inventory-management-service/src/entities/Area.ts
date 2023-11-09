import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Area {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;
}