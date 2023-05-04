import { Stack, StackProps, CfnParameter, CfnMapping } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const envParam = new CfnParameter(this, 'Environment', {
      type: 'String',
      description: 'The deployment environment',
      default: 'dev',
    });

    new CfnMapping(this, 'EnvironmentMapping', {
      mapping: {
        dev: {
          configParameter: 'dev-config-value',
        },
        prod: {
          configParameter: 'prod-config-value',
        },
      },
    });
  }
}
