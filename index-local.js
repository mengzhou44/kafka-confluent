const { Kafka, logLevel } = require('kafkajs');

// Kafka config for local Docker Compose setup
const kafka = new Kafka({
  clientId: 'my-local-app',
  brokers: ['localhost:9092'], // map to KAFKA_ADVERTISED_LISTENERS PLAINTEXT_HOST
  logLevel: logLevel.INFO,
});

async function produce(topic) {
  const producer = kafka.producer({
    allowAutoTopicCreation: true, // optional, will create topic if it doesn't exist
  });

  try {
    await producer.connect();
    console.log(`Producer connected to topic ${topic}`);

    const messages = [
      { key: 'key1', value: 'Hello Local Kafka!' },
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
  const topic = 'order-created'; // set topic here
  await produce(topic);
  await consume(topic);
}

main();
