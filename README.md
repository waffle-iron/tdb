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
Template.userUpdates.helpers({
  userSelector() {
    return {
      userId: 'cqd2odEAQm6xhHkjQs'
    }
  }
})
