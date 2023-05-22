#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkPipelinesStack } from '../lib/aws-cdk-pipelines-stack';

const app = new cdk.App();
new AwsCdkPipelinesStack(app, 'AwsCdkPipelinesStack', {
  env: {
    account: '058453584624',
    region: 'ca-central-1',
  }
});