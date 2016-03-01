# Update The Fontsize Of A View On Resize

```ResponsiveModule.add(view, breakpointInfo [, breakpointInfo2])```

ResponsiveModule provides a single method to initialize the automated update of the fontsize for a given view. If desired you can pass multiple scaleDefinitions.

## Scaledefinition

In order to configure the way views get resized by their fontsize you can adjust a few details:

{int} viewWidthOrig  The actual width of the view when ResponsiveModule was not in use
{array} scaleRange  The range in which the resizement should be applied [(int)min, (int)max]
{array} fontsizeRange  The range in which the fontsize will be applied within the given scaleRange [(float)min, (float)max]
{callable} onChangeValue  The callback that will be called everytime the fontsize was adjusted

```
	var view = document.querySelector('html');

	// ResponsiveModule
	nivo.ResponsiveModule.addBreakpoint( view, {
		viewWidthOrig: 1024,            // the original width of the view
		scaleRange: [768, Infinity],    // The range the fontsize adjustment takes place
		fontsizeRange: [0, Infinity],   // Sometimes you recognize that there must be a deviating min/max-fontsize for the given scaleRange
		onChangeValue: function( value ){
			// fontsize = value;
		}
	}, {
		viewWidthOrig: 767,
		scaleRange: [0, 767],
		fontsizeRange: [0, Infinity],
		onChangeValue: function( value ){
			// fontsize = value;
		}
	});
```
