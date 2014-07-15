<%
//response.reset();

String sql=(String)request.getParameter("sql");
String json=(String)request.getParameter("json");
String option=(String)request.getParameter("option");

%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.9.1/jquery-1.9.1.min.js'></script>
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.0.9/jquery.i18n.properties-min.js'></script>
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min.js'></script>

        <script type='text/javascript' src='/faostat-download-js/pivotAgg/countriesAgg.js'></script>
        <script type='text/javascript'>

            FAOSTATOLAP2 = {};
            FAOSTATOLAP2.displayOption =
                    {
                        showUnit: 0,
                        showCode: 0,
                        showFlag: 0,
                        overwrite: true
                    }

            FAOSTATOLAP2.options =
                    {
                        derivedAttributes: {
                            "Area": function(mp)
                            {
                                if (FAOSTATNEWOLAP.showCodes)
                                {
                                    return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"] + "%%" + mp["Country Code"] ;
                                }
                                else {
                                    return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                                }
                            },
                            "Element": function(mp)
                            {
                                if (FAOSTATNEWOLAP.showCodes)
                                {
                                    return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"] + "%%" + mp["Element Code"] ;
                                }
                                else {
                                    return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"];
                                }
                            },
                            "Item": function(mp)
                            {
                                if (FAOSTATNEWOLAP.showCodes)
                                {
                                    return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"] + "%%" + mp["Item Code"] ;
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
          


        </script>


        <script type='text/javascript' src='/faostat-download-js/js/F3DWLD.js'></script>
        <script type='text/javascript' src='/faostat-download-js/pivotAgg/pivot.js'></script>




        <script>
              var opt=<%=option%>;
              FAOSTATNEWOLAP.decimal=opt.decimal;
               FAOSTATNEWOLAP.thousandSeparator=opt.thousandSeparator;
                FAOSTATNEWOLAP.decimalSeparator=opt.decimalSeparator;
                FAOSTATNEWOLAP.showUnits=opt.showUnits;
               FAOSTATNEWOLAP.showCodes=opt.showCodes;
                FAOSTATNEWOLAP.showFlags=opt.showFlags;
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

var mesOptionsPivot = <%=json%>;
if(mesOptionsPivot.domain=='TM' || mesOptionsPivot.domain=='FTP' ){ 
    
         response2_2 = [["NoRecords","RecordOrder","Domain Code","Domain","Reporter Country Code","Reporter Countries",
                 "Partner Country Code","Partner Countries","Element Code","Element","Item Code","Item_","Year Code","Year","Unit","Value","Flag","Flag Description","Var1Order","Var2Order","Var3Order","Var4Order","Var5Order"]];
         mesOptionsPivot.rows=["Reporter Countries", "Reporter Country Code","Partner Countries","Partner Country Code","Element","Element Code","Item","Item Code"]    ;    
     mesOptionsPivot.cols=["Year"];
        FAOSTATOLAP2.options.derivedAttributes= {
/*
"Reporter":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table class=\"innerCol\"><th>"+mp["Reporter Countries_"]+"</th><th>"+mp["Reporter Country Code"]+"</th></table>";}
else{return mp["Reporter Countries"];}},
    "Partner":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table class=\"innerCol\"><th>"+mp["Partner Countries_"]+"</th><th>"+mp["Partner Country Code"]+"</th></table>";}
else{return mp["Partner Countries"];}},
"Element":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table  class=\"innerCol\"><th>"+mp["Element_"]+"</th><th>"+mp["Element Code"]+"</th></table>";}
else{return mp["Element"];}},
"Item":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table  class=\"innerCol\"><th>"+mp["Item_"]+"</th><th>"+mp["Item Code"]+"</th></table>";}
else{return mp["Item"];}}*/
/*
"Continent": function(mp) {
try{return "User selection in "+countryAgg[mp["AreaCode"]][1] ;}
catch(er){return "_"+mp["AreaName"]+"++"}
},
"SubContinent":function(mp) {
try{return "User selection in "+countryAgg[mp["AreaCode"]][2] ;}
catch(er){return "_"+mp["AreaName"]+"++";}
}*/
 };
    }
else{ }
                       
           response_1 = response2_2.concat(response_1);            
                        /* if(response_1.length==FAOSTATNEWOLAP.pivotlimit) 
                         {console.log('preview limit reach, please go to the bulkdownload section to get all the data')}
                         */
                         
                        mesOptionsPivot.derivedAttributes = FAOSTATOLAP2.options.derivedAttributes
                        //FAOSTATNEWOLAP.originalData = response_1;
//							$("#testinline").pivotUI(response_1,mesOptionsPivot ,true);
                        /*var derivers = $.pivotUtilities.derivers;
                         var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
                         */
                         console.log(mesOptionsPivot);
                          console.log(response_1);
                        $("#testinline").pivotUI(response_1, mesOptionsPivot, true);

                        $("#options_menu_box").css("display", "block");
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
                            decolrowspanNEW();
                           // window.close();
                        });


                    }
                });
            }
        </script>
        <title>export Page</title>
    </head>
    <body onload="javascript:init();">
<center><img src="/faostat-download-js/pivotAgg/Preload.gif" /></center>
        <div id="testinline" style="display:block"></div>
    </body>
</html>
