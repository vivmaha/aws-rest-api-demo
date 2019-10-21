# aws-rest-api-demo
REST API w/ Serverless Framework, Typescript, NodeJS, AWS API Gateway, Lambdas &amp; DynamoDB.

# Deployment 

`npm run deploy` deploys the app.

`npm run package` generates the deployment package.

Pre-requisites:
- [Install the AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
- [Obtain AWS access keys](https://console.aws.amazon.com/iam/home?region=us-east-2#/security_credentials)
- Run `aws configure`
  - Obtain the access keys from the [AWS Console](https://console.aws.amazon.com/iam/home?region=us-east-2#/security_credentials)
  - Use the `us-west-2` for region


# Development

`npm run build` to compile code. 

`npm run lint` to show lint errors.

`npm run lint -- --fix` to fix automatically-fixable lint errors.

The above linters are triggered on every commit, so you don't have to remeber to run them manually.
