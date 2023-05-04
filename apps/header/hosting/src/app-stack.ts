import { CfnMapping, CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { StaticWebsite } from '../../../../libs/StaticWebsite';
import * as webConfig from '../../web/project.json';

export const domain = 'playground';
export const appName = 'header';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const envParam = new CfnParameter(this, 'Environment', {
      type: 'String',
      description: 'The deployment environment',
      default: 'dev',
    });

    new StaticWebsite(this as any, `${domain}-${appName}`, {
      assets: join('../../../', webConfig.targets.build.options.outputPath),
      domainName: `${domain}.com`,
      siteSubDomain: `${
        envParam.valueAsString === 'prod' ? '' : `${envParam.valueAsString}.`
      }${appName}`,
      hostedZoneId: 'ABC1234567890XYZ',
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
