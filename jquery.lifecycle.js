(function($) {

  var observer = new MutationSummary({
    queries: [{element: '[lifecycle]'}],
    callback: function (summaries) {
      $(summaries[0].added).each(function(index, element) {
        if (element.whenInsert) {
          $(element.whenInsert).each(function(index, callback) {
            callback();
          });
          delete element.whenInsert;
        }
      });

      $(summaries[0].removed).each(function(index, element) {
        if (element.whenRemove) {
          $(element.whenRemove).each(function(index, callback) {
            callback();
          });
          delete element.whenRemove;
        }
      });
    }
  });

  $.fn.lifecycle = function(options) {
    options = options || {};

    element = this.get(0);
    element.whenInsert = element.whenInsert || [];
    element.whenRemove = element.whenRemove || [];

    if (options.insert) element.whenInsert.push(options.insert);
    if (options.remove) element.whenRemove.push(options.remove);

    this.attr('lifecycle', '');
  };

})(jQuery)
