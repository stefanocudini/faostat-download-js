if (!window.CPI) {
	window.CPI = {
		init : function() {
			CPI.fillCountriesList();
		},
		fillCountriesList : function() {
            $.ajax({
                type : 'GET',
                url : 'http://' + F3DWLD.CONFIG.baseurl + '/wds/rest/procedures/cpimetadataareas/' + F3DWLD.CONFIG.datasource + '/' + F3DWLD.CONFIG.lang,
                success : function(response) {
                    var json = response;
                    if (typeof(json) == 'string')
                        json = $.parseJSON(response);
                    var s = '<select id="cpi_areas" style="width: 100%;">';
                    for (var i = 0 ; i < json.length ; i++)
                        s += '<option value="' + json[i][0] + '">' + json[i][1] + '</option>';
                    s += '</select>';
                    document.getElementById('cpi_dropdown').innerHTML = s;
                    $('#cpi_areas').chosen({disable_search_threshold: 10});
                },
                error : function(err, b, c) {

                }
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
			var selectedArea = $('#cpi_areas').val();
			$.ajax({
				type : 'GET',
				url : 'http://' + F3DWLD.CONFIG.baseurl + '/wds/rest/procedures/cpimetadata/' + F3DWLD.CONFIG.datasource + '/' + selectedArea + '/' + F3DWLD.CONFIG.lang,
				success : function(response) {
                    var json = response;
                    if (typeof(json) == 'string')
                        json = $.parseJSON(response);
                    var s = '';
                    s += '<br>';
                    s += '<br>';
                    s += '<table style="border-spacing: 6px;">';
                    for (var i = 0 ; i < json.length ; i++)
                        s += '<tr><td><b>' + json[i][0] + '</b>: </td><td>' + json[i][1] + '</td></tr>';
                    s += '</table>';
					document.getElementById('metadata').innerHTML = s;
				},
				error : function(err, b, c) {

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