import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class DeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource ..
    const queue = new sqs.Queue(this, 'DeployQueue', {
      queueName: "simply-serverless-sqs"
    });

    const handler = new lambda.Function(this, "helloSqs", {
      runtime: lambda.Runtime.PYTHON_3_9,
      functionName: "helloSqs",
      code: lambda.Code.fromAsset("../src"),
      handler: "lambda_function.lambda_handler"
    })

    handler.addEventSource(new SqsEventSource(queue))
  }
}
