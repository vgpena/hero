(function($){
	
	var IntraNav = function (section, options) {
		var options = options;
		this.build(section, options);
	};
	
	IntraNav.prototype = {
		
		constructor: IntraNav,
		
		build: function (section, options) {
			var content = $('.content', section),
				navlinks = $('.navlinks', section);
			$('li', navlinks).each(function(){
				var id = $(this).attr('id'),
					link = $(this);
				$('article', section).each(function(){
					if ($(this).attr('id')==id){
						var elt = $(this),
							prev;
						link.on('click', elt, function(){
							if (!link.hasClass('opened')){
								$('article', content).each(function(){
									if ($(this).hasClass('opened')){
										prev = $(this);
										return false;
									};
								});
								prev.removeClass('opened');
								prev[options['exit']]();

								elt[options['enter']]();
								elt.addClass('opened');
								$('li', navlinks).each(function(){
									if ($(this).hasClass('opened')){
										$(this).removeClass('opened');
									};
								});
								link.addClass('opened');
							};
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
		'exitSpeed': 0,
		'enter': 'fadeIn',
		'enterSpeed': 800,
	};
	

	$(function(){
		$('#stories').intraNav({
			'enter': 'show',
			'enterSpeed': 0,
		});
		$('#photos').intraNav({
			'exit': 'fadeOut',
			'exitSpeed': 400,
		});
	});
	
}(jQuery));