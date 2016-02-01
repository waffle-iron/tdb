# TechDB

A fresh start. Reboot on 11.23.2015.

## Searching with elastic search
**Attention**: TechDB currently supports ElasticSearch 1.7

We must attach a **river behaviour** to the collection we want to search with ElasticSearch, so it can river all the incoming operations to our ElasticSearch server

```javascript
Organizations.attachBehaviour('river', {
  adapters: [
    new ElasticSearchAdapter(esClient, 'techdb', 'organizations', (doc) => {
      let finalDoc = _.clone(doc);

      let schema = new SimpleSchema({
        name: {
          type: String
        }
      });
      schema.clean(finalDoc);
      return finalDoc;
    })
  ]
});
```

```javascript
class ElasticSearchAdapter
constructor:
@client {elasticSearch.Client} a client instance (from elasticsearch npm package)
@index {String} ElasticSearch index
@type {String} ElasticSearch type
@docTransformer {function} a function that takes the original doc and transforms it before rivering to ElasticSearch
```
*Notes:*
- we must wrap the elasticSearch.Client method's with Async.wrap so we can call the asynchronous methods on a synchronous way
- we should make docTransformer a pure function: it must not change the original doc object, since other adapters may utilize this doc as well. Instead, we must make a copy, mutate and return it


## Log operations
We must attach a **river behaviour** to the collections we want to track updates, passing the LogAdapter as an adapter:

```javascript
Organizations.attachBehaviour('river', {
  adapters: [
    new LogAdapter(Logs, Organizations, function(doc) {
      return doc.name;
    }, {
      trackedFields: ['profile', 'emails', 'username']
    })
  ]
});
```

```javascript
class LogAdapter
constructor:
@logCollection {Collection} the collection where we will store our logs
@collection {Collection} the collection to be tracked
@getDocIdentifier {function} a function to extract the document's identifier
@config {object} a config object
```
we can pass on the config Object the array trackedFields, only fields found on this array will be tracked. If we don't pass this key on the config Object, all fields on the collection will be tracked
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
<template name="userUpdates>
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
```
<template name="mySearch">
  {{> searchSource source=SearchSources.globalSearch options=getOptions}}
</template>
```
This works because there is a global template helper that returns our namespace:
```
Template.registerHelper('SearchSources', () => SearchSources);
```
