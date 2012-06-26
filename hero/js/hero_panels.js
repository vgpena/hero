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
						that._linkedclick($this, linked);
					});
				};
			});
		},
		
		_linkedclick: function(link, panel){
			var panel = panel,
				link = link,
				pos = panel.position(),
				displacement = pos.left;
			if (link.hasClass('opened')){//this part will change the styling on the link of the visible panel.
				return;
			}
			else{
				$('li', 'nav.features').each(function(){
					if ($(this).hasClass('opened')){
						$(this).removeClass('opened');
					}
				});
				link.addClass('opened');
			};
			$('#strip').animate({left: displacement*-1}, '50');
		},
	};

	$.fn.featureNav = function (arg) {
		return this.each(function(){
			var $this = $(this),
				data = $this.data('features');
			
			if (data) {
				data[arg]();
			}else{
				$this.data('features', new FeatureNav($this));
			};
		});
	};
	

	$(function(){
		$('nav.features').featureNav();
	});
	
}(jQuery));