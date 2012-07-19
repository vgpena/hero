(function($){
	
	var Photoset = function (photos) {
		$('.photoset').each(function(){
			Photoset.prototype.build($(this));
		});
	};
	
	Photoset.prototype = {
		
		constructor: Photoset,
		
		spinCycle: function(photoset, prevbutton, nextbutton, startId){//Sets up a Cycle with the object in question, starting on a specified slide.
			$(photoset).cycle({
				fx: 'fade',
				prev: prevbutton,
				next: nextbutton,
				timeout: 0,
				after: onAfter,
				startingSlide: startId,
			});
			
			function onAfter(){
				$('.photo', $($(this).parent())).each(function(){
					$(this).removeClass('opened');
					if ($(this).css('display')=='block'){
						$(this).addClass('opened');
					}
				})
			};
		},
			
		toggleThumbs: function(photoset, latest, controls){//so that you can toggle between the large image and the set's thumbs.
		//*****TODO: Make it so that if there are more than 18 photos in the set, last thumb becomes "display all thumnails" link.
			var setId = photoset.attr('id'),
				photoId,
				thumbs = $('.thumbs#'+setId+'');
			
			controls.hide();
			photoset.hide();
			
			$('li', thumbs).each(function(){
				//part one: to indicate which photo you were just on
				$(this).removeClass('opened');
				if ($(this).attr('id')==latest){
					$(this).addClass('opened');
				};
				//part two: to link each thumbnail to its actual image
				$(this).on('click', function(){
					var corrSet = $('.photoset#'+setId+''),
						corrId = $(this).attr('id') - 1;
					$('.thumbs').hide();
					$('.photo', corrSet).each(function(){
						$(this).removeClass('opened');
						if ($(this).attr('id')==corrId){
							$(this).addClass('opened');
						};
					});
					
					Photoset.prototype.spinCycle(corrSet, prevbutton, nextbutton, corrId);
					
					corrSet.show();
					controls.show();
					Photoset.prototype.toggleButtons(controls, true);
				});
				
			});
			thumbs.show();
		},
		
		toggleButtons: function(controls, buttonsVisible){//makes buttons appear and disappear at the right times.
			var bool,
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
		
		build: function (photoset) {//this sets up the photosets when the page is first loaded: sets up navigation and enables toggleThumbs.
			var $this = photoset;
			
			//PART ONE: builds controls.
			controls = $('<div class="controls">');
			nextbutton = $('<div id="next" class="next"><p>&#187;</p></div>');
			prevbutton = $('<div id="prev" class="prev"><p>&#171;</p></div>');
			controls.append(nextbutton);
			controls.append(prevbutton);
			
			$this.append(controls);
			
			
			//PART TWO: set up Cycle
			$('.main', $this).cycle({
				fx: 'fade',
				prev: prevbutton,
				next: nextbutton,
				timeout: 0,
				after: onAfter,
			});
			
			function onAfter(){
				$('.photo', $($(this).parent())).each(function(){
					$(this).removeClass('opened');
					if ($(this).css('display')=='block'){
						$(this).addClass('opened');
					}
				})
			};
			
			
			//PART TWO: facilitates recently-opened behavior
			
			
			
		/*	$('.photoset', photos).each(function(){
				Photoset.prototype.spinCycle($(this), prevbutton, nextbutton, 00);
			});*/
			
			//Photoset.prototype.toggleButtons(controls, false);
			
			/*$('.photo figure').on('click', function(){
				var photoset = $($(this).parent()).parent(),
					latest = $($(this).parent()).attr('id');
				
				Photoset.prototype.toggleThumbs(photoset, latest, controls);
			});*/
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