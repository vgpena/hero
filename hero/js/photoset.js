(function($){
	
	var Photoset = function (photos) {
		this.build(photos);
		
	};
	
	Photoset.prototype = {
		
		constructor: Photoset,
		
		toggleButtons: function(photoset, controls){
			var buttonsVisible = false;
			console.log(controls);	
			$('figure', photoset).on('hover', function(){
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
			
			var openedID;
			controls = $('<div class="controls">');
			nextbutton = $('<div class="next"><p>&#187;</p></div>');
			prevbutton = $('<div class="prev"><p>&#171;</p></div>');
			controls.append(nextbutton);
			controls.append(prevbutton);
			$('.article-content').append(controls);
			
			$('.photoset', photos).each(function(){
				if($(this).hasClass('opened')){
					console.log('opened: '+ $(this).attr('id'));
				}
				else{
					console.log('not opened: '+ $(this).attr('id'));
				};
				$(this).cycle({
					fx: 'fade',
					prev: prevbutton,
					next: nextbutton,
					timeout: 0
				});
				
				//Photoset.prototype.toggleButtons($(this), controls);	
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