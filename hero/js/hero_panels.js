(function($){
	var that; //you might want to/have to make this more local. But for now...
	var FeatureNav = function (el) {
		that = this;
		this.el = el;
		that.build(el);
	};
	
	FeatureNav.prototype = {
		
		constructor: FeatureNav,
		

		build: function (el) {
			var $this = el;
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
		
		linkedclick: function(link, panel){//once we get going, this might be easier done by eliminating the 'opened' clas
			this.panel = panel;
			if (panel.hasClass('opened')){//don't do anything if this is already the panel being displayed.
				return;
			}
			else{
				$('section', '#hero').each(function(){
					if ($(this).hasClass('opened')){
						$(this).removeClass('opened');
					}
				});
				this.panel.addClass('opened');
				var pos = this.panel.position(),
					displacement = pos.left;
					$('#strip').animate({left: displacement*-1,});
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