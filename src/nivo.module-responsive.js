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
	var
		ARRAY_KEY_SIZE_MIN = 0,
		ARRAY_KEY_SIZE_MAX = 1;

	var ResponsiveModule = (function(){
		return {
			/**
			 * Add A Breakpoint For A View
			 * @param DomNode view  The view that will be updated
			 * @param object scaleDefinition
			 * @return void
			 */
			addBreakpoint: function(view, scaleDefinition /* [, scaleDefinition [, ...]] */){
				var scaleDefinitions = Array.prototype.splice.call(arguments, 1);
				for (var i = 0; i < scaleDefinitions.length; i++) {
					new ResponsiveView(view, scaleDefinitions[i]);
				}
			}
		};
	}());

	/**
	 * ResponsiveView
	 * @param DomNode view  The view that will be updated
	 * @param object scaleDefinition
	 * @return void
	 */
	var ResponsiveView = function( view, scaleDefinition ){
		this.widget_width = null;
		this.fontsize = 0;
		this.baseFontsize = parseInt( getComputedStyle(view)['font-size'] , 10);
		this.settings = {
			fontsizeRange: scaleDefinition.fontsizeRange || [0, Infinity],    // min- and maxsize for the calculated base-fontsize
			scaleRange: scaleDefinition.scaleRange || [0, Infinity],    // range of **view-width** we update the fontsize for
			viewWidthOrig: scaleDefinition.viewWidthOrig || 810,              // basewidth all your sizes are depending on
			onChangeValue: scaleDefinition.onChangeValue || function(){}
		};

		var self = this;
		window.addEventListener('resize', function(){
			self.updateBaseFontsize(view);
		});
		self.updateBaseFontsize(view);
	};

	/**
	 * Calculate The New Basefontsize For The Current Width Of View
	 * @param  DomNode view  The view that will be updated
	 * @return void
	 */
	ResponsiveView.prototype.updateBaseFontsize = function(view){

		var settings = this.settings;
		var fontsize = this.fontsize;

		// limit the range
		if(window.innerWidth < settings.scaleRange[ARRAY_KEY_SIZE_MIN] || window.innerWidth > settings.scaleRange[ARRAY_KEY_SIZE_MAX]){
			return;
		}

		// calculate new 'base-fontsize'
		fontsize = ( view.offsetWidth / (settings.viewWidthOrig/this.baseFontsize) );

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