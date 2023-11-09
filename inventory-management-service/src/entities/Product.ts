import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Product {
    @PrimaryKey()
    SKU!: String;

    @Property()
    onhand!: number;

    public constructor(SKU: String, onhand: number) {
        this.SKU = SKU;
        this.onhand = onhand;
    }

    public addOnhand(toAdd: number) {
        if(toAdd < 0){
            throw new Error("Cannot add negative onhand");
        }
        this.onhand += toAdd;
    }

    public removeOnhand(toRemove: number) {
        if(!(this.onhand > toRemove)){
            throw new Error("Not enough onhand");
        }
        this.onhand -= toRemove;
    }
}