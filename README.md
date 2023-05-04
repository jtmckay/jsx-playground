# JSX Playground

## Get Started

Run `yarn`

## Development server

Run `nx serve playground-web` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Apps Overview

- Analytics - Monitor traffic (TODO)
- Authentication - Signup/Login using AWS Cognito
- Authorization - Payments using Stripe
- Chat - Contextualizsed ChatGPT integration (TODO)
- Playground - Web Application

Each app has its own hosted UI that is independent of the others and is responsible for its own persistence.

The authorization app will create its own user table using the userId through authentication. When a user takes an action that requires authorization it will use the authorization service to verify access.

## Manual steps taken

1. Create a Hosted Zone in Route53
2. Given the HostedZoneID from R53, configure the hosting apps in this repo
3. Given the name servers from R53, create NS records in DNS for the subdomains `app`, `dev`, `login`, `pay`, and `analytics`

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.
