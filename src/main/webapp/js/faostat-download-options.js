if (!window.FAOSTATDownloadOptions) {
window.FAOSTATDownloadOptions = {	
init : function () {		
		$(".faostat-download-checkbox").jqxCheckBox({ 
			width: 120, 
			height: 25, 
			theme: FAOSTATDownload.theme 
		});
		$(".faostat-download-radio").jqxRadioButton({ 
			width: 120, 
			height: 25, 
			theme: FAOSTATDownload.theme  
		});
		$(".faostat-download-options").jqxNavigationBar({ 
				width: 140, 
				height: 500, 
				expandMode: 'multiple', 
				expandedIndexes: [0], 
				theme: FAOSTATDownload.theme 
			});
		 $("#checkboxShowUnits").bind('change', function (event) {
	                var checked = event.args.checked;
	                var v=0;
	                if (checked)
	                {document.getElementById("option").value=document.getElementById("option").value.replace("showUnits:0","showUnits:1");
	                v=1;
	                }
	                else {
	                	document.getElementById("option").value=document.getElementById("option").value.replace("showUnits:1","showUnits:0");
	                	v=0;
	                	}
	                if(OLAP.window.length==1){
						//OLAP.window.document.getElementById('option').value=document.getElementById("option").value;
						OLAP.window.option.showUnits=v;
	                	OLAP.window.DEMO.pivot.cb();
					}
	            });
		$(".faostat-download-list-olap").jqxDropDownList({ 
				source: ["Countries", "Items", "Elements", "Years"], 
				selectedIndex: 0,
				width: '125', 
				height: '20', 
				theme: FAOSTATDownload.theme 
			});
		$("#listThousandsSeparator").jqxDropDownList({ 
				source: [{label: 'None', value: null},
				         {label: 'Comma', value: ','},
				         {label: 'Period', value: '.'},
				         {label: 'Space', value: ' '}], 
				selectedIndex: 1,
				width: '125', 
				height: '20', 
				theme: FAOSTATDownload.theme 
			});
		$("#listThousandsSeparator").bind('change',function(e){alert('LTS');});
		
		$("#listDecimalSeparator").jqxDropDownList({ 
				source: [{label: 'None', value: null}, 
				         {label: 'Comma', value: ','}, 
				         {label: 'Period', value: '.'}, 
				         {label: 'Space', value: ' '}], 
				selectedIndex: 2,
				width: '125', 
				height: '20', 
				theme: FAOSTATDownload.theme 
			});
		
		$("#listDecimalSeparator").bind('change',function(e){alert('LDS');});
		
		$("#listDecimalNumbers").jqxDropDownList({ 
				source: [0, 1, 2, 3, 4], 
				selectedIndex: 2,
				width: '125', 
				height: '20', 
				theme: FAOSTATDownload.theme 
			});
		$("#listFormat").jqxDropDownList({ 
				source: [{html:"Basic <br> (1234.56)",value:"0"},
				         {html:"With space <br> (1 234.56)",value:3},
				         {html:"With comma <br> (1,234.56)",value:5}], 
//				selectedIndex: 1,
				width: '125', 
				height: '40', 
				theme: FAOSTATDownload.theme
			});
		
		
		
		$("#listFormat").bind('select',function(e){
				 var args = e.args;
				 var item = $('#listFormat').jqxDropDownList('getItem', args.index);
				 if (item != null) {
					  if(OLAP.window.length==1){
						  OLAP.window.document.getElementById('option').value= OLAP.window.document.getElementById('option').value.replace(/type:.*/,"type:"+item.value);
						  OLAP.window.DEMO.pivot.cb();
					  	}
					  } 
			});
		$('#checkboxTable').bind('change', function (e) {
				FAOSTATDownloadOptions.showOptions(e.args.checked);
			});
			//hide options
			FAOSTATDownloadOptions.showOptions(true);
			//pre-select drop-downs
			FAOSTATDownloadOptions.selectDropDownIndex();
		},
		selectDropDownIndex : function() {
			$("#listRows").jqxDropDownList('selectIndex', 0);
			$("#listSubRows").jqxDropDownList('selectIndex', 1);
			$("#listColumns").jqxDropDownList('selectIndex', 3);
			$("#listCreateTablesBy").jqxDropDownList('selectIndex', 2);
		},
		showOptions : function(hide) {
			if (hide) {
				$('#li_label_rows').fadeOut('slow');
				$('#li_list_rows').fadeOut('slow');
				$('#li_label_subrows').fadeOut('slow');
				$('#li_list_subrows').fadeOut('slow');
				$('#li_label_columns').fadeOut('slow');
				$('#li_list_columns').fadeOut('slow');
				$('#li_label_createtablesby').fadeOut('slow');
				$('#li_list_createtablesby').fadeOut('slow');
			} else {
				$('#li_label_rows').fadeIn('slow');
				$('#li_list_rows').fadeIn('slow');
				$('#li_label_subrows').fadeIn('slow');
				$('#li_list_subrows').fadeIn('slow');
				$('#li_label_columns').fadeIn('slow');
				$('#li_list_columns').fadeIn('slow');
				$('#li_label_createtablesby').fadeIn('slow');
				$('#li_list_createtablesby').fadeIn('slow');
			}
		}
	};
}