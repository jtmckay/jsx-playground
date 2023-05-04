import {
  CloudFrontWebDistribution,
  SSLMethod,
  SecurityPolicyProtocol,
  OriginProtocolPolicy,
  ViewerProtocolPolicy,
  CloudFrontAllowedMethods,
  ViewerCertificate,
} from 'aws-cdk-lib/aws-cloudfront'
import { Construct } from 'constructs'
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib'
import { Bucket, RedirectProtocol } from 'aws-cdk-lib/aws-s3'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { IHostedZone, HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'

export interface StaticWebsiteProps {
  domainName: string
  siteSubDomain: string
  assets: string
  hostedZoneId?: string
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticWebsite extends Construct {
  constructor(parent: Construct, name: string, props: StaticWebsiteProps) {
    super(parent, name)

    let zone: IHostedZone
    if (props.hostedZoneId) {
      zone = HostedZone.fromHostedZoneAttributes(this, 'Zone', {
        zoneName: props.domainName,
        hostedZoneId: props.hostedZoneId,
      })
    } else {
      zone = HostedZone.fromLookup(this, 'Zone', {
        domainName: props.domainName,
      })
    }

    new CfnOutput(this, 'Site', {
      value: 'https://' + props.siteSubDomain + '.' + props.domainName,
    })

    // Content bucket
    const siteBucket = new Bucket(this, 'SiteBucket', {
      bucketName: props.siteSubDomain + '.' + props.domainName,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    // const redirectSiteBucket = new Bucket(this, 'RedirectSiteBucket', {
    //   bucketName: props.domainName,
    //   websiteRedirect: {
    //     hostName: props.siteSubDomain + '.' + props.domainName,
    //     protocol: RedirectProtocol.HTTPS,
    //   },
    //   removalPolicy: RemovalPolicy.DESTROY,
    // })

    const cert = new acm.Certificate(this, 'Certificate', {
      domainName: props.siteSubDomain + '.' + props.domainName,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const viewerCertificateSubdomain = ViewerCertificate.fromAcmCertificate(cert, {
      aliases: [props.siteSubDomain + '.' + props.domainName],
    })

    // CloudFront distribution that provides HTTPS
    const distribution = new CloudFrontWebDistribution(this, 'SiteDistribution', {
      viewerCertificate: viewerCertificateSubdomain,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket,
          },
          behaviors : [ {isDefaultBehavior: true} ],
        },
      ],
    })

    new CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    })

    // const viewerCertificate = ViewerCertificate.fromIamCertificate('MYIAMROLEIDENTIFIER', {
    //   aliases: [props.domainName],
    // })

    // const redirectDistribution = new CloudFrontWebDistribution(this, 'RedirectSiteDistribution', {
    //   viewerCertificate,
    //   viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //   originConfigs: [
    //     {
    //       s3OriginSource: {
    //         s3BucketSource: siteBucket,
    //       },
    //       behaviors : [ {isDefaultBehavior: true} ],
    //     },
    //     {
    //       customOriginSource: {
    //         domainName: redirectSiteBucket.bucketWebsiteDomainName,
    //         originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
    //       },
    //       behaviors: [
    //         {
    //           isDefaultBehavior: true,
    //           allowedMethods: CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
    //         },
    //       ],
    //     },
    //   ],
    // })
    // new CfnOutput(this, 'RedirectDistributionId', {
    //   value: redirectDistribution.distributionId,
    // })

    // Route53 alias record for the CloudFront distribution
    new ARecord(this, 'SiteAliasRecord', {
      recordName: props.siteSubDomain + '.' + props.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    })

    // new ARecord(this, 'RedirectSiteAliasRecord', {
    //   recordName: props.domainName,
    //   target: RecordTarget.fromAlias(new CloudFrontTarget(redirectDistribution)),
    //   zone,
    // })

    // Deploy site contents to S3 bucket
    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset(props.assets)],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    })
  }
}
