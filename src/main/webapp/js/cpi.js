if (!window.CPI) {
	window.CPI = {
		init : function() {
			CPI.fillCountriesList();
		},
		fillCountriesList : function() {
			var source = {
				datatype : "json",
				datafields : [
                    {name : 'code'},
                    {name : 'label'}
                ],
				url : 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/countries/' + FAOSTATDownload.datasource + '/CC/' + FAOSTATDownload.language
			};
			var dataAdapter = new $.jqx.dataAdapter(source);
			$("#cpi_dropdown").jqxDropDownList({
				source : dataAdapter,
				displayMember : 'label',
				valueMember : 'code',
//				width : '100%',
				height : '25px',
//				selectedIndex : 0,
				theme : FAOSTATDownload.theme
			});
		},
		showMore : function() {
			var actual = $('#more_info').css('display');
			if (actual == 'none') {
				$('#more_info').css('display', 'inline');
			} else {
				$('#more_info').css('display', 'none');
			}
		},
		showMetadata : function() {
			var item = $("#cpi_dropdown").jqxDropDownList('getSelectedItem');
			//console.log(item.originalItem.code);
			$.ajax({
				type : 'GET',
				url : 'http://' + FAOSTATDownload.baseurl
						+ '/wds/rest/notes/cpi/' + FAOSTATDownload.datasource
						+ '/' + item.originalItem.code + '/'
						+ FAOSTATDownload.language,
				success : function(response) {
					document.getElementById('metadata').innerHTML = response;
				},
				error : function(err, b, c) {
					//console.log(codingSystem + ' ERROR! - ' + err.status + ", "
					//		+ b + ", " + c);
				}
			});
		},
		lang : function() {
			switch (FAOSTATDownload.language) {
			case 'fr':
				return 'F';
			case 'es':
				return 'S';
			default:
				return 'E';
			}
		},
		showCPITableNotes : function() {
			var status = $('#cpi_notes_container').css('display');
			switch (status) {
				case 'none': $('#cpi_notes_container').css('display', 'inline'); break;
				case 'inline': $('#cpi_notes_container').css('display', 'none'); break;
			}
		},
		removeCPITableNotes : function() {
			$('#cpi_notes_area').css('display', 'none');
		}
	};
}