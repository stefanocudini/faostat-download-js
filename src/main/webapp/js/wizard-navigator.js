if (!window.WN) {

	window.WN = {
		
		init : function() {
	
			/**
			 * initiate 'Next' buttons
			 */
			$(".faostat-download-wizard-button-next").jqxButton({ 
				width: '100%', 
				theme: FAOSTATDownloadWizard.theme
			});
			
			$(".faostat-download-wizard-button-next").bind('click', function(e) {
				WN.next(e.target.id);
			});
			
			/**
			 * initiate 'Previous' buttons
			 */
			$(".faostat-download-wizard-button-prev").jqxButton({ 
				width: '100%', 
				theme: FAOSTATDownloadWizard.theme 
			});
			
			$(".faostat-download-wizard-button-prev").bind('click', function(e) {
				WN.prev(e.target.id);
			});
			
			/**
			 * Initiate generic buttons
			 */
			$(".faostat-download-wizard-button").jqxButton({ 
				width: '100%', 
				theme: FAOSTATDownloadWizard.theme 
			});
			
			$(".faostat-download-wizard-button-black").jqxButton({ 
				width: '100%', 
				theme: FAOSTATDownloadWizard.theme
			});
			
			/**
			 * Black buttons for 'dangerous' operations
			 */
			$(".faostat-download-wizard-button-alert").jqxButton({ 
				width: '100%', 
				theme: FAOSTATDownloadWizard.theme
			});
			
			/**
			 * Reset the wizard
			 */
			$(".faostat-download-wizard-reset").jqxButton({ 
				width: '100%', 
				theme: FAOSTATDownloadWizard.theme
			});
			
			$(".faostat-download-wizard-reset").bind('click', function(e) {
				FAOSTATDownloadWizard.reset();
			});
			
			$(".faostat-download-wizard-button-black").bind('click', function() {
				FAOSTATDownloadWizard.reset();
			});
			
		},
		
		next : function(id) {
			
			// parse the ID
			var step = parseInt(id.substring(0, id.indexOf("_")));
			var next_step = 1 + step;

			// custom behaviours
			switch (step) {
				
				case 1 :
					
					/** 
					 * hide current one, show next
					 */
					$("#step_" + step).css("display", "none");
					$("#step_" + next_step).css("display", "inline");
					
					/** 
					 * custom features: after the first click grids will be 
					 * reset also when the drag-n-drop component changes
					 */
					FAOSTATDownloadWizard.resetGridsOnChange = true;
					var master = FAOSTATDownloadWizard.getMaster();
					var slave1 = FAOSTATDownloadWizard.getSlave1();
					var slave2 = FAOSTATDownloadWizard.getSlave2();
					
					/**
					 * create the grids: master is filled-up, slaves are empty
					 */
					FAOSTATDownloadWizard.loadGrid(master, 'listMaster', false, true);
					FAOSTATDownloadWizard.loadGrid(slave1, 'listSlave1', true, true);
					FAOSTATDownloadWizard.loadGrid(slave2, 'listSlave2', true, true);
					
				break;
				
				case 2 :
					
					/**
					 * enable the lazy loading for slave grids
					 */
					FAOSTATDownloadWizard.filterSlave1OnChange = true;
						
					/**
					 * fill slave grids
					 */
					var masterCS = FAOSTATDownloadWizard.getMaster();
					var slaveCS1 = FAOSTATDownloadWizard.getSlave1();
					var masterCodes = new Array();
						
					var rows = $('#' + FAOSTATDownloadWizard.getListIDByCodingSystem(masterCS)).jqxGrid('getrows');
					var rowindexes = $('#' + FAOSTATDownloadWizard.getListIDByCodingSystem(masterCS)).jqxGrid('getselectedrowindexes');
					for (var i = 0 ; i < rowindexes.length ; i++) {
						var row = rows[rowindexes[i]];
						masterCodes[i] = row.code; 
					}
					
					/**
					 * Continue if at least a code has been selected only
					 */
					if (masterCodes.length > 0) {
						
						/** 
						 * hide current one, show next
						 */
						$("#step_" + step).css("display", "none");
						$("#step_" + next_step).css("display", "inline");
						FAOSTATDownloadWizard.fillSlaveGrid('listSlave1', masterCS, slaveCS1, masterCodes, FAOSTATDownload.selectedDomainCode);
						
					} else {
						
						alert(I18N.translate('_pleaseSelectAtLeastOneItem'));
						
					}
					
					
				break;
				
				case 3 :
					
					/**
					 * enable the lazy loading for slave grids
					 */
					FAOSTATDownloadWizard.filterSlave2OnChange = true;
						
					/**
					 * fill slave grids
					 */
					var masterCS = FAOSTATDownloadWizard.getMaster();
					var slaveCS2 = FAOSTATDownloadWizard.getSlave2();
					var masterCodes = new Array();
					
					var rowindexes = $('#' + FAOSTATDownloadWizard.getListIDByCodingSystem(masterCS)).jqxGrid('getselectedrowindexes');
					var rows = $('#' + FAOSTATDownloadWizard.getListIDByCodingSystem(masterCS)).jqxGrid('getrows');
					for (var i = 0 ; i < rowindexes.length ; i++) {
						var row = rows[rowindexes[i]];
						masterCodes[i] = row.code; 
					}
					
					/**
					 * Continue if at least a code has been selected only
					 */
					if (masterCodes.length > 0) {
						
						/** 
						 * hide current one, show next
						 */
						$("#step_" + step).css("display", "none");
						$("#step_" + next_step).css("display", "inline");
						FAOSTATDownloadWizard.fillSlaveGrid('listSlave2', masterCS, slaveCS2, masterCodes, FAOSTATDownload.selectedDomainCode);
						
					} else {
						
						alert(I18N.translate('_pleaseSelectAtLeastOneItem'));
						
					}
					
					
				break;
				
				case 5 :
					
					/** 
					 * hide current one, show next
					 */
					$("#step_" + step).css("display", "none");
					$("#step_" + next_step).css("display", "inline");
					
					/**
					 * Initiate and fill the summaries
					 */
					$('#summary_area').load(FAOSTATDownload.prefix + 'summary.html', function() {
						
						/**
						 * initiate 'Back to...' buttons
						 */
						$(".faostat-download-wizard-button-back").jqxButton({ 
							width: '200', 
							height: '25', 
							theme: FAOSTATDownloadWizard.theme 
						});
						
						/**
						 * listener to go back to the countries list
						 */
						$("#buttonBackToCountries").bind('click', function(e) {
							WN.backTo('countries');
						});
						
						/**
						 * listener to go back to the items list
						 */
						$("#buttonBackToItems").bind('click', function(e) {
							WN.backTo('items');
						});
						
						/**
						 * listener to go back to the elements list
						 */
						$("#buttonBackToElements").bind('click', function(e) {
							WN.backTo('elements');
						});
						
						/**
						 * listener to go back to the years list
						 */
						$("#buttonBackToYears").bind('click', function(e) {
							WN.backTo('years');
						});
						
						/**
						 * Initiate the summaries
						 */
						var list = new Array('summaryCountries', 'summaryElements', 'summaryItems', 'summaryYears');
						for (var i = 0 ; i < list.length ; i++) {
							$('#' + list[i]).tagit();
						}
						
						/**
						 * Fill the summaries
						 */
						for (var i = 0 ; i < FAOSTATDownloadWizard.summary_countries_map.length ; i++) {
							var l = FAOSTATDownloadWizard.summary_countries_map[i].label;
							$('#summaryCountries').tagit('createTag', l);
							$('#summaryCountries').tagit('option', 'onTagRemoved', function(e, tag) {
								var l = $('#summaryCountries').tagit('tagLabel', tag);
								FAOSTATDownloadWizard.onRemoveTag('summaryCountries', l, l);
								FAOSTATDownloadWizard.deSelectRowOnTagRemove('countries', l);
							});
						}
						for (var i = 0 ; i < FAOSTATDownloadWizard.summary_items_map.length ; i++) {
							var l = FAOSTATDownloadWizard.summary_items_map[i].label;
							$('#summaryItems').tagit('createTag', l);
							$('#summaryItems').tagit('option', 'onTagRemoved', function(e, tag) {
								var l = $('#summaryItems').tagit('tagLabel', tag);
								FAOSTATDownloadWizard.onRemoveTag('summaryItems', l, l);
								FAOSTATDownloadWizard.deSelectRowOnTagRemove('items', l);
							});
						}
						for (var i = 0 ; i < FAOSTATDownloadWizard.summary_elements_map.length ; i++) {
							var l = FAOSTATDownloadWizard.summary_elements_map[i].label;
							$('#summaryElements').tagit('createTag', l);
							$('#summaryElements').tagit('option', 'onTagRemoved', function(e, tag) {
								var l = $('#summaryElements').tagit('tagLabel', tag);
								FAOSTATDownloadWizard.onRemoveTag('summaryElements', l, l);
								FAOSTATDownloadWizard.deSelectRowOnTagRemove('elements', l);
							});
						}
						for (var i = 0 ; i < FAOSTATDownloadWizard.summary_years_map.length ; i++) {
							var l = FAOSTATDownloadWizard.summary_years_map[i].label;
							$('#summaryYears').tagit('createTag', l);
							$('#summaryYears').tagit('option', 'onTagRemoved', function(e, tag) {
								var l = $('#summaryYears').tagit('tagLabel', tag);
								FAOSTATDownloadWizard.onRemoveTag('summaryYears', l, l);
								FAOSTATDownloadWizard.deSelectRowOnTagRemove('years', l);
							});
						}
						
					});
					
				break;
				
				default:
					
					/** 
					 * hide current one, show next
					 */
					$("#step_" + step).css("display", "none");
					$("#step_" + next_step).css("display", "inline");
					
				break;
				
			}
			
		},
		
		prev : function(id) {
			
			/** 
			 * hide current one, show next
			 */
			var step = parseInt(id.substring(0, id.indexOf("_")));
			var prev_step = step - 1;

			// hide current one, show next
			$("#step_" + step).css("display", "none");
			$("#step_" + prev_step).css("display", "inline");
			
		},
		
		backTo : function(codingSystem) {
			$("#step_6").css("display", "none");
			if (codingSystem == 'years') {
				$("#step_5").css("display", "inline");
			} else {
				for (var i = 2 ; i <= 4 ; i++) {
					if (FAOSTATDownloadWizard['step_' + i] == codingSystem) {
						$("#step_" + i).css("display", "inline");
						break;
					}
				}
			}
		}
	
	};
	
}