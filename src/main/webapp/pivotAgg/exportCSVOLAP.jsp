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
        <script type='text/javascript' src="/faostat-download-js/pivotAgg/configuration.js">
           


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
            F3DWLD.CONFIG.wdsPayload.showCodes = opt.showCodes;
            FAOSTATNEWOLAP.showFlags = opt.showFlags;
            var mesOptionsPivotSend = <%=json%>;
             $.i18n.properties({
                            name: 'I18N',
                            path: F3DWLD.CONFIG.prefix + 'I18N/',
                            mode: 'both',
                            language: mesOptionsPivotSend.lang
                        });
                        
                        
                                       
                        
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
               
var t=retConfig(mesOptionsPivotSend.domain,mesOptionsPivotSend.lang);
                              
          response2_2=t[0];
          mesOptionsPivot=t[1];
          
            response_1 = response2_2.concat(response_1);
            
             FAOSTATNEWOLAP.firstCall = 0;
            
       //    for(i in mesOptionsPivotSend){mesOptionsPivot[i]=mesOptionsPivotSend[i]}
                        if (mesOptionsPivotSend.rows) {
                            mesOptionsPivot.rows = mesOptionsPivotSend.rows;
                        }
                        if (mesOptionsPivotSend.cols) {
                            mesOptionsPivot.cols = mesOptionsPivotSend.cols;
                        }
                     

                     
                      if(opt.fileFormat == "csv")
                     { 
                         
                        // console.log(mesOptionsPivot);
                        $("#testinline").pivotUI(response_1, mesOptionsPivot, true);
                    }else{
                        FAOSTATNEWOLAP.limitPivotPreview=500;
                        $("#testinline").pivotUICSV(response_1, mesOptionsPivot, true);
                    }

                        $("#options_menu_box").css("display", "block");
                        /*var header = $(".pvtAxisLabel");
                        for (var i = 0; i < header.length; i++) {
                            header[i].innerHTML = header[i].innerHTML.replace("_", "");
                        }
*/
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
