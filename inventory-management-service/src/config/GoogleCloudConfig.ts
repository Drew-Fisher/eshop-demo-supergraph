import { PubSub } from "@google-cloud/pubsub";


export async function quickstart(
  projectId = 'pubsubproducts', // Your Google Cloud Platform project ID
  topicNameOrId = 'projects/pubsubproducts/topics/Products22', // Name for the new topic to create
  subscriptionName = 'projects/pubsubproducts/subscriptions/testing' // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a subscription on that new topic
  const subscription = await pubsub.subscription(subscriptionName);

  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
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