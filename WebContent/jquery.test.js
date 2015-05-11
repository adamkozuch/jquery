(function($) {

	var methods = {
		show : function(content1, content2) {
			console.log("show: " +  content1 +  " " + content2);
		},
		init : function() {
			console.log("init: ");
		},
		hide : function(content) {
			console.log("hide: " + content);
		}

	};

	$.fn.testText = function(method) {
		
		// Method calling logic
		if (methods[method]) {

			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} 
		 else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} 
		else {
			$.error('Method ' + method + ' does not exist on jQuery.testText');
		}

	};

})(jQuery);