#EbayAlerts
![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/npm/v/editor.md.svg)

### Introduction

The purpose of this project is to train a FullStack skills with NodeJS and React technologies and its open to who wanna practice together.

## Features

- Manage alerts for products prices on Ebay.com to be sent to provided email;
- Each alert will be related with a search phrase and interval to send the email;
- Interval is a value in minutes and must have one of the following values:

```javascript
const interval = [2, 10, 30];
```

- The email must to have the first 3 products searched by the phrase, sorted by the lowest price;
- Several alerts can be created for the same email address byt with different search phrases;
- The UI(s) must to provide a list with all alerts registered and a CRUD interfaces;

#### Aditional Technologies Envolved

- MongoDB to maintain data;
- Redis to manage the email queue;
- Sentry to register production erros;
- Docker to containerize the solution and a docker-compose to run whole environment;
- TDD with Jest;
- Airbnb Style Guide;
- JSDocs

```javascript
/**
* Description
* @param {type} paramName
*/
function myFuntion(paramName){...}
```

### Ebay Search API

![](https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg)

You need to create a client app account in eBay to obtain the App ID and use the search API at https://developer.ebay.com
