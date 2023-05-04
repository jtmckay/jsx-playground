import {
  aws_cognito,
  CfnMapping,
  CfnParameter,
  Duration,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const envParam = new CfnParameter(this, 'Environment', {
      type: 'String',
      description: 'The deployment environment',
      default: 'dev',
    });

    new aws_cognito.UserPool(this, 'playgrounduserpoolid', {
      userPoolName: 'playground-userpool',
      signInCaseSensitive: false, // case insensitive is preferred in most situations
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for Playground!',
        emailBody:
          'Thanks for signing up for Playground! Your verification code is {####}',
        emailStyle: aws_cognito.VerificationEmailStyle.CODE,
        smsMessage:
          'Thanks for signing up for Playground! Your verification code is {####}',
      },
      signInAliases: { username: true, email: true },
      autoVerify: { email: true },
      customAttributes: {
        joinedOn: new aws_cognito.DateTimeAttribute(),
      },
      keepOriginal: {
        email: true,
      },
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        tempPasswordValidity: Duration.days(3),
      },
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
