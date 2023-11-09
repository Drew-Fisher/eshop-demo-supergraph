"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMessage = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
// Creates a client; cache this for further use
const pubSubClient = new pubsub_1.PubSub();
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
