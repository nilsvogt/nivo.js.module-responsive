/*!
 * ResponsiveView
 * version: 0.2
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Nils Vogt nilsvogt.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;(function(){ "use strict";

	// constants
	var ARRAY_KEY_SIZE_MIN = 0,
	ARRAY_KEY_SIZE_MAX = 1;

	var ResponsiveModule = (function(){
		return {
			addBreakpoint: function(el, options /* [, options_breakpoint2 [, ...]] */){
				var breakpoints = Array.prototype.splice.call(arguments, 1);
				for (var i = 0; i < breakpoints.length; i++) {
					new ResponsiveView(el, breakpoints[i]);
				}
			}
		};
	}());

	var ResponsiveView = function( view, options ){
		this.widget_width = null;
		this.fontsize = 0;
		this.settings = {
			fontsizeRange: options.fontsizeRange || [0, Infinity],    // min- and maxsize for the calculated base-fontsize
			scaleRange: options.scaleRange || [0, Infinity],    // range of **view-width** we update the fontsize for
			viewWidthOrig: options.viewWidthOrig || 810,              // basewidth all your sizes are depending on
			base_fontsize: options.base_fontsize || 10,
			onChangeValue: options.onChangeValue || function(){}
		};

		var self = this;
		window.addEventListener('resize', function(){
			self.updateBaseFontsize(view);
		});
		self.updateBaseFontsize(view);
	};

	ResponsiveView.prototype.updateBaseFontsize = function(view){

		var settings = this.settings;
		var fontsize = this.fontsize;

		// limit range
		if(window.innerWidth < settings.scaleRange[ARRAY_KEY_SIZE_MIN] || window.innerWidth > settings.scaleRange[ARRAY_KEY_SIZE_MAX]){
			return;
		}

		// calculate new 'base-fontsize'
		fontsize = ( view.offsetWidth / (settings.viewWidthOrig/settings.base_fontsize) );

		// check boundaries
		fontsize = Math.max( settings.fontsizeRange[ARRAY_KEY_SIZE_MIN], fontsize );
		fontsize = Math.min( settings.fontsizeRange[ARRAY_KEY_SIZE_MAX], fontsize );

		this.fontsize = ((fontsize*100)|0)/100;
		view.style.fontSize = this.fontsize + 'px';

		settings.onChangeValue(fontsize);
	};

	// expose module
	window.nivo = window.nivo || {};
	window.nivo.ResponsiveModule = ResponsiveModule;

})();