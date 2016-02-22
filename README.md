# TechDB [![Build Status](https://travis-ci.org/envisioning/techdb.svg?branch=master)](https://travis-ci.org/envisioning/techdb) [![Code Climate](https://codeclimate.com/github/envisioning/techdb/badges/gpa.svg)](https://codeclimate.com/github/envisioning/techdb)

A fresh start. Reboot on 11.23.2015.


## Installation

Create a `.env` file on the project root with the following variables. To add the environment variables we are using the [meteor-dotenv](https://github.com/okgrow/meteor-dotenv) package.

| Environment Variable         | Description                                                                        |
|------------------------------|------------------------------------------------------------------------------------|
| AWS_ACCESS_KEY_ID            | Used for file uploads - http://aws.amazon.com                                      |
| AWS_SECRET_ACCESS_KEY        | Used for file uploads - http://aws.amazon.com                                      |
| AWS_S3_BUCKET                | Used for file uploads - http://aws.amazon.com                                      |
| AWS_S3_FOLDER                | Used for file uploads - http://aws.amazon.com                                      |
| AWS_S3_REGION                | Used for file uploads - http://aws.amazon.com                                      |
| CLOUDINARY_ACCESS_KEY_ID     | Used for transform images - http://cloudinary.com                                  |
| CLOUDINARY_SECRET_ACCESS_KEY | Used for transform images - http://cloudinary.com                                  |
| MAIL_URL                     | SMTP for sending emails - https://mailgun.com                                      |
| ELASTICSEARCH_URL            | ElasticSearch server - http://searchly.com                                         |


## Searching with elastic search
**Attention**: TechDB currently supports ElasticSearch 1.7

Simply use ```esDriver: true``` on your SimpleSchema keys that you want to river to ElasticSearch.

Only updates on those fields will trigger the river.

```javascript
Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    logDriver: true
  },
  foundingYear: {
    type: Number,
    logDriver: true
  },
  country: {
    type: String,
    esDriver: true,
    autoform: {
      type: 'countryFlags'
    }
  },
...
```
Then tell Mongo.Collection to use esDriver, passing an elasticsearch client instance, the **index** and the **type**. You can optionally pass a function to transform the doc before sending it to elasticsearch. In this function you can access the cleanedDoc (filtered doc excluding fields that does not have esDriver: true, the original doc and a reference to the hook function who called this action) (*should only exist on server since client does not know about elastic search*)
```javascript
Meteor.isServer && Organizations.esDriver(esClient, 'techdb', 'organizations', (cleanedDoc, doc, hook) => {
 // return doc
});
```
```javascript

```
*Notes:*
- we must wrap the elasticSearch.Client method's with Async.wrap so we can call the asynchronous methods on a synchronous way
- we should make docTransformer a pure function: it must not change the original doc object, since other adapters may utilize this doc as well. Instead, we must make a copy, mutate and return it


## Log operations

Simply use ```logDriver: true``` on your SimpleSchema keys that you want to watch for updates
```javascript
Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  foundingYear: {
    type: Number,
    esDriver: true,
    logDriver: true
  },
  country: {
    type: String,
    esDriver: true,
    logDriver: true,
    autoform: {
      type: 'countryFlags'
    }
  },
  ...
```
Then tell Mongo.Collection to use esDriver, passing the **collection** where you want to store the Logs and a function that returns how should the doc be identified. Attaching this to the Collection makes it log Inserts, Deletes and Updates on fields with ```logDriver: true```
```javascript
Meteor.users.logDriver(Logs, (doc, hook) => {
  let tDoc = hook.transform();
  return tDoc.identification(['username', 'email', 'fullName']);
});
```


**TODO**
We must provide a way to specify a custom text for each operation



## Components
### Recent Updates
- Will draw a box with a list of recent updateds inside a scrollable region and buttons to load more or load less results.
- The updates will arrive in real time as they are created on our server

```javascript
{{> recentUpdates}}
@params:
counterId {String} a unique id to be used on the reactive counter plublication
selector {Object} mongo selector to filter updates
initialCount {Integer} (optional, defaults to 5) initial number of loaded updates
countIncrement {Integer} (optional, defaults to 5) number of new updates loaded per request
```
Example, filter all updates from a specific user:

**template.html**
```html
<template name="userUpdates">
{{> recentUpdates counterId='user' selector=userSelector initialCount=20}}
</template>
```
**template.js**
```javascript
Template.userUpdates.helpers({
  userSelector() {
    return {
      userId: 'cqd2odEAQm6xhHkjQs'
    }
  }
})
```
### SearchSource

- Will draw a search input, with an icon indicating status (loaded, loading or error), will print some search metadata (time to execute the query on elasticsearch and total number of results)
- Will bring new results as you type, with an input throttle delay
```javascript
{{> searchSource}}
Params:
@source: {SearchSource} a SearchSource instance
@options: {Object} (optional) options to pass with the search method of SearchSource
``` 
pre defined search sources:
- globalSearch: will search for title and description on technologies, organizations, projects and attachments *
- userSearch: will search for fullName, username and email on users

Example: search with globalSearch but only get results from technologies or organizations
**template.html**
```javascript
<template name="mySearch">
  {{> searchSource source=globalSource options=getOptions}}
</template>
```
**template.js**
```javascript
Template.mySearch.helpers({
  globalSource() {
    return globalSearch;
  },
  getOptions: {
    types: ['technologies','organizations']
  }
})
```
Best practices:
define your SearchSource's on a global namespace object called SearchSources
Then retrieve your SearchSource intance with 
```javascript
<template name="mySearch">
  {{> searchSource source=SearchSources.globalSearch options=getOptions}}
</template>
```
This works because there is a global template helper that returns our namespace:
```javascript
Template.registerHelper('SearchSources', () => SearchSources);
```
