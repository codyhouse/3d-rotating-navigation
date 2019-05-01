(function(){
  // 3d Rotating Navigation - by CodyHouse.co
  var threeDNav = document.getElementsByClassName('js-cd-3d-nav');
  if(threeDNav.length > 0) {
  	var header = document.getElementsByClassName('cd-header')[0],
  		main = document.getElementsByClassName('cd-main')[0],
  		marker = document.getElementsByClassName('cd-3d-nav__marker')[0],
  		navTrigger = document.getElementsByClassName('cd-header__nav-trigger')[0],
  		navItems = threeDNav[0].getElementsByTagName('li');

  	//set marker width
  	updateMarkerWidth();

  	navTrigger.addEventListener('click', function(event){ // open/close navigation
  		event.preventDefault();
			toggle3dBlock(!Util.hasClass(header, 'cd-header--is-translated'));
  	});

		threeDNav[0].addEventListener('click', function(event){
			var selectedItem = event.target.closest('li');
			if(!selectedItem) return;
			event.preventDefault();
			if(!Util.hasClass(selectedItem, 'cd-3d-nav__item--selected')) {
				Util.removeClass(threeDNav[0].getElementsByClassName('cd-3d-nav__item--selected')[0], 'cd-3d-nav__item--selected');
				Util.addClass(selectedItem.closest('li'), 'cd-3d-nav__item--selected');
				updateSelectedNav('close');
			}
		});

		window.addEventListener('resize', function(){ // reset marker position on resize
			window.requestAnimationFrame(updateSelectedNav);
		});

  	function toggle3dBlock(addOrRemove) {
			if(typeof(addOrRemove) === 'undefined') addOrRemove = true;	
			Util.toggleClass(header, 'cd-header--is-translated', addOrRemove);
			Util.toggleClass(threeDNav[0], 'cd-3d-nav--is-visible', addOrRemove);
			Util.toggleClass(main, 'cd-main--is-translated', addOrRemove);
			main.addEventListener('transitionend', function cb(){
				//fix marker position when opening the menu (after a window resize)
				addOrRemove && updateSelectedNav();
				main.removeEventListener('transitionend', cb);
			});
		};

		function updateSelectedNav(type) { // update the marker position
			var selectedItem = threeDNav[0].getElementsByClassName('cd-3d-nav__item--selected')[0],
				selectedItemPosition = Util.getIndexInArray(navItems, selectedItem) + 1, 
				leftPosition = selectedItem.getBoundingClientRect().left;

			removeClassPrefix(marker, 'cd-3d-nav__marker--col')
			Util.addClass(marker, 'cd-3d-nav__marker--col-'+ selectedItemPosition);
			marker.style.left = leftPosition+'px';
			updateMarkerWidth();
			if( type == 'close') {
				marker.addEventListener('transitionend', function cb(){
					marker.removeEventListener('transitionend', cb);
					toggle3dBlock(false);
				});
			}
		};

		function updateMarkerWidth() { // update the marker width
			marker.style.width = window.getComputedStyle(navItems[0]).getPropertyValue('width');
		};

		function removeClassPrefix(el, prefix) {
			var classes = el.className.split(" ").filter(function(c) {
				return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = classes.join(" ").trim();
		};
  }
})();