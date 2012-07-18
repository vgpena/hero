(function($){
	
	var Photoset = function (photos) {
		this.build(photos);
		
	};
	
	Photoset.prototype = {
		
		constructor: Photoset,
		
		toggleButtons: function(controls){
			var buttonsVisible = false,
				bool,
				photoVisible;
			$('#photos').on('hover', function(){
				bool = $('.photoset').css('display');
				if (bool == "block"){
					if (buttonsVisible == false){
						buttonsVisible = true;
						controls.css("display", "block");
					}
					else{
						buttonsVisible = false;
						controls.hide();
					};
				};
			});

		},
		
		toggleThumbs: function(photoset, latest, controls){
			var setId = photoset.attr('id'),
				photoId,
				thumbs = $('.thumbs#'+setId+'');
			
			controls.hide();
			photoset.hide();
			
			$('li', thumbs).each(function(){
				$(this).removeClass('opened');
				if ($(this).attr('id')==latest){
					$(this).addClass('opened');
				};
			});
			thumbs.show();
		},
		
		build: function (photos) {
			
			controls = $('<div class="controls">');
			nextbutton = $('<div id="next" class="next"><p>&#187;</p></div>');
			prevbutton = $('<div id="prev" class="prev"><p>&#171;</p></div>');
			controls.append(nextbutton);
			controls.append(prevbutton);
			$('#photos').append(controls);
			
			$('.photoset', photos).each(function(){
				$(this).cycle({
					fx: 'fade',
					prev: prevbutton,
					next: nextbutton,
					timeout: 0
				});
			});
			
			Photoset.prototype.toggleButtons(controls);
			
			$('.photoset').on('click', function(){
				var photoset = $(this),
					latest;
				$('.photo', photoset).each(function(){
					var visible = $(this).css('display');
					if (visible == 'block'){
						latest = $(this).attr('id');
					};
				});
				Photoset.prototype.toggleThumbs(photoset, latest, controls);
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