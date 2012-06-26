(function($){
	var that; //you might want to/have to make this more local. But for now...
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
				that.sensitize($(this));
			});
		},
		
		sensitize: function(el){
			var $this = el,
			id = $this.attr('id');
			$('section', '#hero').each(function(){
				if ($(this).attr('id')==id){
					var linked = $(this);
					$this.on('click', linked, function(){
						that.linkedclick($this, linked);
					});
				};
			});
		},
		
		linkedclick: function(link, panel){
			if (panel.hasClass('opened')){//don't do anything if this is already the panel being displayed.
				return;
			}
			else{
				$('section', 'hero').each(function())
			};
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