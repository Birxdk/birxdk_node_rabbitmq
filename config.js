/**
 * Config
 */

const rabbitMQconfig = {
    // conn: "amqp://localhost",
    conn: process.env["rabbitmq.uri"] || "amqp://localhost",
    exchange: "itemExchange",
    queue: "itemQueue",
    keyPattern: "bla.*" // "anonymous.info"
};

console.log("Rabbit env: " + rabbitMQconfig.conn);

module.exports = rabbitMQconfig;
// export {rabbitMQconfig}; // typescript
