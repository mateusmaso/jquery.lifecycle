jquery.lifecycle
================

This library is an extension for jQuery which allows observing mutation callbacks on a single element.

## Features

* Mutation Observer in background.
* Listen to ```insert```, ```remove``` and ```change``` events of an element.

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
