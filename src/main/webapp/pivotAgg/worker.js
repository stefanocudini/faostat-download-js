
importScripts(/*'http://fenixapps.fao.org/repository/js/jquery/1.9.1/jquery-1.9.1.min.js',
'http://fenixapps.fao.org/repository/js/jquery/1.0.9/jquery.i18n.properties-min.js',
'http://fenixapps.fao.org/repository/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min.js',
'http://fenixapps.fao.org/repository/js/jquery/1.0.9/jquery.i18n.properties-min.js',
'/faostat-download-js/pivotAgg/jquery-1.8.3.min.js',
'/faostat-download-js/js/I18N.js',
'/faostat-download-js/pivotAgg/jquery-ui-1.9.2.custom.min.js',*/

'/faostat-download-js/pivotAgg/countriesAgg.js',
'/faostat-download-js/js/F3DWLD.js',
'/faostat-download-js/pivotAgg/pivot.js'
); 


            
           
           
            
            
onmessage = function(event) {
    console.log(event.data)
    /*
            FAOSTATNEWOLAP.limitPivotPreview = 10;
            //  FAOSTATNEWOLAP.limitPivotPreview = 50000;
            var opt =JSON.parse(event.data.option);
            FAOSTATNEWOLAP.decimal = opt.decimal;
            FAOSTATNEWOLAP.thousandSeparator = opt.thousandSeparator;
            FAOSTATNEWOLAP.decimalSeparator = opt.decimalSeparator;
            FAOSTATNEWOLAP.showUnits = opt.showUnits;
            FAOSTATNEWOLAP.showCodes = opt.showCodes;
            FAOSTATNEWOLAP.showFlags = opt.showFlags;
            
            var mesOptionsPivot =JSON.parse(event.data.json);
   var test2 = {
                    datasource: "faostat",
                    thousandSeparator: ',',
                    decimalSeparator: '.',
                    decimalNumbers: '2',
                    json: JSON.stringify(
                            {"limit": null,
                                "query": event.data.sql,
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

                          

                            mesOptionsPivot.derivedAttributes = FAOSTATOLAP2.optionsTM.derivedAttributes;
                        }

                        response_1 = response2_2.concat(response_1);
                       
                     
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
                               // decolrowspanNEW();
                            }
                            else {
                               // my_exportNew()
                            }
                            // setTimeout(function(){window.close()}, 3000);
                        });


                    }
                });
   
    
    */
    
    
    postMessage({id:"5","mess":"yes"});
};