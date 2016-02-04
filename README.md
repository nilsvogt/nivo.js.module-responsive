# Update The Fontsize Of A View On Resize

# ResponsiveModule.add(view, breakpointInfo [, breakpointInfo2])

ResponsiveModule provides a single Method to initialize the automated update of the fontsize for a given element.

```
var
	view = document.querySelector('html'),
	basefontsize = parseInt( getComputedStyle(view)['font-size'] , 10);

// ResponsiveModule
nivo.ResponsiveModule.addBreakpoint( view, {
	base_fontsize: basefontsize,    // the current fontsize all metrics set in em/rem depend on
	viewWidthOrig: 1024,            // the original width of the view
	scaleRange: [768, Infinity],    // The range the fontsize adjustment takes place
	fontsizeRange: [0, Infinity],   // Sometimes you recognize that there must be a deviating min/max-fontsize for the given scaleRange
	onChangeValue: function( value ){
		// fontsize = value;
	}
}, {
	base_fontsize: basefontsize,
	viewWidthOrig: 767,
	scaleRange: [0, 767],
	fontsizeRange: [0, Infinity],
	onChangeValue: function( value ){
		// fontsize = value;
	}
});
```