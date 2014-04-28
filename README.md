jquery.lifecycle
================

This library is an extension for jQuery which allows to observe mutation callbacks on a single element.

## Features

* Listen to ```insert```, ```remove``` and ```change``` events of an element.
* Uses Mutation Observer in background.

## Dependencies

* jquery.js (>= 2.0)

## Examples

### Start observing mutation events

```javascript
$(element).lifecycle({
  insert: function() { ... }, 
  remove: function() { ... },
  change: function(attribute) { ... }
});
```

### Stop observing mutation events

```javascript
$(element).unlifecycle();
```

## License

Copyright (c) 2013-2014 Mateus Maso. Released under an MIT license.
