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
			$('.photoset', photos).each(function(){
				var thisID = $(this).attr('id');
				controls = $('<div class="controls" id='+thisID+' >');
				nextbutton = $('<div id="next-'+thisID+'" class="next"><p>&#187;</p></div>');
				prevbutton = $('<div id="prev-'+thisID+'" class="prev"><p>&#171;</p></div>');
				controls.append(nextbutton);
				controls.append(prevbutton);
				$('.article-content').append(controls.hide());

				$(this).cycle({
					fx: 'fade',
					prev: prevbutton,
					next: nextbutton,
					timeout: 0
				});
				
				Photoset.prototype.toggleButtons($(this), controls);	
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