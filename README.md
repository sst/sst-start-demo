# `sst start`

A sample project to demo the new `sst start` command. This repo was bootstrapped with [Serverless Stack Toolkit (or SST)](https://github.com/serverless-stack/serverless-stack). SST is an extension of [AWS CDK](https://aws.amazon.com/cdk/) and is designed for developing Serverless apps on AWS.

---

The new `sst start` command starts up a local development environment that opens a WebSocket connection to your deployed app and proxies any Lambda requests to your local machine. This allows you to:

- Work on your Lambda functions locally
- While, interacting with your entire deployed AWS infrastructure
- Supports all Lambda triggers, so there's no need to mock API Gateway, SQS, SNS, etc.
- Supports real Lambda environment variables
- And Lambda IAM permissions, so if a Lambda fails on AWS due to lack of IAM permissions, it would fail locally as well.
- And it's fast! There's nothing to deploy when you make a change!

Note that, everything lives in your AWS account and local machine. No 3rd party services like ngrok or Localtunnel are used.

A caveat is that, you can only have one `sst start` session open per stage. Meaning two people cannot actively develop on the same stage (or environment) of an app at the same time.

Currently, `sst start` only supports Node.js.

## Demo

This demo app deploys a simple Serverless application with:

- An API Gateway endpoint
- An SNS topic
- A Lambda function (`api.js`) that responds to the API and sends a message to the SNS topic
- A Lambda function (`sns.js`) that subscribes to the SNS topic

So once you run `sst start` you'll get a deployed endpoint (say `https://dgib3y82wi.execute-api.us-east-1.amazonaws.com`). Any requests to this endpoint will run the the `api.js` on your local machine, then send a message to the SNS topic which in turn will run `sns.js` on your locally.

The flow looks something like this:

![SST Start Demo Architecture](https://raw.githubusercontent.com/serverless-stack/sst-start-demo/master/sst-start-demo-architecture.png)

### Gettin Started

Start by cloning this repo.

``` bash
$ git clone https://github.com/serverless-stack/sst-start-demo.git
```

Install the dependencies.

``` bash
$ npm install
```

Run `sst start`.

``` bash
$ npx sst start
```

The first time this is run, it'll take a minute or two to deploy the `sst start` debug stack and the demo app. Once complete, you should see something like this:

``` bash
Stack prod-sst-start-demo
  Outputs:
    ApiEndpoint: https://dgib3y82wi.execute-api.us-east-1.amazonaws.com
```

Head over to the URL (`https://dgib3y82wi.execute-api.us-east-1.amazonaws.com`) in your browser. You should see a `Hello World` message and a couple of log messages in your terminal. Including something like this:

``` bash
Logging from inside the API Lambda for route: GET /
...
Logging from inside the SNS Lambda with event message: "Hello from the API Lambda"
```

These are `console.log` messages printed directly from the local versions of your Lambda function.

Now try editing, `src/api.js` or `src/sns.js` and refresh the above URL again.

### Wrapping Up

Finally, you can either deploy this app.

``` bash
$ npx sst deploy
```

Or to remove all the deployed resources (including the debug stack).

``` bash
$ npx sst remove
```

## Feedback

Feel free to send us any feedback or let us know if you have any questions — [contact@anoma.ly](mailto:contact@anoma.ly)

## Community

[Follow us on Twitter](https://twitter.com/ServerlessStack), [join our chatroom](https://gitter.im/serverless-stack/Lobby), or [post on our forums](https://discourse.serverless-stack.com).
