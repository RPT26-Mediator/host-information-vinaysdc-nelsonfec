# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### CRUD Routes - Host Information

- Type : GET
  -  Route: /listingID/host
  - Data received :
    _id : 608c90fc005a76c25c43bb97
    hostName : "Silvia Schaefer Sr."
    dateJoined : "August 2021"
    profilePic : "https://airbnbpp.s3-us-west-1.amazonaws.com/146.jpg"
    hostDescription : "Perferendis eum veritatis qui ut consequuntur facere. Vitae molestiae ..."
    reviewCount : 3
    isVerified : false
    isSuperhost : false
    listingID : "0"
    __v : 0


- Type: POST
  - Route: /id/add
  - Data Sent
    _id : 608c90fc005a76c25c43bb97
    hostName : "Silvia Schaefer Sr."
    dateJoined : "August 2021"
    profilePic : "https://airbnbpp.s3-us-west-1.amazonaws.com/146.jpg"
    hostDescription : "Perferendis eum veritatis qui ut consequuntur facere. Vitae molestiae ..."
    reviewCount : 3
    isVerified : false
    isSuperhost : false
    listingID : "0"
    __v : 0


- Type: Update
  - Route : /id/update
  - Expectation: Change any host related information


- Type: Delete
  - Route : /id/delete
  - Expectation : Delete any host information from table

