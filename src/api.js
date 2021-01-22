import AWS from "aws-sdk";

const sns = new AWS.SNS();

export async function handler(event) {
  console.log(
    `Logging from inside the API Lambda for route: ${event.routeKey}`
  );

  await sns
    .publish({
      MessageStructure: "string",
      TopicArn: process.env.TOPIC_ARN,
      Message: "Hello from the API Lambda",
    })
    .promise();

  return {
    statusCode: 200,
    body: "Hello World",
    headers: { "Content-Type": "text/plain" },
  };
}
