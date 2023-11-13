"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = exports.publishMessage = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
//swap this out for env variable
const projectId = 'pubsubproducts';
// Instantiates a client
const pubSubClient = new pubsub_1.PubSub({ projectId });
async function publishMessage(topicNameOrId, data) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    try {
        const messageId = await pubSubClient
            .topic(topicNameOrId)
            .publishMessage({ data: dataBuffer });
        console.log(`Message ${messageId} published.`);
    }
    catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}
exports.publishMessage = publishMessage;
async function subscribe(subscriptionName) {
    // References an existing subscription
    const subscription = pubSubClient.subscription(subscriptionName);
    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = message => {
        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`);
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;
        // "Ack" (acknowledge receipt of) the message
        message.ack();
    };
    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
    return subscription;
}
exports.subscribe = subscribe;
