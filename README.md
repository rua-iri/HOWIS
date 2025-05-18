# HOWIS

Fullstack project to check a website's status from a number of different lambda functions.

<sub>
(Yes, it's a play on the misspelling of WHOIS)
</sub>

## Demo

[You can try out the Project here](https://howis.rua-iri.com/)

## Design

The backend is built using AWS SAM, utilising various AWS services, which can be seen in the diagram below.

Each health check lambda function will send a HEAD request to a given domain and store the results of these requests in a DynamoDB table.

The frontend is using Preact + Vite, deployed using Vercel.

## Lighthouse Report

![image](https://github.com/user-attachments/assets/98c7d60a-dd53-4f18-8bd8-e09a5bc8a529)

## Infrastructure Diagram

![HOWIS Infra Diagram(3)](https://github.com/user-attachments/assets/ee0b60ea-f8e3-43fe-9075-d078e13e65f5)

## API Endpoints

`POST /up?site=<site_url>`

`GET /status?id=<item_id>`

> **_NOTE:_** The third lambda function is triggered by AWS SNS, and does not have a publicly accessible API endpoint

## Setup

Ensure that you have a SAM CLI installed by running

```bash
sam --version
```

Then clone the repository and deploy the backend

```bash
git clone https://github.com/rua-iri/HOWIS

cd aws_lambda

make deploy
```

Then run the frontend locally

```bash
cd preact_frontend

npm install

cp .example.env .env

npm run dev
```

> **_NOTE:_** You should populate the environment file with your own API's base url
