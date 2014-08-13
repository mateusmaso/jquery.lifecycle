jquery.lifecycle [![Build Status](https://travis-ci.org/mateusmaso/jquery.lifecycle.svg?branch=master)](https://travis-ci.org/mateusmaso/jquery.lifecycle)
================

This library is an extension for jQuery which allows observing mutation callbacks on a single element.

## Features

* Mutation Observer in background.
* Listen to ```insert```, ```remove``` and ```change``` events of an element.

## Dependencies

* jquery.js (>= 2.1)

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
