# recentUpdates
Will draw a box with a list of recent updateds inside a scrollable region and buttons to load more or load less results. 
The updates will arrive in real time as they are created on our server

## Usage
```js

@params:
  counterId: {String} a unique id to be used on the reactive counter plublication
  selector: {Object} mongo selector to filter updates
  initialCount: {Integer} (optional, defaults to 5) initial number of loaded updates
  countIncrement: {Integer} (optional, defaults to 5) number of new updates loaded per request
```

```handlebars
{{> recentUpdates }}
```

## Example
Filter all updates from a specific user:

**client**
```handlebars
<template name="userUpdates">
  {{> recentUpdates counterId='recentUpdatesCounter' selector=userSelector initialCount=20}}
</template>
```

```js
Template.userUpdates.helpers({
  userSelector() {
    return {
      userId: 'cqd2odEAQm6xhHkjQs'
    }
  }
});
```

**server**
```js
Meteor.publish('recentUpdatesCounter', function(selector) {
  Counts.publish(this, 'recentUpdatesCounter', Logs.find(selector));
});
```
