var F3DWLDNotes = (function() {

    function addHeader() {

        $.ajax({

            type: 'GET',
            url: F3DWLD.CONFIG.domains_url + '/' + FAOSTATDownload.datasource + '/' + FAOSTATDownload.groupCode + '/' + FAOSTATDownload.language,
            dataType: 'json',

            success : function(response) {

                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);
                $('#page_start').append('<div class="noteHead"> <h2>Metadata / <a style="cursor: pointer;">' + $('#jqxTree').jqxTree('getSelectedItem').label + '</a></h2></div>');
                $('#page_start').append('<h2 class="metadata-available-title">' + $.i18n.prop('_notes_header') + '</h2>');
                for (var i = 0; i < json.length; i++) {
                    var s = '';
                    s += '<a class="metadata-links"';
                    s += 'href="' + F3DWLD.CONFIG.base_url + '/' + FAOSTATDownload.groupCode + '/' + json[i][0] + '/' + F3DWLD.CONFIG.lang;
                    s += '">' + json[i][1] + '</a>';
                    $('#page_start').append(s);
                }
                $('#page_start').append('<hr class="standard-hr metadata-hr" >');
                $('#page_start').append('<br>');

            },

            error : function(err, b, c) {
                alert('Domain code ' + F3DWLD.CONFIG.domainCode + ' has no DSD.');
            }

        });

    };

    return {
        addHeader : addHeader
    };

})();