import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Bay {
    @PrimaryKey()
    id!: number;

    @Property()
    BayNumber!: number;

    @Property()
    BayNumberSuffix!: string;
    
    @Property()
    BayType!: string;
}