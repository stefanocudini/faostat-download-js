var F3DWLD = (function() { 

    var CONFIG = { 
        base_url                :  'http://localhost:8080/faostat-gateway/go/to/download', 
        prefix                  :  'http://localhost:8080/faostat-download-js/', 
        CPINotes_url            :  'http://faostat3.fao.org/wds/rest/procedures/cpinotes', 
        ODA_url                :  'http://faostat3.fao.org/wds/rest/procedures/oda', 
        data_url                :  'http://faostat3.fao.org/wds/rest', 
        procedures_data_url    :  'http://faostat3.fao.org/wds/rest/procedures/data', 
        procedures_excel_url    :  'http://faostat3.fao.org/wds/rest/procedures/excel', 
        codes_url              :  'http://faostat3.fao.org/wds/rest/procedures/usp_GetListBox', 
        bulks_url              :  'http://faostat3.fao.org/wds/rest/bulkdownloads', 
        domains_url            :  'http://faostat3.fao.org/wds/rest/domains', 
        bletchley_url          :  'http://faostat3.fao.org/bletchley/rest/codes', 
        schema_url              :  'http://faostat3.fao.org/wds/rest/procedures/schema/', 
        bulks_root              :  'http://faostat.fao.org/Portals/_Faostat/Downloads/zip_files/', 
        configurationURL        :  'config/faostat-download-configuration.json', 
        dbPrefix                :  'FAOSTAT_', 
        dsdURL                  :  'http://faostat3.fao.org/wds/rest/procedures/listboxes', 
        theme                  :  'faostat', 
        tradeMatrices          :  ['FT', 'TM'], 
        lang                    :  'E', 
        lang_ISO2              :  'en', 
        outputLimit            :  50, 
        widthTable              :  '100%', 
        baseurl                :  null, 
        datasource              :  null, 
        tablelimit              :  null, 
        groupCode              :  null, 
        domainCode              :  null, 
        dsd                    :  null, 
        wdsPayload              :  {}, 
        tabsSelection          :  {}, 
        selectedValues          :  {}, 
        maxListBoxNo            :  7, 
        tableIndices            :  null, 
        data                    :  null 
    }; 

    function buildF3DWLD(groupCode, domainCode, language) { 

        /* Upgrade the URL. */ 
        var domainCodeURL = (domainCode === 'null') ? '*' : domainCode; 
        CORE.upgradeURL('download', groupCode, domainCodeURL, language); 
if( F3DWLD.CONFIG.domainCode==="FBS" && domainCode!=="FBS"){location.reload();} 
        /* Labels */ 
        document.getElementById('_faostat_domains').innerHTML = $.i18n.prop('_faostat_domains'); 
        document.getElementById('_download').innerHTML = $.i18n.prop('_download'); 

        $.getJSON(CONFIG.prefix + CONFIG.configurationURL, function (data) { 

            F3DWLD.CONFIG.baseurl      =  data.baseurl; 
            F3DWLD.CONFIG.datasource  =  data.datasource; 
            F3DWLD.CONFIG.tablelimit  =  data.tablelimit; 
            F3DWLD.CONFIG.groupCode    =  groupCode; 
            F3DWLD.CONFIG.domainCode  =  domainCode; 
            F3DWLD.CONFIG.lang        =  language; 

            switch (language) { 
                case 'FR' : 
                    F3DWLD.CONFIG.lang = 'F'; 
                    F3DWLD.CONFIG.lang_ISO2 = 'fr'; 
                    break; 
                case 'F' : 
                    F3DWLD.CONFIG.lang = 'F'; 
                    F3DWLD.CONFIG.lang_ISO2 = 'fr'; 
                    break; 
                case 'ES' : 
                    F3DWLD.CONFIG.lang = 'S'; 
                    F3DWLD.CONFIG.lang_ISO2 = 'es'; 
                    break; 
                case 'S' : 
                    F3DWLD.CONFIG.lang = 'S'; 
                    F3DWLD.CONFIG.lang_ISO2 = 'es'; 
                    break; 
                case 'EN' : 
                    F3DWLD.CONFIG.lang = 'E'; 
                    F3DWLD.CONFIG.lang_ISO2 = 'en'; 
                    break; 
                case 'E' : 
                    F3DWLD.CONFIG.lang = 'E'; 
                    F3DWLD.CONFIG.lang_ISO2 = 'en'; 
                    break; 
            } 

            $.i18n.properties({ 
                name        :  'I18N', 
                path        :  F3DWLD.CONFIG.prefix + 'I18N/', 
                mode        :  'both', 
                language    :  F3DWLD.CONFIG.lang_ISO2 
            }); 

            loadDSD(); 

        }) 

    }; 

    function collectAndQueryWDSPivot(refresh,isEx,outputFormat) { 

        /* Collect parameters. */ 
        getTabSelection(); 

        getGridsValues(); 

        //console.log('collectAndQueryWDSPivot'); 

        /* Collect codes for 'list' items, then create the JSON payload. */ 
        //collectListCodesPIVOT(); 
        try {document.getElementById('testinline').className="visi2";} catch(err) {    } 
                    insideFalseClick(refresh,isEx,outputFormat); 
    }; 

function retFunction(a,b,c) 
{return function(mp) 
    { 
        if(F3DWLD.CONFIG.wdsPayload.showCodes && mp[a]!==mp[b]) 
        {return "<span class=\"ordre\">"+mp[c+"Order"]+"</span>"+"<table  class=\"innerCol\"><th>"+mp[a]+"</th><th>"+mp[b]+"</th></table>";} 
        else{return  "<span class=\"ordre\">"+mp[c+"Order"]+"</span>"+mp[a];} 
    }; 
  } 

    function insideFalseClick(refresh,isEx,outputFormat) 
    { 
        $('#OLAP_IFRAME').css('display', 'inline'); 
        document.getElementById('output_area').innerHTML = ''; 

        $("#testinline").html("<center><img src=\"/faostat-download-js/pivotAgg/Preload.gif\" /></center>"); 
        FAOSTATNEWOLAP.flags={}; 
        var mesOptionsPivot ={ 
            "cols":[], 
            "hiddenAttributes":[], 
            "linkedAttributes":[], 
            "cols":[], 
            "rows":[], 
            "vals":[], 
            "derivedAttributes":{} 
        }; 

        $.ajax({ 

            type: 'GET', 
            url: F3DWLD.CONFIG.schema_url + FAOSTATDownload.datasource + '/' + FAOSTATDownload.domainCode+'/'+FAOSTATDownload.language, 

            success: function (response) { 

                var schema_json = response; 
                if (typeof schema_json == 'string'){  schema_json = $.parseJSON(response);} 


                /* var mesOptionsPivot = FAOSTATOLAP2.options; 
                mesOptionsPivot.vals = ["Value"]; 
                if (F3DWLD.CONFIG.wdsPayload.showUnits) { 
                mesOptionsPivot.vals.push("Unit") 
                } 
                if (F3DWLD.CONFIG.wdsPayload.showFlags) { 
                mesOptionsPivot.vals.push("Flag") 
                } 
                if(F3DWLD.CONFIG.domainCode=="TM" ||F3DWLD.CONFIG.domainCode=="FT" ) 
                {mesOptionsPivot=FAOSTATOLAP2.optionsTM} 
                */ 
                schema_json=schema_json.sort(function(a,b){return a[4]>b[4];}); 
                for(var j in schema_json) 
                { 

                    /* var s=schema_json[j]; 
                    var  title=s[6]; 
                    var code=s[7];*/ 

                    // if(s[5]=="C"){mesOptionsPivot.cols.push(s[1]);} 
                    if(schema_json[j][5]==="C" || schema_json[j][5]==="R") 
                    {  mesOptionsPivot.derivedAttributes[schema_json[j][6]+"_"]=retFunction(schema_json[j][6],schema_json[j][7],schema_json[j][1]);} 
                    if(schema_json[j][5]==="C"){ 
                        mesOptionsPivot.cols.push(schema_json[j][6]+"_"); 

                        // mesOptionsPivot.cols.push(s[7]); 
                        // if(s[3]!=s[4]){ mesOptionsPivot.linkedAttributes.push([s[6],s[7]]);} 
                    } 
                    else if(schema_json[j][5]==="R"){ 
                        mesOptionsPivot.rows.push(schema_json[j][6]+"_"); 
                    } 
                    else if(schema_json[j][5]==="V"){ 
                        /* mesOptionsPivot.vals.push(s[6]); 
                        mesOptionsPivot.vals.push(s[7]);*/ 
                        // mesOptionsPivot.linkedAttributes.push([s[6],s[7]]); 
                    } 
                    else{ 
                        mesOptionsPivot.hiddenAttributes.push(schema_json[j][6]); 
                        mesOptionsPivot.hiddenAttributes.push(schema_json[j][7]);} 
                } 

                mesOptionsPivot.vals = ["Value"]; 
                if (F3DWLD.CONFIG.wdsPayload.showUnits) {  mesOptionsPivot.vals.push("Unit");  } 
                if (F3DWLD.CONFIG.wdsPayload.showFlags) { mesOptionsPivot.vals.push("Flag") ;  } 



                var p = {}; 
                p.datasource = F3DWLD.CONFIG.datasource; 
                p.domainCode = F3DWLD.CONFIG.domainCode; 
                p.lang = F3DWLD.CONFIG.lang; 
                p.nullValues = F3DWLD.CONFIG.wdsPayload.showNullValues; 
                p.thousand = F3DWLD.CONFIG.wdsPayload.thousandSeparator; 
                p.decimal = F3DWLD.CONFIG.wdsPayload.decimalSeparator; 
                p.decPlaces = F3DWLD.CONFIG.wdsPayload.decimalNumbers; 
                p.limit = -1; 

                for (var i = 1 ; i <= F3DWLD.CONFIG.maxListBoxNo ; i++) {  p['list' + i + 'Codes'] = [];} 

                for (var key in Object.keys(F3DWLD.CONFIG.dsd)) { 
                    var listBoxNo = 1 + parseInt(key); 
                    var ins = new Array(); 
                    for (var j = 0 ; j < F3DWLD.CONFIG.selectedValues[key].length ; j++) { 
                        var code = F3DWLD.CONFIG.selectedValues[key][j].code; 
                        code += (F3DWLD.CONFIG.selectedValues[key][j].type === '>' || F3DWLD.CONFIG.selectedValues[key][j].type === '+') ? F3DWLD.CONFIG.selectedValues[key][j].type : ''; 
                        ins.push('\'' + code.replace('+','') + '\''); 
                    } 
                    p['list' + listBoxNo + 'Codes'] = ins; 
                } 
                if(refresh){ 
                    mesOptionsPivot.rows=FAOSTATNEWOLAP.internalData.rowAttrs; 
                    mesOptionsPivot.cols=FAOSTATNEWOLAP.internalData.colAttrs; 
                    $("#testinline").pivotUI(FAOSTATNEWOLAP.originalData,mesOptionsPivot ,true); 

                    for (var iLabel=0;iLabel<$(".pvtAxisLabel").length;iLabel++) 
                    { 

                        $("#my_"+$(".pvtAxisLabel")[iLabel].innerHTML)[0].innerHTML=$(".pvtAxisLabel")[iLabel].innerHTML.replace("_",""); 
                        $(".pvtAxisLabel")[iLabel].innerHTML=$(".pvtAxisLabel")[iLabel].innerHTML.replace("_",""); 

                    } 
                    $("#options_menu_box").css("display","block"); 
                    $("#testinline").css("overflow","auto"); 
                    var newFlag=""; 
                    for(var i in FAOSTATNEWOLAP.flags){ 
                        if(newFlag!==""){newFlag+=":";} 
                        newFlag+="'" +i+"'"; 
                    } 
                    if(newFlag===""){newFlag="''";} 
                    $(".pvtAxisLabel")[$(".pvtAxisLabel").length-1].setAttribute("colspan",2); 
                    $.get( "http://faostat3.fao.org/faostat.olap.ws/rest/GetFlags/"+F3DWLD.CONFIG.lang+"/"+newFlag, function( data ) { 
                        data=data.replace("localhost:8080/","faostat3.fao.org/"); 
                        data=data.replace("168.202.28.210/","faostat3.fao.org/"); 
                        $( "#testinline" ).append( data );}); 

                }else{ 
                    var data = {}; 
                    data.payload = JSON.stringify(p); 
                    $.ajax({ 
                        type: 'POST', 
                        url: F3DWLD.CONFIG.procedures_data_url, 
                        data: data, 
                        success: function (response) { 

                            /* var response2=[["Domain","AreaCode","AreaName","ItemCode","ItemName","ElementCode","ElementName","Year","Unit","Flag","Value"]]; 
                            var response2TM=[["Domain","ReporterCode","ReporterName","PartnerCode","PartnerName","ItemCode","ItemName","ElementCode","ElementName","Year","Unit","Flag","Value"]]; 
                            var mesOptionsPivot=FAOSTATOLAP2.options; 
                            if(F3DWLD.CONFIG.domainCode=="TM" ||F3DWLD.CONFIG.domainCode=="FT" ) 
                            {response2=response2TM;mesOptionsPivot=FAOSTATOLAP2.optionsTM} 
                            for(i in response){response2.push(response[i]);} 
                            */ 

                            var derivers = $.pivotUtilities.derivers; 
                            var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers); 
                            /*mesOptionsPivot.vals=["Value"]; 
                            if(F3DWLD.CONFIG.wdsPayload.showUnits){mesOptionsPivot.vals.push("Unit")} 
                            if(F3DWLD.CONFIG.wdsPayload.showFlags){mesOptionsPivot.vals.push("Flag")} 
                            */ 
                            //$("#output_are").html("<div id="testinline"></div>"); 
                            FAOSTATNEWOLAP.originalData=response; 
                            console.log(mesOptionsPivot); 
                            $("#testinline").pivotUI(response,mesOptionsPivot ,true); 

                            for (var iLabel=0;iLabel<$(".pvtAxisLabel").length;iLabel++) 
                            { 

                                $("#my_"+$(".pvtAxisLabel")[iLabel].innerHTML.replace(/s/,"_"))[0].innerHTML=$(".pvtAxisLabel")[iLabel].innerHTML.replace("_",""); 
                                $(".pvtAxisLabel")[iLabel].innerHTML=$(".pvtAxisLabel")[iLabel].innerHTML.replace("_",""); 

                            } 
                            $("#options_menu_box").css("display","block"); 
                            $("#testinline").css("overflow","auto"); 
                            var newFlag=""; 
                            for(var i in FAOSTATNEWOLAP.flags){ 
                                if(newFlag!==""){newFlag+=":";} 
                                newFlag+="'" +i+"'"; 
                            } 
                            if(newFlag===""){newFlag="''";} 
                            $(".pvtAxisLabel")[$(".pvtAxisLabel").length-1].setAttribute("colspan",2); 
                            $.get( "http://faostat3.fao.org/faostat.olap.ws/rest/GetFlags/"+F3DWLD.CONFIG.lang+"/"+newFlag, function( data ) { 
                                data=data.replace("localhost:8080/","faostat3.fao.org/"); 
                                data=data.replace("168.202.28.210/","faostat3.fao.org/"); 
                                $( "#testinline" ).append( data ); 

                                if(isEx){ 
                                    $('#testinline').css("display","none"); 
                                    if(outputFormat=="csv") { decolrowspanNEW();} 
                                    else { my_exportNew();    } 
                                } 
                                // my_exportNew(); 
                            }); 
                        } 
                    }); 
                } 
                /*fin getschema*/ 
            } 
        }); 
    } 

    function collectListCodesPIVOT() { 
        var doTheCall = callListCodesREST(); 
        if (doTheCall) { 

            var countries = JSON.stringify(F3DWLD.CONFIG.selectedValues[0]); 
//            var countries_dst = JSON.stringify(F3DWLD.CONFIG.selectedValues.countries2); 
            var countries_dst = []; 
            var items = JSON.stringify(F3DWLD.CONFIG.selectedValues[1]); 

            var backup_countries = new Array(); 
            var backup_countries_dst = new Array(); 
            var backup_items = new Array(); 

            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[0].length ; i++) 
                if (F3DWLD.CONFIG.selectedValues[0].type != '>') 
                    backup_countries.push(F3DWLD.CONFIG.selectedValues[0][i]); 

            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[1].length ; i++) 
                if (F3DWLD.CONFIG.selectedValues[1][i].type != '>') 
                    backup_items.push(F3DWLD.CONFIG.selectedValues[1][i]); 

            var data = {}; 
            data.datasource = F3DWLD.CONFIG.datasource; 
            data.domainCode = F3DWLD.CONFIG.domainCode; 
            data.language = F3DWLD.CONFIG.lang; 
            data.countries_1 = countries; 
            data.countries_2 = countries_dst; 
            data.items = items; 

            $.ajax({ 

                type    :  'POST', 
                url    :  F3DWLD.CONFIG.bletchley_url + '/listForTradeMatrix/post', 
                data    :  data, 

                success : function(response) { 

                    var codes = response; 
                    if (typeof(codes) == 'string') 
                        codes = $.parseJSON(response); 

                    if (codes != null && codes[0].length > 0) { 
                        F3DWLD.CONFIG.selectedValues[0] = codes[0]; 
                    } 

                    if (codes != null && codes[1].length > 0) { 
                        F3DWLD.CONFIG.selectedValues[1] = codes[1]; 
                    } 

                    if (codes != null && codes[2].length > 0) { 
//                        F3DWLD.CONFIG.selectedValues.countries2 = codes[2]; 
                    } 

                    if (codes != null) { 

                        /* Use list codes or keep the current ones. */ 
                        if (codes != null && codes[0].length > 0) 
                            F3DWLD.CONFIG.selectedValues[0] = codes[0]; 

                        /* Use list codes or keep the current ones. */ 
                        if (codes != null && codes[1].length > 0) 
                            F3DWLD.CONFIG.selectedValues[1] = codes[1]; 

                    } 

                    for (var z = 0 ; z < backup_items.length ; z++) 
                        F3DWLD.CONFIG.selectedValues[1].push(backup_items[z]); 

                    for (var z = 0 ; z < backup_countries.length ; z++) 
                        F3DWLD.CONFIG.selectedValues[0].push(backup_countries[z]); 

                    try {document.getElementById('testinline').className="visi2";} catch(err) {    } 
                    insideFalseClick(false); 

                }, 

                error : function(err, b, c) { 

                } 

            }); 

        } else { 
            try {document.getElementById('testinline').className="visi2";} catch(err) {    } 
          insideFalseClick(false); 
        } 

    }; 

    function callListCodesREST() { 

        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[0].length ; i++) 
            if (F3DWLD.CONFIG.selectedValues[0][i].type == '>') 
                return true; 

        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[1].length ; i++) 
            if (F3DWLD.CONFIG.selectedValues[1][i].type == '>') 
                return true; 

        return false; 

    }; 

    /** 
    * Function to create the preview table and the Excel export. 
    * 
    * @param queryDB      if this parameter is false the function will not call the DB 
    *                      but it will use the previously buffered data 
    * @param streamExcel  true to create the Excel file, false to show the preview 
    */ 
    function createTable(queryDB, streamExcel, outputFormat) { 

        $.ajax({ 

            type: 'GET', 
            url: F3DWLD.CONFIG.schema_url + FAOSTATDownload.datasource + '/' + FAOSTATDownload.domainCode + '/' + FAOSTATDownload.language, 

            success: function (response) { 

                var json = response; 
                if (typeof json == 'string') 
                    json = $.parseJSON(response); 

                var tableIndices = []; 
                for (var i = 0; i < json.length; i++) { 
                    switch (json[i][1]) { 
                        case 'Domain': 
                            tableIndices.push(json[i][2]); 
                            if (F3DWLD.CONFIG.wdsPayload.showCodes) 
                                tableIndices.push(json[i][3]); 
                            break; 
                        case 'Flag': 
                            if (F3DWLD.CONFIG.wdsPayload.showFlags) { 
                                tableIndices.push(json[i][2]); 
                                tableIndices.push(json[i][3]); 
                            } 
                            break; 
                        case 'Unit': 
                            if (F3DWLD.CONFIG.wdsPayload.showUnits) { 
                                tableIndices.push(json[i][2]); 
                                tableIndices.push(json[i][3]); 
                            } 
                            break; 
                        case 'Value': 
                            tableIndices.push(json[i][2]); 
                            break; 
                        default : 
                            tableIndices.push(json[i][2]); 
                            if (F3DWLD.CONFIG.wdsPayload.showCodes) 
                                tableIndices.push(json[i][3]); 
                            break; 
                    } 
                } 
                F3DWLD.CONFIG.tableIndices = tableIndices; 

                if (queryDB) { 

                    var p = {}; 
                    p.datasource = F3DWLD.CONFIG.datasource; 
                    p.domainCode = F3DWLD.CONFIG.domainCode; 
                    p.lang = F3DWLD.CONFIG.lang; 
                    p.nullValues = F3DWLD.CONFIG.wdsPayload.showNullValues; 
                    p.thousand = F3DWLD.CONFIG.wdsPayload.thousandSeparator; 
                    p.decimal = F3DWLD.CONFIG.wdsPayload.decimalSeparator; 
                    p.decPlaces = F3DWLD.CONFIG.wdsPayload.decimalNumbers; 
                    p.limit = F3DWLD.CONFIG.outputLimit; 

                    for (var i = 1; i <= F3DWLD.CONFIG.maxListBoxNo; i++) 
                        p['list' + i + 'Codes'] = []; 

                    for (var key in Object.keys(F3DWLD.CONFIG.dsd)) { 
                        var listBoxNo = 1 + parseInt(key); 
                        var ins = new Array(); 
                        for (var j = 0; j < F3DWLD.CONFIG.selectedValues[key].length; j++) { 
                            var code = F3DWLD.CONFIG.selectedValues[key][j].code; 
                            code += (F3DWLD.CONFIG.selectedValues[key][j].type == '>') ? F3DWLD.CONFIG.selectedValues[key][j].type : ''; 
                            ins.push('\'' + code + '\''); 
                        } 
                        p['list' + listBoxNo + 'Codes'] = ins; 
                    } 

                    var data = {}; 
                    data.payload = JSON.stringify(p); 

                    if (streamExcel) { 

                        p.limit = -1; 
                        var data = {}; 
                        data.payload = JSON.stringify(p); 
                        switch (outputFormat) { 
                            case 'csv': 
                                $('#payload_csv').val(JSON.stringify(p)); 
                                document.csvForProcedures.submit(); 
                                break; 
                            case 'excel': 
                                $('#payload_excel').val(JSON.stringify(p)); 
                                document.excelForProcedures.submit(); 
                                break; 
                        } 

                    } else { 

                        $('#output_area').empty(); 
                        $('#output_area').append('<i class="fa fa-refresh fa-spin fa-5x" style="color: #399BCC;"></i>'); 

                        $.ajax({ 

                            type: 'POST', 
                            url: F3DWLD.CONFIG.procedures_data_url, 
                            data: data, 

                            success: function (response) { 
                                var json = response; 
                                if (typeof json == 'string') 
                                    json = $.parseJSON(response); 
                                F3DWLD.CONFIG.data = json; 
                                renderTable(); 
                            }, 

                            error: function (err, b, c) { 
                                var json = $.parseJSON(err.responseText.replace('],]', ']]')); 
                                F3DWLD.CONFIG.data = json; 
                                renderTable(); 
                            } 

                        }); 

                    }

                } 
                else {
                    renderTable(); 
                }

            }, 

            error: function (err, b, c) { 

            } 

        }); 

    }; 

    function renderTable() { 
        var s = '<table class="dataTable">'; 
        s += '<thead>'; 
        s += '<tr>'; 
        for (var i = 1 ; i < F3DWLD.CONFIG.data[0].length ; i++) { 
            if ($.inArray((i - 1).toString(), F3DWLD.CONFIG.tableIndices) > -1) { 
                s += '<th>' + F3DWLD.CONFIG.data[0][i] + '</th>'; 
            } 
        } 
        s += '</tr>'; 
        s += '</thead>'; 
        s += '<tbody>'; 
        if (F3DWLD.CONFIG.data.length > 1) { 
            for (var i = 1; i < F3DWLD.CONFIG.data.length; i++) { 
                s += '<tr>'; 
                for (var j = 0; j < F3DWLD.CONFIG.data[i].length; j++) { 
                    if ($.inArray((j - 1).toString(), F3DWLD.CONFIG.tableIndices) > -1) { 
                        if (i % 2 == 0) 
                            s += '<td class="hor-minimalist-b_row1">' + F3DWLD.CONFIG.data[i][j] + '</td>'; 
                        else 
                            s += '<td class="hor-minimalist-b_row2">' + F3DWLD.CONFIG.data[i][j] + '</td>'; 
                    } 
                } 
                s += '</tr>'; 
            } 
        } else { 
            s += '<tr><td colspan="100" class="hor-minimalist-b_row1">' + $.i18n.prop('_no_data_available') + '</td></tr>' 
        } 
        s += '</tbody>'; 
        s += '</table>'; 
        $('#output_area').empty(); 
        $('#options_menu_box').css('display', 'block'); 
        $('#preview_hr').css('display', 'block'); 
        $('#output_area').append('<div style="overflow: auto; padding-top:10px; width:' + F3DWLD.CONFIG.widthTable + '">' + s + '</div>'); 
    } 

    function getCPINotesByProcedures() { 

        var s = '<H1>CPI Notes</H1>'; 
        s += '<br>'; 

        var data = {}; 
        var p = {}; 
        p.datasource = F3DWLD.CONFIG.datasource; 
        p.lang = F3DWLD.CONFIG.lang; 
        p.areaCodes = collectCountries(); 
        p.yearCodes = collectYears(); 
        p.itemCodes = collectItems(); 
        data.payload = JSON.stringify(p); 

        $.ajax({ 

            type : 'POST', 
            url  : F3DWLD.CONFIG.CPINotes_url, 
            data : data, 

            success : function(response) { 

                var json = response; 
                if (typeof(json) == 'string') 
                    json = $.parseJSON(response); 

                s += '<table class="dataTable">'; 
                s += '<thead>'; 
                s += '<tr>'; 
                s += '<th>Country</th><th>Year</th><th>Item</th><th>Note</th>'; 
                s += '</tr>'; 
                s += '</thead>'; 
                s += '<tbody>'; 
                for (var i = 0 ; i < json.length ; i++) { 
                    s += '<tr>'; 
                    for (var j = 0 ; j < json[i].length ; j++) 
                        s += '<td>' + json[i][j] + '</td>'; 
                    s += '</tr>'; 
                } 
                s += '</tbody>'; 
                s += '</table>'; 

                $('#output_area').append('<br>'); 
                $('#output_area').append(s); 

            }, 

            error : function(err, b, c) { 

            } 

        }); 

        return s; 
    }; 

    function showCPINotes() { 

        if (F3DWLD.CONFIG.domainCode == 'CP') { 

            var data = {}; 
            data.datasource = F3DWLD.CONFIG.datasource; 
            data.lang = F3DWLD.CONFIG.lang; 

            var json = {}; 
            json.lang = F3DWLD.CONFIG.lang; 

            var countries = '@areaList=N\''; 
            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[0].length ; i++) { 
                countries += F3DWLD.CONFIG.selectedValues[0][i].code; 
                if (i < F3DWLD.CONFIG.selectedValues[0].length - 1) 
                    countries += ','; 
            } 
            countries += '\''; 
            json.countries = countries; 

            var items = '@item=N\''; 
            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[1].length ; i++) { 
                items += F3DWLD.CONFIG.selectedValues[1][i].code; 
                if (i < F3DWLD.CONFIG.selectedValues[1].length - 1) 
                    items += ','; 
            } 
            items += '\''; 
            json.items = items; 

            var years = '@yearList=N\''; 
            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[3].length ; i++) { 
                years += F3DWLD.CONFIG.selectedValues[3][i].code; 
                if (i < F3DWLD.CONFIG.selectedValues[3].length - 1) 
                    years += ','; 
            } 
            years += '\''; 
            json.years = years; 

            data.json = JSON.stringify(json); 

            $.ajax({ 

                type    :  'POST', 
                url    :  F3DWLD.CONFIG.data_url + '/notes/cpinotes', 
                data    :  data, 

                success : function(response) { 

                    var html = '<br>'; 
                    html += '<input style="margin-left: 22px;" type="button" id="cpi_notes_button" onclick="CPI.showCPITableNotes();" value="Show / Hide CPI Notes"/>'; 
                    html += '<br><br>'; 
                    html += '<div id="cpi_notes_container" style="display: none;">'; 
                    html += response; 
                    html += '</div>'; 

                    $('#cpi_notes_area').css('display', 'inline'); 
                    document.getElementById('cpi_notes_area').innerHTML = html; 

                    $("#cpi_notes_button").jqxButton({ 
                        width: '150', 
                        theme: F3DWLD.CONFIG.theme 
                    }); 

                }, 

                error : function(err, b, c) { 

                } 

            }); 

        } 

    }; 

    function collectItems() { 
        var ins = new Array(); 
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[1].length ; i++) { 
            if (F3DWLD.CONFIG.selectedValues[1][i].code == 'all') { 
                return null; 
            } else { 
                ins.push(F3DWLD.CONFIG.selectedValues[1][i].code); 
            } 
        } 
        return ins; 
    }; 

    function collectElements() { 
        var ins = new Array(); 
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[2].length ; i++) { 
            if (F3DWLD.CONFIG.selectedValues[2][i].code == 'all') { 
                return null; 
            } else { 
                ins.push(F3DWLD.CONFIG.selectedValues[2][i].code); 
            } 
        } 
        return ins; 
    }; 

    function collectCountries() { 
        var ins = new Array(); 
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[0].length ; i++) { 
            if (F3DWLD.CONFIG.selectedValues[0][i].code == 'all') { 
                return null; 
            } else { 
                ins.push(F3DWLD.CONFIG.selectedValues[0][i].code); 
            } 
        } 
        return ins; 
    }; 

    function collectYears() { 
        var ins = new Array(); 
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues[3].length ; i++) { 
            if (F3DWLD.CONFIG.selectedValues[3][i].code == 'all') { 
                return null; 
            } else { 
                ins.push(F3DWLD.CONFIG.selectedValues[3][i].code); 
            } 
        } 
        return ins; 
    }; 

    function getGridsValues() { 
        var countryGridName = null; 
        var countryGridName_dst = null; 
        var itemsGridName = null; 
        switch (F3DWLD.CONFIG.tabsSelection.countries) { 
            case 0 : countryGridName = 'grid_usp_GetAreaList1'; break; 
            case 1 : countryGridName = 'grid_usp_GetAreaList2'; break; 
            case 2 : countryGridName = 'grid_usp_GetAreaList3'; break; 
        } 
        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) 
            countryGridName_dst = 'grid_usp_GetAreaList2'; 
        switch (F3DWLD.CONFIG.tabsSelection.items) { 
            case 0 : itemsGridName = 'grid_usp_GetItemList1'; break; 
            case 1 : itemsGridName = 'grid_usp_GetItemList2'; break; 
        } 
        getGridValues(countryGridName, F3DWLD.CONFIG.selectedValues[0]); 
        getGridValues('grid_usp_GetElementList', F3DWLD.CONFIG.selectedValues[2]); 
        getGridValues(itemsGridName, F3DWLD.CONFIG.selectedValues[1]); 
        getGridValues('grid_usp_GetYearList', F3DWLD.CONFIG.selectedValues[3]); 
        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) 
            getGridValues(countryGridName_dst, F3DWLD.CONFIG.selectedValues.countries_dst); 
    }; 

    function getTabSelection() { 
        F3DWLD.CONFIG.tabsSelection.countries = $('#tab_ListBox1').jqxTabs('selectedItem'); 
        F3DWLD.CONFIG.tabsSelection.elements = $('#tab_ListBox3').jqxTabs('selectedItem'); 
        F3DWLD.CONFIG.tabsSelection.items = $('#tab_ListBox2').jqxTabs('selectedItem'); 
        if (F3DWLD.CONFIG.domainCode == 'GY') 
            F3DWLD.CONFIG.tabsSelection.items = 1; 
        F3DWLD.CONFIG.tabsSelection.years = $('#tab_ListBox4').jqxTabs('selectedItem'); 
    }; 

    function loadDSD() { 

        $.ajax({ 

            type: 'GET', 
            url: F3DWLD.CONFIG.dsdURL + '/' + FAOSTATDownload.datasource + '/' + F3DWLD.CONFIG.domainCode + '/' + F3DWLD.CONFIG.lang, 
            dataType: 'json', 

            /* Load data from the DB */ 
            success : function(response) { 

                /* Convert the response in JSON, if needed */ 
                var json = response; 
                if (typeof json == 'string') 
                    json = $.parseJSON(response); 
                F3DWLD.CONFIG.dsd = arrayToObject(json); 

                /* Initiate arrays for selected values */ 
                for (var key in Object.keys(F3DWLD.CONFIG.dsd)) 
                    F3DWLD.CONFIG.selectedValues[key] = []; 

                /* Build UI structure. */ 
                $('#testinline').empty(); 
                if(F3DWLD.CONFIG.domainCode === 'FBS') { 
                    document.getElementById('trWizardMode').className = 'visi2'; 
                    document.getElementById('OLAPTD').className = 'invi'; 
                    document.getElementById('mainTD').className = 'visi2'; 
                    document.getElementById('testinline').className = 'invi' ; 
                    FAOSTATDownload.showFB(); 
                } else { 
                    document.getElementById('OLAPTD').className = 'visi2'; 
                    document.getElementById('mainTD').className = 'invi'; 
                    buildUIStructure(); 
                } 

            }, 

            /* Error */ 
            error : function(err, b, c) { 
                alert('Domain code ' + F3DWLD.CONFIG.domainCode + ' has no DSD.'); 
            } 

        }); 

    }; 

    function arrayToObject(a) { 
        var tmp = {}; 
        var names  = []; 
        var counters  = []; 
        for (var i = 0 ; i < a.length ; i++) { 
            if ($.inArray(a[i][0], names) < 0) { 
                names.push(a[i][0]); 
                counters[names.length - 1] = a[i][4]; 
                tmp[a[i][0]] = {}; 
            } 
        } 
        for (var i = 0 ; i < a.length ; i++) { 
            tmp[a[i][0]][a[i][1]] = {}; 
            tmp[a[i][0]][a[i][1]].tabGroup = a[i][0]; 
            tmp[a[i][0]][a[i][1]].tabIndex = a[i][2]; 
            tmp[a[i][0]][a[i][1]].tabName = a[i][1]; 
            tmp[a[i][0]][a[i][1]].procedure = a[i][3]; 
        } 
        return tmp; 
    } 

    function buildUIStructure() { 
    
      FAOSTATNEWOLAP.firstCall=1; 
        $('#mainTD').hide(); 
        $('#OLAPTD').show(); 
        var item = $('#jqxTree').jqxTree('getSelectedItem'); 
        var parent = $('#jqxTree').jqxTree('getItem', $('#' + item.parentId)[0]).label; 
        var metadataURL = 'http://' + F3DWLD.CONFIG.baseurl + '/faostat-gateway/go/to/download/' + F3DWLD.CONFIG.groupCode + '/*/' + F3DWLD.CONFIG.lang; 
        var s = ''; 
        s += '<div>'; 
        s += '<div class="standard-title">' + $.i18n.prop('_filters') + ' / <a href="' + metadataURL + '">' + parent + ' </a> / <a>' + item.label + '</a></div>'; 
        s += '<div id="bulk-downloads-menu" style="position: absolute; right: 0; top: 0;">'; 
        s += '</div>'; 
        s += '</div>'; 
        s += '<hr class="standard-hr">'; 
        var columns = []; 
        for (var i = 0 ; i < Object.keys(F3DWLD.CONFIG.dsd).length ; i++) { 
            columns.push(F3DWLD.CONFIG.dsd[Object.keys(F3DWLD.CONFIG.dsd)[i]]); 
            if (columns.length % 2 == 0) { 
                s += buildSelectorsRow(columns); 
                columns = []; 
            } 
        } 
        s += buildSelectorsRow(columns); 
        s += buildSummary(); 
        s += buildButtons(); 
        s += buildOLAP(); 
        s += buildOptionsMenu(); 
        s += buildOutputArea(); 
        document.getElementById('listArea').innerHTML = s; 
        enhanceUIStructure(); 
    }; 

    function buildOptionsMenu() { 
      
        var s = ''; 
      
        s += '<a class="various btn" id="btnFS" data-fancybox-type="iframe" href="/faostat-download-js/popupOlap.jsp" target="myFanzy" style="display:none">'; 
     s += '<div class="btn-fullscreen-icon btnLeftIcon"></div>'; 
     s += '<div class="btnText">Full screen</div>'; 
     s += '</a>'; 
        s += '<div id="nested_by"  style="display:none">'+ $.i18n.prop('_nestedby') +'</div>'; 
        
        
        s += '<div id="options_menu_box" style="position: relative; display: none;">'; 
        s += '<div class="standard-title" id="output_options_labels">' + $.i18n.prop('_output_preview') + '</div>'; 
        s += '<div id="options-menu" style="position: absolute; right: 0; top: 0;">'; 
        s += '<ul>'; 
        s += '<li id="root"><i class="fa fa-cogs"></i> ' + $.i18n.prop('_outputOptions'); 
        s += '<ul>'; 
        s += '<li><b>' + $.i18n.prop('_decimalSeparator') + '</b></li>'; 
        s += '<li><div id="comma_menu">' + $.i18n.prop('_comma') + '</div></li>'; 
        s += '<li><div id="dot_menu">' + $.i18n.prop('_period') + '</div></li>'; 
        s += '<li type="separator"></li>'; 
        s += '<li><b>' + $.i18n.prop('_thousandSeparator') + '</b></li>'; 
        s += '<li><div id="enable_menu">' + $.i18n.prop('_enable') + '</div></li>'; 
        s += '<li><div id="disable_menu">' + $.i18n.prop('_disable') + '</div></li>'; 
        s += '<li type="separator"></li>'; 
        s += '<li><b>' + $.i18n.prop('_decimalNumbers') + '</b></li>'; 
        s += '<li><div id="increment"></div></li>'; 
        s += '<li type="separator"></li>'; 
        s += '<li id="menu_show"><b>' + $.i18n.prop('_show') + '</b>'; 
        s += '<ul>'; 
        s += '<li><div id="flags_menu">' + $.i18n.prop('_showFlags') + '</div></li>'; 
        s += '<li><div id="codes_menu">' + $.i18n.prop('_showCodes') + '</div></li>'; 
        s += '<li><div id="units_menu">' + $.i18n.prop('_showUnits') + '</div></li>'; 
        s += '<li><div id="null_values_menu">' + $.i18n.prop('_showNullValues') + '</div></li>'; 
        s += '</li></ul>'; 
        s += '<li type="separator"></li>'; 
      //  s += '<li id="menu_show"><div id="nested_by">'+ $.i18n.prop('_nestedby') +'</div>'; 
        s += '<ul>'; 
        s += '<li><div id="export_csv">CSV</div></li>'; 
        s += '<li><div id="export_xls">Excel</div></li>'; 
        s += '</ul>'; 
        s += '</div>'; 
        s += '</div>'; 
        s += '<hr id="preview_hr" class="standard-hr" style="display: none;">'; 
        return s; 
    } 

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

        /** Box */ 
        s += '<div class="obj-box-download">'; 

        /** Tab Panel */ 
        s += '<div class="faostat-download-tab" id="tab_' + column[Object.keys(column)[0]].tabGroup + '">'; 

        /** Tabs */ 
        s += '<ul>'; 
        for (var key in column) 
            s += '<li id="li_' + column[key].procedure + '">' + key + '</li>'; 
        s += '</ul>'; 

        /** Grids */ 
        for (var key in column) 
            s += ' <div class="faostat-download-list" id="grid_' + column[key].tabGroup + '_' + column[key].tabIndex + '"></div>'; 
        s += '</div>'; 

        /** Select All */ 
        var id = column[Object.keys(column)[0]].tabGroup + '_' + column[Object.keys(column)[0]].tabIndex; 
        s += '<div class="download-selection-buttons">'; 
        s += '<a onclick="F3DWLD.selectAllForSummary(\'grid_' + id + '\');" id="buttonSelectAll_' + id + '" class="btn dwld">'; 
        s += '<i class="fa fa-check-circle-o"></i>'; 
        s += '<div id="buttonSelectAll_' + id + '-text"></div>'; 
        s += '</a>'; 

        /** De-select All */ 
        s += '<a onclick="F3DWLD.clearAllForSummary(\'grid_' + id + '\', \'' + false + '\');" id="buttonDeSelectAll_' + id + '" class="btn dwld">'; 
        s += '<i class="fa fa-times-circle-o"></i>'; 
        s += '<div id="buttonDeSelectAll_' + id + '-text"></div>'; 
        s += '</a>'; 

        /** Close DIV's */ 
        s += '</div>'; 
        s += '</div>'; 

        return s; 

    }; 

    function buildOutputArea() { 
        return '<div id="output_area"></div>'; 
    }; 

    function buildButtons() { 
        var s = '<br>'; 
        s += '<div id="output_buttons">'; 
        s += '<span class="standard-title table-selection-title">' + 
            $.i18n.prop('_display_output_as').toUpperCase() + 
            ' </span>'; 
        s += '<div id="radio_table" class="table-switch-radio">' + 
            '<span class="fa-stack">' + 
            '<i class="fa fa-table fa-stack-2x"></i>' + 
            '<i class=""></i>' + 
            '</span>' + 
            $.i18n.prop('_table').toUpperCase() + 
            '</div>'; 
        s += '<div id="radio_pivot" class="table-switch-radio pivot-btn"> ' + 
            '<span class="fa-stack">' + 
            '<i class="fa fa-table fa-stack-2x"></i>' + 
            '<i class="fa fa-rotate-right fa-stack-1x"></i>' + 
            '</span>' + 
            $.i18n.prop('_pivot').toUpperCase() + 
            '</div>'; 
        s += '<div class="download-selection-buttons">'; 

        /* Preview button. */ 
        s += '<a id="dwl-preview-btn" class="btn btn-big" onclick="F3DWLD.preview(true);">'; 
        s += '<i class="fa fa-search"></i><div id="buttonSelectAll_usp_GetElementList-text" class="btnText">' + 
            $.i18n.prop('_preview').toUpperCase() + 
            '</div>'; 
        s += '</a>'; 

        /* Download button. */ 
        s += '<div id="download_button_menu" >'; 
        s += '<ul>'; 
        s += '<li id="download_button_menu_root"><i class="fa fa-chevron-circle-down"></i> ' + $.i18n.prop('_download').toUpperCase(); 
        s += '<ul>'; 
        s += '<li onclick="F3DWLD.download(true, \'csv\');"><i class="fa fa-file-code-o"></i> CSV</li>'; 
        s += '<li onclick="F3DWLD.download(true, \'excel\');"><i class="fa fa-file-excel-o"></i> Excel</li>'; 
        s += '</ul>'; 
        s += '</li>'; 
        s += '</ul>'; 
        s += '</div>'; 

        /* Preview button. */ 
//        s += '<a id="dwl-preview-btn" class="btn btn-big" onclick="F3DWLD.preview(true,false);">'; 
//        s += '<i class="fa fa-search"></i><div id="buttonSelectAll_usp_GetElementList-text" class="btnText">' + 
//            $.i18n.prop('_preview').toUpperCase() + 
//            '</div>'; 
//        s += '</a>'; 

//        s += '<a class="btn btn-big" onclick="F3DWLD.download(true);" id="buttonDeSelectAll_usp_GetElementList"">'; 
//        s += '<i class="fa fa-chevron-circle-down"></i><div id="buttonDeSelectAll_usp_GetElementList-text" class="btnText">' + 
//            $.i18n.prop('_download').toUpperCase() + 
//            '</div>'; 
//        s += '</a>'; 

        s += '</div>'; 
        s += '</div>'; 
        return s; 
    }; 

    function preview(queryDB,refresh) { 
      
        if ($('#radio_table').val()) { 
            $('#output_area').css("min-height","350px"); 
            $('#testinline').css("display","none"); 
            $("#btnFS").hide(); 
            $("#nested_by").hide(); 
            try { 
                validateSelection('preview table'); 
                createTable(queryDB, false); 
                STATS.showTableDownloadStandard(F3DWLD.CONFIG.domainCode); 
            } catch (e) { 
                alert(e); 
            } 
        } else { 
            $("#btnFS").show(); 
            $("#nested_by").show(); 
            FAOSTATNEWOLAP.firstCall=0; 
            $('#output_area').css("min-height","0px"); 
            $('#testinline').css("display","block"); 
          // try { 
                validateSelection('preview pivot'); 
                buildOptionsMenu();//just UI option menu 
                collectAndQueryWDSPivot(refresh); 
            STATS.showPivotDownloadStandard(F3DWLD.CONFIG.domainCode); 
          // } catch (e) {        console.log(e);            } 
        } 
    } 

    function download(queryDB, outputFormat) { 
        if ($('#radio_table').val()) { 
            try { 
                validateSelection('download'); 
                createTable(queryDB, true, outputFormat); 
                STATS.exportTableDownloadStandard(F3DWLD.CONFIG.domainCode); 
            } catch (e) { 
                alert(e); 
            } 
        } else { 
        //  F3DWLD.preview(true,false); 
            STATS.exportPivotDownloadStandard(F3DWLD.CONFIG.domainCode); 
          /*  validateSelection('preview pivot'); 
                buildOptionsMenu();//just UI option menu 
                collectAndQueryWDSPivot(false);*/ 
                
            if(FAOSTATNEWOLAP.firstCall==1){ validateSelection('preview pivot'); 
                buildOptionsMenu();//just UI option menu 
                collectAndQueryWDSPivot(false,true,outputFormat);} 
            else{ if(outputFormat=="csv") { 
                decolrowspanNEW(); 
            } else { 
                my_exportNew(); 
            }} 
          
            
          
            
          
        } 
    } 

    function validateSelection(caller) { 
        for (var key in Object.keys(F3DWLD.CONFIG.dsd)) { 
            if (F3DWLD.CONFIG.selectedValues[key].length < 1) { 
                var tabNames = Object.keys(F3DWLD.CONFIG.dsd[1 + parseInt(key)]); 
                var count = 0; 
                var s = ''; 
                for (var tabName in tabNames) { 
                    s += Object.keys(F3DWLD.CONFIG.dsd[1 + parseInt(key)])[tabName]; 
                    count++; 
                    if (count == tabNames.length - 1) 
                        s += ' or '; 
                    else if (count < tabNames.length - 1) 
                        s += ', '; 
                } 
                throw caller + ' | ' + $.i18n.prop('_no_selection_alert') + ' ' + s; 
            } 
        } 
    } 

    function showHideSummary() { 
        if ($('#collapsible-summary-box').css('display') == 'none') { 
            $('#collapsible-summary-box').css('display', 'block'); 
            $('#collapsible-summary-box').animate({opacity: 1}); 
            $('#collapsible-summary-id').removeClass('fa fa-angle-double-up').addClass('fa fa-angle-double-down'); 
        } else { 
            $('#collapsible-summary-box').animate( 
                {opacity: 0}, function() { 
                    $('#collapsible-summary-box').css('display', 'none'); 
                }); 
            $('#collapsible-summary-id').removeClass('fa fa-angle-double-down').addClass('fa fa-angle-double-up'); 
        } 
    } 

    function findSummaryName(gridName) { 
        var id = gridName.substring(1 + gridName.indexOf('_')); 
        id = id.replace('_2', '_1'); 
        id = id.replace('_3', '_1'); 
        $('#summary-' + id + '-box').css('display', 'block'); 
        $('#summary_tip').remove(); 
        return id + '-summary'; 
    } 

    function buildSummary() { 

        var s = ''; 

        s += '<div class="standard-title" id="output_options_labels" style="font-size:16px !important;">' + $.i18n.prop('_summary') + ' <i id="collapsible-summary-id" onclick="F3DWLD.showHideSummary();" class="fa fa-angle-double-down"></i></div>'; 

        s += '<div style="display: block;" id="collapsible-summary-box">'; 

        s += '<div id="summary_tip" style="color:#666"><i>'; 
        s += $.i18n.prop('_summary_help'); 
        s +='</i></div>' 

        for (var i = 0 ; i < Object.keys(F3DWLD.CONFIG.dsd).length ; i++) { 

            var column = F3DWLD.CONFIG.dsd[Object.keys(F3DWLD.CONFIG.dsd)[i]]; 
            var id = column[Object.keys(column)[0]].tabGroup + '_' + column[Object.keys(column)[0]].tabIndex; 
            s += '<div class="compare-summary">'; 
            s += '<div class="summary-box" id="summary-' + id + '-box" style="display: none;">'; 
            s += '<div class="compare-summary-title">' + column[Object.keys(column)[0]].tabName + '</div>'; 
            s += '<div id="' + id + '-summary" class="compare-summary-element"></div>'; 
            s += '<br>'; 
            s += '</div>'; 
            s += '</div>'; 

        } 

        s += '</div>'; 

        s += '</div>'; 

        return s; 

    } 

    function enhanceUIStructure() { 

        $('#download_button_menu').jqxMenu({ 
            autoOpen: true, 
            showTopLevelArrows: false, 
            autoCloseOnClick: true, 
            clickToOpen: false 
        }); 

        showBulkDownloads(); 
        $('#options-menu').jqxMenu({ 
            autoOpen: false, 
            showTopLevelArrows: true, 
            width: '150', 
            height: '30px', 
            autoCloseOnClick: false, 
            clickToOpen: true, 
            rtl: true 
        }); 
        $('#options-menu').jqxMenu('setItemOpenDirection', 'root', 'right', 'down'); 
        $('#flags_menu').jqxCheckBox({ 
            width: 120, 
            height: 25, 
            checked: true 
        }); 
         $('#codes_menu').jqxCheckBox({ width: 120, height: 25 });
        $('#units_menu').jqxCheckBox({ width: 120, height: 25, checked: true});
          $('#nested_by').jqxCheckBox({ width: 120, height: 25, checked: false});
        $('#export_csv').jqxRadioButton({ width: 120, height: 25, checked: true,groupName: 'type_export' });
        $('#export_xls').jqxRadioButton({ width: 120, height: 25 ,groupName: 'type_export'});
        $('#null_values_menu').jqxCheckBox({ width: 120, height: 25 });
        $('#comma_menu').jqxRadioButton({ width: 120, height: 25,  groupName: 'thousands'});
        $('#dot_menu').jqxRadioButton({ width: 120, height: 25, checked: true,groupName: 'thousands' });
        $('#enable_menu').jqxRadioButton({ width: 120, height: 25,  groupName: 'decimals' });
        $('#disable_menu').jqxRadioButton({ width: 120, height: 25, checked: true,groupName: 'decimals' });
        $('#increment').jqxNumberInput({ width: '100%', height: '25px', inputMode: 'simple', spinButtons: true, spinButtonsStep: 1, decimalDigits: 0, decimal: 2 });
        F3DWLD.CONFIG.wdsPayload.decimalSeparator = '.';
        F3DWLD.CONFIG.wdsPayload.thousandSeparator = ''; 
        $('#dot_menu').bind('change', function (event) {
            if (event.args.checked) {
                F3DWLD.CONFIG.wdsPayload.decimalSeparator = '.';
                 FAOSTATNEWOLAP.decimalSeparator= '.';
                if($('#enable_menu').jqxRadioButton('checked')){
                FAOSTATNEWOLAP.thousandSeparator= ',';}
            else{  FAOSTATNEWOLAP.decimalSeparator= ' ';}
                F3DWLD.CONFIG.wdsPayload.thousandSeparator = ',';
              
            } else {
                 FAOSTATNEWOLAP.decimalSeparator= ',';
                   if($('#enable_menu').jqxRadioButton('checked')){
               FAOSTATNEWOLAP.thousandSeparator='.'}
            else{  FAOSTATNEWOLAP.thousandSeparator=' '}
                F3DWLD.CONFIG.wdsPayload.decimalSeparator = ',';
                F3DWLD.CONFIG.wdsPayload.thousandSeparator = '.';
                 
            }
            preview(true,true);
        });
        $('#disable_menu').bind('change', function (event) {
            if (event.args.checked) {
                F3DWLD.CONFIG.wdsPayload.thousandSeparator = '';
                FAOSTATNEWOLAP.thousandSeparator=' ' ;
            } else {
                if( FAOSTATNEWOLAP.decimalSeparator=='.')
                {
                     F3DWLD.CONFIG.wdsPayload.thousandSeparator = ',';
                    FAOSTATNEWOLAP.thousandSeparator=","; 
                }
                else{ F3DWLD.CONFIG.wdsPayload.thousandSeparator = '.';
                    FAOSTATNEWOLAP.thousandSeparator="."; }
                
               
                
               /* FAOSTATNEWOLAP.decimalSeparator= '.';
                 F3DWLD.CONFIG.wdsPayload.decimalSeparator = '.';*/
            }
            preview(true,true);
        });
        F3DWLD.CONFIG.wdsPayload.showFlags = true; 
        F3DWLD.CONFIG.wdsPayload.showCodes = false; 
        F3DWLD.CONFIG.wdsPayload.showUnits = true; 
        F3DWLD.CONFIG.wdsPayload.showNullValues = false; 
        $("#flags_menu").bind('change', function (event) { 
            var checked = event.args.checked; 
            F3DWLD.CONFIG.wdsPayload.showFlags = checked; 
            preview(false,true); 
        }); 
        $("#codes_menu").bind('change', function (event) { 
            var checked = event.args.checked; 
            F3DWLD.CONFIG.wdsPayload.showCodes = checked; 
            preview(false,true); 
        }); 
        $("#units_menu").bind('change', function (event) { 
            var checked = event.args.checked; 
            F3DWLD.CONFIG.wdsPayload.showUnits = checked; 
            preview(false,true); 
        }); 
        $("#nested_by").bind('change', function (event) { 
            var checked = event.args.checked; 
            FAOSTATNEWOLAP.nestedby = checked; 
            preview(false,true); 
        }); 
        $("#null_values_menu").bind('change', function (event) { 
            var checked = event.args.checked; 
            F3DWLD.CONFIG.wdsPayload.showNullValues = checked; 
            preview(false,true); 
        }); 
        F3DWLD.CONFIG.wdsPayload.decimalNumbers = 2; 
        $('#increment').on('valuechanged', function (event) { 
            var value = event.args.value; 
            F3DWLD.CONFIG.wdsPayload.decimalNumbers = parseInt(value); 
            FAOSTATNEWOLAP.decimal=F3DWLD.CONFIG.wdsPayload.decimalNumbers 
            preview(true,false); 
        }); 
        enhanceUITabs(); 
        enhanceUIOptions(); 
        enhanceUIButtons(); 
        enhanceUIGrids(); 
    }; 

    function showBulkDownloads() { 

        $.ajax({ 

            type: 'GET', 
            url: F3DWLD.CONFIG.bulks_url + '/' + F3DWLD.CONFIG.datasource + '/' + F3DWLD.CONFIG.domainCode + '/' + F3DWLD.CONFIG.lang, 
            dataType: 'json', 

            success: function (response) { 

                var json = response; 
                if (typeof json == 'string') 
                    json = $.parseJSON(response); 

                var s = ''; 
                s += '<ul><li id="bulk-root" class="bulk-root-mainbtn"><i class="fa fa-archive"></i> ' + $.i18n.prop('_bulk_download_label') + ' <i class="fa fa-caret-down"></i><ul>'; 
                for (var i = 0 ; i < json.length ; i++) 
                    s += '<li><a onclick="F3DWLD.recordBulkDownload(\'' + json[i][2] + '\');" target="_blank" href="' + F3DWLD.CONFIG.bulks_root + json[i][2] + '">' + json[i][3] + '</a></li>'; 
                s += '</ul></li></ul>'; 
                document.getElementById('bulk-downloads-menu').innerHTML = s; 

                $('#bulk-downloads-menu').jqxMenu({ 
                    autoOpen: false, 
                    showTopLevelArrows: true, 
                    width: '350', 
                    height: '30px', 
                    autoCloseOnClick: false, 
                    autoSizeMainItems: true 
                }); 
                $('#bulk-downloads-menu').jqxMenu('setItemOpenDirection', 'bulk-root', 'left', 'down'); 

            }, 

            error: function (err, b, c) { 

            } 

        }); 

    } 

    function recordBulkDownload(filename) { 
        STATS.bulkDownload(filename, F3DWLD.CONFIG.domainCode); 
    } 

    function enhanceUIGrids() { 
        for (var listbox in F3DWLD.CONFIG.dsd) { 
            for (var tab in F3DWLD.CONFIG.dsd[listbox]) { 
                var codelist = tab.toLowerCase().replace(' ', ''); 
                var id = F3DWLD.CONFIG.dsd[listbox][tab].tabGroup + '_' + F3DWLD.CONFIG.dsd[listbox][tab].tabIndex; 
                enhanceUIGrid(listbox, F3DWLD.CONFIG.dsd[listbox][tab].tabIndex, 'grid_' + id); 
            } 
        } 
    }; 

    /** 
    * <code>gridName</code> is built with the following schema: 
    * 'grid_' + tabGroup + '_' + tab. This method extracts the 
    * tabGroup and returns the corresponding buffer hold by 
    * F3DWLD.CONFIG.selectedValues 
    * 
    * @param gridName 
    * @returns {*} 
    */ 
    function findBuffer(gridName) { 
        var idx = gridName.substring(1 + gridName.indexOf('_'), gridName.lastIndexOf('_')); 
        return F3DWLD.CONFIG.selectedValues[parseInt(idx) - 1]; 
    } 

    function clearBuffer(gridName) { 
        var idx = gridName.substring(1 + gridName.indexOf('_'), gridName.lastIndexOf('_')); 
        F3DWLD.CONFIG.selectedValues[parseInt(idx) - 1] = []; 
    } 

    function getGridValues(tableCode, map) { 
        $('#' + tableCode).find('option:selected').each(function(k, v) { 
            var tmp = {}; 
            tmp.code = $(v).data('faostat'); 
            tmp.label = $(v).data('label'); 
            tmp.type = $(v).data('type'); 
            map.push(tmp); 
        }); 
    }; 

    function selectAllForSummary(gridID) { 

        var values = []; 

        $('#' + gridID + '_select').find('option').each(function(k, v) { 
            var tmp = {}; 
            tmp.code = $(v).data('faostat'); 
            tmp.label = $(v).data('label'); 
            tmp.type = $(v).data('type'); 
            tmp.tab = $(v).data('tab'); 
            tmp.listbox = $(v).data('listbox'); 
            values.push(tmp); 
        }); 

        $('#' + gridID + '_select option').prop('selected', true); 
        addItemToSummary(gridID, values, true); 

    }; 

    function clearAllForSummary(gridID) { 
        var summary = findSummaryName(gridID); 
        $('#' + summary).empty(); 
        clearBuffer(gridID); 
        var tmp = summary.substring(0, summary.indexOf('-')); 
        $('#summary-' + tmp + '-box').css('display', 'none'); 
        $('#' + gridID + '_select option').prop('selected', false); 
    }; 

    function addToSummary(gridID, summaryID) { 

        $('#output_area').empty(); 
        $('#options_menu_box').css('display', 'none'); 
        $('#preview_hr').css('display', 'none'); 
        var values = []; 

        $('#' + gridID + '_select').find('option:selected').each(function(k, v) { 
            var tmp = {}; 
            tmp.code = $(v).data('faostat'); 
            tmp.label = $(v).data('label'); 
            tmp.type = $(v).data('type'); 
            tmp.tab = $(v).data('tab'); 
            tmp.listbox = $(v).data('listbox'); 
            values.push(tmp); 
        }); 

        addItemToSummary(gridID, values, false); 

    } 

    function addItemToSummary(gridID, values, selectAll) { 

        var summaryID = findSummaryName(gridID); 

        try { 

            if (values.length == null) { 

                $('#' + summaryID).append("<div class='summary-item-groupdomain'>" + values.label + "</div>") ; 

            } else { 

                var buffer = findBuffer(gridID); 

                if (selectAll) { 

                    buffer.push.apply(buffer, values); 

                    var gridIdx = gridID.substring(1 + gridID.indexOf('_'), gridID.lastIndexOf('_')); 
                    var selectedTab = $('#tab_' + gridIdx).jqxTabs('val'); 
                    var tabName = $('#tab_' + gridIdx).jqxTabs('getTitleAt', selectedTab); 
                    var lbl = tabName + ' ' + $.i18n.prop('_all'); 

                    var subfix = '_ALL'; 
                    var itemID = gridID + "_" + selectedTab + subfix; 
                    var code = gridID + "_" + selectedTab + subfix; 
                    var type = 'ALL'; 
                    var title = $.i18n.prop('_click_to_remove'); 

                    $('#' + summaryID).append("<div data-type='" + type + "' id='" + itemID + "' title='" + lbl + "' class='summary-item' code='" + code + "'>" + lbl + "</div>"); 
                    $('#' + itemID).powerTip({placement: 's'}); 

                    /** Remove item from summary. */ 
                    var idx = gridID.substring(1 + gridID.indexOf('_'), gridID.lastIndexOf('_')); 
                    $('#' + itemID).on('click', function (e) { 
                        $('#' + e.target.id).remove(); 
                        $.each(buffer, function (k, v) { 
                            if (v != null && v.tab == (1 + parseInt(selectedTab)) && v.listbox == gridIdx) 
                                F3DWLD.CONFIG.selectedValues[parseInt(idx) - 1] = F3DWLD.CONFIG.selectedValues[parseInt(idx) - 1].slice(k, 1); 
                        }); 
                    }); 

                } else { 

                for (var i = 0; i < values.length; i++) { 

                    if (!contains(buffer, values[i])) { 

                        buffer.push(values[i]); 

                        var subfix = (values[i].type == '>') ? '_LIST' : '_TOTAL'; 
                        var itemID = gridID + "_" + values[i].code + subfix; 
                        var code = values[i].code; 
                        var type = values[i].type; 
                        var title = $.i18n.prop('_click_to_remove'); 

                        $('#' + summaryID).append("<div data-type='" + type + "' id='" + itemID + "' title='" + title + "' class='summary-item' code='" + code + "'>" + values[i].label + "</div>"); 
                        $('#' + itemID).powerTip({placement: 's'}); 

                        /** Remove item from summary. */ 
                        $('#' + itemID).on('click', function (e) { 

                                $('#output_area').empty(); 
                                $('#options_menu_box').css('display', 'none'); 
                                $('#preview_hr').css('display', 'none'); 

                            var id = extractID(e.target.id); 
                            $.each(buffer, function(k, v) { 
                                if (v != null && v.code == id) 
                                    buffer.splice(k, 1); 
                            }); 
                            $('#' + e.target.id).remove(); 
                            $('#' + gridID).find('option:selected').each(function(k, v) { 
                                var code = $(v).data('faostat'); 
                                if (code == id) 
                                    $(v).prop('selected', false); 
                            }); 

                        }); 

                    } 

                } 

            } 

            } 

        } catch(err) { 

        } 

    }; 

    function extractID(s) { 
        var id = ''; 
        var idx_start = null; 
        var idx_end = null; 
        for (var i = s.length; i >= 0; i--) { 
            if (s[i] == '_' && idx_start == null) { 
                idx_start = i; 
                continue; 
            } if (s[i] == '_' && idx_start != null && idx_end == null) { 
                idx_end = i; 
                break; 
            } 
        } 
        id = s.substring(1 + idx_end, idx_start); 
        return id; 
    }; 

    function contains(buffer, obj) { 
        for (var i = 0 ; i < buffer.length ; i++) 
            if (buffer[i].code == obj.code && buffer[i].type == obj.type) 
                return true; 
        return false; 
    } 

    function enhanceUIGrid(listBoxNo, tabNo, gridCode) { 

        $.ajax({ 

            url: F3DWLD.CONFIG.codes_url + '/' + F3DWLD.CONFIG.datasource + '/' + F3DWLD.CONFIG.domainCode + '/' + listBoxNo + '/' + tabNo + '/' + F3DWLD.CONFIG.lang, 
            type: 'GET', 
            dataType: 'json', 

            success: function (response) { 

                var json = response; 
                if (typeof(json) == 'string') 
                    json = $.parseJSON(response); 

                var select = ''; 
                var lbl = null; 
                select += '<select id="' + gridCode + '_select" multiple="multiple" style="width: 100%; height: 100%; border: 0px;" onchange="F3DWLD.addToSummary(\'' + gridCode + '\', \'countries-summary\');">'; 

                for (var i = 0; i < json.length; i++) { 
                    lbl = json[i][1]; 
                    var option = '<option class="grid-element" data-listbox="' + listBoxNo + '" data-tab="' + tabNo + '" data-faostat="' + json[i][0] + '" data-label="' + lbl + '" data-type="' + json[i][3] + '">' + lbl + '</option>'; 
                    select += option; 
                } 

                select += '</select>'; 
                document.getElementById(gridCode).innerHTML = select; 

            }, 

            error: function (err, b, c) { 
                if (listBoxNo == 1 && tabNo == 2) { 
                    $('#tabCountries').jqxTabs('removeAt', 1); 
                    $('#tabCountries_dst').jqxTabs('removeAt', 1); 
                } else if (listBoxNo == 1 && tabNo == 3) { 
                    $('#tabCountries').jqxTabs('removeAt', 2); 
                    $('#tabCountries_dst').jqxTabs('removeAt', 1); 
                } else if (listBoxNo == 2 && tabNo == 2) { 
                    $('#tabItems').jqxTabs('removeAt', 1); 
                } else if (listBoxNo == 2 && tabNo == 1) { 
                    if (F3DWLD.CONFIG.domainCode != 'FS') 
                        $('#tabItems').jqxTabs('removeAt', 0); 
                } 
            } 

        }); 

    }; 

    function enhanceUIButtons() { 

        $("#radio_table").jqxRadioButton({ checked: true }); 
        $("#radio_pivot").jqxRadioButton({ checked: false }); 

        $("#radio_table").on('change', function (event) { 
            if (event.args.checked) { 
                preview(true,false); 
            } else { 
                preview(true,false); 
                $('#preview_hr').css('display', 'block'); 
            } 
            $('#output_area').empty(); 
            $('#options_menu_box').css('display', 'none'); 
            $('#preview_hr').css('display', 'none'); 
        }); 
        $("#radio_pivot").on('change', function (event) { 
            $('#output_area').empty(); 
            $('#options_menu_box').css('display', 'none'); 
            $('#preview_hr').css('display', 'none'); 
        }); 

        /* Select/Deselect all buttons. */ 
        for (var i = 1 ; i <= Object.keys(F3DWLD.CONFIG.dsd).length ; i++) { 
            $('#buttonSelectAll_' + i + '_1').append($.i18n.prop('_selectAll')); 
            $('#buttonSelectAll_' + i + '_1-text').addClass('btnText'); 
            $('#buttonDeSelectAll_' + i + '_1-text').append($.i18n.prop('_clearSelection')); 
            $('#buttonDeSelectAll_' + i + '_1-text').addClass('btnText'); 
        } 

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
                createTable(true, false); 
            } 
        }); 

        /* Preview button. */ 
        $('#buttonViewTables').bind('click', function() { 
            $('#buttonExportToCSV')[0].style.display="inline-block"; 
            $('#testinline').empty(); 
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem'); 
            if (item.value=="pivot") { 
                getTabSelection(); 
                getGridsValues(); 
                try { 
                    document.getElementById('testinline').className="visi2"; 
                } catch(err) { 

                } 
                window.FAOSTATDownloadSelectorsClassic.falseclick(); 
            } else { 
                createTable(true, true); 
                STATS.showTableDownloadStandard(F3DWLD.CONFIG.domainCode); 
            } 
        }); 

    }; 

    function enhanceUITabs() { 
        $('.faostat-download-tab').jqxTabs({ 
            width: '352', 
            height: '130', 
            position: 'top', 
            animationType: 'fade', 
            selectionTracker: 'checked', 
            theme: F3DWLD.CONFIG.theme 
        }); 
        $('#tab_1').on('tabclick', function (event) { 
            var idx = 1 + parseInt(event.args.item); 
            $('#buttonSelectAll_usp_GetAreaList1').attr('onclick', ''); 
            $('#buttonSelectAll_usp_GetAreaList1').unbind('click'); 
            $('#buttonSelectAll_usp_GetAreaList1').click(function() { 
                selectAllForSummary('grid_usp_GetAreaList' + idx + '_1'); 
            }); 
        }); 
        $('#tab_2').on('tabclick', function (event) { 
            var idx = 1 + parseInt(event.args.item); 
            $('#buttonSelectAll_usp_GetItemList1').attr('onclick', ''); 
            $('#buttonSelectAll_usp_GetItemList1').unbind('click'); 
            $('#buttonSelectAll_usp_GetItemList1').click(function() { 
                selectAllForSummary('grid_usp_GetItemList' + idx + '_1'); 
            }); 
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
            document.getElementById("option").value=document.getElementById("option").value.replace(/nbDec:(d)/g,"nbDec:"+nbDec); 
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
        $('#options_show_flags').bind('change', function (event) { 
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
            } catch(e) { 

            } 
        }); 
        $('#options_show_null_values').jqxCheckBox({ 
            checked : true, 
            theme: F3DWLD.CONFIG.theme 
        }); 
        $('#options_show_flags').jqxCheckBox({ 
            checked : true, 
            theme: F3DWLD.CONFIG.theme 
        }); 
        if (F3DWLD.CONFIG.domainCode == 'FS') { 
            $('#options_show_flags').jqxCheckBox('disable'); 
        } else { 
            $('#options_show_flags').jqxCheckBox('enable'); 
        } 
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

    return { 
        CONFIG              :  CONFIG, 
        buildF3DWLD        :  buildF3DWLD, 
        addToSummary        :  addToSummary, 
        preview            :  preview, 
        download            :  download, 
        selectAllForSummary :  selectAllForSummary, 
        clearAllForSummary  :  clearAllForSummary, 
        showHideSummary    :  showHideSummary, 
        recordBulkDownload  :  recordBulkDownload 
    }; 

})(); 