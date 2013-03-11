(function($) {

	var observer = new MutationSummary({
		queries: [{element: '[data-lifecycle]'}],
		callback: function (summaries) {
			$(summaries[0].added).each(function(index, element) {
				$(element).triggerHandler('insert');
			});

			$(summaries[0].removed).each(function(index, element) {
				$(element).triggerHandler('remove');
			});
		}
	});

	$.fn.lifecycle = function(options) {
		options = options || {};

		if (options.insert) $(this).one('insert', options.insert);
		if (options.remove) $(this).one('remove', options.remove);

		$(this).attr('data-lifecycle', '');
	};

})(jQuery)


