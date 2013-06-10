if (!window.FAOSTATDownloadWizard) {

	window.FAOSTATDownloadWizard = {
			
		theme: 'faostat',
		
		shift : false,
		
		resetGridsOnChange : false,
		
		filterSlave1OnChange : false,
		
		filterSlave2OnChange : false,
		
		step_2 : '',
		
		step_3 : '',
		
		step_4 : '',
		
		check_indices : [{
			"master_list_from" : null,
			"master_list_to"   : null,
			"slave_list_1_from" : null,
			"slave_list_1_to"   : null,
			"slave_list_2_from" : null,
			"slave_list_2_to"   : null,
			"years_list_from" : null,
			"years_list_to"   : null
		}],
		
		summary_countries_map : new Array(),
		
		summary_elements_map : new Array(),
		
		summary_items_map : new Array(),
		
		summary_years_map : new Array(),

		init : function () {
			
			FAOSTATDownload.initOutputOptions();
			
			$(document).bind({
				keydown : function(e) {
					if (e.which == 16)
						FAOSTATDownloadWizard.shift = true;
				},
				keyup : function(e) {
					FAOSTATDownloadWizard.shift = false;
				}
			});
			
			$("#sortable").sortable({
				change: function(event, ui) {
					FAOSTATDownloadWizard.delay(function(){
						
						FAOSTATDownloadWizard.step_2 = FAOSTATDownloadWizard.getMaster();
						FAOSTATDownloadWizard.step_3 = FAOSTATDownloadWizard.getSlave1();
						FAOSTATDownloadWizard.step_4 = FAOSTATDownloadWizard.getSlave2();
						
					/*	console.log(FAOSTATDownloadWizard.step_2);
						console.log(FAOSTATDownloadWizard.step_3);
						console.log(FAOSTATDownloadWizard.step_4);
						*/
					}, 500);
				}
			});
			
			FAOSTATDownloadWizard.step_2 = FAOSTATDownloadWizard.getMaster();
			FAOSTATDownloadWizard.step_3 = FAOSTATDownloadWizard.getSlave1();
			FAOSTATDownloadWizard.step_4 = FAOSTATDownloadWizard.getSlave2();
			
			WN.init();
			
			FAOSTATDownloadWizard.loadGrid("years", 'yearSlider', false, true);
			
			$("#wizard_container").animate({
				scrollTop: $("#step_0").offset().top - 60
		    }, 1000);
			
			FAOSTATDownloadWizard.translate();
			
		},
		
		translate : function() {
			
			I18N.translateButton('faostat-download-wizard-reset', '_reset');
			I18N.translateButton('faostat-download-wizard-button-next', '_nextStep');
			I18N.translateButton('faostat-download-wizard-button-prev', '_prevStep');
			
			$('#0_buttonNext').attr('value', $.i18n.prop('_start'));
			$('#button-select-all-master').attr('value', $.i18n.prop('_selectAll'));
			$('#button-unselect-all-master').attr('value', $.i18n.prop('_clearSelection'));
			$('#button-select-all-slave1').attr('value', $.i18n.prop('_selectAll'));
			$('#button-unselect-all-slave1').attr('value', $.i18n.prop('_clearSelection'));
			$('#button-select-all-slave2').attr('value', $.i18n.prop('_selectAll'));
			$('#button-unselect-all-slave2').attr('value', $.i18n.prop('_clearSelection'));
			
			document.getElementById('wizard_step_0').innerHTML = $.i18n.prop('_wizard_step_0');
			document.getElementById('step1of6').innerHTML = $.i18n.prop('_step1of6');
			document.getElementById('wizard_step_1').innerHTML = $.i18n.prop('_wizard_step_1');
			document.getElementById('li_countries').innerHTML = $.i18n.prop('_countries');
			document.getElementById('li_elements').innerHTML = $.i18n.prop('_elements');
			document.getElementById('li_items').innerHTML = $.i18n.prop('_items');
			document.getElementById('step2of6').innerHTML = $.i18n.prop('_step2of6');
			document.getElementById('wizard_step_2').innerHTML = $.i18n.prop('_wizard_step_2');
			document.getElementById('wizard_filter_1').innerHTML = $.i18n.prop('_filter_1');
			document.getElementById('step3of6').innerHTML = $.i18n.prop('_step3of6');
			document.getElementById('wizard_step_3').innerHTML = $.i18n.prop('_wizard_step_3');
			document.getElementById('wizard_filter_2').innerHTML = $.i18n.prop('_filter_2');
			document.getElementById('step4of6').innerHTML = $.i18n.prop('_step4of6');
			document.getElementById('wizard_step_4').innerHTML = $.i18n.prop('_wizard_step_4');
			document.getElementById('wizard_filter_3').innerHTML = $.i18n.prop('_filter_3');
			document.getElementById('step5of6').innerHTML = $.i18n.prop('_step5of6');
			document.getElementById('wizard_step_5').innerHTML = $.i18n.prop('_wizard_step_5');
			document.getElementById('step6of6').innerHTML = $.i18n.prop('_step6of6');
			document.getElementById('wizard_step_6').innerHTML = $.i18n.prop('_wizard_step_6');
//			document.getElementById('wizard_output_type').innerHTML = $.i18n.prop('_output_type');
//			document.getElementById('wizard_thousand_separator').innerHTML = $.i18n.prop('_thousand_separator');
//			document.getElementById('wizard_decimal_separator').innerHTML = $.i18n.prop('_decimal_separator');
//			document.getElementById('wizard_decimal_numbers').innerHTML = $.i18n.prop('_decimal_numbers');
			document.getElementById('olapDimensionConfiguration').innerHTML = $.i18n.prop('_olapDimensionConfiguration');
			document.getElementById('output_options_labels').innerHTML = I18N.translate('_outputOptions');
			
		},
		
		getListCode : function(codingSystem) {
			var listCode = '';
			if (FAOSTATDownloadWizard.step_2 == codingSystem) {
				listCode = 'listMaster';
				switch (codingSystem) {
					case 'countries': listCode = 'listCountries'; break;
					case 'elements': listCode = 'listElements'; break;
					case 'items': listCode = 'listItems'; break;
					case 'years': listCode = 'listYears'; break;
				}
			}
			if (FAOSTATDownloadWizard.step_3 == codingSystem)
				listCode = 'listSlave1';
			if (FAOSTATDownloadWizard.step_4 == codingSystem)
				listCode = 'listSlave2';
			if (codingSystem == 'years')
				return 'listYears';
			return listCode;
		},
		
		deSelectRowOnTagRemove : function(codingSystem, label) {
			var listCode = FAOSTATDownloadWizard.getListCode(codingSystem);
			var rows = $('#' + listCode).jqxGrid('getrows');
			for (var i = 0 ; i < rows.length ; i++) {
				if (rows[i].label == label) {
					$('#' + listCode).jqxGrid('setcellvalue', i, "available", false);
					$('#' + listCode).jqxGrid('unselectrow', i);
					break;
				}
			}
		},
		
		reset : function() {
			var c = confirm(I18N.translate('_confirmResetWizard'));
			if (c == true) {
				for (var i = 0 ; i < 7 ; i++)
					$("#step_" + i).css("display", "none");
				$("#step_0").css("display", "inline");
			}
		},
		
		onAddTag : function(id, code, label) {
			var row = {};
			row.label = label;
			row.code = code;
			switch (id) {
				case 'summaryCountries':
					FAOSTATDownloadWizard.summary_countries_map.push(row);
				break;
				case 'summaryElements':
					FAOSTATDownloadWizard.summary_elements_map.push(row);
				break;
				case 'summaryItems':
					FAOSTATDownloadWizard.summary_items_map.push(row);
				break;
				case 'summaryYears':
					FAOSTATDownloadWizard.summary_years_map.push(row);
				break;
			}
		},
		
		onRemoveTag : function(id, code, label) {
			var row = {};
			row.label = label;
			row.code = code;
			switch (id) {
				case 'summaryCountries':
					for (var i = 0 ; i < FAOSTATDownloadWizard.summary_countries_map.length ; i++) {
						var obj = FAOSTATDownloadWizard.summary_countries_map[i];
						if (obj.label == label) {
							FAOSTATDownloadWizard.summary_countries_map.splice(i, 1);
						}
					}
				break;
				case 'summaryElements':
					for (var i = 0 ; i < FAOSTATDownloadWizard.summary_elements_map.length ; i++) {
						var obj = FAOSTATDownloadWizard.summary_elements_map[i];
						if (obj.label == label) {
							FAOSTATDownloadWizard.summary_elements_map.splice(i, 1);
						}
					}
				break;
				case 'summaryItems':
					if (code == 'all') {
						FAOSTATDownloadWizard.summary_items_map = new Array();
						FAOSTATDownloadWizard.selectAllFunction('listMaster', false, 'summaryItems');
					} else {
						for (var i = 0 ; i < FAOSTATDownloadWizard.summary_items_map.length ; i++) {
							var obj = FAOSTATDownloadWizard.summary_items_map[i];
							if (obj.label == label) {
								FAOSTATDownloadWizard.summary_items_map.splice(i, 1);
							}
						}
					}
				break;
				case 'summaryYears':
					for (var i = 0 ; i < FAOSTATDownloadWizard.summary_years_map.length ; i++) {
						var obj = FAOSTATDownloadWizard.summary_years_map[i];
						if (obj.label == label) {
							FAOSTATDownloadWizard.summary_years_map.splice(i, 1);
						}
					}
				break;
			}
		},
	
		autocomplete : function(autocompleteID, gridID) {
			$('#' + autocompleteID).keyup(function() {
				FAOSTATDownloadWizard.delay(function(){
					var rows = $('#' + gridID).jqxGrid('getrows');
					for (var i = 0 ; i < rows.length ; i++) {
						if ($('#' + autocompleteID).val().length > 0) {
							if (rows[i].label.toLowerCase().indexOf($('#' + autocompleteID).val().toLowerCase()) != -1) {
								$('#' + gridID).jqxGrid('ensurerowvisible', i);
							} 
						} 
					}
				}, 500);
			});
		},
		
		delay : function() {
			var timer = 0;
			return function(callback, ms) {
				clearTimeout (timer);
			    timer = setTimeout(callback, ms);
			};
		}(),

		
		fillSlaveGrid : function(slaveGrid, masterCS, slaveCS, masterCodes, domainCode) {
			
			var codes = '';
			for (var i = 0 ; i < masterCodes.length ; i++) {
				codes += masterCodes[i];
				if (i < masterCodes.length - 1)
					codes += ',';
			}
				
			var url = 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/linkedcodes/' + FAOSTATDownload.datasource;
			url += '/' + FAOSTATDownload.selectedDomainCode;
			url += '/' + slaveCS;
			url += '/' + masterCS;
			url += '/' + codes;
			url += '/' + FAOSTATDownload.language;
				
			$.ajax({
					
				type: 'GET',
				url: url,
				dataType: 'json',
					
				success : function(response) {
						
					FAOSTATDownloadWizard.createGrid(slaveCS, slaveGrid, FAOSTATDownload.selectedDomainCode, false, slaveGrid, response, false);
						
				},
					
				error : function(err,b,c) {
					
				}
				
			});
			
		},
		
		loadGrid : function(codingSystem, id, showEmptyGrid, initSummary) {
			switch(codingSystem) {
				case 'countries':
					document.getElementById(id).innerHTML = "<div id='listCountries'></div>";
					FAOSTATDownloadWizard.populateGrid("countries", "listCountries", FAOSTATDownload.selectedDomainCode, showEmptyGrid, id, false, initSummary);
				break;
				case 'elements':
					document.getElementById(id).innerHTML = "<div id='listElements'></div>";
					FAOSTATDownloadWizard.populateGrid("elements", "listElements", FAOSTATDownload.selectedDomainCode, showEmptyGrid, id, false, initSummary);
				break;
				case 'items':
					document.getElementById(id).innerHTML = "<div id='listItems'></div>";
					FAOSTATDownloadWizard.populateGrid("items", "listItems", FAOSTATDownload.selectedDomainCode, showEmptyGrid, id, false, initSummary);
				break;
				case 'years':
					document.getElementById(id).innerHTML = "<div id='listYears'></div>";
					FAOSTATDownloadWizard.populateGrid("years", "listYears", FAOSTATDownload.selectedDomainCode, showEmptyGrid, id, false, initSummary);
				break;
			}           
		},
		
		getMaster : function() {
			var id = $("#sortable").sortable('toArray')[0];
			return id.substring(1 + id.indexOf("_"));
		},
		
		getSlave1 : function() {
			var id = $("#sortable").sortable('toArray')[1];
			return id.substring(1 + id.indexOf("_"));
		},
		
		getSlave2 : function() {
			var master = FAOSTATDownloadWizard.getMaster();
			var slave1 = FAOSTATDownloadWizard.getSlave1();
			var a = new Array(master, slave1);
			if ($.inArray('items', a) < 0) {
				return 'items';
			}
			if ($.inArray('elements', a) < 0) {
				return 'elements';
			}
			if ($.inArray('countries', a) < 0) {
				return 'countries';
			}
		},
		
		createGrid : function(codingSystem, gridCode, domainCode, showEmptyGrid, id, response, checkAllItems, initSummary) {
			
			var data = new Array();
			
			if (response != null) {
				for (var i = 0 ; i < response.length ; i++) {
					var row = {};
					row["label"] = response[i].label;
					row["code"] = response[i].code;
					row["available"] = checkAllItems; 
					data[i] = row;
				}
			}
			
			var source = {
				localdata: data,
                datatype: "array"
            };
			var dataAdapter = new $.jqx.dataAdapter(source);
            
			$("#" + gridCode).jqxGrid({
            	width: '700px',
                height: 250,
                source: dataAdapter,
                editable: true,
                columnsresize: true,
                showheader: false,
                selectionmode: 'none',
                columns: [{ text: '', datafield: 'available', columntype: 'checkbox', width: 40 },{text: I18N.translate('_label'), datafield: 'label', editable: false}],
                theme: FAOSTATDownloadWizard.theme
            });
			
			$("#" + gridCode).bind("cellclick", function (event) {
			    var columnindex = event.args.columnindex;
			    if (columnindex ==1)
			    	alert('Please use the check-boxes for your selection.');
			});   
			
			var summary = "";
        	switch (codingSystem) {
        		case "elements": summary = "summaryElements"; break; 
        		case "items": summary = "summaryItems"; break;
        		case "countries": summary = "summaryCountries"; break;
        		case "years": summary = "summaryYears"; break;
        	};
            
            $("#" + gridCode).bind('cellendedit', function (event) {
                
				var FROM = 'master_list_from';
                var TO = 'master_list_to';
                
                switch(gridCode) {
                	case 'listMaster': 
	                	FROM = 'master_list_from';
	                	TO = 'master_list_to';
                	break;
                	case 'listSlave1': 
	                	FROM = 'slave_list_1_from';
	                	TO = 'slave_list_1_to';
                	break;
                	case 'listSlave2': 
	                	FROM = 'slave_list_2_from';
	                	TO = 'slave_list_2_to';
                	break;
                	case 'listYears': 
	                	FROM = 'years_list_from';
	                	TO = 'years_list_to';
                	break;
                }
                
				if (event.args.value) {
                	$("#" + gridCode).jqxGrid('selectrow', event.args.rowindex);
                	
                	var row = ($("#" + gridCode).jqxGrid('getrows'))[event.args.rowindex];
                	FAOSTATDownloadWizard.onAddTag(summary, row.code, row.label);
                	
                	if (FAOSTATDownloadWizard.check_indices[FROM] == null) {
                		FAOSTATDownloadWizard.check_indices[FROM] = event.args.rowindex;
                	} else if (FAOSTATDownloadWizard.shift == true && FAOSTATDownloadWizard.check_indices[TO] == null) {
                		FAOSTATDownloadWizard.check_indices[TO] = event.args.rowindex;
                		var start = FAOSTATDownloadWizard.check_indices[FROM];
            			var end = FAOSTATDownloadWizard.check_indices[TO];
            			if (end < start) {
            				var tmp = start;
            				start = end;
            				end = tmp;
            			}
            			for ( var i = start; i <= end; i++) {
            				$("#" + gridCode).jqxGrid('selectrow', i);
            				$("#" + gridCode).jqxGrid('setcellvalue', i, "available", true);
            				var row = ($("#" + gridCode).jqxGrid('getrows'))[i];
                        	FAOSTATDownloadWizard.onAddTag(summary, row.code, row.label);
            			}
                	}
                } else {
                	$("#" + gridCode).jqxGrid('unselectrow', event.args.rowindex);
                }
            });
            
            var autocompleteID = '';
            var listID = '';
            switch(id) {
				case 'listMaster': 
					autocompleteID = 'autocompleteMaster'; 
					listID = FAOSTATDownloadWizard.getListIDByCodingSystem(FAOSTATDownloadWizard.getMaster());
					FAOSTATDownloadWizard.autocomplete(autocompleteID, listID);
					FAOSTATDownloadWizard.selectAll("button-select-all-master", id, true, summary);
					FAOSTATDownloadWizard.selectAll("button-unselect-all-master", id, false, summary);
				break;
				case 'listSlave1': 
					autocompleteID = 'autocompleteSlave1';
					listID = FAOSTATDownloadWizard.getListIDByCodingSystem(FAOSTATDownloadWizard.getSlave1());
					FAOSTATDownloadWizard.autocomplete(autocompleteID, id);
					FAOSTATDownloadWizard.selectAll("button-select-all-slave1", id, true, summary);
					FAOSTATDownloadWizard.selectAll("button-unselect-all-slave1", id, false, summary);
				break;
				case 'listSlave2': 
					autocompleteID = 'autocompleteSlave2';
					listID = FAOSTATDownloadWizard.getListIDByCodingSystem(FAOSTATDownloadWizard.getSlave2());
					FAOSTATDownloadWizard.autocomplete(autocompleteID, id);
					FAOSTATDownloadWizard.selectAll("button-select-all-slave2", id, true, summary);
					FAOSTATDownloadWizard.selectAll("button-unselect-all-slave2", id, false, summary);
				break;
				case 'yearSlider': 
					FAOSTATDownloadWizard.selectAll("button-select-all-years", 'listYears', true, summary);
					FAOSTATDownloadWizard.selectAll("button-unselect-all-years", 'listYears', false, summary);
				break;
			};
			
			if (checkAllItems) {
				var rows = ($('#' + gridCode).jqxGrid('getrows')).length;
				for (var i = 0 ; i < rows ; i++) {
					$('#' + gridCode).jqxGrid('getselectedrowindexes').push(i);
					$("#" + gridCode).jqxGrid('setcellvalue', i, "available", true);
				}
				$('#' + gridCode).jqxGrid('refresh');
			}
            
		},
		
		selectAll : function(buttonID, gridCode, selected, summaryID) {
			$('#' + buttonID).bind('click', function () {
				FAOSTATDownloadWizard.selectAllFunction(gridCode, selected, summaryID);
			});
		},
		
		selectAllFunction : function(gridCode, selected, summaryID) {
			if (gridCode == 'listMaster') {
				switch (summaryID) {
					case 'summaryElements': gridCode = 'listElements'; break;
					case 'summaryCountries': gridCode = 'listCountries'; break;
					case 'summaryItems': gridCode = 'listItems'; break;
					case 'summaryYears': gridCode = 'listYears'; break;
				}
			}
			var rows = ($('#' + gridCode).jqxGrid('getrows')).length;
			for (var i = 0 ; i < rows ; i++) {
				if (selected) {
					$('#' + gridCode).jqxGrid('getselectedrowindexes').push(i);
				} else {
					$('#' + gridCode).jqxGrid('getselectedrowindexes').pop();
				}
				$("#" + gridCode).jqxGrid('setcellvalue', i, "available", selected);
			}
			$('#' + gridCode).jqxGrid('refresh');
			
			switch (summaryID) {
				case 'summaryElements': FAOSTATDownloadWizard.summary_elements_map = new Array(); break;
				case 'summaryCountries': FAOSTATDownloadWizard.summary_countries_map = new Array(); break;
				case 'summaryItems': FAOSTATDownloadWizard.summary_items_map = new Array(); break;
				case 'summaryYears': FAOSTATDownloadWizard.summary_years_map = new Array(); break;
			}
			if (selected)
				FAOSTATDownloadWizard.onAddTag(summaryID, 'all', 'All');
		},
		
		getListIDByCodingSystem : function(codingSystem) {
			switch (codingSystem) {
				case 'elements': return 'listElements';
				case 'items': return 'listItems';
				case 'countries': return 'listCountries';
			}
		},
		
		getCodingSystemByListID : function(id) {
			switch (id) {
				case 'listElements': return 'elements';
				case 'listItems': return 'items';
				case 'listCountries': return 'countries';
			}
		},
		
		populateGrid : function(codingSystem, gridCode, domainCode, showEmptyGrid, id, checkAllItems, initSummary) {
			
			if (showEmptyGrid) {
				
				FAOSTATDownloadWizard.createGrid(codingSystem, gridCode, domainCode, showEmptyGrid, id, null, checkAllItems, initSummary);
				
			} 
			
			else {
				
				if (domainCode != null && domainCode.length > 0) {
					
					var url = 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + FAOSTATDownload.datasource + '/' + domainCode + '/' + FAOSTATDownload.language;
				
					$.ajax({
						
						type: 'GET',
						url: url,
						dataType: 'json',
						
						success : function(response) {
							
							FAOSTATDownloadWizard.createGrid(codingSystem, gridCode, domainCode, showEmptyGrid, id, response, checkAllItems, initSummary);
							
						},
						
						error : function(err,b,c) {

						}
					
					});
					
				}
				
			}

		}
	
	};
	
}