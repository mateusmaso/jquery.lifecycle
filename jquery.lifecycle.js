(function($) {

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var lifecycles = function(node) {
    var nodes = $(node).find('[lifecycle]').toArray();
    $(node).is('[lifecycle]') && nodes.push(node);
    return nodes;
  };

  var observer = new MutationObserver(function(mutations) {
    $.each(mutations, function(index, mutation) {
      if (mutation.type === 'childList') {
        $.each(mutation.addedNodes, function(index, node) {
          $.each(lifecycles(node), function(index, node) {
            $.each(node.whenInsert || [], function(index, callback) {
              callback();
            });
            delete node.whenInsert;
          });
        });

        $.each(mutation.removedNodes, function(index, node) {
          $.each(lifecycles(node), function(index, node) {
            $.each(node.whenRemove || [], function(index, callback) {
              callback();
            });
            delete node.whenRemove;
          });
        });
      }
    });
  });

  $(function() {    
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
  });

  $.fn.lifecycle = function(options) {
    var element = $(this).get(0);
    element.whenInsert = element.whenInsert || [];
    element.whenRemove = element.whenRemove || [];

    options = options || {};
    options.insert && element.whenInsert.push(options.insert);
    options.remove && element.whenRemove.push(options.remove);

    $(this).attr('lifecycle', '');
  };

})(jQuery);
