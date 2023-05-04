import * as cdk from 'aws-cdk-lib';
import { AppStack } from './stacks/app-stack';

const app = new cdk.App();
new AppStack(app, 'analytics-dev');
