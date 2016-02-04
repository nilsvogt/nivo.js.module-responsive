<!doctype html>
<html>
	<meta charset="utf-8" />
	<title>nivo responsive view</title>
	<style>
		html { font-size: 10px; min-width: 320px; }
		html, body { margin: 0; padding: 0; }
		h1 { font-size: 2rem; color: blue; }
		#page { width: 90rem; outline: 1px solid #000; margin: 0 auto; }

		@media( max-width: 767px ){
			#page { width: 60rem; outline: 1px solid #000; margin: 0 auto; }
			h1 { font-size: 3rem; color: green; }
		}
	</style>
</html>
<body>
	<div id="page">
		<h1>
			Headline 1:<br />
			styleguide 30px at a document width of 787px<br />
			styleguide 20px at a document width of 1024px
		</h1>
	</div>

	<script type="text/javascript" src="../src/nivo.module-responsive.js"></script>
	<script type="text/javascript">
		function init(){
			var view = document.querySelector('html');

			// ResponsiveModule
			nivo.ResponsiveModule.addBreakpoint( view, {
				viewWidthOrig: 1024,
				fontsizeRange: [0, Infinity],
				scaleRange: [768, Infinity],
				onChangeValue: function( value ){
					// fontsize = value;
				}
			}, {
				viewWidthOrig: 767,
				fontsizeRange: [0, Infinity],
				scaleRange: [0, 767],
				onChangeValue: function( value ){
					// fontsize = value;
				}
			});
		}

		init();
	</script>
</body>