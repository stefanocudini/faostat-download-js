if (!window.FAOSTATDownload) {

    window.FAOSTATDownload = {

        /*
         This setting is used to integrate FAOSTAT Download with the Gateway.
         It can't be stored in the JSON configuration file because it is
         used to locate the JSON configuration file.
         */
        prefix : 'http://localhost:8080/faostat-download-js/',

        theme : "faostat",

        countriesTabSelectedIndex : 0,

        itemsTabSelectedIndex : 0,

        shift : false,

        /** base URL for WDS, default: fenixapps.fao.org */
        baseurl : "",

        /** datasource for WDS, default: faostat */
        datasource : "",

        /** maximum rows number shown in the interface */
        tablelimit : "",

        /** language for the tree, default: en */
        language : "",

        /** this code is set when a leaf of the tree is clicked, to be used by other JS's */
        selectedDomainCode : "",

        /** flag to determine wheter codelists must be linked or not */
        linkCodelists : false,

        /** determine which download interface must be shown */
        showWizard : false,

        downloadType : 0,

        gropCode : null,

        domainCode : null,

        /**
         * This function initiate the user interface and links controllers to the tree
         */
        initUI : function(groupCode, domainCode, language) {

            /**
             * FAOSTAT Download is loaded by GWT, so the language
             * will be passed as a parameter rather than
             * read it from the URL
             */
            FAOSTATDownload.language = language;
            FAOSTATDownload.groupCode = groupCode != '*' ? groupCode : null;
            FAOSTATDownload.domainCode = domainCode != '*' ? domainCode : null;

            /**
             * But we may need to have it from the URL...
             */
            var lang = $.url().param('lang');
            if (lang != null && lang.length > 0)
                FAOSTATDownload.language = lang;

            /**
             * Optional parameter domain code to show the UI
             * on a given domain
             */
            FAOSTATDownload.selectedDomainCode = domainCode;

            /**
             * Initiate multi-language functionalities
             */
            I18N.init();
            $(document).bind({
                keydown : function(e) {
                    if (e.which == 16)
                        FAOSTATDownload.shift = true;
                },
                keyup : function(e) {
                    FAOSTATDownload.shift = false;
                }
            });

            /**
             * Translate download type labels
             */
//			document.getElementById('bulk_download_label').innerHTML = I18N.translate('_bulk_download_label');
//			document.getElementById('standard_download_label').innerHTML = I18N.translate('_standard_download_label');

            $('#linkCodelistsButton').jqxSwitchButton({
                height: 27,
                width: 150,
                theme: FAOSTATDownload.theme,
                checked: false,
                onLabel: I18N.translate('_wizard'),
                offLabel: I18N.translate('_classic')
            });
            $('#linkCodelistsButton').bind('change', function (event) {
                FAOSTATDownload.showWizard = event.args.check;
                FAOSTATDownload.showClassicOrWizard();
                document.getElementById('output_area').innerHTML = '';
                CPI.removeCPITableNotes();
            });


            /*
             $("#downloadType").jqxButtonGroup({
             mode: 'radio',
             theme: FAOSTATDownload.theme
             });

             $('#downloadType').jqxButtonGroup('setSelection', 0);

             $('#downloadType').bind('click', function() {
             var downloadType = $('#downloadType').jqxButtonGroup('getSelection');
             if (downloadType == 1) {
             FAOSTATDownload.showSelectionMode(false);
             FAOSTATDownload.showDownloadOptionsAndButtons(false);
             var item = {};
             item.value = FAOSTATDownload.selectedDomainCode;
             FAOSTATDownloadTree.showBulkDownloads(item);
             } else {
             FAOSTATDownload.showSelectionMode(true);
             FAOSTATDownload.showDownloadOptionsAndButtons(true);
             FAOSTATDownload.showClassicOrWizard();
             }
             });*/
            FAOSTATDownload.showSelectionMode(false);
            FAOSTATDownloadTree.init();
            $('#listArea').load(FAOSTATDownload.prefix + 'welcome.html', function() {
//				FAOSTATDownloadOptions.init();
            });
            document.getElementById('selection_mode').innerHTML = I18N.translate('_selection_mode');
        },
        bulkDownload : function() {
            FAOSTATDownload.downloadType = 1;
            FAOSTATDownload.showSelectionMode(false);
            FAOSTATDownload.showDownloadOptionsAndButtons(false);
            var item = {};
            item.value = FAOSTATDownload.selectedDomainCode;
            FAOSTATDownloadTree.showBulkDownloads(item);
            CPI.removeCPITableNotes();
        },
        standardDownload : function() {
            FAOSTATDownload.downloadType = 0;
            FAOSTATDownload.showSelectionMode(true);
            FAOSTATDownload.showDownloadOptionsAndButtons(true);
            FAOSTATDownload.showClassicOrWizard();
            CPI.removeCPITableNotes();
        },

        showDownloadOptionsAndButtons : function(show) {
            if (show) {
                $('#output_options').show();
                $('#output_buttons').show();
            } else {
                $('#output_options').hide();
                $('#output_buttons').hide();
            }
        },

        showSelectionMode : function(show) {
            if (show) {
                $('#settings-section').show();
            } else {
                $('#settings-section').hide();
            }
        },
        showClassicOrWizard : function() {

            if (FAOSTATDownload.selectedDomainCode.length > 1) {

                // Wizard
                if (FAOSTATDownload.showWizard) {
                    $('#listArea').load(FAOSTATDownload.prefix + 'faostat-download-wizard.html', function() {
                        FAOSTATDownloadWizard.init();
                        FAOSTATDownloadSelectorsClassic.initOLAP();
                    });
                }

                // classic
                else {
                    $.ajax({
                        type: 'GET',
                        url: FAOSTATDownload.prefix + 'faostat-download-selectors-classic.html',
                        dataType: 'html',
                        success : function(response) {
                            document.getElementById('listArea').innerHTML = response;
                            FAOSTATDownloadSelectorsClassic.initUI();
                            FAOSTATDownloadSelectorsClassic.translateUI();
                        },
                        error : function(err,b,c) {
                            alert(err.status + ", " + b + ", " + c);
                        }
                    });
                }

                // output buttons
                $('#output_buttons').load(FAOSTATDownload.prefix + 'output-buttons.html', function() {
                    FAOSTATDownload.initOuputButtons();
                });

                // output options
//				$('#output_options').load('output-options.html', function() {
//					FAOSTATDownload.initOutputOptions();
//				});
            }
        },

        initOutputOptions : function() {

            var width = '140';

            $(".output_options").jqxExpander({
                width: '100%',
                theme: FAOSTATDownload.theme
            });

            $(".output_options").jqxExpander('collapse');

            $("#options_output_type").jqxDropDownList({
                source: [
                    {label: I18N.translate('_pivot'), value: 'pivot'},
                    {label: I18N.translate('_table'), value: 'table'}
                ],
                width: width,
                height: '25',
                selectedIndex: 0,
                theme: FAOSTATDownload.theme
            });

            $("#options_thousand_separator").jqxDropDownList({
                source: [
                    {label: I18N.translate('_comma'), value: ',',olap_value:1},
                    {label: I18N.translate('_period'), value: '.',olap_value:2},
                    {label: I18N.translate('_space'), value: ' ',olap_value:3},
                    {label: I18N.translate('_none'), value: ' ',olap_value:4}
                ],
                width: width,
                height: '25',
                selectedIndex: 0,
                theme: FAOSTATDownload.theme
            });

            $("#options_thousand_separator").bind('change', function (event) {
                var ts = $('#options_thousand_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
                document.getElementById("option").value=document.getElementById("option").value.replace(/thousandSeparator:./g,"thousandSeparator:"+ts+"");
                var v = ts;
                if(OLAP.window.length==1) {
                    OLAP.window.option.thousandSeparator=v;
                    OLAP.window.DEMO.pivot.cb();
                }
            });

            $("#options_decimal_separator").jqxDropDownList({
                source: [
                    {label: I18N.translate('_comma'), value: ',',olap_value:1},
                    {label: I18N.translate('_period'), value: '.',olap_value:2},
                    {label: I18N.translate('_space'), value: ' ',olap_value:3},
                    {label: I18N.translate('_none'), value: ' ',olap_value:4}
                ],
                width: width,
                height: '25',
                selectedIndex: 1,
                theme: FAOSTATDownload.theme
            });

            $("#options_decimal_separator").bind('change', function (event) {
                var ds = $('#options_decimal_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
                document.getElementById("option").value=document.getElementById("option").value.replace(/decimalSeparator:./g,"decimalSeparator:"+ds+"");
                var v=ds;
                if(OLAP.window.length==1) {
                    OLAP.window.option.decimalSeparator = v;
                    OLAP.window.DEMO.pivot.cb();
                }
            });

            $("#options_decimal_numbers").jqxDropDownList({
                source: [
                    {label: '0', value: 0},
                    {label: '1', value: 1},
                    {label: '2', value: 2},
                    {label: '3', value: 3},
                    {label: '4', value: 4}
                ],
                width: width,
                height: '25',
                selectedIndex: 2,
                theme: FAOSTATDownload.theme
            });

            $("#options_decimal_numbers").bind('change', function (event) {
                var nbDec = $('#options_decimal_numbers').jqxDropDownList('getSelectedItem').label.toString();
                var v=0;
                document.getElementById("option").value=document.getElementById("option").value.replace(/nbDec:(\d)/g,"nbDec:"+nbDec);
                v = nbDec;
                if(OLAP.window.length==1) {
                    OLAP.window.option.nbDec=v;
                    OLAP.window.DEMO.pivot.cb();
                }
            });

            $("#options_show_flags").jqxDropDownList({
                source: [
                    {label: I18N.translate('_trueTrue'), value: true},
                    {label: I18N.translate('_falseFalse'), value: false},
                    {label: I18N.translate('_trueTrue'), value: true},
                    {label: I18N.translate('_falseFalse'), value: false},
                    {label: I18N.translate('_trueTrue'), value: true},
                    {label: I18N.translate('_falseFalse'), value: false}
                ],
                width: width,
                height: '25',
                selectedIndex: 1,
                theme: FAOSTATDownload.theme
            });

            $("#options_show_flags").bind('change', function (event) {
                var item = $('#options_show_flags').jqxDropDownList('getSelectedItem');
                var checked = item.label;
                var v = 0;
                if (checked=='True') {
                    document.getElementById("option").value=document.getElementById("option").value.replace("showFlags:0","showFlags:1");
                    v = 1;
                }
                else {
                    v = 0;
                    document.getElementById("option").value=document.getElementById("option").value.replace("showFlags:1","showFlags:0");
                }
                if(OLAP.window.length==1){
                    OLAP.window.option.showFlags=v;
                    OLAP.window.DEMO.pivot.cb();
                }
            });

            $("#options_show_codes").jqxDropDownList({
                source: [
                    {label: I18N.translate('_trueTrue'), value: true},
                    {label: I18N.translate('_falseFalse'), value: false}
                ],
                width: width,
                height: '25',
				selectedIndex: 1,
                theme: FAOSTATDownload.theme
            });

            $("#options_show_codes").bind('change', function (event) {
                if(window.OLAP.document.getElementById('showCode').checked){window.OLAP.document.getElementById('showCode').checked=false;}
                else{window.OLAP.document.getElementById('showCode').checked=true;}
                window.OLAP.showCode();
            });

            $("#options_show_units").jqxDropDownList({
                source: [{label: I18N.translate('_trueTrue'), value: true}, {label: I18N.translate('_falseFalse'), value: false}],
                width: width,
                height: '25',
				selectedIndex: 1,
                theme: FAOSTATDownload.theme
            });

            $("#options_show_units").bind('change', function (event) {
                var item = $('#options_show_units').jqxDropDownList('getSelectedItem');
                var v = 0;
                var checked = item.label;
                if (checked=='True') {
                    document.getElementById("option").value=document.getElementById("option").value.replace("showUnits:0","showUnits:1");
                    v=1;
                } else {
                    document.getElementById("option").value=document.getElementById("option").value.replace("showUnits:1","showUnits:0");
                    v = 0;
                }
                if(OLAP.window.length==1) {
                    OLAP.window.option.showUnits=v;
                    OLAP.window.DEMO.pivot.cb();
                }
            });

            $("#options_show_null_values").jqxDropDownList({
                source: [
                    {label: I18N.translate('_trueTrue'), value: true},
                    {label: I18N.translate('_falseFalse'), value: false}
                ],
                width: width,
                height: '25',
				selectedIndex: 0,
                theme: FAOSTATDownload.theme
            });

        },

        initOuputButtons : function() {
            // initiate buttons
            $(".faostat-download-button").jqxButton({
                width: '100%',
                height: '35',
                theme: FAOSTATDownload.theme
            });
            // download table
            $('#buttonExportToCSV').bind('click', function() {
                var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
                if (item.value=="pivot")
                {
                    window.FAOSTATDownloadSelectorsClassic.falseclick();
                    //OLAP.window.pivots[0].toExcel();
                    C.collect(false);
                }
                else{
                    C.collect(false);
                }
            });
            // view table
            $('#buttonViewTables').bind('click', function() {
                var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
                if (item.value=="pivot"){
                    //document.getElementById('output_area');
                    window.FAOSTATDownloadSelectorsClassic.falseclick();
                } else {C.collect(true);
                    STATS.showTableDownloadStandard(FAOSTATDownload.selectedDomainCode);

                }
            });
        },
        showDialog : function(dialogCode, text) {
            document.getElementById(dialogCode).innerHTML = text;
            $("#" + dialogCode).dialog({modal: true});
        },
        closeDialog : function(dialogCode, text) {
            document.getElementById(dialogCode).innerHTML = "";
            $("#" + dialogCode).dialog("close");
        }

    };

}