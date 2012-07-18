(function($){
	
	var Photoset = function (photos) {
		this.build(photos);
		
	};
	
	Photoset.prototype = {
		
		constructor: Photoset,
		
		toggleButtons: function(photoset){
			var buttonsVisible = false,
				controls = $('.controls', photoset);//figure out how to insert id attr of photoset
			
			$('.activearea').on('hover', function(){
				console.log('active');
				if (buttonsVisible == false){
					buttonsVisible = true;
					controls.css({'display': 'block', 'opacity':'1', 'z-index':'42',});
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
				if ($(this).hasClass('opened')){
					openedID = thisID;
				};
				controls = $('<div class="controls" id='+thisID+' >');
				nextbutton = $('<div id="next-'+thisID+'" class="next"><p>&#187;</p></div>');
				prevbutton = $('<div id="prev-'+thisID+'" class="prev"><p>&#171;</p></div>');
				$('.activearea').append(controls);
				controls.append(nextbutton);
				controls.append(prevbutton);
				if (thisID != openedID){
					controls.hide();
				}
				
				$(this).cycle({
					fx: 'fade',
					prev: '#prev-'+thisID+'',
					next: '#next-'+thisID+'',
					timeout: 0
				});
				
				//Photoset.prototype.toggleButtons($(this));	
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