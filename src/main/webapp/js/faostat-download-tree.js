if (!window.FAOSTATDownloadTree) {

    window.FAOSTATDownloadTree = {

        inuse: false,

        init: function () {

            if (!FAOSTATDownloadTree.inuse) {

                FAOSTATDownloadTree.inuse = true;
                var selectedDomain = '';
                if (window.calledFromHomepage == true && window.calledFromHomepageCode != '') {
                    selectedDomain = window.calledFromHomepageCode;
                }
                window.calledFromHomepage = false;
                window.calledFromHomepageCode = '';

//                $('#jqxTree').jqxTree({
//                    width: '200',
//                    theme: FAOSTATDownload.theme
//                });
//
//                $('#jqxTree').css('border-color', '#FFFFFF');
//
//                $('#jqxTree').bind('expand', function (event) {
//                    FAOSTATDownloadTree.showDownloadNotes(event);
//                    FAOSTATDownloadTree.expand(event);
//                });
//
//                $('#jqxTree').bind('checkChange', function (event) {
//                    var items = $("#jqxTree").jqxTree('getItems');
//                    var checkedItems = new Array();
//                    $.each(items, function () {
//                        if (this.checked) {
//                            if (this.value != "" && this.value != null) {
//                                checkedItems[checkedItems.length] = this.value;
//                            }
//                        }
//                    });
//                    FAOSTATDownload.selectedDomainCode = checkedItems.join("_");
//                    $('#domain').value = checkedItems.join("_");
//                });

                $('#downloadType').bind('buttonclick', function () {
                    alert($('#downloadType').jqxButtonGroup('getSelection'));
                });

//                $('#jqxTree').bind('select', function (event) {
//                    $('#OLAP_IFRAME').css('display', 'none');
//                    var args = event.args;
//                    var item = $('#jqxTree').jqxTree('getItem', args.element);
//                    $('#jqxTree').jqxTree('expandItem', item.element);
//                    if (item.parentElement != null && item.hasItems == false) {
//                        FAOSTATDownload.selectedDomainCode = item.value;
//                        if (FAOSTATDownload.downloadType == 1) {
//                            FAOSTATDownload.showSelectionMode(false);
//                            FAOSTATDownloadTree.showBulkDownloads(item);
//                            FAOSTATDownload.showDownloadOptionsAndButtons(false);
//                        } else {
//                            FAOSTATDownload.showSelectionMode(true);
//                            FAOSTATDownload.showDownloadOptionsAndButtons(true);
//                            FAOSTATDownload.showClassicOrWizard();
//                        }
//                    } else {
//                        FAOSTATDownload.showSelectionMode(false);
//                        FAOSTATDownloadTree.loadDownloadNotes(item.value);
//                    }
//                    FAOSTATDownload.selectedDomainCode = item.value;
//                    document.getElementById('output_area').innerHTML = '';
//                });
                $.getJSON(FAOSTATDownload.prefix + 'config/faostat-download-configuration.json', function (data) {
//                    FAOSTATDownloadTree.populateTree(data, selectedDomain);

                    FAOSTATDownloadTree.populateTree(data, FAOSTATDownload.groupCode);
                }).error(function(jqXHR, textStatus, errorThrown) {
                    console.log("error " + textStatus);
                    console.log("incoming Text " + jqXHR.responseText); 
                });

            }

        },

        showSelectedDomain: function (selectedDomain) {

//            if (selectedDomain != '') {
//
//                // Get tree items
//                var items = $('#jqxTree').jqxTree('getItems');
//
//                if (items != null) {
//
//                    for (var i = 0; i < items.length; i++) {
//
//                        var checkSelectedCode = selectedDomain;
//
//                        if (selectedDomain != 'FB' && selectedDomain != 'G1' && selectedDomain != 'G2') {
//                            checkSelectedCode = selectedDomain.charAt(0)
//                        }
//
//                        if (items[i].id == checkSelectedCode) {
//
//                            $('#jqxTree').jqxTree('selectItem', items[i].element);
//
//                            // Show download notes...
//                            if (FAOSTATDownload.domainCode == null) {
//
//                                // Load Download Notes
//                                FAOSTATDownloadTree.loadDownloadNotes(selectedDomain);
//
//                            }
//
//                            // ...or the selection UI
//                            else {
//                                // TODO here???
//                                FAOSTATDownload.selectedDomainCode = FAOSTATDownload.domainCode;
//                                FAOSTATDownload.showClassicOrWizard();
//                            }
//
//                            break;
//
//                        }
//
//                    }
//
//                }
//
//            }

        },

        loadDownloadNotes: function (domainCode) {

            FAOSTATDownload.groupCode = domainCode;
            FAOSTATDownload.domainCode = 'null';

            var lang = '';
            switch (FAOSTATDownload.language) {
                case 'fr':
                    lang = 'F';
                    break;
                case 'es':
                    lang = 'S';
                    break;
                case 'F':
                    lang = 'F';
                    break;
                case 'S':
                    lang = 'S';
                    break;
                default:
                    lang = 'E';
                    break;
            }

            /**
             * Show new notes for 'Prices' domain
             */
            var prices = domainCode == 'P'  || domainCode == 'CP' ||
                         domainCode == 'PA' || domainCode == 'PI' ||
                         domainCode == 'PM' || domainCode == 'PP';

            /**
             * FAOSTAT 3 NOTES
             */
            $('#listArea').load(FAOSTATDownload.prefix + 'notes/' + domainCode + '/Description_' + lang + '.html', function () {
                FAOSTATDownload.showDownloadOptionsAndButtons(false);
				document.getElementById('testinline').className="invi";
                FAOSTATDownloadTree.innerLinks();

                $('#mainTD').hide();
                $('#OLAPTD').show();

            });

            // Upgrade the URL
            var domainCode = (FAOSTATDownload.domainCode == 'null') ? '*' : FAOSTATDownload.domainCode;
            CORE.upgradeURL('download', FAOSTATDownload.groupCode, domainCode, FAOSTATDownload.language);

        },

        innerLinks: function () {
            $('.goto').attr('style', 'cursor: pointer; text-decoration: underline;');
            $('.goto').click(function () {
                var id = $(this).attr('id').substring(0, $(this).attr('id').indexOf('_'));
                FAOSTATDownloadTree.loadDownloadNotes(id);
            });
        },

        showDownloadNotes: function (event) {
//            var args = event.args;
//            var item = $('#jqxTree').jqxTree('getItem', args.element);
        },

        breakLabel: function (label) {
            var blank_count = 0;
            var chars_limit = 25;
            var words_limit = 3;
            for (var z = 0; z < (label != null) && label.length; z++) {
                if (label.charAt(z) == ' ') {
                    blank_count++;
                    if (blank_count >= words_limit || z >= chars_limit) {
                        return label.substring(0, z) + '<br>' + label.substring(1 + z);
                    }
                }
            }
            return label;
        },

        /**
         * @param json configuration parameters read from JSON file
         *
         * This function populates the tree out of results coming from WDS REST call
         */
        populateTree: function (json, selectedDomain) {

            FAOSTATDownload.baseurl = json.baseurl;
            FAOSTATDownload.datasource = json.datasource;
            FAOSTATDownload.tablelimit = json.tablelimit;

            var lang = 'E';
            switch (FAOSTATDownload.language) {
                case 'FR' : lang = 'F'; break;
                case 'ES' : lang = 'S'; break;
            }

            $.ajax({

                type        :   'GET',
                url         :   F3DWLD.CONFIG.data_url + '/groupsanddomains/' + FAOSTATDownload.datasource + '/' + FAOSTATDownload.language,
                dataType    :   'json',

                success : function(response) {

                    // Fetch JSON
                    var data = response;
                    if (typeof data == 'string')
                        data = $.parseJSON(response);

                    // Create root item
                    $('#jqxTree').append('<ul id="root"></ul>');

                    var groupIndices = FAOSTATDownloadTree.findGroupIndices(data);
                    for (var i = 0 ; i < groupIndices.length ; i++)
                        FAOSTATDownloadTree.buildGroup(data, groupIndices[i]);

                    // Initiate JQWidgets
                    $('#jqxTree').jqxTree({
                        width: 154,
                        theme : FAOSTATDownload.theme
                    });

                    // Bind select
                    $('#jqxTree').on('select',function (event) {

                        /** Clean the table */
                        document.getElementById('output_area').innerHTML = '';

                        var args = event.args;
                        var item = $('#jqxTree').jqxTree('getItem', args.element);

                        /* Show metadata. */
                        if (item.parentId == 0) {
                            FAOSTATDownload.groupCode = item.id;
                            FAOSTATDownload.domainCode = 'null';
 				            FAOSTATDownload.selectedDomainCode = FAOSTATDownload.groupCode; // added SIMONE
                            $("#jqxTree").jqxTree('expandItem', $('#' + FAOSTATDownload.groupCode)[0]);
                            $("#jqxTree").jqxTree('selectItem', $('#' + FAOSTATDownload.groupCode)[0]);
                            FAOSTATDownloadTree.loadDownloadNotes(FAOSTATDownload.groupCode);
                        }

                        /* Show selectors. */
                        else {
                            $('#standardDownload').prop('checked', true);
                            FAOSTATDownload.groupCode = item.parentId;
                            FAOSTATDownload.domainCode = item.id;
 				            FAOSTATDownload.selectedDomainCode = FAOSTATDownload.domainCode; // added SIMONE
                            $("#jqxTree").jqxTree('expandItem', $('#' + FAOSTATDownload.domainCode)[0]);
                            $("#jqxTree").jqxTree('selectItem', $('#' + FAOSTATDownload.domainCode)[0]);
//                            FAOSTATDownload.showClassicOrWizard();
                            F3DWLD.buildF3DWLD(item.parentId, item.id, FAOSTATDownload.language);
                        }

                        if (FAOSTATDownload.groupCode == 'G1' || FAOSTATDownload.groupCode == 'G2') {
                            $('#crf').css('display', 'inline');
                        } else {
                            $('#crf').css('display', 'none');
                        }

                    });

                    // Expand Group
                    if (FAOSTATDownload.domainCode == 'null' && FAOSTATDownload.groupCode != 'null') {
                        $("#jqxTree").jqxTree('expandItem', $('#' + FAOSTATDownload.groupCode)[0]);
                        $("#jqxTree").jqxTree('selectItem', $('#' + FAOSTATDownload.groupCode)[0]);
                        FAOSTATDownloadTree.loadDownloadNotes(FAOSTATDownload.groupCode);
                    }

                    // Expand Domain
                    else {
                        $("#jqxTree").jqxTree('expandItem', $('#' + FAOSTATDownload.domainCode)[0]);
                        $("#jqxTree").jqxTree('selectItem', $('#' + FAOSTATDownload.domainCode)[0]);
//                        FAOSTATDownload.showClassicOrWizard();
                    }

                    /** Scroll panel */
                        $('.tree-sidebar-scroll').jScrollPane({
                            autoReinitialise: true,
                            mouseWheelSpeed: 30
                        });
                },

                error : function(err,b,c) {
                    alert(err.status + ', ' + b + ', ' + c);
                }

            });

        },

        findGroupIndices : function(data) {
            var groups = [];
            var a = [];
            for (var i = 0 ; i < data.length ; i++) {
                if ($.inArray(data[i][0], groups) < 0) {
                    groups.push(data[i][0]);
                    a.push(i);
                }
            }
            return a;
        },

        buildGroup : function(data, startIDX) {
            var groupCode = data[startIDX][0];
            $('#root').append('<li id="' + groupCode + '">' + CORE.breakLabel(data[startIDX][1]));
            $('#' + groupCode).append('<ul id ="' + groupCode + '_root">');
            for (var i = startIDX ; i < data.length ; i++) {
                if (data[i][0] == groupCode)
                    $('#' + groupCode + '_root').append('<li id="' + data[i][2] + '">' + CORE.breakLabel(data[i][3]) + '</li>');
            }
            $('#' + groupCode).append('</ul>');
            $('#root').append('</li>');
        },

        showBulkDownloads: function (item) {
            $.ajax({
                type: 'GET',
                url: 'http://' + FAOSTATDownload.baseurl + '/wds/rest/bulkdownloads/' + FAOSTATDownload.datasource + '/' + item.value + '/' + FAOSTATDownload.language,
                dataType: 'json',
                success: function (response) {
                    if (item.value == 'FB' || item.value == 'FL') {
                        $('#mainTD').hide();
                        $('#OLAPTD').show();
                    }
                    $('#OLAP_IFRAME').css('display', 'none');
                    try {
                        document.getElementById('listArea').innerHTML = "";
                        document.getElementById('output_area').innerHTML = "";
 			            document.getElementById('testinline').innerHTML = "";
                        $("#domainNameTitle").remove();
                        $("#bulkDownloadsList").remove();
                        $("#break").remove();
                        $("#listArea").append("<div id='domainNameTitle' class='standard-title'>" + response[1][1] + " (" + response[1][4].substring(0, 10) + ")</div>");
			            $("#listArea").append("<hr class='standard-hr'>");
                        var s = FAOSTATDownloadTree.createList(response);
                        $("#listArea").append(s);
                    } catch (err) {
                        FAOSTATDownloadTree.loadDownloadNotes(item.value);
                    }
                },
                error: function (err, b, c) {
                }
            });
        },

        /**
         * @param response available downloads obtained through WDS call
         * @returns {String} a string formatted as HTML with a bullet point list of available files
         */
        createList: function (response) {
            var root = 'http://faostat.fao.org/Portals/_Faostat/Downloads/zip_files/';
            var s = "";
            s += "<ul id='bulkDownloadsList' class='bullet-list'>";
            for (var i = 0; i < response.length; i++) {
                var zip = response[i][2].replace(".csv", ".zip");
                s += "<li><a onclick='STATS.exportTableDownloadBulk(FAOSTATDownload.selectedDomainCode);' href='" + root + zip + "'>" + response[i][3] + "</li></a>";
            }
            s += "</ul>";
            return s;
        },

        expandFromItem: function (item) {

//            var domainCode = item.value;
//            var placeholderElement = $('#jqxTree').find("#placeholder_" + domainCode)[0];
//
//            if (placeholderElement != null) {
//
//                $.ajax({
//
//                    type: 'GET',
//                    url: 'http://' + FAOSTATDownload.baseurl + '/wds/rest/domains/' + FAOSTATDownload.datasource + '/' + domainCode + '/' + FAOSTATDownload.language,
//                    dataType: 'json',
//
//                    success: function (response) {
//
//                        FAOSTATDownload.groupCode = domainCode;
//
//                        var ord = new Array();
//
//                        for (var i = 0; i < response.length; i++) {
//
//                            if (response[i][0] != 'GG') {
//
//                                if ($.inArray(response[i][0], ord) < 0) {
//
//                                    /**
//                                     * Blacklist the ORD
//                                     */
//                                    ord.push(response[i][0]);
//
//                                    $('#jqxTree').jqxTree('removeItem', placeholderElement);
//                                    var label = FAOSTATDownloadTree.breakLabel(response[i][1]);
//                                    $('#jqxTree').jqxTree('addTo', { label: label, value: response[i][0] }, item.element);
//                                    $('#jqxTree').jqxTree('expandItem', item.element);
//
//                                }
//
//                            }
//
//                        }
//
//                        if (FAOSTATDownload.selectedDomainCode != null && FAOSTATDownload.selectedDomainCode != "null") {
//                            var found = false;
//                            while (found == false) {
//                                if (item != null) {
//                                    var tmp = item.nextItem;
//                                    if (tmp != null && tmp.value == FAOSTATDownload.selectedDomainCode) {
//                                        found = true;
//                                        $('#jqxTree').jqxTree('selectItem', tmp.element);
//                                        FAOSTATDownload.showSelectionMode(true);
//                                        FAOSTATDownload.showDownloadOptionsAndButtons(true);
//                                        FAOSTATDownload.showClassicOrWizard();
//                                    } else {
//                                        item = tmp;
//                                    }
//                                } else {
//                                    found = true;
//                                }
//                            }
//                        }
//
//                    },
//                    error: function (err, b, c) {
//
//                    }
//
//                });
//
//            }

        },

        /**
         * @param event the onclick event thrown by the tree
         */
        expand: function (event) {
//            var args = event.args;
//            var item = $('#jqxTree').jqxTree('getItem', args.element);
//            FAOSTATDownloadTree.expandFromItem(item);
        }

    };

}
