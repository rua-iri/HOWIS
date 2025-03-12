# whats_up_check

AWS SAM project to check a website's status from a number of global regions.

Each health check lambda function will send a HEAD request to a given domain and store the results of these requests in a DynamoDB table. 


## Infrastructure Diagram

![whats_up_check Diagram(3)](https://github.com/user-attachments/assets/ee0b60ea-f8e3-43fe-9075-d078e13e65f5)



## Endpoints 

`POST /up?site=<site_url>`


`GET /status?id=<item_id>`




## Setup

Ensure that you have a SAM CLI installed by running

```bash
sam --version
```

Then clone the repository and run the deployment script

```bash
git clone https://github.com/rua-iri/whats_up_check

./deploy.sh
```
