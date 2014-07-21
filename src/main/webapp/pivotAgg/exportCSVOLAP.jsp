<%
//response.reset();

String sql=(String)request.getParameter("sql");
String json=(String)request.getParameter("json");
String option=(String)request.getParameter("option");

%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.9.1/jquery-1.9.1.min.js'></script>
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.0.9/jquery.i18n.properties-min.js'></script>
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min.js'></script>
        <!--script src="/faostat-download-js/js/I18N.js"></script-->
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.0.9/jquery.i18n.properties-min.js'></script>
        <script type='text/javascript' src='/faostat-download-js/pivotAgg/countriesAgg.js'></script>
        <script type='text/javascript'>
            FAOSTATDownload = {};


            FAOSTATOLAP2 = {};
            FAOSTATOLAP2.displayOption =
                    {
                        showUnit: 0,
                        showCode: 0,
                        showFlag: 0,
                        overwrite: true
                    };

            FAOSTATOLAP2.options =
                    {
                        derivedAttributes: {
                            "Area": function(mp)
                            {
                                if (FAOSTATNEWOLAP.showCodes)
                                {
                                    return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"] + "%%" + mp["Country Code"];
                                }
                                else {
                                    return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                                }
                            },
                            "Element": function(mp)
                            {
                                if (FAOSTATNEWOLAP.showCodes)
                                {
                                    return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"] + "%%" + mp["Element Code"];
                                }
                                else {
                                    return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"];
                                }
                            },
                            "Item": function(mp)
                            {
                                if (FAOSTATNEWOLAP.showCodes)
                                {
                                    return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"] + "%%" + mp["Item Code"];
                                }
                                else {
                                    return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                                }
                            }


                        },
                        rows: ["Area", "Element", "Item"],
                        cols: ["Year"],
                        vals: ["Value", "Unit", "Flag"],
                        linkedAttributes: []
                    };
            FAOSTATOLAP2.optionsTM = {
                derivedAttributes: {
                    "Reporter": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<table class=\"innerCol\"><th>" + mp["ReporterName"] + "</th><th>" + mp["ReporterCode"] + "</th></table>";
                        }
                        else {
                            return mp["ReporterName"];
                        }
                    },
                    "Partner": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<table class=\"innerCol\"><th>" + mp["PartnerName"] + "</th><th>" + mp["PartnerCode"] + "</th></table>";
                        }
                        else {
                            return mp["PartnerName"];
                        }
                    },
                    "Element": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<table  class=\"innerCol\"><th>" + mp["ElementName"] + "</th><th>" + mp["ElementCode"] + "</th></table>";
                        }
                        else {
                            return mp["ElementName"];
                        }
                    },
                    "Item": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<table  class=\"innerCol\"><th>" + mp["ItemName"] + "</th><th>" + mp["ItemCode"] + "</th></table>";
                        }
                        else {
                            return mp["ItemName"];
                        }
                    }
                },
                //"Continent","SubContinent"
                //,"Item","Item Code","Country","Country Code","Element","Element Code"
                // hiddenAttributes:["NoRecords","RecordOrder","Domain Code","Domain"],
                rows: ["Reporter", "Partner", "Item", "Element"],
                cols: ["Year"],
                vals: ["Value", "Unit", "Flag"],
                linkedAttributes: []


                        /*hiddenAttributes:["DomainCode","ItemGroupCode","ItemCode","ItemNameE","ElementCode"],*/

                        /*
                         rows:["ReporterName","PartnerName","ItemName","ElementName"],
                         cols: ["Year"],
                         vals:["Value","Unit","Flag"]
                         */
            };


        </script>


        <script type='text/javascript' src='/faostat-download-js/js/F3DWLD.js'></script>
        <script type='text/javascript' src='/faostat-download-js/pivotAgg/pivot.js'></script>




        <script>
FAOSTATNEWOLAP.limitPivotPreview = 10;
            //  FAOSTATNEWOLAP.limitPivotPreview = 50000;
            var opt =<%=option%>;
            FAOSTATNEWOLAP.decimal = opt.decimal;
            FAOSTATNEWOLAP.thousandSeparator = opt.thousandSeparator;
            FAOSTATNEWOLAP.decimalSeparator = opt.decimalSeparator;
            FAOSTATNEWOLAP.showUnits = opt.showUnits;
            FAOSTATNEWOLAP.showCodes = opt.showCodes;
            FAOSTATNEWOLAP.showFlags = opt.showFlags;
            var mesOptionsPivot = <%=json%>;
            function init()
            {
                var test2 = {
                    datasource: "faostat",
                    thousandSeparator: ',',
                    decimalSeparator: '.',
                    decimalNumbers: '2',
                    json: JSON.stringify(
                            {"limit": null,
                                "query": "<%=sql%>",
                                "frequency": "NONE"}),
                    cssFilename: '',
                    valueIndex: 5};


                $.ajax({
                    type: 'POST',
                    url: F3DWLD.CONFIG.data_url + "/table/json",
                    data: test2,
                    success: function(response_1) {

                        var response2_2 = [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
                                "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order", "Var4Order"]];



                        $.i18n.properties({
                            name: 'I18N',
                            path: F3DWLD.CONFIG.prefix + 'I18N/',
                            mode: 'both',
                            language: mesOptionsPivot.lang
                        });
                        mesOptionsPivot.derivedAttributes = FAOSTATOLAP2.options.derivedAttributes;
                        if (!mesOptionsPivot.rows) {
                            mesOptionsPivot.rows = FAOSTATOLAP2.options.rows;
                        }
                        if (!mesOptionsPivot.cols) {
                            mesOptionsPivot.cols = FAOSTATOLAP2.options.cols;
                        }
                        if (mesOptionsPivot.domain == 'TM' || mesOptionsPivot.domain == 'FT') {

                            response2_2 = [["n1", "n2",
                                    "Domain", "DomainName",
                                    "ReporterCode", "ReporterName",
                                    "PartnerCode", "PartnerName",
                                    "ItemCode", "ItemName",
                                    "ElementCode", "ElementName",
                                    "Year", "YearCode",
                                    "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]];

                            if (!mesOptionsPivot.rows || mesOptionsPivot.rows == null) {
                                mesOptionsPivot.rows = FAOSTATOLAP2.optionsTM.rows;
                            }
                            if (!mesOptionsPivot.cols || mesOptionsPivot.cols == null) {
                                mesOptionsPivot.cols = FAOSTATOLAP2.optionsTM.cols;
                            }

                            /*   if(mesOptionsPivot.lang=="fr"){response2_2 = [ [
                             "NoRecords",
                             "RecordOrder",
                             "Code Domaine",
                             "Domaine",
                             "Code Pays Déclarant",
                             "Pays Déclarants",
                             "Code Pays Partenaire",
                             "Pays Partenaires",
                             "Code Élément",
                             "Élément",
                             "Code Produit",
                             "Produit",
                             "Code Année",
                             "Année",
                             "Unité",
                             "Valeur",
                             "Symbole",
                             "Description du Symbole",
                             "Var1Order",
                             "Var2Order",
                             "Var3Order",
                             "Var4Order",
                             "Var5Order"
                             ]];}
                             else if(mesOptionsPivot.lang=="es"){response2_2 = [ [
                             "NoRecords",
                             "RecordOrder",
                             "Código Ámbito",
                             "Ámbito",
                             "Código País Declarant",
                             "Países Declarantes",
                             "Código País Socio",
                             "Países Socios",
                             "Código Elemento",
                             "Elemento",
                             "Código Producto",
                             "Producto",
                             "Código Año",
                             "Año",
                             "Unidad",
                             "Valor",
                             "Símbolo",
                             "Descripción del Símbolo",
                             "Var1Order",
                             "Var2Order",
                             "Var3Order",
                             "Var4Order",
                             "Var5Order"
                             ]];}*/

                            mesOptionsPivot.derivedAttributes = FAOSTATOLAP2.optionsTM.derivedAttributes;
                        }

                        response_1 = response2_2.concat(response_1);
                        /* if(response_1.length==FAOSTATNEWOLAP.pivotlimit) 
                         {console.log('preview limit reach, please go to the bulkdownload section to get all the data')}
                         */


                        //FAOSTATNEWOLAP.originalData = response_1;
//							$("#testinline").pivotUI(response_1,mesOptionsPivot ,true);
                        /*var derivers = $.pivotUtilities.derivers;
                         var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
                         */
                     
                      if(opt.fileFormat == "csv")
                     { 
                        $("#testinline").pivotUI(response_1, mesOptionsPivot, true);
                    }else{FAOSTATNEWOLAP.limitPivotPreview=500;
                        $("#testinline").pivotUICSV(response_1, mesOptionsPivot, true);}

                        $("#options_menu_box").css("display", "block");
                        var header = $(".pvtAxisLabel");
                        for (var i = 0; i < header.length; i++) {
                            header[i].innerHTML = header[i].innerHTML.replace("_", "");
                        }

                        var newFlag = "";
                        for (var i in FAOSTATNEWOLAP.flags) {
                            if (newFlag != "") {
                                newFlag += ":";
                            }
                            newFlag += "'" + i + "'";
                        }
                        if (newFlag == "") {
                            newFlag = "''";
                        }
                        //$(".pvtAxisLabel")[$(".pvtAxisLabel").length - 1].setAttribute("colspan", 2);
                        $.get("http://faostat3.fao.org/faostat.olap.ws/rest/GetFlags/" + F3DWLD.CONFIG.lang + "/" + newFlag, function(data) {
                            data = data.replace("localhost:8080/", "faostat3.fao.org/");
                            $("#testinline").append(data);

                        }).always(function() {
                           //console.log(opt.fileFormat)
                            if (opt.fileFormat == "csv")
                            {
                                decolrowspanNEW();
                            }
                            else {
                               // my_exportNew()
                            }
                             setTimeout(function(){window.close()}, 3000);
                        });


                    }
                });
            }

        </script>
        <title>export Page</title>
    </head>
    <body onload="javascript:init();">
    <center><img src="/faostat-download-js/pivotAgg/Preload.gif" /></center>
    <div id="testinline" style="display:none"></div>
    <form id="csvDataForm" action="/faostat-download-js/pivotAgg/json.jsp" method="POST">
        <input id="csvData" type="hidden" name="data" value="" />
    </form>
    <form id="formExcel" method="post" action="http://faostat3.fao.org/faostat.olap.ws/rest/ExcelCreator">

        <input id="excelData" type="hidden" value="" name="data" />
        <input type="hidden" value="xls" name="type" />

    </form>
</body>
</html>
