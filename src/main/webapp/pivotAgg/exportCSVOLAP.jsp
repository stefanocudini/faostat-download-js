<%
//response.reset();

String sql=(String)request.getParameter("sql");
String json=(String)request.getParameter("json");

%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
         <script type='text/javascript' src='/faostat-download-js/js/F3DWLD.js'></script>
         <script type='text/javascript' src='/faostat-download-js/pivotAgg/pivot.js'></script>
           <script type='text/javascript' src='/faostat-download-js/pivotAgg/configuration.js'></script>
       
           <script>
               function init()
               {
                   
                var test2 = {
        datasource: F3DWLD.CONFIG.datasource,
        thousandSeparator: ',',
        decimalSeparator: '.',
        decimalNumbers: '2',
        json: JSON.stringify(
                {"limit": null,
                    "query":  <%=sql%>,
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
            console.log("response_1.length");
            console.log(response_1.length);

            /* if(response_1.length==FAOSTATNEWOLAP.pivotlimit) 
             {console.log('preview limit reach, please go to the bulkdownload section to get all the data')}
             */
            var response2TM = [["Domain", "ReporterCode", "ReporterName", "PartnerCode", "PartnerName", "ItemCode", "ItemName", "ElementCode", "ElementName", "Year", "Unit", "Flag", "Value"]];
            var mesOptionsPivot = FAOSTATOLAP2.options;
            if (F3DWLD.CONFIG.domainCode == "TM" || F3DWLD.CONFIG.domainCode == "FT")
            {
                response2_2 = response2TM;
                mesOptionsPivot = FAOSTATOLAP2.optionsTM
            }

            response_1 = response2_2.concat(response_1);
            /*for(i in response_1){
             if(Array.isArray(response_1[i])){response2_2.push(response_1[i]);}
             }
             */
            mesOptionsPivot.vals = ["Value"];
            if (F3DWLD.CONFIG.wdsPayload.showUnits)
            {
                mesOptionsPivot.vals.push("Unit")
            }
            if (F3DWLD.CONFIG.wdsPayload.showFlags)
            {
                mesOptionsPivot.vals.push("Flag")
            }

            //FAOSTATNEWOLAP.originalData = response_1;
//							$("#testinline").pivotUI(response_1,mesOptionsPivot ,true);

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
            $(".pvtAxisLabel")[$(".pvtAxisLabel").length - 1].setAttribute("colspan", 2);
            $.get("http://faostat3.fao.org/faostat.olap.ws/rest/GetFlags/" + F3DWLD.CONFIG.lang + "/" + newFlag, function(data) {
                data = data.replace("localhost:8080/", "faostat3.fao.org/");
                $("#testinline").append(data);
                 decolrowspanNEW();
              
            });
            
           
        }
    });
               
               
               
               
               }
               </script>
        <title>JSP Page</title>
    </head>
    <body onload="init()"> <%=sql%>
        <div id="testinline"></div>
    </body>
</html>
