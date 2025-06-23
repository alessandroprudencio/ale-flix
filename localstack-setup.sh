#!/bin/bash
set -e

# Configurações
AWS_ENDPOINT="http://ale-flix-localstack:4566"
AWS_REGION="us-east-1"
BUCKET="aleflix-uploads"
QUEUE="aleflix-video-processing-queue"

until curl -s $AWS_ENDPOINT/_localstack/health | grep 'running'; do
  echo "Aguardando LocalStack..."
  sleep 5
done

echo "LocalStack pronto!"

# Cria bucket S3
awslocal --endpoint-url=$AWS_ENDPOINT s3 mb s3://$BUCKET

awslocal s3api put-bucket-cors \
  --endpoint-url=$AWS_ENDPOINT \
  --bucket $BUCKET \
  --cors-configuration '{
    "CORSRules": [
      {
        "AllowedOrigins": ["*"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedHeaders": ["*"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
      }
    ]
  }'

# Cria fila SQS
awslocal --endpoint-url=$AWS_ENDPOINT sqs create-queue --queue-name $QUEUE || true

echo "Buckets e filas criados no LocalStack!"