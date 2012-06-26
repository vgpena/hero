(function($){
	var that;
	var FeatureNav = function (el) {
		that = this;
		this.el = el;
		console.log('new featureNav! :D');
		that.build(el);
	};
	
	FeatureNav.prototype = {
		
		constructor: FeatureNav,
		

		build: function (el) {
			var $this = el;
			console.log('building');
			$('li', $this).each(function(){
				console.log($(this));
				that.sensitize($(this));
			});
		},
		
		sensitize: function(el){
			var $this = el;
			console.log("sensitized: "+$this.html());
		},
	};
	

	$.fn.featureNav = function (arg) {
		return this.each(function(){
			var $this = $(this),
				data = $this.data('features'),
				options = $.extend({}, $.fn.featureNav.defaults, arg, typeof option == 'object' && option);
			
			if (data) {
				data[arg]();
			}else{
				$this.data('features', new FeatureNav($this, options));
			};
		});
	};
	

	$(function(){
		$('nav.features').featureNav();
	});
	
}(jQuery));