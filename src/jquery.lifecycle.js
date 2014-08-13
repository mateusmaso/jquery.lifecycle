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

  var lifecycles = function(node) {
    var nodes = $(node).find('[lifecycle]').toArray();
    $(node).is('[lifecycle]') && nodes.push(node);
    return nodes;
  };

  var observeAttribute = function(node, callback) {
    var attributeObserver = new MutationObserver(function(mutations) {
      $.each(mutations, function(index, mutation) {
        var attribute = node.attributes[mutation.attributeName];
        callback.apply(node, [mutation.attributeName, (attribute ? attribute.value : undefined)]);
      });
    });

    attributeObserver.observe(node, {subtree: false, attributes: true});

    return attributeObserver;
  };

  var observer = new MutationObserver(function(mutations) {
    $.each(mutations, function(index, mutation) {
      if (mutation.type === 'childList') {
        $.each(mutation.addedNodes, function(index, node) {
          $.each(lifecycles(node), function(index, node) {
            $.each(node.whenInsert || [], function(index, callback) {
              callback.apply(node);
            });
          });
        });

        $.each(mutation.removedNodes, function(index, node) {
          $.each(lifecycles(node), function(index, node) {
            $.each(node.whenRemove || [], function(index, callback) {
              callback.apply(node);
            });
          });
        });
      }
    });
  });

  $(function() {
    observer.observe(document.body, {childList: true, subtree: true});
  });

  $.fn.lifecycle = function(options) {
    var element = $(this).get(0);

    element.whenInsert = element.whenInsert || [];
    element.whenRemove = element.whenRemove || [];
    element.whenChange = element.whenChange || [];

    options = options || {};
    if (options.insert) element.whenInsert.push(options.insert);
    if (options.remove) element.whenRemove.push(options.remove);
    if (options.change) element.whenChange.push(observeAttribute(element, options.change));

    $(this).attr('lifecycle', '');
  };

  $.fn.unlifecycle = function() {
    var element = $(this).get(0);

    $.each(element.whenChange, function(index, attributeObserver) {
      attributeObserver.disconnect();
    });

    delete element.whenInsert;
    delete element.whenRemove;
    delete element.whenChange;

    $(this).removeAttr('lifecycle');
  };

}));