/**
 * Consumer of the rabbit queue, start multiple at the same time for alternation delivery of messages
 */
var amqp = require('amqplib/callback_api');
const rabbitMQconfig = require("./config");
const wl = require('./logger');

// rabbitmq config
const conn = rabbitMQconfig.conn;
const exchange = rabbitMQconfig.exchange;
const queue = rabbitMQconfig.queue;

class Consumer {
    constructor() {
        wl("RabbitMQ Consumer Started Listening.");
        this.connectTopicChannel();
    }

    connectTopicChannel() {
        amqp.connect(conn, (err, conn) => {
            if (err) {
                wl(err, false);
            } else {
                conn.createChannel((err, ch) => {

                    ch.assertExchange(exchange, 'topic', { durable: true });

                    ch.assertQueue(queue, { exclusive: false }, (err, q) => {
                        wl(' [*] Waiting for data. To exit press CTRL+C', true);
                        ch.bindQueue(q.queue, exchange, rabbitMQconfig.keyPattern);

                        // receive data and do whatever
                        ch.consume(q.queue, (msg) => {
                            // write message to consol using our writeLog function
                            wl(`${msg.fields.routingKey}: ${msg.content.toString()}`, true);
                        }, { noAck: true });
                    });
                });
            }
        });
    }
}
new Consumer();