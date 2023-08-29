# `sst start`

A sample project to demo the new `sst start` command. This repo was bootstrapped with [Serverless Stack Toolkit (or SST)](https://github.com/serverless-stack/serverless-stack). SST is an extension of [AWS CDK](https://aws.amazon.com/cdk/) and is designed for developing Serverless apps on AWS.

---

The new `sst start` command starts up a local development environment that opens a WebSocket connection to your deployed app and proxies any Lambda requests to your local machine. This allows you to:

[![sst start](https://d1ne2nltv07ycv.cloudfront.net/SST/sst-start-demo/sst-start-demo-2.gif)](https://d1ne2nltv07ycv.cloudfront.net/SST/sst-start-demo/sst-start-demo-2.mp4)

- Work on your Lambda functions locally
- While, interacting with your entire deployed AWS infrastructure
- Supports all Lambda triggers, so there's no need to mock API Gateway, SQS, SNS, etc.
- Supports real Lambda environment variables
- And Lambda IAM permissions, so if a Lambda fails on AWS due to lack of IAM permissions, it would fail locally as well.
- And it's fast! There's nothing to deploy when you make a change!

Note that, everything lives in your AWS account and local machine. No 3rd party services like ngrok or Localtunnel are used.

A caveat is that, you can only have one `sst start` session open per stage. Meaning two people cannot actively develop on the same stage (or environment) of an app at the same time.

Currently, `sst start` only supports Node.js.

[**View the SST docs**](https://docs.serverless-stack.com).

## Demo

The demo app deploys a simple Serverless application with the following:

- An API Gateway endpoint
- An SNS topic
- A Lambda function (`api.js`) that responds to the API and sends a message to the SNS topic
- A Lambda function (`sns.js`) that subscribes to the SNS topic

This is a simple CDK app with one key modification to the Lambda functions. Instead of using `cdk.lambda.Function`, it uses `sst.Function`.

``` diff
- cdk.lambda.Function
+ sst.Function
```

So once you run `sst start` you'll get a deployed endpoint (say `https://dgib3y82wi.execute-api.us-east-1.amazonaws.com`). Any requests to this endpoint will run the the `api.js` on your local machine, then send a message to the SNS topic which in turn will run `sns.js` on your local.

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

```
Stack dev-sst-start-demo-sample
  Status: deployed
  Outputs:
    ApiEndpoint: https://dgib3y82wi.execute-api.us-east-1.amazonaws.com
```

Head over to the URL (`https://dgib3y82wi.execute-api.us-east-1.amazonaws.com`) in your browser. You should see a `Hello World` message and a couple of log messages in your terminal. Including something like this:

```
Logging from inside the API Lambda for route: GET /
...
Logging from inside the SNS Lambda with event message: "Hello from the API Lambda"
```

These are `console.log` messages printed directly from the local versions of your Lambda function.

Now try editing, `src/api.js` or `src/sns.js` and refresh the above URL again.

## Wrapping up

Finally, you can either deploy this app.

``` bash
$ npx sst deploy
```

And to remove all the deployed resources (including the debug stack).

``` bash
$ npx sst remove
```

## Community

[Follow us on Twitter](https://twitter.com/ServerlessStack), [join us on Slack][slack], [post on our forums](https://discourse.serverless-stack.com), and [subscribe to our newsletter](https://emailoctopus.com/lists/1c11b9a8-1500-11e8-a3c9-06b79b628af2/forms/subscribe).
