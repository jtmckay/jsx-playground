import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppStack } from './app-stack';

test('Empty Stack', () => {
  const app = new App();
  // WHEN
  const stack = new AppStack(app, 'spa-hostingTestStack');

  const template = Template.fromStack(stack);
  // THEN
  template.templateMatches(
      Template.fromJSON({
        Parameters: {
          Environment: {
            Type: 'String',
            Default: 'dev',
            Description: 'The deployment environment',
          },
        },
        Mappings: {
          EnvironmentMapping: {
            dev: {
              configParameter: 'dev-config-value',
            },
            prod: {
              configParameter: 'prod-config-value',
            },
          },
        },
        Resources: {},
      })
  );
});
