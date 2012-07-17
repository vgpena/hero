(function($){
	
	var Photoset = function (photos) {
		this.build(photos);
		
	};
	
	Photoset.prototype = {
		
		constructor: Photoset,
		
		toggleButtons: function(photo){
			var buttonsVisible = false,
				controls = $('.controls', photo);
				
			photo.on('hover', function(){
				if (buttonsVisible == false){
					buttonsVisible = true;
					controls.show();
				}
				else{
					buttonsVisible = false;
					controls.hide();
				};
			});

		},
		
		build: function (photos) {
			$('.photoset', photos).each(function(){
				$('.photo', $(this)).each(function(){
					var current = $('figure', $(this));
					current.controls = $('<div class="controls" >').hide();
					current.nextbutton = $('<div class="next"><p>&#187;</p></div>');
					current.prevbutton = $('<div class="prev"><p>&#171;</p></div>');
					current.append(current.controls);
					current.controls.append(current.nextbutton);
					current.controls.append(current.prevbutton);
					Photoset.prototype.toggleButtons(current);
				});				
			});
			
		},
	};

	$.fn.photoset = function (arg) {
		return this.each(function(){
			var $this = $(this),
				data = $this.data('photoset');
			
			if (data) {
				data[arg]();
			}else{
				$this.data('photoset', new Photoset($this));
			};
		});
	};
	
		$(function(){
			$('#photos').photoset();
		});
	
}(jQuery));