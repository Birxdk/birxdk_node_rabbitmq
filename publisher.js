const amqp = require('amqplib/callback_api');
// import * as amqp  from 'amqplib/callback_api'; // Use for typescript
const rabbitMQconfig = require('./config');
const wl = require('./logger');

// set the exchange and key from the config
const conn = rabbitMQconfig.conn;
const exchange = rabbitMQconfig.exchange;
const key = rabbitMQconfig.keyPattern;

// send a message every x milisecond
const intervalMiliseconds = 3000;

// define the standard object to send to rabbit
const msgString = 'Hello brave new world!';
const msgObj = { val: msgString };

class Publisher {
    constructor() {
        wl('RabbitMQ Publisher Started. To exit press CTRL+C', true);
        this.connectTopicChannel();
    }

    connectTopicChannel() {
        wl('Connect Topic Channel', true);
        // connect to rabbitmq
        amqp.connect(conn, (err, conn) => {
            if (err) {
                wl(err, false);
            }

            // create the channel
            conn.createChannel((err, ch) => {
                if (err) {
                    wl(err, false);
                }

                // configure the exchange and set to topic and durable true
                ch.assertExchange(exchange, 'topic', { durable: true });

                let i = 0;
                // create an interval and send new messages every x second
                let interval = setInterval(() => {
                    i++;
                    // add interval number to message
                    let msg = msgObj;
                    msg.val = msgString + ` ${i}`;

                    // publish the message, if sending an object it needs to be strigified first
                    ch.publish(exchange, key, new Buffer(JSON.stringify(msg)));
                    wl(msg, true);
                }, intervalMiliseconds);
            });
        }, err => {
            wl(err, false);
        });
    }
    
}
new Publisher();