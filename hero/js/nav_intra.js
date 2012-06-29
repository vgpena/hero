(function($){
	
	var IntraNav = function (section) {
		var that = this;
		that.build(section);
	};
	
	IntraNav.prototype = {
		
		constructor: IntraNav,
		
		build: function (section) {
			var content = $('.content', section),
				thumbs = $('.thumbs', section);
			$('figure', thumbs).each(function(){
				var id = $(this).attr('id'),
					thumb = $(this);
				$('article', section).each(function(){
					if ($(this).attr('id')==id){
						var elt = $(this),
							prev;
						thumb.on('click', elt, function(){
							
							$('article', content).each(function(){
								if ($(this).hasClass('opened')){
									prev = $(this);
									return false;
								};
							});
							
							prev.removeClass('opened');
							prev.hide();
							
							elt.fadeIn(800);
							elt.addClass('opened');
							$('figure', thumbs).each(function(){
								if ($(this).hasClass('opened')){
									$(this).removeClass('opened');
								};
							});
							thumb.addClass('opened');
						});
					};
				});
			});
		},
	};

	$.fn.intraNav = function (arg) {
		return this.each(function(){
			var $this = $(this),
				data = $this.data('intraNav'),
				options = $.extend({}, $.fn.intraNav.defaults, arg, typeof option == 'object' && option);
			
			if (data) {
				data[arg]();
			}else{
				$this.data('intraNav', new IntraNav($this, options));
			};
		});
	};
	
	$.fn.intraNav.defaults = {
		'exit': 'hide',
		'enter': ('fadeIn', 800);
	};
	

	$(function(){
		$('#stories').intraNav({
			'enter': 'show';
		});
		$('#photos').intraNav({
			'exit': ('fadeOut', 800);
		});
	});
	
}(jQuery));