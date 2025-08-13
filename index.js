const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['pkc-921jm.us-east-2.aws.confluent.cloud:443'], // Use your cluster endpoint
  ssl: true,
  sasl: {
    mechanism: 'plain', // Confluent Cloud uses 'plain'
    username: 'HT63BUVIIMC2QNBL', // Your API key
    password: 'cflt1M62Kme8IBSv4qP6Aenl8coeqM1yRzfv60ETLn5f8a50rwPLE9/Av1JaUY5Q', // Your API secret
  },
  logLevel: logLevel.INFO,
});

async function produce(topic) {
  const producer = kafka.producer({
    allowAutoTopicCreation: true, // optional, set false if you don't want topics auto-created
  });

  try {
    await producer.connect();
    console.log(`Producer connected to topic ${topic}`);

    const messages = [
      { key: 'key1', value: 'Hello Confluent Cloud!' },
    ];

    const result = await producer.send({
      topic,
      messages,
    });

    console.log('Produced message:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Producer error:', err);
  } finally {
    await producer.disconnect();
  }
}

async function consume(topic) {
  const consumer = kafka.consumer({ groupId: 'nodejs-group-1' });

  try {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`Consumer connected to topic ${topic}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          `Consumed message from topic ${topic} partition ${partition}: key=${message.key.toString()}, value=${message.value.toString()}`
        );
      },
    });
  } catch (err) {
    console.error('Consumer error:', err);
  }
}

async function main() {
  const topic = 'order-created';
  await produce(topic);
  await consume(topic);
}

main();
