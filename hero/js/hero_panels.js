(function($){
	
	var FeatureNav = function (el) {
		var that = this;
		this.el = el;
		that.build(el);
	};
	
	FeatureNav.prototype = {
		
		constructor: FeatureNav,
		
		build: function (el) {
			var $this = el,
				that = this;
			$('li', $this).each(function(){
				that._sensitize($(this));
			});
		},
		
		_sensitize: function(el){
			var $this = el,
				that = this;
			id = $this.attr('id');
			$('section', '#hero').each(function(){
				if ($(this).attr('id')==id){
					var linked = $(this);
					$this.on('click', linked, function(){
						that._linkedclick(linked);
					});
				};
			});
		},
		
		_linkedclick: function(panel){
			var panel = panel,
				pos = panel.position(),
				displacement = pos.left;
			$('#strip').animate({left: displacement*-1,});
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