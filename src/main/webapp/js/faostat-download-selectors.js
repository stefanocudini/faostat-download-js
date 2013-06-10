if (!window.FAOSTATDownloadUIBuilder) {
	window.FAOSTATDownloadUIBuilder = {
		theme : "faostat",
		source : [],
		/** base URL for WDS, default: fenixapps.fao.org */
		baseurl : "",
		/** datasource for WDS, default: faostat */
		datasource : "",
		/** language for toptions_show_flagshe tree, default: en */
		language : "",
		gridItemsFrom : "",
		gridItemsTo : "",
		gridElementsFrom : "",
		gridElementsTo : "",
		gridCountriesFrom : "",
		gridCountriesTo : "",
		selectAll : function(gridCode, select) {		
			var rows = $('#' + gridCode).jqxGrid('getrows');
			for (var i = 0 ; i < rows.length ; i++) {
            	if (select) {
            		$('#' + gridCode).jqxGrid('selectrow', i);
            	} else {
            		$('#' + gridCode).jqxGrid('unselectrow', i);
            	}
            }
		},
	
		initUI : function() {
			$("#bulkDownload2").jqxButton({width: '75', 
				height: '25', 
				theme: FAOSTATDownloadUIBuilder.theme  });
$("#bulkDownload2").bind("click", function () {		
var mesItems="";
for(i=0;i<$('#gridItems').jqxGrid('selectedrowindexes').length;i++)
{if(mesItems==""){mesItems=$('#gridItems').jqxGrid('getrowdata',$('#gridItems').jqxGrid('selectedrowindexes')[i]).code;}
else{mesItems+=","+$('#gridItems').jqxGrid('getrowdata',$('#gridItems').jqxGrid('selectedrowindexes')[i]).code;}
}
// mesItems=$('#gridItems').jqxGrid('selectedrowindexes');
 //mesElements=$('#gridElements').jqxGrid('selectedrowindexes');
var mesElements="";
for(i=0;i<$('#gridElements').jqxGrid('selectedrowindexes').length;i++)
{if(mesElements==""){mesElements=$('#gridElements').jqxGrid('getrowdata',$('#gridElements').jqxGrid('selectedrowindexes')[i]).code;}
else{mesElements+=","+$('#gridElements').jqxGrid('getrowdata',$('#gridElements').jqxGrid('selectedrowindexes')[i]).code;}
}
	               // mesCountries=$('#gridCountries').jqxGrid('selectedrowindexes');
	                var mesCountries="";
	                for(i=0;i<$('#gridCountries').jqxGrid('selectedrowindexes').length;i++)
	                {if(mesCountries==""){mesCountries=$('#gridCountries').jqxGrid('getrowdata',$('#gridCountries').jqxGrid('selectedrowindexes')[i]).code;}
	                else{mesCountries+=","+$('#gridCountries').jqxGrid('getrowdata',$('#gridCountries').jqxGrid('selectedrowindexes')[i]).code;}
	                }
	               // mesYears=$('#gridYears').jqxGrid('selectedrowindexes');
	                //mesYears=$('#gridYears').jqxGrid('selectedrowindexes');
	                var mesYears="";
	                for(i=0;i<$('#gridYears').jqxGrid('selectedrowindexes').length;i++)
	                {if(mesYears==""){mesYears=$('#gridYears').jqxGrid('getrowdata',$('#gridYears').jqxGrid('selectedrowindexes')[i]).code;}
	                else{mesYears+=","+$('#gridYears').jqxGrid('getrowdata',$('#gridYears').jqxGrid('selectedrowindexes')[i]).code;}
	                }
	                document.getElementById('v').value=mesElements+"#"+mesCountries+"#"+mesItems+"#"+mesYears;	                
	                document.getElementById('domain').value=FAOSTATDownload.selectedDomainCode;
	                $('#monMainForm').submit(); 
            });
			if ($.url().param('language') != null) {FAOSTATDownloadUIBuilder.language = $.url().param('language');}
			else {FAOSTATDownloadUIBuilder.language = 'en';}
			
			$(".faostat-download-tab").jqxTabs({ 
				width: 270, 
				height: 200, 
				position: 'top',
				animationType: 'fade',
				selectionTracker: 'checked',
				theme: FAOSTATDownloadUIBuilder.theme
			});
			$(".faostat-download-button").jqxButton({ 
				width: '75', 
				height: '25', 
				theme: FAOSTATDownloadUIBuilder.theme 
			});
			$.getJSON(FAOSTATDownload.prefix + 'config/faostat-download-configuration.json', function(data) {
				
				FAOSTATDownloadUIBuilder.baseurl = data.baseurl;
				FAOSTATDownloadUIBuilder.datasource = data.datasource;
				FAOSTATDownloadUIBuilder.populateGrid("countries", "gridCountries", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownloadUIBuilder.populateGrid("items", "gridItems", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownloadUIBuilder.populateGrid("elements", "gridElements", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownloadUIBuilder.populateGrid("years", "gridYears", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownload.linkCodes();
			});
		},
		populateGrid : function(codingSystem, gridCode, domainCode) {
			
			
			
			
		
			
			
			
			
			
			
			
			
			
			$.ajax({
				type: 'GET',
				url: 'http://' + FAOSTATDownloadUIBuilder.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + FAOSTATDownloadUIBuilder.datasource + '/' + domainCode + '/' + FAOSTATDownloadUIBuilder.language,
				dataType: 'json',
				success : function(response) {
				
					//alert('http://' + FAOSTATDownloadUIBuilder.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + FAOSTATDownloadUIBuilder.datasource + '/' + domainCode + '/' + FAOSTATDownloadUIBuilder.language);
					var data = new Array();
					for (var i = 0 ; i < response.length ; i++) {
						var row = {};
						row["label"] = response[i].label;
						row["code"] = response[i].code;
						data[i] = row;
					}
					var source = {
						localdata: data,
		                datatype: "array"
		            };
					var dataAdapter = new $.jqx.dataAdapter(source);
		            $("#" + gridCode).jqxGrid({
		            	width: 325,
		                height: 155,
		                source: dataAdapter,
		                columnsresize: true,
		                showheader: false,
		                selectionmode: 'multiplerowsextended',
		                columns: [{text: 'Label', datafield: 'label'}],
		                theme: FAOSTATDownloadUIBuilder.theme
		            });
		            var targetCodingSystem = FAOSTATDownloadUIBuilder.getCodingSystemFromGridCode(gridCode);
		            $("#buttonSelectAll" + targetCodingSystem).bind('click', function() {
		            	FAOSTATDownloadUIBuilder.selectAll(gridCode, true);
		            });
		            $("#buttonDeSelectAll" + targetCodingSystem).bind('click', function() {
		            	FAOSTATDownloadUIBuilder.selectAll(gridCode, false);
		            }); 					
				},
				error : function(err,b,c) {	/*alert(err.status + ", " + b + ", " + c);*/}
			});
		},
		multipleSelection : function(event, filterGridCode, targetGridCode) {
			var targetCodingSystem = FAOSTATDownloadUIBuilder.getCodingSystemFromGridCode(targetGridCode);
			FAOSTATDownload.showDialog("dialog" + targetCodingSystem, "Please Wait for " + targetCodingSystem + " to Be Filtered According To Your Selection.");
			var filterCodes = "";
			switch (filterGridCode) {	
				case 'gridItems' : {
					if (FAOSTATDownloadUIBuilder.gridItemsFrom == "") {
						FAOSTATDownloadUIBuilder.gridItemsFrom = event.args.rowindex;
					} else if (FAOSTATDownloadUIBuilder.gridItemsTo == "") {
						FAOSTATDownloadUIBuilder.gridItemsTo = event.args.rowindex;
					}
					if (event.args.rowindex < FAOSTATDownloadUIBuilder.gridItemsFrom) {
						FAOSTATDownloadUIBuilder.gridItemsFrom = event.args.rowindex;
						FAOSTATDownloadUIBuilder.gridItemsTo = "";
					}
					if (event.args.rowindex > FAOSTATDownloadUIBuilder.gridItemsTo) {
						FAOSTATDownloadUIBuilder.gridItemsFrom = event.args.rowindex;
						FAOSTATDownloadUIBuilder.gridItemsTo = "";
					}
					var end = FAOSTATDownloadUIBuilder.gridItemsTo;
					if (end == "")
						end = FAOSTATDownloadUIBuilder.gridItemsFrom;
					for (var i = FAOSTATDownloadUIBuilder.gridItemsFrom ; i <= end ; i++) {
						var data = $('#' + filterGridCode).jqxGrid('getrowdata', i);
						filterCodes += data.code;
						if (i < end)
							filterCodes += ",";
					}
				}; break;
				
				case 'gridElements' : {
					if (FAOSTATDownloadUIBuilder.gridElementsFrom == "") {
						FAOSTATDownloadUIBuilder.gridElementsFrom = event.args.rowindex;
					} else if (FAOSTATDownloadUIBuilder.gridElementsTo == "") {
						FAOSTATDownloadUIBuilder.gridElementsTo = event.args.rowindex;
					}
					if (event.args.rowindex < FAOSTATDownloadUIBuilder.gridElementsFrom) {
						FAOSTATDownloadUIBuilder.gridElementsFrom = event.args.rowindex;
						FAOSTATDownloadUIBuilder.gridElementsTo = "";
					}
					if (event.args.rowindex > FAOSTATDownloadUIBuilder.gridElementsTo) {
						FAOSTATDownloadUIBuilder.gridElementsFrom = event.args.rowindex;
						FAOSTATDownloadUIBuilder.gridElementsTo = "";
					}
					
					var end = FAOSTATDownloadUIBuilder.gridElementsTo;
					if (end == "")
						end = FAOSTATDownloadUIBuilder.gridElementsFrom;
					for (var i = FAOSTATDownloadUIBuilder.gridElementsFrom ; i <= end ; i++) {
						var data = $('#' + filterGridCode).jqxGrid('getrowdata', i);
						filterCodes += data.code;
						if (i < end)
							filterCodes += ",";
					}
				}; break;
				
				case 'gridCountries' : {
					if (FAOSTATDownloadUIBuilder.gridElementsFrom == "") {
						FAOSTATDownloadUIBuilder.gridElementsFrom = event.args.rowindex;
					} else if (FAOSTATDownloadUIBuilder.gridElementsTo == "") {
						FAOSTATDownloadUIBuilder.gridElementsTo = event.args.rowindex;
					}
					if (event.args.rowindex < FAOSTATDownloadUIBuilder.gridElementsFrom) {
						FAOSTATDownloadUIBuilder.gridElementsFrom = event.args.rowindex;
						FAOSTATDownloadUIBuilder.gridElementsTo = "";
					}
					if (event.args.rowindex > FAOSTATDownloadUIBuilder.gridElementsTo) {
						FAOSTATDownloadUIBuilder.gridElementsFrom = event.args.rowindex;
						FAOSTATDownloadUIBuilder.gridElementsTo = "";
					}
					var end = FAOSTATDownloadUIBuilder.gridElementsTo;
					if (end == "")
						end = FAOSTATDownloadUIBuilder.gridElementsFrom;
					for (var i = FAOSTATDownloadUIBuilder.gridElementsFrom ; i <= end ; i++) {
						var data = $('#' + filterGridCode).jqxGrid('getrowdata', i);
						filterCodes += data.code;
						if (i < end)
							filterCodes += ",";
					}
				}; break;
			
			}
			FAOSTATDownloadUIBuilder.linkCodes(filterCodes, filterGridCode, targetGridCode);
		},
		
		linkCodes : function(filterCodes, filterGridCode, targetGridCode) {
			var targetCodingSystem = FAOSTATDownloadUIBuilder.getCodingSystemFromGridCode(targetGridCode);
			var filterCodingSystem = FAOSTATDownloadUIBuilder.getCodingSystemFromGridCode(filterGridCode);
			var url = 'http://' + FAOSTATDownloadUIBuilder.baseurl + '/bletchley/rest/linkedcodes/' + FAOSTATDownloadUIBuilder.datasource + '/' + FAOSTATDownload.selectedDomainCode + '/' + targetCodingSystem + '/' + filterCodingSystem + '/' + filterCodes + '/' + FAOSTATDownloadUIBuilder.language;
		
			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'json',
				success : function(response) {
					$('#' + targetGridCode).jqxGrid('clear');
					for (var i = 0 ; i < response.length ; i++) {
						var row = {};
						row["label"] = response[i][1];
						row["code"] = response[i][0];
						$('#' + targetGridCode).jqxGrid('addrow', response[i][0], row);
					}
					FAOSTATDownload.closeDialog("dialog" + targetCodingSystem);
				},
				error : function(err,b,c) {/*			alert(err.status + ", " + b + ", " + c);*/}
			});
		},
		
		getCodingSystemFromGridCode : function(gridCode) {
			return gridCode.substring("grid".length);
		},
		
		enableUI : function(enabled) {
			$(".faostat-download-tab").jqxTabs({
				disabled: enabled
			});
			$(".faostat-download-button").jqxButton({ 
				disabled: enabled
			});
		}
		
	};

}
