// NAVIGATION EVENTS

// This part is separate from the impress.js core code.
// It's because these navigation actions only need what impress.js provides with
// its simple API.

// Throttling function calls, by Remy Sharp.
// http://remysharp.com/2010/07/21/throttling-function-calls/

// TODO Debounce, instead of throttle (see link above)
var throttle = function( fn, delay ) {
	var timer = null;
	return function() {
		var context = this, args = arguments;
		clearTimeout( timer );
		timer = setTimeout(function() {
			fn.apply( context, args );
		}, delay );
	};
};

// Enumerate all keyCodes as constants to enhance readability.
var keyCodes = {
	ARROW_DOWN: 40,
	ARROW_LEFT: 37,
	ARROW_RIGHT: 39,
	ARROW_UP: 38,

	PAGE_DOWN: 34,
	PAGE_UP: 33,

	SPACE: 32,
	TAB: 9
};

// Wait for impress.js to be initialized.
document.addEventListener( "impress:init", function( event ) {
	// Getting API from event data.
	// So you don't event need to know what is the id of the root element or anything.
	// `impress:init` event data gives you everything you need to control the presentation that was
	// just initialized.
	var api = event.detail.api;

	// KEYBOARD NAVIGATION HANDLERS

	// Prevent default keydown action when one of supported key is pressed.
	document.addEventListener( "keydown", function( event ) {
		switch ( event.keyCode ) {
			case keyCodes.ARROW_DOWN:
			case keyCodes.ARROW_LEFT:
			case keyCodes.ARROW_RIGHT:
			case keyCodes.ARROW_UP:
			case keyCodes.PAGE_DOWN:
			case keyCodes.PAGE_UP:
			case keyCodes.SPACE:
			case keyCodes.TAB:
				event.preventDefault();
				break;
		}
	});

	// Trigger impress action (next or prev) on keyup.

	// Supported keys are:
	// [space] - quite common in presentation software to move forward
	// [up] [right] / [down] [left] - again common and natural addition,
	// [pgdown] / [pgup] - often triggered by remote controllers,
	// [tab] - this one is quite controversial, but the reason it ended up on
	//  this list is quite an interesting story... Remember that strange part
	//  in the impress.js code where window is scrolled to 0,0 on every presentation
	//  step, because sometimes browser scrolls viewport because of the focused element?
	//  Well, the [tab] key by default navigates around focusable elements, so clicking
	//  it very often caused scrolling to focused element and breaking impress.js
	//  positioning. I didn't want to just prevent this default action, so I used [tab]
	//  as another way to moving to next step...
	document.addEventListener( "keyup", function( event ) {
		switch ( event.keyCode ) {
			case keyCodes.PAGE_UP:
			case keyCodes.ARROW_LEFT:
			case keyCodes.ARROW_UP:
				api.prev();
				event.preventDefault();
				break;
			case keyCodes.TAB:
				api[ event.shiftKey ? "prev" : "next" ]();
				event.preventDefault();
				break;
			case keyCodes.SPACE:
			case keyCodes.PAGE_DOWN:
			case keyCodes.ARROW_RIGHT:
			case keyCodes.ARROW_DOWN:
				api.next();
				event.preventDefault();
				break;
		}
	}, false );

	// Delegated handler for clicking on the links to presentation steps.
	document.addEventListener( "click", function( event ) {
		// Event delegation with "bubbling" check if event target (or any of its parents) is a link.
		var target = event.target;
		while ( ( target.tagName !== "A" ) &&
				( target !== document.documentElement ) ) {
			target = target.parentNode;
		}

		if ( target.tagName === "A" ) {
			var href = target.getAttribute( "href" );

			// If it's a link to presentation step, target this step.
			if ( href && href[ 0 ] === "#" ) {
				target = document.getElementById( href.slice( 1 ) );
			}
		}

		if ( api.goto( target ) ) {
			event.stopImmediatePropagation();
			event.preventDefault();
		}
	}, false );

	// Delegated handler for clicking on step elements.
	document.addEventListener( "click", function( event ) {
		var target = event.target;
		// Find closest step element that is not active.
		while (
			!( target.classList.contains( "step" ) &&
				!target.classList.contains( "active" ) ) &&
			( target !== document.documentElement ) ) {
			target = target.parentNode;
		}

		if ( api.goto( target ) ) {
			event.preventDefault();
		}
	}, false );

	// Touch handler to detect taps on the left and right side of the screen, based on awesome work
	// of @hakimel: https://github.com/hakimel/reveal.js
	// TODO Find link for original based code
	document.addEventListener( "touchstart", function( event ) {
		if ( event.touches.length === 1 ) {
			var x = event.touches[ 0 ].clientX;
			var width = window.innerWidth * 0.3;
			var result = null;

			if ( x < width ) {
				result = api.prev();
			} else if ( x > window.innerWidth - width ) {
				result = api.next();
			}

			if ( result ) {
				event.preventDefault();
			}
		}
	}, false );

	// rescale presentation when window is resized
	window.addEventListener( "resize", throttle(function() {
		// force going to active step again, to trigger rescaling
		api.goto( document.querySelector( ".step.active" ), 500 );
	}, 250 ), false );

}, false );
