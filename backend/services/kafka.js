const kafka = require("kafka-node");

const host = process.env.KAFKA_HOST || "localhost";
const port = process.env.KAFKA_PORT || 9092;

const client = new kafka.KafkaClient({ kafkaHost: `${host}:${port}` });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is connected and ready");
});

producer.on("error", (err) => {
  console.error("Error in Kafka Producer: ", err);
});

module.exports = producer;
