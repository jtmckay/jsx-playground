import { App } from 'aws-cdk-lib';
import { AppStack, domain, appName } from './app-stack';

const app = new App();
new AppStack(app, `${domain}-${appName}-hosting`);
