jquery.lifecycle [![Build Status](https://travis-ci.org/mateusmaso/jquery.lifecycle.svg?branch=master)](https://travis-ci.org/mateusmaso/jquery.lifecycle)
================

This library is an extension for jQuery which allows observing mutation changes.

## Features

* Support of DOM 4 Mutation Observer API.
* Listen to ```insert```, ```remove``` and ```change``` events.

## Dependencies

* jquery.js (>= 2.1.0)

## Examples

### Start observing mutation events

```javascript
$(element).lifecycle({
  insert: function() { ... },
  remove: function() { ... },
  change: function(attribute, value) { ... }
});
```

### Stop observing mutation events

```javascript
$(element).unlifecycle();
```

## License

Copyright (c) 2013-2014 Mateus Maso. Released under an MIT license.
