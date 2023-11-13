export class ExternalProductCreatedEvent{
    sku: string;

    constructor(sku: string){
        this.sku = sku;
    }
}