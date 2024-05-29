#! /bin/sh

# Check if required environment variables are set
if [ -z "$KAFKA_HOST" ] || [ -z "$KAFKA_PORT" ] || [ -z "$KAFKA_TOPIC" ]; then
    echo "KAFKA_HOST and KAFKA_PORT and KAFKA_TOPIC environment variables must be set."
    exit 1
fi

# Wait for Kafka to be ready
until nc -z -v -w30 "$KAFKA_HOST" "$KAFKA_PORT"; do
    echo "Waiting for Kafka to be available..."
    sleep 5
done

# Create the topic
kafka-topic.sh --create --topic "$KAFKA_TOPIC" --bootstrap-server "$KAFKA_HOST:$KAFKA_PORT"

echo "Kafka topic '$KAFKA_TOPIC' created."