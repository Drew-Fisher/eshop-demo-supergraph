import { Subscription } from '@google-cloud/pubsub';
import { subscribe } from '../service/message-service';

export class ExternalMessageConsumer{
    subscription: Subscription;
    constructor(){

    }
}