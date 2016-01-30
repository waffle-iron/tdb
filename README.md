# TechDB

A fresh start. Reboot on 11.23.2015.



## Components
1. Recent Updates
```
{{> recentUpdates}}
@params:
counterId {String} a unique id to be used on the reactive counter plublication
selector {Object} mongo selector to filter updates
initialCount {Integer} (optional, defaults to 5) initial number of loaded updates
countIncrement {Integer} (optional, defaults to 5) number of new updates loaded per request
```
Example, filter all updates from a specific user:

**template.html**
```
<template name="userUpdates>
{{> recentUpdates counterId='user' selector=userSelector initialCount=20}}
</template>
```
**template.js**
```
Template.userUpdates.helpers({
  userSelector() {
    return {
      userId: 'cqd2odEAQm6xhHkjQs'
    }
  }
})
```
2. Search Source
```
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
```
<template name="mySearch">
  {{> searchSource source=globalSource options=getOptions}}
</template>
```
**template.js**
```
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
