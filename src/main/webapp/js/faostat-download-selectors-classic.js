var testAjax;
if (!window.FAOSTATDownloadSelectorsClassic) {
    var monXML="";
    function createDSDXML(arr,nom)
    {
        monXML+="<dimension name=\""+nom+"\" nb=\"1\">";
        for(var i=0;i<arr.length;i++)
        {
            monXML+="<dim><leaf>"+arr[i].code+"</leaf>"+
            "<Id>"+arr[i].code+"</Id>"+
            "<E>"+arr[i].label+"</E>"+
            "</dim>";
        }
        monXML+="</dimension>";
    }
    function getNestedBy(){
        return $('#nestedBy').sortable('toArray').slice(1).join(",");
    }
    window.FAOSTATDownloadSelectorsClassic = {
        theme : "energyblue",
        source : [],
        /** base URL for WDS, default: fenixapps.fao.org */
        baseurl : "",
        /** datasource for WDS, default: faostat */
        datasource : "",
        /** language for the tree, default: en */
        language : "",
        gridItemsFrom : "",
        gridItemsTo : "",
        gridElementsFrom : "",
        gridElementsTo : "",
        gridCountriesFrom : "",
        gridCountriesTo : "",
        selectAll : function(gridCode, select) {
            var rows = $('#' + gridCode).jqxGrid('getrows');
            for (var i = 0 ; i < rows.length ; i++) {
                if (select) {
                    $('#' + gridCode).jqxGrid('selectrow', i);
                } 
                else {
                    $('#' + gridCode).jqxGrid('unselectrow', i);
                }
            }
        },
        falseclick:function () {
            $('#OLAP_IFRAME').css('display', 'inline');
            document.getElementById('output_area').innerHTML='';
            //WIZARD
            if(FAOSTATDownload.domainCode=="FB"){
                document.getElementById("n").value=4;
                document.getElementById("d").value="ElementCode#AreaCode#ItemCode#Year";
            }
            else if(FAOSTATDownload.domainCode=="FT" ||FAOSTATDownload.domainCode=="TM")    {
                document.getElementById('id').value="T0M";
                document.getElementById("n").value=5;
                document.getElementById("d").value="ElementCode#ReporterAreaCode#ItemCode#Year#PartnerAreaCode";
            }
            else{
                document.getElementById('id').value="Ware0house";
                document.getElementById("n").value=4;
                document.getElementById("d").value="ElementListCode#AreaCode#ItemCode#Year";
            }
            if (FAOSTATDownload.showWizard) {
                monXML="";
                var mesItems="";
                var mesItemsXML="{name:'ItemCode','nb':'1','val':{";
                if (FAOSTATDownloadWizard.summary_items_map.length == 1 &&
                    FAOSTATDownloadWizard.summary_items_map[0].code == 'all') {
                    var gridCode = FAOSTATDownloadWizard.getListCode('items'); 
                    var rows = $('#' + gridCode).jqxGrid('getrows');
                    for (var i = 0 ; i < rows.length ; i++) {
                        var code = rows[i].code;
                        var label = rows[i].label;
                        if(mesItems=="") {
                            mesItems = code;
                        }
                        else {
                            mesItems += "," + code;
                        }
                        if(i!=0) {
                            mesItemsXML+=",";
                        }
                        mesItemsXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                } else {
                    for (var i = 0 ; i < FAOSTATDownloadWizard.summary_items_map.length ; i++) {
                        var code = FAOSTATDownloadWizard.summary_items_map[i].code;
                        var label = FAOSTATDownloadWizard.summary_items_map[i].label;
                        if(mesItems=="") {
                            mesItems = code;
                        }
                        else {
                            mesItems += "," + code;
                        }
                        if(i!=0) {
                            mesItemsXML+=",";
                        }
                        mesItemsXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                }
                mesItemsXML+="}}";
                var mesElements="";
                var mesElementsXML="{name:'ElementCode','nb':'1','val':{";
                if (FAOSTATDownloadWizard.summary_elements_map.length == 1 &&
                    FAOSTATDownloadWizard.summary_elements_map[0].code == 'all') {
                    var gridCode = FAOSTATDownloadWizard.getListCode('elements'); 
                    var rows = $('#' + gridCode).jqxGrid('getrows');
                    for (var i = 0 ; i < rows.length ; i++) {
                        var code = rows[i].code;
                        var label = rows[i].label;
                        if(mesElements=="") {
                            mesElements = code;
                        } 
                        else {
                            mesElements += "," + code;
                        }
                        if(i!=0) {
                            mesElementsXML+=",";
                        }
                        mesElementsXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                } else {
                    for (var i = 0 ; i < FAOSTATDownloadWizard.summary_elements_map.length ; i++) {
                        var code = FAOSTATDownloadWizard.summary_elements_map[i].code;
                        var label = FAOSTATDownloadWizard.summary_elements_map[i].label;
                        if(mesElements=="") {
                            mesElements = code;
                        } 
                        else {
                            mesElements += "," + code;
                        }
                        if(i!=0) {
                            mesElementsXML+=",";
                        }
                        mesElementsXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                }
                mesElementsXML+="}}";
                var mesCountries="";
                var mesCountriesXML="{'name':'AreaCode','nb':'1','val':{";
                if (FAOSTATDownloadWizard.summary_countries_map.length == 1 &&
                    FAOSTATDownloadWizard.summary_countries_map[0].code == 'all') {
                    var gridCode = FAOSTATDownloadWizard.getListCode('countries'); 
                    var rows = $('#' + gridCode).jqxGrid('getrows');
                    for (var i = 0 ; i < rows.length ; i++) {
                        var code = rows[i].code;
                        var label = rows[i].label;
                        if(mesCountries=="") {
                            mesCountries = code;
                        }
                        else {
                            mesCountries += "," + code;
                        }
                        if(i!=0) {
                            mesCountriesXML+=",";
                        }
                        mesCountriesXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                } else {
                    for (var i = 0 ; i < FAOSTATDownloadWizard.summary_countries_map.length ; i++) {
                        var code = FAOSTATDownloadWizard.summary_countries_map[i].code;
                        var label = FAOSTATDownloadWizard.summary_countries_map[i].label;
                        if(mesCountries=="") {
                            mesCountries = code;
                        }
                        else {
                            mesCountries += "," + code;
                        }
                        if(i!=0) {
                            mesCountriesXML+=",";
                        }
                        mesCountriesXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                }
                mesCountriesXML+="}}";
                var mesYears="";
                var mesYearsXML="{'name':'Year',nb:'1','val':{";
                if (FAOSTATDownloadWizard.summary_years_map.length == 1 &&
                    FAOSTATDownloadWizard.summary_years_map[0].code == 'all') {
                    var gridCode = FAOSTATDownloadWizard.getListCode('years'); 
                    var rows = $('#' + gridCode).jqxGrid('getrows');
                    for (var i = 0 ; i < rows.length ; i++) {
                        var code = rows[i].code;
                        var label = rows[i].label;
                        if(mesYears=="") {
                            mesYears = code;
                        } else {
                            mesYears += "," + code;
                        }
                        if(i!=0) {
                            mesYearsXML+=",";
                        }
                        mesYearsXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                } else {
                    for (var i = 0 ; i < FAOSTATDownloadWizard.summary_years_map.length ; i++) {
                        var code = FAOSTATDownloadWizard.summary_years_map[i].code;
                        var label = FAOSTATDownloadWizard.summary_years_map[i].label;
                        if(mesYears=="") {
                            mesYears = code;
                        } else {
                            mesYears += "," + code;
                        }
                        if(i!=0) {
                            mesYearsXML+=",";
                        }
                        mesYearsXML += "'" + code + "':{'E':'" + label.replace(/'/g," ") + "'}";
                    }
                }
                mesYearsXML+="}}";
                document.getElementById('xml').value="{["+mesElementsXML+","+mesCountriesXML+","+mesItemsXML+","+mesYearsXML+"]}";
                document.getElementById('v').value=mesElements+"#"+mesCountries+"#"+mesItems+"#"+mesYears;
                document.getElementById('domain').value=FAOSTATDownload.domainCode;
                var test={};
                test.n=document.getElementById('n').value;
                test.d=document.getElementById('d').value;
                test.v=document.getElementById('v').value;                
                test.o=document.getElementById('o').value;                
                test.id=document.getElementById('id').value;
                test.domain=document.getElementById('domain').value;
                test.a=document.getElementById('a').value;
                test.c=document.getElementById('c').value;                
                test.option=document.getElementById('option').value;                
                test.xml=document.getElementById('xml').value;
                $.ajax({
                    type : 'POST',
                    url:"/faostat.olap.ws/rest/OLAPCreator/",
                    data:test,
                    success:function(response){
                        alert(response)
                    }
                });
            }
            else {
                monXML="";
                var mesItems="";
                var bItem=0;
                var mesItemsXML="{name:'ItemCode','nb':'1','val':{";
                var arrItem=$('#gridItemsAggregated').jqxGrid('selectedrowindexes');
                var listItem="";
                var mySelecteds=F3DWLD.CONFIG.selectedValues;
                
                if (FAOSTATDownload.domainCode != 'GY') {
                    /*switch (FAOSTATDownload.itemsTabSelectedIndex) {
                        case 0:
                            if ($('#gridItems').jqxGrid('selectedrowindexes') != null) {*/
                                for(i=0;i<mySelecteds.items.length;i++) {
                                 arr=mySelecteds.items[i];
                                if(arr.type=="list")
                                {
                                    if(listItem==""){
                                        listItem="[{code:'"+arr.code+"',type:'list'}";
                                    }
                                    else{
                                        listItem+=",{code:'"+arr.code+"',type:'list'}";
                                    }
                                }else{
                                   
                                    
                                    if(mesItems=="") {
                                        mesItems=arr.code;
                                    } else {
                                        mesItems+=","+arr.code;
                                    }
                                    if(bItem!=0) {
                                        mesItemsXML+=",";
                                    }else{
                                        bItem=1;
                                    }
                                    mesItemsXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
                                
                                }
                                }
                            }/*
                            break;
                        case 1:
                            for(i=0;arrItem!=null &&i<arrItem.length;i++) {
                                if($('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).type=="list")
                                {
                                    if(listItem==""){
                                        listItem="[{code:'"+$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code+"',type:'list'}";
                                    }
                                    else{
                                        listItem+=",{code:'"+$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code+"',type:'list'}";
                                    }
                                }else{
                                    arr=$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]);
                                    if(mesItems=="") {
                                        mesItems=$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code;
                                    }
                                    else {
                                        mesItems+=","+$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code;
                                    }
                                    if(bItem!=0) {
                                        mesItemsXML+=",";
                                    }else{
                                        bItem=1;
                                    }
                                    mesItemsXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
                                }
                            }
                            break;
                        case 2:
                    
                            break;
                    }*/
                    
                /*} else {
                    for(i=0;arrItem!=null &&i<arrItem.length;i++) {
                        if($('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).type=="list")
                        {
                            if(listItem=="")
                            {
                                listItem="[{code:'"+$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code+"',type:'list'}";
                            }
                            else{
                                listItem+=",{code:'"+$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code+"',type:'list'}";
                            }
                        }else{
                            arr=$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]);
                            if(mesItems=="") {
                                mesItems=$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code;
                            }
                            else {
                                mesItems+=","+$('#gridItemsAggregated').jqxGrid('getrowdata',$('#gridItemsAggregated').jqxGrid('selectedrowindexes')[i]).code;
                            }
                            if(bItem!=0) {
                                mesItemsXML+=",";
                            }
                            else{
                                bItem=1;
                            }
                            mesItemsXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
                        }
                    }
                }*/
                if(listItem!=""){
                    listItem+="]";
                }
                else{
                    listItem="[]";
                }
                var mesElements="";
                var mesElementsXML="{name:'ElementCode','nb':'1','val':{";
                
                //for(i=0;i<$('#gridElements').jqxGrid('selectedrowindexes').length;i++) {
                for(i=0;i<mySelecteds.elements.length;i++) {
                   // arr=$('#gridElements').jqxGrid('getrowdata',$('#gridElements').jqxGrid('selectedrowindexes')[i]);
                   arr=mySelecteds.elements[i];
                    if(mesElements=="") {
                        //mesElements=$('#gridElements').jqxGrid('getrowdata',$('#gridElements').jqxGrid('selectedrowindexes')[i]).code;
                        mesElements=arr.code;
                    } 
                    else {
                        //mesElements+=","+$('#gridElements').jqxGrid('getrowdata',$('#gridElements').jqxGrid('selectedrowindexes')[i]).code;
                    mesElements+=","+arr.code;
                    
                    }
                    if(i!=0) {
                        mesElementsXML+=",";
                    }
                    mesElementsXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
                }
                mesElementsXML+="}}";
                var mesCountries="";
                var bCountry=0;
                var mesCountriesXML="{'name':'AreaCode','nb':'1','val':{";
                var listCountry="";
//                console.log(FAOSTATDownload.countriesTabSelectedIndex);
                /*switch (FAOSTATDownload.countriesTabSelectedIndex) {
                    case 0:*/
                      //  for(i=0;i<$('#gridCountries').jqxGrid('selectedrowindexes').length;i++) {
  for(i=0;i<mySelecteds.countries.length;i++) {
                                                
                    arr=mySelecteds.countries[i];   //arr=$('#gridCountries').jqxGrid('getrowdata',$('#gridCountries').jqxGrid('selectedrowindexes')[i]);
                    if(arr.type=="list"){
                                if(listCountry==""){
                                    listCountry="[{code:'"+arr.code+"',type:'list'}";
                                }
                                else{
                                    listCountry+=",{code:'"+arr.code+"',type:'list'}";
                                }
                            }
                            else{
                            if(mesCountries=="") {
                                mesCountries=arr.code;
                            } else {
                                mesCountries+=","+arr.code;
                            }
                            if(bCountry!=0) {
                                mesCountriesXML+=",";
                            }else{
                                bCountry=1;
                            }
                            mesCountriesXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
                        }
                        }
                        
                        /*
                        break;
                    case 1:
                        for(i=0;i<$('#gridRegions').jqxGrid('selectedrowindexes').length;i++) {
                            arr=$('#gridRegions').jqxGrid('getrowdata',$('#gridRegions').jqxGrid('selectedrowindexes')[i]);
                            if(arr.type=="list"){
                                if(listCountry==""){
                                    listCountry="[{code:'"+arr.code+"',type:'list'}";
                                }
                                else{
                                    listCountry+=",{code:'"+arr.code+"',type:'list'}";
                                }
                            }
                            else{
                                if(mesCountries=="") {
                                    mesCountries=$('#gridRegions').jqxGrid('getrowdata',$('#gridRegions').jqxGrid('selectedrowindexes')[i]).code;
                                }
                                else {
                                    mesCountries+=","+$('#gridRegions').jqxGrid('getrowdata',$('#gridRegions').jqxGrid('selectedrowindexes')[i]).code;
                                }
                                if(bCountry!=0) {
                                    mesCountriesXML+=",";
                                }else{
                                    bCountry=1;
                                }
                                mesCountriesXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," 
                                ")+"'}";
                            }
                        }
                        break;
                    case 2:
                        for(i=0;i<$('#gridSpecialGroups').jqxGrid('selectedrowindexes').length;i++) {
                            arr=$('#gridSpecialGroups').jqxGrid('getrowdata',$('#gridSpecialGroups').jqxGrid('selectedrowindexes')[i]);
                            if(arr.type=="list")
                            {
                                if(listCountry==""){
                                    listCountry="[{code:'"+arr.code+"',type:'list'}";
                                }
                                else{
                                    listCountry+=",{code:'"+arr.code+"',type:'list'}";
                                }
                            }
                            else{
                                if(mesCountries=="") {
                                    mesCountries=$('#gridSpecialGroups').jqxGrid('getrowdata',$('#gridSpecialGroups').jqxGrid('selectedrowindexes')[i]).code;
                                } else {
                                    mesCountries+=","+$('#gridSpecialGroups').jqxGrid('getrowdata',$('#gridSpecialGroups').jqxGrid('selectedrowindexes')[i]).code;
                                }
                                if(bCountry!=0) {
                                    mesCountriesXML+=",";
                                }else{
                                    bCountry=1;
                                }
                                mesCountriesXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
                            }
                        }
                        break;
                }*/
                if(listCountry!="" || listCountry == null){
                    listCountry+="]";
                }else{
                    listCountry="[]";
                }
                var data = {};
                data.datasource = FAOSTATDownload.datasource;
                data.domainCode = FAOSTATDownload.domainCode;
                data.language = FAOSTATDownload.language;
                data.countries = listCountry;
                data.items = listItem;
                
                $.ajax({
                    type : 'POST',
                    url : 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/list/post',
                    data : data,
                    success : function(response) {  
                        if(response.constructor === String){
                            response = jQuery.parseJSON(response);
                        };
                        testAjax=response[0];
                        for(var i=0;i<testAjax.length;i++)
                        {
                            testAjax2=testAjax[i];
                            if(mesCountries=="") {
                                mesCountries=testAjax2.code;
                            } 
                            else {
                                mesCountries+=","+testAjax2.code;
                            }
                            if(bCountry!=0) {
                                mesCountriesXML+=",";
                            }else{
                                bCountry=1;
                            }
                            mesCountriesXML+="'"+testAjax2.code+"':{'E':'"+testAjax2.label.replace(/'/g," ")+"'}";
                        }
                        mesCountriesXML+="}}";
                        testAjax=response[1];
                        for(var i=0;i<testAjax.length;i++)
                        {
                            testAjax2=testAjax[i];
                            if(mesItems=="") {
                                mesItems=testAjax2.code;
                            } 
                            else {
                                mesItems+=","+testAjax2.code;
                            }
                            if(bItem!=0) {
                                mesItemsXML+=",";
                            }else{
                                bItem=1;
                            }
                            mesItemsXML+="'"+testAjax2.code+"':{'E':'"+testAjax2.label.replace(/'/g," ")+"'}";
                        }
                        mesItemsXML+="}}";
                        var mesYears="";
                        var mesYearsXML="{'name':'Year',nb:'1','val':{";
                        for(i=0;i<mySelecteds.years.length;i++) {
                            arr=mySelecteds.years[i];
                            if(mesYears=="") {
                                mesYears=arr.code;
                            } else {
                                mesYears+=","+arr.code;
                            }
                            if(i!=0) {
                                mesYearsXML+=",";
                            }
                            
                            mesYearsXML+="'"+arr.code+"':{'E':'"+arr.label.toString().replace(/'/g," ")+"'}";
                        }
                        mesYearsXML+="}}";
                        document.getElementById('xml').value="{["+mesElementsXML+","+mesCountriesXML+","+mesItemsXML+","+mesYearsXML+"]}";
                        document.getElementById('v').value=mesElements+"#"+mesCountries+"#"+mesItems+"#"+mesYears;
                        if(FAOSTATDownload.domainCode=="FB" )
                        {
                            document.getElementById('option').value=document.getElementById('option').value.replace("nestedby:0","nestedby:1");
                            document.getElementById('a').value=document.getElementById('a').value="0#0#0#0";
                            document.getElementById('c').value=document.getElementById('c').value="1,2#0,3";
                        }
                        else  if(FAOSTATDownload.domainCode=="FT" || FAOSTATDownload.domainCode=="TM")
                        {
                            document.getElementById('option').value=document.getElementById('option').value.replace("nestedby:1","nestedby:0");
                            document.getElementById('v').value=document.getElementById('v').value+="#*";
                            document.getElementById('a').value=document.getElementById('a').value="0#0#0#0#0";
                            document.getElementById('c').value=document.getElementById('c').value="0,1,2#3,4";
                        }
                        else{
                            document.getElementById('option').value=document.getElementById('option').value.replace("nestedby:0","nestedby:1");
                            document.getElementById('a').value=document.getElementById('a').value="0#0#0#0";
                            document.getElementById('c').value=document.getElementById('c').value="0,1,2#3";
                        }
                        document.getElementById('domain').value=FAOSTATDownload.domainCode;
                        if(mesElements=="" || mesCountries=="" || mesItems=="" ||mesYears=="" )
                        {
                            alert("Missing parameters");
                        }
                        else{
                            FAOSTATOLAP.mesParams={};
                            FAOSTATOLAP.mesParams.n=document.getElementById('n').value;
                            FAOSTATOLAP.mesParams.d=document.getElementById('d').value;
                            FAOSTATOLAP.mesParams.v=document.getElementById('v').value;                
                            FAOSTATOLAP.mesParams.o=document.getElementById('o').value;                
                            FAOSTATOLAP.mesParams.id=document.getElementById('id').value;
                            FAOSTATOLAP.mesParams.domain=document.getElementById('domain').value;
                            FAOSTATOLAP.mesParams.a=document.getElementById('a').value;
                            FAOSTATOLAP.mesParams.c=document.getElementById('c').value;                
                            FAOSTATOLAP.mesParams.option=document.getElementById('option').value;                
                            FAOSTATOLAP.mesParams.xml=document.getElementById('xml').value;
                            
                            $.ajax({
                                type : 'GET',
                                url:"/faostat-download-js/olapalone.html",
                                data:test,
                                success:function(response){
                                    STATS.showPivotDownloadStandard();
                                    var    ccr=response;
                                    $("#testinline").html(ccr);
                                    init0();
                                }
                            });
                        }
                    },
                    error : function(err, b, c) {}  
                });
            }  
        },
        initOLAP : function(){
            $(".demo").jqxNavigationBar({
                width: "100%",
                height: 500,
                expandMode: 'multiple', 
                theme: FAOSTATDownload.theme/* ,
                selectedIndex: -1*/
            });
            $( "#agg, #col, #row" ).sortable({
                connectWith: ".connectedSortable",
                cancel: ".ui-state-disabled",
                update:function(){
                    var reg=new RegExp("sel_", "g");
                    var myCols = $('#col').sortable('toArray').slice(1).join(","); // r?cup?ration des donn?es ? envoyer
                    var myNestedBy=$('#nestedBy').sortable('toArray').slice(1).join(",");
                    if(myNestedBy.length>0){
                        myCols=myNestedBy+","+myCols;
                    }
                    var myRows = $('#row').sortable('toArray').slice(1).join(","); // r?cup?ration des donn?es ? envoyer
                    order=myRows.replace(reg,"")+"#"+myCols.replace(reg,"");
                    //order=order;
                    document.getElementById('c').value=order;
                    if(OLAP.window.length==1){
                        OLAP.window.document.getElementById('c').value=order;
                        OLAP.window.DEMO.pivot.cb();
                    }
                }
            }).disableSelection();
            $( "#nestedBy" ).sortable({
                connectWith: ".connectedSortable",
                cancel: ".ui-state-disabled",
                update:function(){
                    var reg=new RegExp("sel_", "g");
                    var myCols = $('#col').sortable('toArray').slice(1).join(","); // recuperation des donnees a envoyer
                    var myNestedBy=$('#nestedBy').sortable('toArray').slice(1).join(",");
                    if(myNestedBy.length>0){
                        myCols=myNestedBy+","+myCols;
                    }
                    var myRows = $('#row').sortable('toArray').slice(1).join(","); //  recuperation des donnees a envoyer
                    order=myRows.replace(reg,"")+"#"+myCols.replace(reg,"");
                    order=order;
                    document.getElementById('c').value=order;
                    if(OLAP.window.length==1){
                        OLAP.window.document.getElementById('c').value=order;
                        window.FAOSTATDownloadSelectorsClassic.falseclick();
                    }
                }
            }).disableSelection();
            /**$("#bulkDownload2").jqxButton({
                width: '75', 
                height: '25', 
                theme: FAOSTATDownload.theme 
            }); **/
            $("#bulkDownload2").bind("click", window.FAOSTATDownloadSelectorsClassic.falseclick);
        },
        initUI : function() {
            FAOSTATDownload.initOutputOptions();
            document.getElementById('selection_mode').innerHTML = I18N.translate('_selection_mode');
            document.getElementById('wizard_output_type').innerHTML = I18N.translate('_outputType');
            document.getElementById('wizard_thousand_separator').innerHTML = I18N.translate('_thousandSeparator');
            document.getElementById('wizard_decimal_separator').innerHTML = I18N.translate('_decimalSeparator');
            document.getElementById('wizard_decimal_numbers').innerHTML = I18N.translate('_decimalNumbers');
            document.getElementById('show_flags').innerHTML = I18N.translate('_show_flags_label');
            document.getElementById('show_codes').innerHTML = I18N.translate('_show_codes_label');
            document.getElementById('show_units').innerHTML = I18N.translate('_show_units_label');
            document.getElementById('show_null_values').innerHTML = I18N.translate('_show_null_values_label');
            FAOSTATDownloadSelectorsClassic.initOLAP();
            if ($.url().param('lang') != null) {
            //FAOSTATDownload.language = $.url().param('lang');
            } else {
            //FAOSTATDownload.language = 'E';
            }

            if (FAOSTATDownload.linkCodelists == true) {}
            else {

                $(".faostat-download-tab").jqxTabs({ 
                    width: '352',
                    height: '200', 
                    position: 'top',
                    animationType: 'fade',
                    selectionTracker: 'checked',
                    theme: FAOSTATDownload.theme
                });
                
                $("#tabCountries").bind('tabclick', function (event) { 
                    FAOSTATDownload.countriesTabSelectedIndex = event.args.item;
                }); 
                
                $("#tabItems").bind('tabclick', function (event) { 
                    FAOSTATDownload.itemsTabSelectedIndex = event.args.item;
                });
                
                if (FAOSTATDownload.domainCode == 'GY') {
                    $('#tabItems').jqxTabs('removeAt', 0); 
                    $('#tabItems').jqxTabs('setTitleAt', 0, $.i18n.prop('_items')); 
                }
                
                /** $(".faostat-download-button").jqxButton({ 
                    width: '100%', 
                    height: '25', 
                    theme: FAOSTATDownload.theme 
                });**/
                
                $.getJSON(FAOSTATDownload.prefix + 'config/faostat-download-configuration.json', function(data) {
                    FAOSTATDownloadSelectorsClassic.populateGrid("countries", "gridCountries", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("regions", "gridRegions", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("specialgroups", "gridSpecialGroups", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("items", "gridItems", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("itemsaggregated", "gridItemsAggregated", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("elements", "gridElements", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("years", "gridYears", FAOSTATDownload.domainCode); 
                });
            }
        },
        translateUI : function() {
            document.getElementById('li_countries').innerHTML = I18N.translate('_countries');
            document.getElementById('li_elements').innerHTML = I18N.translate('_elements');
            try {
                document.getElementById('li_items').innerHTML = I18N.translate('_items');
            } catch (err) {}
            try {
                document.getElementById('li_items_aggregated').innerHTML = I18N.translate('_items_aggregated');
            } catch (err) {}
            try {
                document.getElementById('li_regions').innerHTML = I18N.translate('_regions');
            } catch (err) {}
            try {
                document.getElementById('li_special_groups').innerHTML = I18N.translate('_special_groups');
            } catch (err) { }
            document.getElementById('li_years').innerHTML = I18N.translate('_years');
            document.getElementById('output_options_labels').innerHTML = I18N.translate('_outputOptions');

        $('#buttonSelectAllCountries-text').append(I18N.translate('_selectAll'));
        $('#buttonSelectAllCountries-text').addClass('btnText');

            $('#buttonDeSelectAllCountries-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllCountries-text').addClass('btnText');

        $('#buttonSelectAllElements-text').append(I18N.translate('_selectAll'));
        $('#buttonSelectAllElements-text').addClass('btnText');

            $('#buttonDeSelectAllElements-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllElements-text').addClass('btnText');

        $('#buttonSelectAllItems-text').append(I18N.translate('_selectAll'));
            $('#buttonSelectAllItems-text').addClass('btnText');

            $('#buttonDeSelectAllItems-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllItems-text').addClass('btnText');

            $('#buttonSelectAllYears-text').append(I18N.translate('_selectAll'));
            $('#buttonSelectAllYears-text').addClass('btnText');

            $('#buttonDeSelectAllYears-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllYears-text').addClass('btnText');

        },
        populateGrid : function(codingSystem, gridCode, domainCode) {
            var yearTemp=[{
                "code":"2000",
                "label":"2000"
            },{
                "code":"2001",
                "label":"2001"
            },{
                "code":"2002",
                "label":"2002"
            },{
                "code":"2003",
                "label":"2003"
            }];
            var monUrl='http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + FAOSTATDownload.datasource + '/' + domainCode + '/' + FAOSTATDownload.language;
            if (domainCode != null && domainCode.length > 0) {
                $.ajax({
                    type: 'GET',
                    url: monUrl,
                    dataType: 'json',
                    success : function(response) {
                        FAOSTATDownloadSelectorsClassic.createGrid(codingSystem, gridCode, response);
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
            } else {
                FAOSTATDownloadSelectorsClassic.createGrid(codingSystem, gridCode, null);
            }
        },

        createGrid : function(codingSystem, gridCode, response) {
//            var data = new Array();
//            if (response != null) {
//                if (codingSystem == 'regions' || codingSystem == 'specialgroups' || codingSystem == 'itemsaggregated') {
//                    if (FAOSTATDownload.domainCode != 'GY') {
//                        for (var i = 0 ; i < response.length ; i++) {
//                            var row = {};
//                            switch (response[i].type) {
//                                case 'list':
//                                    row["label"] = response[i].label + ' ' + $.i18n.prop('_list');
//                                    break;
//                                case 'total':
//                                    row["label"] = response[i].label + ' ' + $.i18n.prop('_total');
//                                    break;
//                            }
//                            row["code"] = response[i].code;
//                            row["type"] = response[i].type;
//                            data[i] = row;
//                        }
//                    } else {
//                        var counter = 0;
//                        for (var i = 0 ; i < response.length ; i++) {
//                            var row = {};
//                            switch (response[i].type) {
//                                case 'list':
//                                    if (codingSystem == 'regions' || codingSystem == 'specialgroups') {
//                                        row["label"] = response[i].label + ' ' + $.i18n.prop('_list');
//                                    } else {
//                                        row["label"] = response[i].label;
//                                    }
//                                    break;
//                                case 'total':
//                                    row["label"] = response[i].label + ' ' + $.i18n.prop('_total');
//                                    break;
//                            }
//                            row["code"] = response[i].code;
//                            row["type"] = response[i].type;
//                            if (codingSystem != 'itemsaggregated')
//                                data[counter++] = row;
//                            if (codingSystem == 'itemsaggregated' && response[i].type != 'total')
//                                data[counter++] = row;
//                        }
//
//                    }
//                } else {
//                    for (var i = 0 ; i < response.length ; i++) {
//                        var row = {};
//                        if (codingSystem == 'elements') {
//                            row["label"] = response[i].label + ' (' + response[i].unit + ')';
//                        } else {
//                            row["label"] = response[i].label;
//                        }
//                        row["code"] = response[i].code;
//                        data[i] = row;
//                    }
//                }
//            }
//            var source = {
//                localdata: data,
//                datatype: "array"
//            };
//            var dataAdapter = new $.jqx.dataAdapter(source);
//            $("#" + gridCode).jqxGrid({
//                width: '351',
//                height: 168,
//                source: dataAdapter,
//                columnsresize: true,
//                showheader: false,
//                selectionmode: 'multiplerowsextended',
//                columns: [{
//                    text: I18N.translate('_label'),
//                    datafield: 'label'
//                }],
//                theme: FAOSTATDownload.theme
//            });
//            $("#" + gridCode).on('rowselect', function (event) {
//                var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
//                if (item.value!="pivot") {
//                    $('#buttonExportToCSV')[0].style.display="inline-block";
//                } else{
//                    document.getElementById('buttonExportToCSV').style.display="none";
//                  $('#testinline').empty();
//                }
//            });
//            var targetCodingSystem = FAOSTATDownloadSelectorsClassic.getCodingSystemFromGridCode(gridCode);
//            $("#buttonSelectAll" + targetCodingSystem).bind('click', function() {
//                FAOSTATDownloadSelectorsClassic.selectAll(gridCode, true);
//            });
//            $("#buttonDeSelectAll" + targetCodingSystem).bind('click', function() {
//                FAOSTATDownloadSelectorsClassic.selectAll(gridCode, false);
//            });

            var select = '';
            var lbl = null;
            select += '<select id="' + gridCode + '_select" multiple="multiple" style="width: 100%; height: 100%; border: 0px;">';
            for (var i = 0 ; i < response.length ; i++) {
                if (codingSystem == 'regions' || codingSystem == 'specialgroups' || codingSystem == 'itemsaggregated') {
                    if (FAOSTATDownload.domainCode != 'GY') {
                        switch (response[i].type) {
                            case 'list': lbl = response[i].label + ' ' + $.i18n.prop('_list'); break;
                            case 'total': lbl = response[i].label + ' ' + $.i18n.prop('_total'); break;
                        }
                    } else {
                        switch (response[i].type) {
                            case 'list':
                                if (codingSystem == 'regions' || codingSystem == 'specialgroups') {
                                    lbl = response[i].label + ' ' + $.i18n.prop('_list');
                                } else {
                                    lbl = response[i].label;
                                }
                                break;
                            case 'total': lbl = response[i].label + ' ' + $.i18n.prop('_total'); break;
                        }
                    }
                } else {
                    if (codingSystem == 'elements') {
                        lbl = response[i].label + ' (' + response[i].unit + ')';
                    } else {
                        lbl = response[i].label;
                    }
                }
                select += '<option class="grid-element" data-faostat="' + response[i].code + '" data-label="' + lbl + '" data-type="' + response[i].type + '">' + lbl + '</option>';
            }
            select += '</select>';
            document.getElementById(gridCode).innerHTML = select;

        },

        getCodingSystemFromGridCode : function(gridCode) {
            return gridCode.substring("grid".length);
        }
        ,
        enableUI : function(enabled) {
            $(".faostat-download-tab").jqxTabs({
                disabled: enabled
            });
            $(".faostat-download-button").jqxButton({
                disabled: enabled
            });
        }
    };

}