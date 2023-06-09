import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
// import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

export class AwsCdkPipelinesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline= new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('nsriva13/aws-cdk-pipelines', 'main',
        {
          connectionArn:'arn:aws:codestar-connections:ca-central-1:058453584624:connection/bd81df4f-30d6-49d9-b844-3d3b65f3669c', // Created using the AWS console
        }), 
        commands: ['npm ci', 
                   'npm run build', 
                   'npx cdk synth']
        })
    });
  const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "058453584624", region: "ca-central-1" }
    }));


    // testingStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
    // testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
    //   env: { account: "<accountno>", region: "us-east-1" }
    // }));
  }
}