(function($){
	var Photoset = function (photos) {
		$('.photoset').each(function(){
			Photoset.prototype.build($(this));
		});
	};
	
	Photoset.prototype = {
		
		constructor: Photoset,
		
		toggleThumbs: function(photoset){
			var $this = photoset,
				main = $('.main', $this),
				thumbs = $('.thumbs', $this),
				controls = $('.controls', $this),
				thumbsbutton = $('.thumbs-button', controls);
			thumbsbutton.on('click', function(){
				$('.photo', main).each(function(){
					$(this).removeClass('opened');
				});
				main.hide();
				controls.hide();
				thumbs.show();
			});
		},
		
		toggleControls: function(photoset, controls){
			var bool = false,
				main = $('.main', photoset);
			photoset.on('hover', function(){
				if (main.css('display')=='block'){
					if (bool==false){
						bool = true;
						controls.show();
					}
					else{
						bool = false;
						controls.hide();
					};
				};
			});
		},
		
		build: function (photoset) {//this sets up the photosets when the page is first loaded: sets up navigation and enables toggleThumbs.
			var $this = photoset,
				main = $('.main', $this),
				thumbs = $('.thumbs', $this),
				controls;
			
			//PART ONE: builds controls.
			controls = $('<div class="controls">');
			nextbutton = $('<div id="next" class="next"><p>&#187;</p></div>');
			prevbutton = $('<div id="prev" class="prev"><p>&#171;</p></div>');
			thumbsbutton = $('<div id="thumbs" class="thumbs-button"><p>&#12320;</p></div>')
			controls.append(nextbutton);
			controls.append(prevbutton);
			controls.append(thumbsbutton);
			
			$this.append(controls.hide());
			
			Photoset.prototype.toggleControls($this, controls);
			
			//PART TWO: set up Cycle.
			main.cycle({
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
			
			//PART THREE: set up thumbnails.
			
			$('li', thumbs).each(function(){
				var $this = $(this),
					id = $this.attr('id');
				$this.on('click', function(){
					$('.photo#'+id+'', main).addClass('opened');	
					main.cycle(id - 1);
					thumbs.hide();
					main.show();
					controls.show();
				});
			});
			
			Photoset.prototype.toggleThumbs($this);
			
			/*if ($this.hasClass('opened')){
				$('.main figure').on('click', function(){
					console.log($this.attr('id'));
				});
			};*/
			
			
			
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