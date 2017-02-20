// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){
	
	function script(pageItemHTML, bodyEndHTML) {
		return `<?xml version="1.0" encoding="UTF-8"?>
				<HTMLWidget name="CustomIncludeWidget" formatNumber="5"
					localization="none" defaultWidth="50"
					creator="Muse Widget Builder by Kevin van Oosterhout" 
					defaultHeight="50" isResizable="true" isResponsive="true">
					<pageItemHTML>
						<![CDATA[
							${pageItemHTML}
						]]>	
					</pageItemHTML>
					<bodyEndHTML>
						<![CDATA[
							${bodyEndHTML}
						]]>
					</bodyEndHTML>
				</HTMLWidget>`;
	}

	$("input[type=button]").click(function(event) {
		mucowScript = script($("#inlineHTML").val(),$("#beforeBODY").val());

		chrome.fileSystem.chooseEntry({type: 'saveFile', accepts:[{ extensions:['mucow'] }]}, 
		function(writableFileEntry) {
			errorHandler = function(e) {
				console.log(e);
			}
			writableFileEntry.createWriter(function(writer) {
				writer.onerror = errorHandler;
				writer.onwriteend = function(e) {
					console.log('write complete');
				};
				writer.write(new Blob([mucowScript]));
			}, errorHandler );
		});
	});
});