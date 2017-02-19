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


	filters = [
		{name: '.mucow', extensions: ['mucow']}
	];
	const electron = require('electron');
	const path = require('path');
	const fs = require('fs');
	const {dialog} = require('electron').remote;
	
	$("input[type=button]").click(function(event) {
		mucowScript = script($("#inlineHTML").val(),$("#beforeBODY").val())
		
		dialog.showSaveDialog({title:"Save Widget...", filters: filters, properties: ['openFile']},function(file){
			if (file) {
				fs.writeFileSync(file, mucowScript);
			}
		});
	});
});