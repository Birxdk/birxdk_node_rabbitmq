# birxdk_node_rabbitmq
Example of how to publish and consume messages using RabbitMQ and topicExchange


# Dependencies #
You need to have a access to rabbitMQ, locally is works just fine. 

# Install #
Before running the publisher/consumer install the npm packages
`npm i`

# Configuration #
Configure the conn string, exchange name, queue and key pattern in the `config.js`

# Run it #
Open two terminals in this folder
Start the publisher: `node ./publisher.js`
Start the consumer: `node ./consumer.js`

You should see the same messages in both terminals.

# Multiple Consumers / Load balancing #
Try to open more terminals and start more consumers. `node ./consumer.js`.
Notice how the messages are being distributed to each consumer on a round robin basis.

