export class GoogleCloudMessage<T>{
    name: string;
    data: T;
    constructor(name: string, data: T){
        this.name = name;
        this.data = data;
    }
}