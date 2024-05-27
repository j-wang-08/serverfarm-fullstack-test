const kafka = require("kafka-node");

const host = process.env.KAFKA_HOST || "localhost";
const port = process.env.KAFKA_PORT || 9092;
const topic = process.env.KAFKA_TOPIC || "serverfarm_new_post";

const client = new kafka.KafkaClient({ kafkaHost: `${host}:${port}` });
const consumer = new kafka.Consumer(client, [{ topic, partition: 0 }], {
  autoCommit: true,
});

consumer.on("message", (message) => {
  console.log("Received message from Kafka: ", message);
});

consumer.on("error", (err) => {
  console.error("Error in Kafka Consumer: ", err);
});
