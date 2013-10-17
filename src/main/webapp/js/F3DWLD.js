var F3DWLD = (function() {

    var CONFIG = {
        prefix              :   'http://localhost:8080/faostat-download-js/',
        configurationURL    :   'config/faostat-download-configuration.json',
        dbPrefix            :   'FAOSTAT_',
        dsdURL              :   'http://hqlprfenixapp2.hq.un.fao.org:4242/d3sp/service/msd/dm/',
        theme               :   'faostat',
        tradeMatrices       :   ['FT', 'TM'],
        lang                :   'E',
        outputLimit         :   50,
        baseurl             :   null,
        datasource          :   null,
        tablelimit          :   null,
        groupCode           :   null,
        domainCode          :   null,
        dsd                 :   null,
        wdsPayload          :   {},
        tabsSelection       :   {},
        selectedValues      :   {}
    };

    function collectAndQueryWDS(limitOutput) {

        /* 1 - Collect parameters. */
        getTabSelection();
        getOptions(limitOutput);
        getGridsValues();
        console.log(F3DWLD.CONFIG.selectedValues);

        /* 2 - Create WDS payload. */

        /* 3 - Query WDS. */

        /* 4 - Render result. */
    };

    function getGridsValues() {

        /* Init buffers. */
        F3DWLD.CONFIG.selectedValues.countries = [];
        F3DWLD.CONFIG.selectedValues.elements = [];
        F3DWLD.CONFIG.selectedValues.items = [];
        F3DWLD.CONFIG.selectedValues.years = [];

        /* Init variables. */
        // TODO Grid name out of the tab selection

        getGridValues('gridCountries', F3DWLD.CONFIG.selectedValues.countries);
        getGridValues('gridElements', F3DWLD.CONFIG.selectedValues.elements);
        getGridValues('gridItems', F3DWLD.CONFIG.selectedValues.items);
        getGridValues('gridYears', F3DWLD.CONFIG.selectedValues.years);
    };

    function getGridValues(tableCode, map) {
        $('#' + tableCode).find('option:selected').each(function(k, v) {
            var tmp = {};
            tmp.code = $(v).data('faostat');
            tmp.label = v.label;
            tmp.type = v.type;
            map.push(tmp);
        });
    };

    function getOptions(limitOutput) {
        F3DWLD.CONFIG.wdsPayload.showFlags = $('#options_show_flags').val();
        F3DWLD.CONFIG.wdsPayload.showCodes = $('#options_show_codes').val();
        F3DWLD.CONFIG.wdsPayload.showUnits = $('#options_show_units').val();
        F3DWLD.CONFIG.wdsPayload.showNullValues = $('#options_show_null_values').val();
        F3DWLD.CONFIG.wdsPayload.limit = limitOutput;
        F3DWLD.CONFIG.wdsPayload.datasource = F3DWLD.CONFIG.datasource;
        F3DWLD.CONFIG.wdsPayload.thousandSeparator = $('#options_thousand_separator').jqxDropDownList('getSelectedItem').value;
        F3DWLD.CONFIG.wdsPayload.decimalSeparator = $('#options_decimal_separator').jqxDropDownList('getSelectedItem').value;
        F3DWLD.CONFIG.wdsPayload.decimalNumbers = $('#options_decimal_numbers').jqxDropDownList('getSelectedItem').value;
    };

    function getTabSelection() {
        F3DWLD.CONFIG.tabsSelection.countries = $('#tabCountries').jqxTabs('selectedItem');
        F3DWLD.CONFIG.tabsSelection.elements = $('#tabElements').jqxTabs('selectedItem');
        F3DWLD.CONFIG.tabsSelection.items = $('#tabItems').jqxTabs('selectedItem');
        F3DWLD.CONFIG.tabsSelection.years = $('#tabYears').jqxTabs('selectedItem');
        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1)
            F3DWLD.CONFIG.tabsSelection.countries_dst = $('#tabCountries_dst').jqxTabs('selectedItem');
    };

    function buildF3DWLD(groupCode, domainCode, language) {

        $.getJSON(CONFIG.prefix + CONFIG.configurationURL, function (data) {

            F3DWLD.CONFIG.baseurl      =   data.baseurl;
            F3DWLD.CONFIG.datasource   =   data.datasource;
            F3DWLD.CONFIG.tablelimit   =   data.tablelimit;
            F3DWLD.CONFIG.groupCode    =   groupCode;
            F3DWLD.CONFIG.domainCode   =   domainCode;

            switch (language) {
                case 'FR' : F3DWLD.CONFIG.lang = 'F'; break;
                case 'ES' : F3DWLD.CONFIG.lang = 'S'; break;
            }

            $.i18n.properties({
                name        :   'I18N',
                path        :   F3DWLD.CONFIG.prefix + 'I18N/',
                mode        :   'both',
                language    :   F3DWLD.CONFIG.lang
            });

            loadDSD();

        })

    };

    function loadDSD() {

        $.ajax({

            type: 'GET',
            url: F3DWLD.CONFIG.dsdURL + F3DWLD.CONFIG.dbPrefix + F3DWLD.CONFIG.domainCode,
            dataType: 'json',

            /* Load data from the DB */
            success : function(response) {

                /* Convert the response in JSON, if needed */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);
                F3DWLD.CONFIG.dsd = json.dsd;

                /* Build UI structure. */
                buildUIStructure();

            },

            /* Error */
            error : function(err, b, c) {
                console.log(err);
                console.log(b);
                console.log(c);
            }

        });

    };

    function buildUIStructure() {
        var s = '';
        s += '<div class="standard-title">' + $.i18n.prop('_selectors') + '</div>';
        s += '<hr class="standard-hr">';
        var columns = [];
        var counter = 0;
        for (var i = 0 ; i < F3DWLD.CONFIG.dsd.columns.length ; i++) {
            columns.push(F3DWLD.CONFIG.dsd.columns[i]);
            counter++;
            if (counter % 2 == 0) {
                s += buildSelectorsRow(columns);
                columns = [];
            }
            if ((F3DWLD.CONFIG.dsd.columns.length % 2 != 0) && i == F3DWLD.CONFIG.dsd.columns.length - 1) {
                columns = [];
                columns.push(F3DWLD.CONFIG.dsd.columns[F3DWLD.CONFIG.dsd.columns.length - 1]);
                s += buildSelectorsRow(columns);
            }
        }
        s += '<div class="spacer-one"></div>';
        s += buildOptions();
        s += buildButtons();
        s += buildOLAP();
        s += buildOutputArea();
        document.getElementById('listArea').innerHTML = s;
        enhanceUIStructure();
    };

    function buildOutputArea() {
        return '<div id="output_area"></div>';
    };

    function buildButtons() {
        var s = '';
        s += '<div id="output_buttons" style="display: block;">';
        s += '<div class="download-selection-buttons">';
        s += '<div class="single-result-buttons">';
        s += '<a class="btn" id="buttonViewTables">';
        s += '<div class="btn-preview-icon btnLeftIcon"></div>';
        s += '<div class="btnText" id="buttonViewTables-text">' + $.i18n.prop('_preview') + '</div>';
        s += '</a>';
        s += '<a style="display:none" class="btn" id="buttonExportToCSV">';
        s += '<div class="btn-export-icon btnLeftIcon"></div>';
        s += '<div class="btnText" id="buttonExportToCSV-text">' + $.i18n.prop('_download') + '</div>';
        s += '</a>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += '<div class="spacer-one"></div>';
        return s;
    };

    function enhanceUIStructure() {
        enhanceUITabs();
        enhanceUIOptions();
        enhanceUIButtons();
        enhanceUIGrids();
    };

    function enhanceUIGrids() {
        enhanceUIGrid('countries', 'gridCountries');
        enhanceUIGrid('regions', 'gridRegions');
        enhanceUIGrid('specialgroups', 'gridSpecialGroups');
        enhanceUIGrid('items', 'gridItems');
        enhanceUIGrid('itemsaggregated', 'gridItemsAggregated');
        enhanceUIGrid('elements', 'gridElements');
        enhanceUIGrid('years', 'gridYears');
        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
            enhanceUIGrid('countries', 'gridCountries_dst');
            enhanceUIGrid('regions', 'gridRegions_dst');
            enhanceUIGrid('specialgroups', 'gridSpecialGroups_dst');
        }
    };

    function enhanceUIGrid(codingSystem, gridCode) {

        $.ajax({

            type: 'GET',
            url: 'http://' + F3DWLD.CONFIG.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + F3DWLD.CONFIG.datasource + '/' + F3DWLD.CONFIG.domainCode + '/' + F3DWLD.CONFIG.lang,
            dataType: 'json',

            success : function(response) {

                var json = response;
                if (typeof(json) == 'string')
                    json = $.parseJSON(response);

                var select = '';
                var lbl = null;
                select += '<select id="' + gridCode + '_select" multiple="multiple" style="width: 100%; height: 100%; border: 0px;">';
                for (var i = 0 ; i < json.length ; i++) {
                    if (codingSystem == 'regions' || codingSystem == 'specialgroups' || codingSystem == 'itemsaggregated') {
                        if (F3DWLD.CONFIG.domainCode != 'GY') {
                            switch (json[i].type) {
                                case 'list': lbl = json[i].label + ' ' + $.i18n.prop('_list'); break;
                                case 'total': lbl = json[i].label + ' ' + $.i18n.prop('_total'); break;
                            }
                        } else {
                            switch (response[i].type) {
                                case 'list':
                                    if (codingSystem == 'regions' || codingSystem == 'specialgroups') {
                                        lbl = json[i].label + ' ' + $.i18n.prop('_list');
                                    } else {
                                        lbl = json[i].label;
                                    }
                                    break;
                                case 'total': lbl = json[i].label + ' ' + $.i18n.prop('_total'); break;
                            }
                        }
                    } else {
                        if (codingSystem == 'elements') {
                            lbl = json[i].label + ' (' + json[i].unit + ')';
                        } else {
                            lbl = json[i].label;
                        }
                    }
                    select += '<option class="grid-element" data-faostat="' + json[i].code + '" data-label="' + lbl + '" data-type="' + json[i].type + '">' + lbl + '</option>';
                }
                select += '</select>';
                document.getElementById(gridCode).innerHTML = select;

            },

            error : function(err,b,c) {
                switch (codingSystem) {
                    case 'regions':
                        $('#tabCountries').jqxTabs('removeAt', 1);
                        break;
                    case 'specialgroups':
                        $('#tabCountries').jqxTabs('removeAt', 2);
                        break;
                    case 'itemsaggregated':
                        $('#tabItems').jqxTabs('removeAt', 1);
                        break;
                }
            }

        });

    };

    function enhanceUIButtons() {

        /* Select/Deselect all buttons. */
        $('#buttonSelectAllCountries-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllCountries-text').addClass('btnText');
        $('#buttonDeSelectAllCountries-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllCountries-text').addClass('btnText');
        $('#buttonSelectAllCountries-text_dst').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllCountries-text_dst').addClass('btnText');
        $('#buttonDeSelectAllCountries-text_dst').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllCountries-text_dst').addClass('btnText');
        $('#buttonSelectAllElements-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllElements-text').addClass('btnText');
        $('#buttonDeSelectAllElements-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllElements-text').addClass('btnText');
        $('#buttonSelectAllItems-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllItems-text').addClass('btnText');
        $('#buttonDeSelectAllItems-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllItems-text').addClass('btnText');
        $('#buttonSelectAllYears-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllYears-text').addClass('btnText');
        $('#buttonDeSelectAllYears-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllYears-text').addClass('btnText');

        /* Download button. */
        $('#buttonExportToCSV').bind('click', function() {
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
            if (item.value=="pivot") {
                STATS.exportPivotDownloadStandard();
                var footNotes="";
                if(typeof FAOSTATDownload.MyMetaData[F3DWLD.CONFIG.domainCode]!="undefined") {
                    footNotes = "<table><tr><td>" + FAOSTATDownload.MyMetaData[F3DWLD.CONFIG.domainCode]["E"] + "</td></tr></table>"
                }
                var myFFlag = "";
                if(FAOSTATOLAP.option.showFlags == 1) {
                    myFFlag = document.getElementById("myFlags").innerHTML;
                }
                FAOSTATOLAP.pivots[0].toExcel("<table><tr><td>FAOSTAT 2013</td></tr></table>", "<table><tr><td>" + myFFlag + "</td></tr></table>" + footNotes);
            } else {
                collectAndQueryWDS(false);
            }
        });

        /* Preview button. */
        $('#buttonViewTables').bind('click', function() {
            $('#buttonExportToCSV')[0].style.display="inline-block";
            $('#testinline').empty();
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
            if (item.value=="pivot") {
                window.FAOSTATDownloadSelectorsClassic.falseclick();
            } else {
                collectAndQueryWDS(true);
                STATS.showTableDownloadStandard(F3DWLD.CONFIG.domainCode);
            }
        });

    };

    function enhanceUITabs() {
        $('.faostat-download-tab').jqxTabs({
            width: '352',
            height: '200',
            position: 'top',
            animationType: 'fade',
            selectionTracker: 'checked',
            theme: F3DWLD.CONFIG.theme
        });
    };

    function enhanceUIOptions() {
        var width = '140';
        $('.output_options').jqxExpander({
            width: '100%',
            theme: F3DWLD.CONFIG.theme
        });
        $('.output_options').jqxExpander('collapse');
        $('#options_output_type').jqxDropDownList({
            source: [{label: $.i18n.prop('_pivot'), value: 'pivot'},
                     {label: $.i18n.prop('_table'), value: 'table'}],
            width: width,
            height: '25',
            selectedIndex: 0,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_output_type').on('change',function(event) {
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
            if (item.value != 'pivot') {
                $('#buttonExportToCSV')[0].style.display="inline-block";
            } else {
                $('#buttonExportToCSV')[0].style.display="none";
            }
        });
        $('#options_thousand_separator').jqxDropDownList({
            source: [{label: $.i18n.prop('_comma'), value: ',', olap_value: 1},
                     {label: $.i18n.prop('_period'), value: '.', olap_value: 2},
                     {label: $.i18n.prop('_space'), value: ' ', olap_value: 3},
                     {label: $.i18n.prop('_none'), value: ' ', olap_value: 4}],
            width: width,
            height: '25',
            selectedIndex: 0,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_thousand_separator').bind('change', function (event) {
            var ts = $('#options_thousand_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
            document.getElementById('option').value = document.getElementById("option").value.replace(/thousandSeparator:./g,"thousandSeparator:"+ts+"");
            var v = ts;
            try {
                FAOSTATOLAP.option.thousandSeparator = v;
                DEMO.pivot.cb();
            } catch (E) {

            }
        });
        $("#options_decimal_separator").jqxDropDownList({
            source: [{label: $.i18n.prop('_comma'), value: ',', olap_value: 1},
                     {label: $.i18n.prop('_period'), value: '.', olap_value: 2},
                     {label: $.i18n.prop('_space'), value: ' ', olap_value: 3},
                     {label: $.i18n.prop('_none'), value: ' ', olap_value: 4}],
            width: width,
            height: '25',
            selectedIndex: 1,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_decimal_separator').bind('change', function (event) {
            var ds = $('#options_decimal_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
            document.getElementById("option").value = document.getElementById("option").value.replace(/decimalSeparator:./g,"decimalSeparator:"+ds+"");
            var v = ds;
            try {
                FAOSTATOLAP.option.decimalSeparator = v;
                DEMO.pivot.cb();
            } catch (e) {

            }
        });
        $('#options_decimal_numbers').jqxDropDownList({
            source: [{label: '0', value: 0},
                     {label: '1', value: 1},
                     {label: '2', value: 2},
                     {label: '3', value: 3},
                     {label: '4', value: 4}],
            width: width,
            height: '25',
            selectedIndex: 2,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_decimal_numbers').bind('change', function (event) {
            var nbDec = $('#options_decimal_numbers').jqxDropDownList('getSelectedItem').label.toString();
            var v = 0;
            document.getElementById("option").value=document.getElementById("option").value.replace(/nbDec:(\d)/g,"nbDec:"+nbDec);
            v = nbDec;
            try {
                FAOSTATOLAP.option.nbDec = v;
                DEMO.pivot.cb();
            } catch (e) {

            }
        });
        $('#options_show_flags').jqxCheckBox({
            checked : false,
            theme: F3DWLD.CONFIG.theme
        });
        $('options_show_flags').bind('change', function (event) {
            var item = event.args.checked;
            var checked = 0;
            if(item)
                checked = 1;
            var v = 0;
            if (checked == 1) {
                FAOSTATOLAP.option.showFlags = 1;
                v = 1;
            } else {
                v = 0;
                FAOSTATOLAP.option.showFlags = 0;
            }
            {
                FAOSTATOLAP.option.showFlags = v;
                try {
                    DEMO.pivot.cb();
                } catch(er) {

                }
            }
        });
        $('#options_show_codes').jqxCheckBox({
            checked : false,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_show_codes').bind('change', function (event) {
            var item = event.args.checked;
            var checked = 1;
            if(item) {
                checked = 0;
            }
            if(checked == 1) {
                FAOSTATOLAP.option.showCode = 0;
            } else {
                FAOSTATOLAP.option.showCode = 1;
            }
            showCode();
        });
        $('#options_show_units').jqxCheckBox({
            checked : false,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_show_units').bind('change', function (event) {
            var item = event.args.checked;
            var checked = 1;
            if(item) {
                checked = 0;
            }
            if (checked == 0) {
                document.getElementById("option").value = document.getElementById("option").value.replace("showUnits:0","showUnits:1");
                v = 1;
            } else {
                document.getElementById("option").value = document.getElementById("option").value.replace("showUnits:1","showUnits:0");
                v = 0;
            }
            try {
                FAOSTATOLAP.option.showUnits = v;
                DEMO.pivot.cb();
            }
            catch(e) {

            }
        });
        $('#options_show_null_values').jqxCheckBox({
            checked : true,
            theme: F3DWLD.CONFIG.theme
        });
    };

    function buildOLAP() {
        var s = '';
        s += '<table style="width: 720px; margin-left: 22px;">';
        s += '<tr>';
        s += '<td>';
        s += '<div class="demo" style="float: left; width: 100%; margin-top: 16px; display: none">';
        s += '<div>';
        s += '<div style="margin-top: 0px;">';
        s += '<div style="margin-left: 0px; float: left;" id="olapDimensionConfiguration">' + $.i18n.prop('_olapDimensionConfiguration') + '</div>';
        s += '</div>';
        s += '</div>';
        s += '<div>';
        s += '<div style="margin-top: 5px; margin-left: 5px; ">';
        s += '<ul id="agg" class="connectedSortable" style="display:none">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_notUse') + '</li>';
        s += '</ul>';
        s += '<ul id="nestedBy" class="connectedSortable">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_nestedBy') + '</li>';
        s += '</ul>';
        s += '<ul id="row" class="connectedSortable">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_rows') + '</li>';
        s += '<li class="ui-state-default" id="sel_2">' + $.i18n.prop('_items') + '</li>';
        s += '<li class="ui-state-default" id="sel_3">' + $.i18n.prop('_years') + '</li>';
        s += '</ul>';
        s += '<ul id="col" class="connectedSortable">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_columns') + '</li>';
        s += '<li class="ui-state-default" id="sel_0">' + $.i18n.prop('_elements') + '</li>';
        s += '<li class="ui-state-default" id="sel_1">' + $.i18n.prop('_countries') + '</li>';
        s += '</ul>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += '</td>';
        s += '</tr>';
        s += '</table>';
        return s;
    };

    function buildOptions() {
        var s = '';
        s += '<div>';
        s += '<div>';
        s += '<div id="output_options_labels" class="standard-title">' + $.i18n.prop('_outputOptions') + '</div>';
        s += '<hr class="standard-hr">';
        s += '</div>';
        s += '</div>';
        s += '<div class="download-output-options">';
        s += '<table style="width: 100%;">';
        s += '<tr>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_output_type">' + $.i18n.prop('_outputType') + '</td>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_thousand_separator">' + $.i18n.prop('_thousandSeparator') + '</td>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_decimal_separator">' + $.i18n.prop('_decimalSeparator') + '</td>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_decimal_numbers">' + $.i18n.prop('_decimalNumbers') + '</td>';
        s += '</tr>';
        s += '<tr>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_output_type"></div>';
        s += '</td>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_thousand_separator"></div>';
        s += '</td>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_decimal_separator"></div>';
        s += '</td>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_decimal_numbers"></div>';
        s += '</td>';
        s += '</tr>';
        s += '<tr style="display:none;">';
        s += '<td id="show_flags" style="width: 25%;"></td>';
        s += '<td id="show_codes" style="width: 25%;"></td>';
        s += '<td id="show_units" style="width: 25%;"></td>';
        s += '<td id="show_null_values" style="width: 25%;"></td>';
        s += '</tr>';
        s += '<tr>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_flags" class="compare-label">' + $.i18n.prop('_showFlags') + '</div>';
        s += '</td>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_codes" class="compare-label">' + $.i18n.prop('_showCodes') + '</div>';
        s += '</td>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_units" class="compare-label">' + $.i18n.prop('_showUnits') + '</div>';
        s += '</td>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_null_values" class="compare-label">' + $.i18n.prop('_showNullValues') + '</div>';
        s += '</td>';
        s += '</tr>';
        s += '</table>';
        s += '</div>';
        return s;
    };

    function buildSelectorsRow(columns) {
        var s = '';
        s += '<div class="download-selector">';
        for (var i = 0 ; i < columns.length ; i++)
            s += buildSelector(columns[i]);
        s += '</div>';
        return s;
    };

    function buildSelector(column) {
        var s = '';
        s += '<div class="obj-box-download">';
        switch (column.dimension.name) {
            case 'GEO' :
                s += '<div class="faostat-download-tab" id="tabCountries">';
                s += '<ul>';
                s += '<li id="li_countries">' + $.i18n.prop('_countries') + '</li>';
                s += '<li id="li_regions">' + $.i18n.prop('_regions') + '</li>';
                s += '<li id="li_special_groups">' + $.i18n.prop('_special_groups') + '</li>';
                s += '</ul>';
                s += ' <div id="gridCountries"></div>';
                s += '<div class="faostat-download-list" id="gridRegions"></div>';
                s += '<div class="faostat-download-list" id="gridSpecialGroups"></div>';
                s += '</div>';
                s += '<div class="download-selection-buttons">';
                s += '<a id="buttonSelectAllCountries" class="btn">';
                s += '<div class="btn-select-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonSelectAllCountries-text"></div>';
                s += '</a>';
                s += '<a id="buttonDeSelectAllCountries" class="btn">';
                s += '<div class="btn-clear-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonDeSelectAllCountries-text"></div>';
                s += '</a>';
                s += '</div>';
                break;
            case 'GEO_DST' :
                s += '<div class="faostat-download-tab" id="tabCountries_dst">';
                s += '<ul>';
                s += '<li id="li_countries_dst">' + $.i18n.prop('_countries') + '</li>';
                s += '<li id="li_regions_dst">' + $.i18n.prop('_regions') + '</li>';
                s += '<li id="li_special_groups_dst">' + $.i18n.prop('_special_groups') + '</li>';
                s += '</ul>';
                s += ' <div id="gridCountries_dst"></div>';
                s += '<div class="faostat-download-list" id="gridRegions_dst"></div>';
                s += '<div class="faostat-download-list" id="gridSpecialGroups_dst"></div>';
                s += '</div>';
                s += '<div class="download-selection-buttons">';
                s += '<a id="buttonSelectAllCountries_dst" class="btn">';
                s += '<div class="btn-select-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonSelectAllCountries-text_dst"></div>';
                s += '</a>';
                s += '<a id="buttonDeSelectAllCountries_dst" class="btn">';
                s += '<div class="btn-clear-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonDeSelectAllCountries-text_dst"></div>';
                s += '</a>';
                s += '</div>';
                break;
            case 'ITEM' :
                s += '<div class="faostat-download-tab" id="tabItems">';
                s += '<ul>';
                s += '<li id="li_items">' + $.i18n.prop('_items') + '</li>';
                s += '<li id="li_items_aggregated">' + $.i18n.prop('_items_aggregated') + '</li>';
                s += '</ul>';
                s += '<div id="gridItems"></div>';
                s += '<div class="faostat-download-list" id="gridItemsAggregated"></div>';
                s += '</div>';
                s += '<div class="download-selection-buttons">';
                s += '<a id="buttonSelectAllItems" class="btn">';
                s += '<div class="btn-select-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonSelectAllItems-text"></div>';
                s += '</a>';
                s += '<a id="buttonDeSelectAllItems" class="btn">';
                s += '<div class="btn-clear-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonDeSelectAllItems-text"></div>';
                s += '</a>';
                s += '</div>';
                break;
            case 'ELEMENT' :
                s += '<div class="faostat-download-tab" id="tabElements">';
                s += '<ul>';
                s += '<li id="li_elements">' + $.i18n.prop('_elements') + '</li>';
                s += '</ul>';
                s += '<div id="gridElements"></div>';
                s += '</div>';
                s += '<div class="download-selection-buttons">';
                s += '<a id="buttonSelectAllElements" class="btn">';
                s += '<div class="btn-select-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonSelectAllElements-text"></div>';
                s += '</a>';
                s += '<a id="buttonDeSelectAllElements" class="btn">';
                s += '<div class="btn-clear-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonDeSelectAllElements-text"></div>';
                s += '</a>';
                s += '</div>';
                break;
            case 'TIME' :
                s += '<div class="faostat-download-tab" id="tabYears">';
                s += '<ul>';
                s += '<li id="li_years">' + $.i18n.prop('_years') + '</li>';
                s += '</ul>';
                s += '<div id="gridYears"></div>';
                s += '</div>';
                s += '<div class="download-selection-buttons">';
                s += '<a id="buttonSelectAllYears" class="btn">';
                s += '<div class="btn-select-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonSelectAllYears-text"></div>';
                s += '</a>';
                s += '<a id="buttonDeSelectAllYears" class="btn">';
                s += '<div class="btn-clear-all-icon btnLeftIcon"></div>';
                s += '<div id="buttonDeSelectAllYears-text"></div>';
                s += '</a>';
                s += '</div>';
                break;
        }
        s += '</div>';
        return s;
    };

    return {
        CONFIG      :   CONFIG,
        buildF3DWLD :   buildF3DWLD
    };

})();