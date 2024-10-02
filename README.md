# Invedent

Invedent Senior Engineer Coding Challenge: Event-Driven Inventory and Budget Management

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install required dependecies.

```bash
npm install
```

## To Test

```bash
npm run test
```

## Design decision

1. I moved the `interfaces` in another file and folder so I can import it in different location(test) and for better structure.
2. I used `Jest` as my unit testing tool because if offers the simplest unit test to work on.

## Deployment Suggestion in AWS Environment

Inventory system could be a demanding website and it should be in a environment that handles Auto-scaling and load balancing feature to ensure the demand of the application. I suggest using AWS Elastic Beanstalk on this kind of application because it offers most of the feature that make the deployment, versioning and monitoring easier and flexible. I could be connected as well with pipelines for the CI/CD approach of the deployment and integration.

## Discuss to scale this system to handle larger volumes of data and transactions.

There are ways to handle large volumes of data and transaction.

1. The application can utilizes microservices that scale according to demand, which can lead to reduced costs over time and simplify maintenance.
2. Sharding can be implemented to manage database into into smaller instances so performance is manageable.
3. Queueing could be one the best way to handle large volume transaction. it maintains the performance and avoid overwhelming demands to the server.
4. Auto-Scaling the server like in AWS is very much needed in a application where it act real-time and support the application to scale up depending on what it needs like horizontal scaling to dynamically creates resources to distribute the load and vertical scaling to increase the performance of the server while on demand.

## Consider and comment on how you would handle additional real-world complexities such as currency conversions or different timezones.

When dealing with real-world complexities like currency conversions and different timezones, it's essential to implement robust logic to ensure accurate calculations and avoid discrepancies. It can be handled be looking for a reliable source of the data for precise implemention. Tighten the data validation and error handling to make sure the reliability.
