"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickstart = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const ProductCreatedEvent_1 = require("../models/ProductCreatedEvent");
require("dotenv/config");
async function quickstart(projectId = process.env.GOOGLE_CLOUD_PROJECT_ID, // Your Google Cloud Platform project ID
topicNameOrId = 'projects/pubsubproducts/topics/Products22', // Name for the new topic to create
subscriptionName = process.env.PRODUCT_CREATED_EVENT_EXTERNAL_SUBSCRIPTION // Name for the new subscription to create
) {
    // Instantiates a client
    const pubsub = new pubsub_1.PubSub({ projectId });
    console.log(projectId);
    console.log(subscriptionName);
    // Creates a subscription on that new topic
    const subscription = await pubsub.subscription(subscriptionName);
    // Receive callbacks for new messages on the subscription
    subscription.on('message', message => {
        const data = message.data.toString();
        let temp = JSON.parse(data);
        let event = new ProductCreatedEvent_1.ExternalProductCreatedEvent(temp.sku);
        console.log('Received message:', event.sku);
        //process.exit(0);
    });
    // Receive callbacks for errors on the subscription
    subscription.on('error', error => {
        console.error('Received error:', error);
        process.exit(1);
    });
    // Send a message to the topic
    //topic.publishMessage({data: Buffer.from('Test message!')});
}
exports.quickstart = quickstart;
