if (!window.FIELD) {
	
	window.FIELD = {
			
		lastChecked : null,
		
		shift: false,
			
		test : function() {
			
			$("#list1").click(function(e) {
				FIELD.clickType(e);
			});
			
			$("#list2").click(function(e) {
				FIELD.clickType(e);
			});
			
			var source = ["Paperino", "Pippo", "Pluto", "Asterix", "Obelix"];
			
			$("#listbox").jqxListBox({ 
				source: source, 
				checkboxes: true, 
				width: 200, 
				height: 200, 
				theme: FAOSTATDownload.theme 
			});
			
			$("#listbox").bind('checkChange', function (event) {
                var args = event.args;
                if (args.checked) {
                    alert("Checked: " + args.label);
                    FIELD.clickType(e);
                } else {
                	alert("Unchecked: " + args.label);
                	FIELD.clickType(e);
                }
            });
			
			$(document).bind({
				keydown : function(e) {
					if (e.which == 16)
						FIELD.shift = true;
					//console.log("enter keydown..." + FIELD.shift);
				},
				keyup : function(e) {
					FIELD.shift = false;
					//console.log("enter keyup..." + FIELD.shift);
				}
			});
			
			$("#listbox").bind({
				select : function(e) {
					//console.log("enter select...");
					alert(FIELD.shift);
				}
			});
			
			/*
			$("#listbox").change(function(e) {
				alert(e.ctrlKey);
				$.each(e, function(k, v) {
					alert("select: " + k + " = " + v);
				});
			});
			*/
			
			/*
			$("#listbox").bind('click', function (e) {
				console.log("enter click...");
				FIELD.shift = e.shiftKey;
            });
			
			$("#listbox").bind('select', function (e) {
				console.log("enter select...");
				alert(FIELD.shift);
            });
            */
			
		},
		
		clickType: function(e) {
			if(e.shiftKey) {
				alert("SHIFT + Click:\n");
			} else if(e.ctrlKey) {
				alert("CTRL + Click:\n");
			} else {
				alert("Standard Click:\n");
			}
		}
		
	};
	
}