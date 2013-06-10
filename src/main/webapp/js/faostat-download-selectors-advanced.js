if (!window.FAOSTATDownloadSelectorsAdvanced) {

	window.FAOSTATDownloadSelectorsAdvanced = {
			
		list_indices : [{
			"gridElementsFrom": null, 
			"gridElementsTo": null,
			"gridItemsFrom": null, 
			"gridItemsTo": null,
			"gridCountriesFrom": null, 
			"gridCountriesTo": null,
			"gridYearsFrom": null, 
			"gridYearsTo": null
		}],
					   
		check_indices : [{
			"gridElementsFrom": null, 
			"gridElementsTo": null,
			"gridItemsFrom": null, 
			"gridItemsTo": null,
			"gridCountriesFrom": null, 
			"gridCountriesTo": null,
			"gridYearsFrom": null, 
			"gridYearsTo": null
		}],
			
		selectAll : function(gridCode) {
			var items = ($("#" + gridCode).jqxListBox('getItems')).length; 
			for (var i = 0 ; i < items ; i++)
				$("#" + gridCode).jqxListBox('selectIndex', i); 
		},
		
		unSelectAll : function(gridCode) {
			$("#" + gridCode).jqxListBox('clearSelection');
			$("#" + gridCode).jqxListBox('uncheckAll'); 
			FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'From'] = null;
			FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'To'] = null;
			FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'From'] = null;
			FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'To'] = null;
		},
	
		initUI : function() {
			
			/*$( "#agg, #col, #row" ).sortable({
				connectWith: ".connectedSortable",
				cancel: ".ui-state-disabled",
				update:function(){
				var order = $('#agg').sortable('serialize'); // r�cup�ration des donn�es � envoyer
				alert("YO"+order);
			}
			}).disableSelection();
			*/
			$(".faostat-download-tab").jqxTabs({ 
				width: 270, 
				height: 200, 
				position: 'top',
				animationType: 'fade',
				selectionTracker: 'checked',
				theme: FAOSTATDownload.theme
			});
				
			$(".faostat-download-button").jqxButton({ 
				width: '75', 
				height: '25', 
				theme: FAOSTATDownload.theme 
			});
				
			$.getJSON(FAOSTATDownload.prefix + 'config/faostat-download-configuration.json', function(data) {
					
				FAOSTATDownloadSelectorsAdvanced.populateGrid("countries", "gridCountries", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownloadSelectorsAdvanced.populateGrid("items", "gridItems", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownloadSelectorsAdvanced.populateGrid("elements", "gridElements", FAOSTATDownload.selectedDomainCode);
				FAOSTATDownloadSelectorsAdvanced.populateGrid("years", "gridYears", FAOSTATDownload.selectedDomainCode);
					
			});
			
		},
		
		populateGrid : function(codingSystem, gridCode, domainCode) {
			
			$.ajax({
				
				type: 'GET',
				url: 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + FAOSTATDownload.datasource + '/' + domainCode + '/' + FAOSTATDownload.language,
				dataType: 'json',
				
				success : function(response) {
					
					var data = new Array();
					for (var i = 0 ; i < response.length ; i++) {
						var row = {};
						row["label"] = response[i].label;
						row["code"] = response[i].code;
						data[i] = row;
					}
					$("#" + gridCode).jqxListBox({
		            	width: 270,
		                height: 170,
		                source: data,
		                checkboxes: true,
		                multiple: true,
		                theme: FAOSTATDownload.theme
		            });
		            
		            var targetCodingSystem = FAOSTATDownloadSelectorsAdvanced.getCodingSystemFromGridCode(gridCode);
		            $("#buttonSelectAll" + targetCodingSystem).bind('click', function() {
		            	FAOSTATDownloadSelectorsAdvanced.selectAll(gridCode);
		            });
		            $("#buttonDeSelectAll" + targetCodingSystem).bind('click', function() {
		            	FAOSTATDownloadSelectorsAdvanced.unSelectAll(gridCode);
		            });
		            
		            $('#' + gridCode).bind('select', function(e) {
		            	FAOSTATDownloadSelectorsAdvanced.list_select(gridCode, e);
		            });
		            
		            $('#' + gridCode).bind('checkChange', function(e) {
		            	FAOSTATDownloadSelectorsAdvanced.check_select(gridCode, e);
		            });
		            					
				},
				
				error : function(err,b,c) {
//					alert(err.status + ", " + b + ", " + c);
				}
				
			});
			
		},
		
		check_select : function(gridCode, e) {
			if (FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'From'] == null) {
				FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'From'] = e.args.owner.selectedIndex;
			} else if (FAOSTATDownload.shift == true && FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'To'] == null) {
				FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'To'] = e.args.owner.selectedIndexes[e.args.owner.selectedIndexes.length - 1];
				var start = FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'From'];
				var end   = FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'To'];
				if (start > end) {
					var tmp = start;
					start = end;
					end = tmp;
				}
				for (var i = 1 + start ; i < end ; i++) {
					var item = $("#" + gridCode).jqxListBox('getItem', i);
					if (item.checked == true) {
						
					} else {
						$("#" + gridCode).jqxListBox('checkIndex', i);
					}
				}
				FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'From'] = null;
				FAOSTATDownloadSelectorsAdvanced.check_indices[gridCode + 'To'] = null;
			}
		},
		
		list_select : function(gridCode, e) {
			if (FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'From'] == null) {
				FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'From'] = e.args.index;
			} else if (FAOSTATDownload.shift == true && FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'To'] == null) {
				FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'To'] = e.args.index;
				var start = FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'From'];
				var end   = FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'To'];
				if (start > end) {
					var tmp = start;
					start = end;
					end = tmp;
				}
				for (var i = 1 + start ; i < end ; i++) {
					var item = $("#" + gridCode).jqxListBox('getItem', i);
					if (item.selected == true) {
						
					} else {
						$("#" + gridCode).jqxListBox('selectIndex', i);
					}
				}
				FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'From'] = null;
				FAOSTATDownloadSelectorsAdvanced.list_indices[gridCode + 'To'] = null;
			}
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
