// jquery.lifecycle
// ----------------
// v0.1.1
//
// Copyright (c) 2013-2014 Mateus Maso
// Distributed under MIT license
//
// http://github.com/mateusmaso/jquery.lifecycle

(function(root, factory) {

  if (typeof exports !== 'undefined') {
    var MutationObserver = global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
    if (typeof module !== 'undefined' && module.exports)
      module.exports = factory(global.$, MutationObserver);
    exports = factory(global.$, MutationObserver);
  } else {
    factory(root.$, root.MutationObserver || root.WebKitMutationObserver || root.MozMutationObserver);
  }

}(this, function($, MutationObserver) {

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var lifecycles = function(node) {
    var nodes = $(node).find('[lifecycle]').toArray();
    if ($(node).is('[lifecycle]')) nodes.push(node);
    return nodes;
  };

  var observeAttribute = function(node, callback) {
    var attributeObserver = new MutationObserver(function(mutations) {
      $.each(mutations, function(index, mutation) {
        var attribute = node.attributes[mutation.attributeName];
        if (!attribute || attribute.value != mutation.oldValue) {
          callback.apply(node, [mutation.attributeName, (attribute ? attribute.value : undefined)]);
        }
      });
    });

    attributeObserver.observe(node, {subtree: false, attributes: true, attributeOldValue: true});

    return attributeObserver;
  };

  var observer = new MutationObserver(function(mutations) {
    $.each(mutations, function(index, mutation) {
      if (mutation.type === 'childList') {
        $.each(mutation.addedNodes, function(index, node) {
          $.each(lifecycles(node), function(index, node) {
            $.each(node.whenInsert || [], function(index, callback) {
              if (!node.inserted) callback.apply(node);
            });
            node.inserted = true;
          });
        });

        $.each(mutation.removedNodes, function(index, node) {
          $.each(lifecycles(node), function(index, node) {
            $.each(node.whenRemove || [], function(index, callback) {
              if (node.inserted) callback.apply(node);
            });
            node.inserted = false;
          });
        });
      }
    });
  });

  $(function() {
    observer.observe(document.body, {childList: true, subtree: true});
  });

  $.fn.lifecycle = function(options) {
    return this.each(function() {
      var element = $(this)[0];

      element.inserted = false;
      element.whenInsert = element.whenInsert || [];
      element.whenRemove = element.whenRemove || [];
      element.whenChange = element.whenChange || [];

      options = options || {};
      if (options.insert) element.whenInsert.push(options.insert);
      if (options.remove) element.whenRemove.push(options.remove);
      if (options.change) element.whenChange.push(observeAttribute(element, options.change));

      $(this).attr('lifecycle', '');
    });
  };

  $.fn.unlifecycle = function() {
    return this.each(function() {
      var element = $(this)[0];

      $.each(element.whenChange, function(index, attributeObserver) {
        attributeObserver.disconnect();
      });

      delete element.inserted;
      delete element.whenInsert;
      delete element.whenRemove;
      delete element.whenChange;

      $(this).removeAttr('lifecycle');
    });
  };

}));
