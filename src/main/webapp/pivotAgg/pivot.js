var test;


FAOSTATNEWOLAP={};
FAOSTATNEWOLAP.pivotlimit=10000;
FAOSTATNEWOLAP.PP={PP1:[],PP2:[],PP3:[]};//para&meters for the exclstoredprocedure : to be change to avoir SQL injection
FAOSTATNEWOLAP.excelpayload={};
FAOSTATNEWOLAP.schema={};
FAOSTATNEWOLAP.nestedby=0;
FAOSTATNEWOLAP.viewVals=0;
FAOSTATNEWOLAP.decimal=2;
FAOSTATNEWOLAP.firstCall=1;
FAOSTATNEWOLAP.flags={};
FAOSTATNEWOLAP.internalData={};
FAOSTATNEWOLAP.originalData=[];
FAOSTATNEWOLAP.thousandSeparator=" ";
FAOSTATNEWOLAP.decimalSeparator=".";
FAOSTATNEWOLAP.traduction={"Var1":"Country",
            "Var2":"Element","Var3":"Item","Var4":"Year"};
function ExtractCode(arr,separateur)
{ret=[];
    for(i=0;i<arr.length;i++)
        {
            if(arr[i].type===">"){ret.push(separateur+arr[i].code+">"+separateur);}
            else{ ret.push(separateur+arr[i].code+separateur);}
    }
    return ret;
}

function oldSchool(maLimit)
{
   
    
   //FAOSTATOLAP2.options.rows=["ElementName","AreaName","ItemName"];
    
                        DimCountry=[];
			for(i in F3DWLD.CONFIG.selectedValues.countries)
			{DimCountry.push(F3DWLD.CONFIG.selectedValues.countries[i].code);}
			DimItem=[];
			for(i in F3DWLD.CONFIG.selectedValues.items)
			{DimItem.push(F3DWLD.CONFIG.selectedValues.items[i].code);}
			DimElement=[];
			for(i in F3DWLD.CONFIG.selectedValues.elements)
			{DimElement.push(F3DWLD.CONFIG.selectedValues.elements[i].code);}
			DimYear=[];
			for(i in F3DWLD.CONFIG.selectedValues.years)
			{DimYear.push(F3DWLD.CONFIG.selectedValues.years[i].code);}
			
			
			
						
			
/*
if(maLimit===-1){maLimit=""}
else{maLimit="TOP "+maLimit;}
var selectFinal="select "+maLimit+" D.DomainCode as Domain,"+
        " D.AreaCode as AreaCode,A.VarName"+F3DWLD.CONFIG.lang+" as AreaName,"+
        "D.ItemCode as ItemCode,I.VarName"+F3DWLD.CONFIG.lang+" as ItemName,"+
        "D.ElementCode,E.VarName"+F3DWLD.CONFIG.lang+","+
        "D.Year as Year,"+
        "D.ElementCode as Unit,"+
        "D.Flag as Flag,D.Value as Value"+
        " from Data D "+
"inner join DomainVarListVar A on A.VarCode=D.AreaCode and A.DomainCode=D.DomainCode and A.VarType='area' "+
"inner join DomainVarListVar I on I.VarCode=D.ItemCode and I.DomainCode=D.DomainCode and I.VarType='item' "+
"inner join DomainVarListVar E on E.VarCode=D.ElementCode and E.DomainCode=D.DomainCode and E.VarType='element' "+
"where  "+
"D.DomainCode='"+F3DWLD.CONFIG.domainCode+"' "+
"AND Year in ("+ExtractCode(F3DWLD.CONFIG.selectedValues[3],"")+") "+
"AND E.VarListCode in ("+ExtractCode(F3DWLD.CONFIG.selectedValues[1],"'")+") "+
"AND A.VarListCode in ("+ExtractCode(F3DWLD.CONFIG.selectedValues[0],"'")+") "+
"AND I.VarListCode in ("+ExtractCode(F3DWLD.CONFIG.selectedValues[2],"'")+")";*/




var selectFinal="EXECUTE Warehouse.dbo.usp_GetDataTESTP "+
" @DomainCode = '"+F3DWLD.CONFIG.domainCode+"',  "+
" @lang = '"+F3DWLD.CONFIG.lang+"',  "+
" @List1Codes = '( "+ExtractCode(F3DWLD.CONFIG.selectedValues[0],"''")+"   )', "+
"  @List2Codes = '("+ExtractCode(F3DWLD.CONFIG.selectedValues[1],"''")+")',  "+
" @List3Codes = '("+ExtractCode(F3DWLD.CONFIG.selectedValues[2],"''")+")', "+
"  @List4Codes = '("+ExtractCode(F3DWLD.CONFIG.selectedValues[3],"")+")', "+
"   @List5Codes = '',  "+
"   @List6Codes = '',  "+
"   @List7Codes = '',  "+
"   @NullValues = 0,  "+
"   @Thousand = '',  "+
"   @Decimal = '.',  "+
"   @DecPlaces = 2 , "+
"  @Limit ="+ maLimit ;


			if(F3DWLD.CONFIG.domainCode=="TM" || F3DWLD.CONFIG.domainCode=="FT"){
						
						tableMyData="TradeMatrix";
						var fromMyData=[
							{"column":"TradeMatrix","alias":"D"},
							{"column":"Item","alias":"I"},
							{"column":"Element","alias":"E"},
							{"column":"Area","alias":"A1"},
							{"column":"Area","alias":"A2"},
							{"column":"Domain","alias":"DOM"}
						];

			selectMyData=[
							{"aggregation":"NONE","column":"DOM.DomainName"+F3DWLD.CONFIG.lang,"alias":"Domain"},
							{"aggregation":"NONE","column":"A1.AreaCode","alias":"ReporterAreaCode"},
							{"aggregation":"NONE","column":"A1.AreaName"+F3DWLD.CONFIG.lang,"alias":"Reporter_Country"},
							{"aggregation":"NONE","column":"A2.AreaCode","alias":"PartnerAreaCode"},
							{"aggregation":"NONE","column":"A2.AreaName"+F3DWLD.CONFIG.lang,"alias":"Partner_Country"},
							{"aggregation":"NONE","column":"I.ItemCode","alias":"ItemCode"},
							{"aggregation":"NONE","column":"I.ItemName"+F3DWLD.CONFIG.lang,"alias":"Item"},
							{"aggregation":"NONE","column":"E.ElementListCode","alias":"ElementCode"},
							{"aggregation":"NONE","column":"E.ElementUnitName"+F3DWLD.CONFIG.lang,"alias":"ElementName"},
							{"aggregation":"NONE","column":"D.Year","alias":"Year"},
							{"aggregation":"NONE","column":"E.UnitNameE","alias":"Unit"},
							{"aggregation":"NONE","column":"D.Flag","alias":"Flag"},
							{"aggregation":"NONE","column":"D.Value","alias":"Value"}
						];

			orderbyMyData=[
								{"column":"D.Year","direction":"DESC"},
								{"column":"A1.AreaName"+F3DWLD.CONFIG.lang,"direction":"ASC"},
								{"column":"A2.AreaName"+F3DWLD.CONFIG.lang,"direction":"ASC"},
								{"column":"I.ItemName"+F3DWLD.CONFIG.lang,"direction":"ASC"},
								{"column":"E.ElementUnitName"+F3DWLD.CONFIG.lang,"direction":"ASC"}
							];
						
						}
     
                                    var test2={
						datasource:F3DWLD.CONFIG.datasource,
						thousandSeparator:',',
						decimalSeparator:'.',
						decimalNumbers:'2',
						json:JSON.stringify(
						{"limit":null,
						"query":selectFinal,
						"frequency":"NONE"}),
						cssFilename:'',
						valueIndex:5};
                                    
                                    

						$("#testinline").html("<center><img src=\"/faostat-download-js/pivotAgg/Preload.gif\" /></center>");
						FAOSTATNEWOLAP.flags={};
						//document.payload_csv.val(JSON.stringify(test2)); 
                              
                                
						$.ajax({
						 type : 'POST',
						 url:"http://faostat3.fao.org/wds/rest/table/json",
						 data:test2,
						 success:function(response_1){
						
						 var response2_2=[["Country Code","Country","Element Code","Element","Item Code",
                                      "Item","Year","Unit","Value","Flag","Flag Description","Var1Order","Var2Order","Var3Order","Var4Order"]];
									 console.log("response_1.length") ;
								 console.log(response_1.length) ;
								  
							 var response2TM=[["Domain","ReporterCode","ReporterName","PartnerCode","PartnerName","ItemCode","ItemName","ElementCode","ElementName","Year","Unit","Flag","Value"]];
							 var mesOptionsPivot=FAOSTATOLAP2.options;
							 if(F3DWLD.CONFIG.domainCode=="TM" ||F3DWLD.CONFIG.domainCode=="FT" )
							 {response2_2=response2TM;mesOptionsPivot=FAOSTATOLAP2.optionsTM}
							 
							
							for(i in response_1){
                                                            if(Array.isArray(response_1[i])){response2_2.push(response_1[i]);}
                                                     }
							
							
							
                                                     
                                                     var derivers = $.pivotUtilities.derivers;
							 var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);
							
                                                       mesOptionsPivot.vals=["Value"];
							 if(F3DWLD.CONFIG.wdsPayload.showUnits)
                                                         {mesOptionsPivot.vals.push("Unit")}
							 if(F3DWLD.CONFIG.wdsPayload.showFlags)
                                                         {mesOptionsPivot.vals.push("Flag")}
							 
							 FAOSTATNEWOLAP.originalData=response2_2; 
							$("#testinline").pivotUI(response2_2,mesOptionsPivot ,true);
							 
							 
							  $("#options_menu_box").css("display","block"); 
							 var newFlag="";
							 for(var i in FAOSTATNEWOLAP.flags){
								if(newFlag!=""){newFlag+=":";}
								 newFlag+="'" +i+"'";
							 }
							 if(newFlag==""){newFlag="''";}
							 $(".pvtAxisLabel")[$(".pvtAxisLabel").length-1].setAttribute("colspan",2);
							 $.get( "http://faostat3.fao.org/faostat.olap.ws/rest/GetFlags/"+F3DWLD.CONFIG.lang+"/"+newFlag, function( data ) {
							 data=data.replace("localhost:8080/","faostat3.fao.org/");
							 $( "#testinline" ).append( data );
                                                          for (var iLabel=0;iLabel<$(".pvtAxisLabel").length;iLabel++){
                                                              $("#my_"+$(".pvtAxisLabel")[iLabel].innerHTML.replace(/\s/,"_"))[0].innerHTML=$(".pvtAxisLabel")[iLabel].innerHTML.replace("_",""); 
                                                             $(".pvtAxisLabel")[iLabel].innerHTML=$(".pvtAxisLabel")[iLabel].innerHTML.replace("_",""); 
                                                         } 
							// my_exportNew();
							 });
						 }
						});
    
}





















function newFunctions(){
	FAOSTATNEWOLAP.viewVals=1;
        
	$("#mesVals").css("display","block");
	$("#unused").css("display","block");
	$("#renderer").css("display","block");
	$("#aggregator").css("display","block");
        $("#unused").css("background-color","#ececec");
         $("#unused li nobr").css("color","#666");
}

function changeNested()
{
	if(document.getElementById('cbNestedBy').checked){FAOSTATNEWOLAP.nestedby=1;}
	else{FAOSTATNEWOLAP.nestedby=0;}
}

 
 function recTab1(label,arr,ind)
 {
     ret="";
     if(arr.length==ind+1)
         {
            
             
             for(var i=0;i<arr[ind].data.length;i++)
             {
                /* ret+=",MIN(["+label+arr[ind].data[i].label+"]) as ["+label+arr[ind].data[i].label+
                    "],MIN(["+label+arr[ind].data[i].label+"_u]) as ["
                    +label+arr[ind].data[i].label+"_u],MIN(["+label+arr[ind].data[i].label+"_f]) as ["+label+arr[ind].data[i].label+"_f]";*/
                ret+=",CONCAT('''',MIN(["+label+arr[ind].data[i].label+"])) as ["+label+arr[ind].data[i].label+
                    "],CONCAT('''',MIN(["+label+arr[ind].data[i].label+"_u])) as ["
                    +label+arr[ind].data[i].label+"_u],CONCAT('''',MIN(["+label+arr[ind].data[i].label+"_f])) as ["+label+arr[ind].data[i].label+"_f]";
        
         }
       
         }
         else
         {
            
             for(var i=0;i<arr[ind].data.length;i++)
             {
                 //label+=arr[ind][i].label;
                 ret+=recTab1(label+arr[ind].data[i].label+"_",arr,ind+1);
             }
         }
             
      return ret;
 }
 
  function recHeader(label,arr,ind)
 {
     ret="";
     if(arr.length==ind+1)
         {
            
             
             for(var i=0;i<arr[ind].data.length;i++)
             {
                 ret+=",\""+label+arr[ind].data[i].label+
                    "\",\""+ label+arr[ind].data[i].label+"_u\",\""+label+arr[ind].data[i].label+"_f\"";}
       
         }
         else
         {
            
             for(var i=0;i<arr[ind].data.length;i++)
             {
                 //label+=arr[ind][i].label;
                 ret+=recHeader(label+arr[ind].data[i].label+"_",arr,ind+1);
             }
         }
             
      return ret;
 }
 
 
 function recTab2(label,cond,arr,ind)
 {
     ret="";
     if(arr.length==ind+1)
         {
            
             console.log("cas1")
             for(var i=0;i<arr[ind].data.length;i++)
             {console.log("cas 1");
                 
                 /*
                   ret+=",CASE when ["+ FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP1[indice].title]+" Code]=''"+FAOSTATNEWOLAP.PP.PP1[indice].data[j].code+"''  then MIN(Value) end as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"],";
            ret+="CASE when ["+ FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP1[indice].title]+" Code]=''"+FAOSTATNEWOLAP.PP.PP1[indice].data[j].code+"''   then MIN(Unit) end as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"_u],";
            ret+="CASE when ["+ FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP1[indice].title]+" Code]=''"+FAOSTATNEWOLAP.PP.PP1[indice].data[j].code+"''   then MIN(Flag) end as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"_f]";
          
                  
                  */
                 
                  ret+=",CASE when "+cond + " ["+ FAOSTATNEWOLAP.traduction[arr[ind].title]+" Code]=''"+arr[ind].data[i].code+"''  then MIN(Value) end as ["+label+arr[ind].data[i].label+"],";
                  ret+="CASE when "+cond + " ["+ FAOSTATNEWOLAP.traduction[arr[ind].title]+" Code]=''"+arr[ind].data[i].code+"''   then MIN(Unit) end as ["+label+arr[ind].data[i].label+"_u],";
                  ret+="CASE when "+cond + " ["+ FAOSTATNEWOLAP.traduction[arr[ind].title]+" Code]=''"+arr[ind].data[i].code+"''   then MIN(Flag) end as ["+label+arr[ind].data[i].label+"_f]";
          
                 
                 //ret+=",MIN(["+label+"_"+arr[ind].data[i].label+"]) as ["+label+"_"+arr[ind].data[i].label+
                  //  "],MIN(["+label+"_"+arr[ind].data[i].label+"_u]) as ["
                   // +label+"_"+arr[ind].data[i].label+"_u],MIN(["+label+"_"+
                   // arr[ind].data[i].label+"_f]) as ["+label+"_"+arr[ind].data[i].label+"_f]";
               }
       
         }
         else
         {
             console.log("cas2")
             for(var i=0;i<arr[ind].data.length;i++)
             { console.log("cas 2")
                 my_cond="["+ FAOSTATNEWOLAP.traduction[arr[ind].title]+" Code]=''"+arr[ind].data[i].code+"''";
                 ret+=recTab2(label+arr[ind].data[i].label+"_",my_cond+" AND "+cond,arr,ind+1);
             }
         }
             
      return ret;
 }
 
 
function retPivot1(){
   
    var ret= "'"+retPivot3();
ret+=recTab1("",FAOSTATNEWOLAP.PP.PP1,0);
     /* for(var indice=0;indice<FAOSTATNEWOLAP.PP.PP1.length;indice++)
    for(j=0;j<FAOSTATNEWOLAP.PP.PP1[indice].data.length;j++)
        {
            ret+=",MIN(["+FAOSTATNEWOLAP.PP.PP1[indice].data[j].label+"]) as ["+FAOSTATNEWOLAP.PP.PP1[indice].data[j].label+
                    "],MIN(["+FAOSTATNEWOLAP.PP.PP1[indice].data[j].label+"_u]) as ["
                    +FAOSTATNEWOLAP.PP.PP1[indice].data[j].label+"_u],MIN(["+
                    FAOSTATNEWOLAP.PP.PP1[indice].data[j].label+"_f]) as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"_f]";
            
        }*/
        ret+="'";
     /*  ret+= ",MIN([APPLE-2003]) as [APPLE-2003],MIN([APPLE-2003u]) as [APPLE-2003u],MIN([APPLE-2003f]) as [APPLE-2003f],	"+
        "MIN([ABRICOT-2003]) as [ABRICOT-2003],MIN([ABRICOT-2003u]) as [ABRICOT-2003u],MIN([ABRICOT-2003f]) as [ABRICOT-2003f],	"+
        "MIN([APPLE-2004]) as [APPLE-2004],MIN([APPLE-2004u]) as [APPLE-2004u],MIN([APPLE-2004f]) as [APPLE-2004f],"+
        "MIN([ABRICOT-2004]) as [ABRICOT-2004],MIN([ABRICOT-2004u]) as [ABRICOT-2004u],MIN([ABRICOT-2004f]) as [ABRICOT-2004f]'"*/
    return ret;
}

function retPivot2(){
   var ret= "'"+retPivot3();
   /*
   for(var indice=0;indice<FAOSTATNEWOLAP.PP.PP1.length;indice++)
    for(j=0;j<FAOSTATNEWOLAP.PP.PP1[indice].data.length;j++)
        {
            ret+=",CASE when ["+ FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP1[indice].title]+" Code]=''"+FAOSTATNEWOLAP.PP.PP1[indice].data[j].code+"''  then MIN(Value) end as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"],";
            ret+="CASE when ["+ FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP1[indice].title]+" Code]=''"+FAOSTATNEWOLAP.PP.PP1[indice].data[j].code+"''   then MIN(Unit) end as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"_u],";
            ret+="CASE when ["+ FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP1[indice].title]+" Code]=''"+FAOSTATNEWOLAP.PP.PP1[indice].data[j].code+"''   then MIN(Flag) end as ["+FAOSTATNEWOLAP.PP.PP1[0].data[j].label+"_f]";
            
        }*/
   ret+= recTab2("","",FAOSTATNEWOLAP.PP.PP1,0);
        
        ret+="'";
   /*
ret+=        "CASE when Year=''2003'' and [Item Code]=515 then MIN(Value) end as ''APPLE-2003'',		"+
        "CASE when Year=''2003''  and [Item Code]=515 then MIN(Unit) end as ''APPLE-2003u'',	"+
        "CASE when Year=''2003'' and [Item Code]=515 then MIN(Flag) end as ''APPLE-2003f'',	"+
        "CASE when Year=''2003'' and [Item Code]=526 then MIN(Value) end as ''ABRICOT-2003'',	"+
        "CASE when Year=''2003''  and [Item Code]=526 then MIN(Unit) end as ''ABRICOT-2003u'',	"+
        "CASE when Year=''2003'' and [Item Code]=526 then MIN(Flag) end as ''ABRICOT-2003f'',	"+
        "CASE when Year=''2004'' and [Item Code]=515 then MIN(Value) end as ''APPLE-2004'',"+
        "CASE when Year=''2004''  and [Item Code]=515 then MIN(Unit) end as ''APPLE-2004u'',"+
        "CASE when Year=''2004'' and [Item Code]=515 then MIN(Flag) end as ''APPLE-2004f'',"+
        "CASE when Year=''2004'' and [Item Code]=526 then MIN(Value) end as ''ABRICOT-2004'',	"+
        "CASE when Year=''2004''  and [Item Code]=526 then MIN(Unit) end as ''ABRICOT-2004u'',"+
        "CASE when Year=''2004'' and [Item Code]=526 then MIN(Flag) end as ''ABRICOT-2004f'''";*/
    return ret;
}

function retPivot3(){
    ret="";
    for(i=0;i<FAOSTATNEWOLAP.PP.PP3.length;i++)
        {if(i>0){ret+=","+FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP3[i]];}
    else{ret+=FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP3[0]];}    
    }
return ret;
    // return "Country,[Country Code],Element,[Element Code]";
    
}
function ExcelComplete(outputFormat)
{
    //decolrowspanNEW();
   
    FAOSTATNEWOLAP.PP={PP1:[],PP2:[],PP3:[]};
    for(i=0;i<document.getElementById('rows').getElementsByTagName('nobr').length;i++)
    {
        var d=document.getElementById('rows').getElementsByTagName('nobr')[i];
         for(j=0;j< FAOSTATNEWOLAP.schema.length;j++)
           {
                
               if(FAOSTATNEWOLAP.schema[j][6]==d.innerHTML){
                 
               FAOSTATNEWOLAP.PP.PP3.push(FAOSTATNEWOLAP.schema[j][1])
            }
           }
       
    }
    
    
   for(i=0;i< document.getElementById('cols').getElementsByTagName('nobr').length;i++)
       {var d=document.getElementById('cols').getElementsByTagName('nobr')[i];
           jj=-1;
          title="";
           for(j=0;j< FAOSTATNEWOLAP.schema.length;j++)
           {
                
               if(FAOSTATNEWOLAP.schema[j][6]==d.innerHTML){
                
                jj=parseInt(FAOSTATNEWOLAP.schema[j][4])-1;
                title=FAOSTATNEWOLAP.schema[j][1];
                break;}
           }
          
           if(jj>-1){
              
           FAOSTATNEWOLAP.PP.PP1.push({"title":title,"data":F3DWLD.CONFIG.selectedValues[jj]});}
       else{alert('not found')}
       }
    
    
   
      var data2={ 
                            datasource:F3DWLD.CONFIG.datasource,
                           thousandSeparator:" ",
                            decimalSeparator:".",
                            decimalNumbers:"2",
                            json:JSON.stringify({"selects":null,
                            "froms":null,
                            "wheres":null,
                        "limit":null,
                    "query":"EXECUTE Warehouse.dbo.usp_GetData4 @DomainCode = "+F3DWLD.CONFIG.domainCode+", "+
        "@lang = 'E',"+
        "@List1Codes = "+JSON.stringify(FAOSTATNEWOLAP.excelpayload.list1Codes).replace(/\"/g,"'").replace(/\[/g,"'(").replace(/\]/g,")'")+","+
        "@List2Codes = "+JSON.stringify(FAOSTATNEWOLAP.excelpayload.list2Codes).replace(/\"/g,"'").replace(/\[/g,"'(").replace(/\]/g,")'")+", "+
        "@List3Codes = "+JSON.stringify(FAOSTATNEWOLAP.excelpayload.list3Codes).replace(/\"/g,"'").replace(/\[/g,"'(").replace(/\]/g,")'")+","+
       "@List4Codes = "+JSON.stringify(FAOSTATNEWOLAP.excelpayload.list4Codes).replace(/\"/g,"'").replace(/\[/g,"'(").replace(/\]/g,")'")+", "+
      
       // "@List1Codes = '(''2'',''3'',''4'',''6'',''7'')',"+
       // "@List2Codes = '(''2413'',''2510'',''2525'')', "+
       // "@List3Codes = '(''526'',''515'')',"+
        //"@List4Codes = '(''2011'',''2010'',''2009'',''2008'',''2007'',''2006'',''2005'',''2004'',''2003'')', "+
        "@List5Codes = '', @List6Codes = '',  @List7Codes = '', "+
        "@NullValues = 0, "+
        "@Thousand = '',"+
        "@Decimal = ',',  "+
        "@DecPlaces = 2, "+
        
        "@Pivot1="+retPivot1()+","+
        
        "@Pivot2="+retPivot2()+","+
        "@Pivot3='"+retPivot3()+"'",
"frequency":"NONE"}),
cssFilename:"faostat",
valueIndex:1
};


    $.ajax({
                        type: 'POST', 
                       url : 'http://faostat3.fao.org/wds/rest/table/'+outputFormat,
                        data: data2, 
                        success: function (response) {
                            document.getElementById('csvData').value="";
                           for(j=0;j<FAOSTATNEWOLAP.PP.PP3.length;j++)
                           {
                               if(j>0){document.getElementById('csvData').value+=",";}
                               console.log("ok")
                               document.getElementById('csvData').value+=FAOSTATNEWOLAP.traduction[FAOSTATNEWOLAP.PP.PP3[j]]
                           }
                            // document.getElementById('csvData').value=FAOSTATNEWOLAP.PP.PP3;
                           
                            document.getElementById('csvData').value+=recHeader("",FAOSTATNEWOLAP.PP.PP1,0);
                                 document.getElementById('csvData').value+="\n";
                          //  console.log("responseJSON")
                        //    console.log(response)
                        if(outputFormat==='html'){
                            document.getElementById("excelData").value= response;   
                            document.getElementById("formExcel").submit();  }
                      else{  for (var i=0;i<response.length;i++)
                       {document.getElementById('csvData').value+='"'+response[i].join('","')+"\"\n";}
        
        
        var r = confirm("Press a button!");
if (r == true) {
   document.getElementById('csvDataForm').submit();
} 
        
        
                        }
                     
                        },
        error : function(err, b, c) {
            console.log(err);
        }
                        
     }); 
    
    /*
     var data2={
                            datasource:F3DWLD.CONFIG.datasource,
                           thousandSeparator:" ",
                            decimalSeparator:".",
                            decimalNumbers:"2",
                            json:JSON.stringify({"selects":null,
                            "froms":null,
                            "wheres":null,
                        "limit":null,
                    "query":"select TOP 10000 "+
"D.Var1Code,D1.VarNameE, "+
"D.Var2Code,D2.VarNameE, "+
"D.Var3Code,D3.VarNameE, "+
"D.Var4Code,D4.VarNameE, "+
"Value,Flag,DU.UnitNameE "+
" from Data4  D "+
"inner join Warehouse.dbo.DomainVarListVar D1 "+
"on D1.DomainCode=D.DomainCode and D.Var1Code=D1.VarCode and D1.VarType='area' "+
"inner join Warehouse.dbo.DomainVarListVar D2 "+
"on D2.DomainCode=D.DomainCode and D.Var2Code=D2.VarCode and D2.VarType='item' "+
"inner join Warehouse.dbo.DomainVarListVar D3 "+
"on D3.DomainCode=D.DomainCode and D.Var3Code=D3.VarCode and D3.VarType='element' "+
"inner join DomainVarUnit DU on D3.VarCode=DU.VarCode "+
"inner join Warehouse.dbo.DomainVarListVar D4 "+
"on D4.DomainCode=D.DomainCode and D.Var4Code=D4.VarCode and D4.VarType='year' "+
" where D.DomainCode='"+F3DWLD.CONFIG.domainCode+"' "+
" AND D1.VarListCode in ("+FAOSTATNEWOLAP.excelpayload.list1Codes.join(',')+") "+
"  AND D2.VarListCode in ("+FAOSTATNEWOLAP.excelpayload.list3Codes.join(',')+") "+
"  AND D3.VarListCode in ("+FAOSTATNEWOLAP.excelpayload.list2Codes.join(',')+") "+
"    AND D4.VarListCode in ("+FAOSTATNEWOLAP.excelpayload.list4Codes.join(',')+") ",
"frequency":"NONE"}),
cssFilename:"faostat",
valueIndex:1
};


    $.ajax({
                        type: 'POST', 
                       url : 'http://faostat3.fao.org/wds/rest/table/'+outputFormat,
                        data: data2, 
                        success: function (response) {
                            console.log(response);
                        },
        error : function(err, b, c) {
            console.log(err);
        }
                        
     });
    */
    
}


function my_exportNew(){
monclone=$("#pivot_table").clone();
$("#renderer", monclone).remove();
$(".ordre", monclone).remove();
$("#unused", monclone).remove();
$("#aggregator", monclone).remove();
$("#vals", monclone).remove();
$("#cols", monclone).remove();
$("#rows", monclone).remove();
$(".pvtTotalLabel", monclone).remove();
$(".pvtTotal", monclone).remove();
$(".invi", monclone).remove();
$("thead", monclone).remove();
$(".pvtGrandTotal", monclone).remove();
/*for (var i in $(".fval", monclone))
{
  
if(!isNaN(i))  { 
    $(".fval", monclone)[i].innerHTML=$(".fval", monclone)[i].innerHTML.replace(" ","");
    }
};*/
$("td", monclone).css("border","1px solid black");
$("th", monclone).css("border","1px solid black");
$(".table", monclone).css("border","1px solid black");
// var c=window.open('data:application/vnd.ms-excel,'+encodeURIComponent(monclone.html())) ;//t.preventDefault();

var today=new Date();
document.getElementById("excelData").value="<table><tr><td>FAOSTAT "+today.getFullYear()+"</td><td colspan=2>Date : "+today.toLocaleDateString()+"</td></tr></table><table>"+  monclone.html()+"</table>";
document.getElementById("excelData").value+="<table><tr><td></td></tr>";


 var testtd=document.getElementById("hor-minimalist-b").getElementsByTagName('td');
        j=0;
        for(i=0;i<testtd.length;i++){
            console.log(i);console.log(testtd[i]);console.log(testtd[i].innerHTML)
                if(j==0){document.getElementById("excelData").value+="<tr><td>";j=1;}
                else{document.getElementById("excelData").value+="</td><td>";j=0;}
                document.getElementById("excelData").value+=testtd[i].innerHTML;
                if(j==0){document.getElementById("excelData").value+="</tr>";}
            }



document.getElementById("excelData").value+="</table>";
 document.getElementById("formExcel").submit();  
 }
 
function decolrowspanNEW()
{var today=new Date();
    
    var reg=new RegExp("<span class=\"ordre\">[0-9]+</span>", "g");
	var reg3=new RegExp("<span class=\"ordre\"></span>", "g");
    var reg2=new RegExp("<table  class=\"innerCol\"><th>([^<]*)</th><th>([^<]*)</th></table>","g");
var row=FAOSTATNEWOLAP.internalData.tree;
var col=FAOSTATNEWOLAP.internalData.flatColKeys;
var ret="";
for(var j=0;j<FAOSTATNEWOLAP.internalData.rowKeys[0].length;j++){ret+=FAOSTATNEWOLAP.internalData.rowAttrs[j].replace("_","")+",";
    if(F3DWLD.CONFIG.wdsPayload.showCodes){ret+=",";}
    }
for(j in col)
{ret+=col[j].replace(/,/g,"").replace(/\|\|/g,"-").replace(/&nbsp;/g,"").replace(reg,"").replace(reg2,"$1").replace(reg3,"");
   if(F3DWLD.CONFIG.wdsPayload.showUnits){ ret+= ", unit ";}
   if(F3DWLD.CONFIG.wdsPayload.showFlags) {ret+=", flag ";}
   ret+=",";
}
ret+="\n";

for (i in row){
		ret+=i.replace(/,/g,"").replace(/\|\|/g,",")+",";
		for(j in col){
			try{
				//ret+=row[i][col[j]].value().replace(",","").replace("&nbsp;","").join("," )+",";
				ret+=row[i][col[j]].value().join("||" ).replace(/,/g,"").replace(/&nbsp;/g,"").replace(/\|\|/g,",")+",";
				
          ret=ret.replace(reg,"").replace(reg2,"$1,$2").replace(reg3,"");
          ret=ret.replace(/,_/g,"");
           // console.log(ret)

            }
			catch(ER){
                            ret+=",";
                               if(F3DWLD.CONFIG.wdsPayload.showUnits){ ret+= ", ";}
   if(F3DWLD.CONFIG.wdsPayload.showFlags) {ret+=", ";}
                            console.log(ER)}
			}
			ret+="\n" ;
	}
       
        var testtd=document.getElementById("hor-minimalist-b").getElementsByTagName('td');
        j=0;
         for(i=0;i<testtd.length;i++){
                if(j==0){ret+="\n";j=1;}
                else{ret+=",";j=0;}
                ret+=testtd[i].innerHTML;
            }
 ret+="\n\nFAOSTAT "+today.getFullYear()+", Date : "+today.toLocaleDateString()+"\n";	
    document.getElementById('csvData').value=ret;
        
	document.getElementById('csvDataForm').submit();
}
 
 
function colapseCol(t,colspan,pos)
{
/*
var mySel=[];
for(var i=0;i<colspan;i++)
{c=pos+i;
mySel.push(".col"+c);}
test=$(mySel.join(","));
*/
}
function showHideTotals(){//Not yet used

if($("#cols li nobr").length * $("#rows li nobr").length==0){
        $(".pvtTotalLabel").show();
        $(".pvtTotal").show();
        $(".pvtGrandTotal").show();
        }
        else{ 
        $(".pvtTotalLabel").hide();
        $(".pvtTotal").hide();
        $(".pvtGrandTotal").hide();
        }
  }

function my_export(t){
monclone=$("#newOlap").clone();
$("#renderer", monclone).remove();
$("#unused", monclone).remove();
$("#aggregator", monclone).remove();
$("#vals", monclone).remove();
$("#cols", monclone).remove();
$("#rows", monclone).remove();
$(".pvtTotalLabel", monclone).remove();
$(".pvtTotal", monclone).remove();
$(".invi", monclone).remove();
$(".pvtGrandTotal", monclone).remove();
$("td", monclone).css("border-left","1px solid black");
$("td", monclone).css("border-top","1px solid black");
$("th", monclone).css("border-left","1px solid black");
$("th", monclone).css("border-top","1px solid black");
$(".table", monclone).css("border-right","1px solid black");
$(".table", monclone).css("border-bottom","1px solid black");
 document.getElementById("excelData").value= monclone.html();   
 document.getElementById("formExcel").submit();    
 //var c=window.open('data:application/vnd.ms-excel,'+encodeURIComponent(monclone.html())) ;//t.preventDefault();
                 // c.document.write(encodeURIComponent(monclone.html()));
 }

function myInitOLAP()
{
 monXML="";
 var mesItems="";
 var bItem=0;
 var mesItemsXML="{name:'ItemCode','nb':'1','val':{";
 var arrItem=$('#gridItemsAggregated').jqxGrid('selectedrowindexes');
 var listItem="";
  var mySelecteds=F3DWLD.CONFIG.selectedValues;
  //if (FAOSTATDownload.domainCode != 'GY')
  {
  for(i=0;i<mySelecteds.items.length;i++) {
    arr=mySelecteds.items[i];
    if(arr.type=="list"){
          if(listItem==""){  listItem="[{code:'"+arr.code+"',type:'list'}";  }
          else{  listItem+=",{code:'"+arr.code+"',type:'list'}";  }
    }
    else{
          if(mesItems=="") {  mesItems=arr.code;  } 
          else {  mesItems+=","+arr.code;  }
          if(bItem!=0) {  mesItemsXML+=",";  }
          else{  bItem=1;  }
          mesItemsXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";  
      }
    }
  }
  if(listItem!=""){  listItem+="]";  }
  else{  listItem="[]";  }
  var mesElements="";
  var mesElementsXML="{name:'ElementCode','nb':'1','val':{";
  for(i=0;i<mySelecteds.elements.length;i++) {
  arr=mySelecteds.elements[i];
  if(mesElements=="") {  mesElements=arr.code;  } 
  else {  mesElements+=","+arr.code;  }
  if(i!=0) {  mesElementsXML+=",";}
   mesElementsXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
}
mesElementsXML+="}}";
var mesCountries="";
var bCountry=0;
var mesCountriesXML="{'name':'AreaCode','nb':'1','val':{";
var listCountry="";
for(i=0;i<mySelecteds.countries.length;i++) {
arr=mySelecteds.countries[i]; 
if(arr.type=="list"){
    if(listCountry==""){    listCountry="[{code:'"+arr.code+"',type:'list'}";    }
    else{listCountry+=",{code:'"+arr.code+"',type:'list'}";    }
    }
    else{
        if(mesCountries=="") {mesCountries=arr.code;}
         else {mesCountries+=","+arr.code;}
         if(bCountry!=0) {mesCountriesXML+=",";}else{bCountry=1;}
         mesCountriesXML+="'"+arr.code+"':{'E':'"+arr.label.replace(/'/g," ")+"'}";
    }
}
 if(listCountry!="" || listCountry == null){listCountry+="]";}
 else{listCountry="[]";}
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
     if(response.constructor === String){response = jQuery.parseJSON(response);};
     testAjax=response[0];
     for(var i=0;i<testAjax.length;i++)
     {
         testAjax2=testAjax[i];
         if(mesCountries=="") {mesCountries=testAjax2.code;} 
         else {mesCountries+=","+testAjax2.code;}
         if(bCountry!=0) {mesCountriesXML+=",";}
	else{bCountry=1;}
        mesCountriesXML+="'"+testAjax2.code+"':{'E':'"+testAjax2.label.replace(/'/g," ")+"'}";
       }
       mesCountriesXML+="}}";
       testAjax=response[1];
       for(var i=0;i<testAjax.length;i++){
           testAjax2=testAjax[i];
           if(mesItems=="") {mesItems=testAjax2.code;} 
           else {mesItems+=","+testAjax2.code;}
           if(bItem!=0) {mesItemsXML+=",";}else{bItem=1;}
           mesItemsXML+="'"+testAjax2.code+"':{'E':'"+testAjax2.label.replace(/'/g," ")+"'}";
           }
           mesItemsXML+="}}";
           var mesYears="";
           var mesYearsXML="{'name':'Year',nb:'1','val':{";
           for(i=0;i<mySelecteds.years.length;i++) {
               arr=mySelecteds.years[i];
               if(mesYears=="") { mesYears=arr.code; } 
               else {  mesYears+=","+arr.code;}
               if(i!=0) { mesYearsXML+=",";}
               mesYearsXML+="'"+arr.code+"':{'E':'"+arr.label.toString().replace(/'/g," ")+"'}";
               }
               mesYearsXML+="}}";
               
FAOSTATOLAP2.queryParams.json=JSON.stringify(
	  {"selects":[{"aggregation":"NONE","column":"DOM.DomainNameE","alias":"Domain"},
	  {"aggregation":"NONE","column":"A.AreaCode","alias":"AreaCode"},
	  {"aggregation":"NONE","column":"A.AreaNameE","alias":"Area"},
	  {"aggregation":"NONE","column":"I.ItemCode","alias":"ItemCode"},
	  {"aggregation":"NONE","column":"I.ItemNameE","alias":"Item"},
	  {"aggregation":"NONE","column":"E.ElementCode","alias":"ElementCode"},
	  {"aggregation":"NONE","column":"E.ElementNameE","alias":"Element"},{"aggregation":"NONE","column":"D.Year","alias":"Year"},
	  {"aggregation":"NONE","column":"D.Value","alias":"Value"},
	  
	  {"aggregation":"NONE","column":"E.UnitNameE","alias":"Unit"},
	  {"aggregation":"NONE","column":"Flag","alias":"Flag"}
	  ],"froms":[{"column":"Data","alias":"D"},{"column":"Item","alias":"I"},{"column":"Element","alias":"E"},
           {"column":"Area","alias":"A"},{"column":"Domain","alias":"DOM"}],
	  "wheres":[
	  {"datatype":"TEXT","column":"D.DomainCode","operator":"=","value":""+FAOSTATDownload.domainCode+"","ins":[]},
          {"datatype":"TEXT","column":"DOM.DomainCode","operator":"=","value":""+FAOSTATDownload.domainCode+"","ins":[]},
          {"datatype":"DATE","column":"D.AreaCode","operator":"=","value":"A.AreaCode","ins":[]},{"datatype":"DATE","column":"D.DomainCode","operator":"=","value":"DOM.DomainCode","ins":[]},{"datatype":"DATE","column":"D.ItemCode","operator":"=","value":"I.ItemCode","ins":[]},{"datatype":"DATE","column":"D.ElementCode","operator":"=","value":"E.ElementCode","ins":[]},{"datatype":"TEXT","column":"D.ElementCode","operator":"IN","value":"E.ElementCode","ins":eval("["+mesElements+"]")},{"datatype":"TEXT","column":"D.AreaCode","operator":"IN","value":"A.AreaCode","ins":eval("["+mesCountries+"]")},{"datatype":"TEXT","column":"D.ItemCode","operator":"IN","value":"I.ItemCode","ins":eval("["+mesItems+"]")},{"datatype":"TEXT","column":"D.Year","operator":"IN","value":"D.Year","ins":eval("["+mesYears+"]")}],"orderBys":[{"column":"D.Year","direction":"DESC"},{"column":"A.AreaNameE","direction":"ASC"},{"column":"I.ItemNameE","direction":"ASC"},
          {"column":"E.ElementNameE","direction":"ASC"}],"limit":null,"query":null,"frequency":"NONE"}
	);

	
//console.log(mesElements+"#"+mesCountries+"#"+mesItems+"#"+mesYears);
//myInitOLAP();

$.post( "/wds/rest/table/json", FAOSTATOLAP2.queryParams).done(function( data ) {
	data=FAOSTATOLAP2.attr.concat(data);
	$("#newOlap").pivotUI(data, FAOSTATOLAP2.options,FAOSTATOLAP2.displayOption.overwrite);
});

    }
});
}
var internalTest;

(function() {
    var $, PivotData, addCommas, aggregatorTemplates, aggregators, convertToArray, dayNames, deriveAttributes, derivers, forEachRecord, getPivotData, mthNames, numberFormat, pivotTableRenderer, renderers, spanSize, zeroPad;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) { if (this[i] === item) return i;}
    return -1;
  }, __hasProp = Object.prototype.hasOwnProperty, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = jQuery;
  /*
  Utilities
  */
  addCommas = function(nStr) {
    var rgx, x, x1, x2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ?FAOSTATNEWOLAP.decimalSeparator + x[1] : '';
    rgx = /(\d+)(\d{3})/;
 
    while (rgx.test(x1)) {      x1 = x1.replace(rgx, '$1' +FAOSTATNEWOLAP.thousandSeparator + '$2');    }
    //console.log("ij"+FAOSTATNEWOLAP.thousandSeparator+"r");
    if(FAOSTATNEWOLAP.thousandSeparator===" "){
       
          x1=x1.replace(/\s/g,"");}
    return x1 + x2;
  };
  numberFormat = function(sigfig, scaler) {
    if (sigfig == null) {sigfig = 3;}
    if (scaler == null) {scaler = 1;}
    return function(x) {
      if (x === 0 || isNaN(x) || !isFinite(x)) {
        return "";
      } else { return addCommas((scaler * x).toFixed(sigfig));}
    };
  };
  arrayFormat = function(sigfig, scaler) {
    if (sigfig == null) {sigfig = 3; }
    if (scaler == null) {scaler = 1;}
    return function(x1) {
        
	var ret="<table class=\"tableVCell\" style=\"width:100%\"><tr>";
	for(k in x1){
	var x=x1[k];
	if(x!="_"){
	if(!isNaN(k)){
           
       
                if (x === 0 || isNaN(x) || !isFinite(x)) { ret+= "<td>"+x+"</td>";}
                else {ret+= "<td>"+addCommas((scaler * x).toFixed(FAOSTATNEWOLAP.decimal))+"</td>"; }
                 // else {ret+= "<td>"+ x.toFixed(FAOSTATNEWOLAP.decimal).toLocaleString()+"</td>"; }
                    
                }
            }
	  }
    ret+="</tr></table>";
    return ret;
    };
  };
  aggregatorTemplates = {
    sum: function(sigfig, scaler) {
      if (sigfig == null) {sigfig = 3;}
      if (scaler == null) {scaler = 1;}
      return function(_arg) {
        var attr;
        attr = _arg[0];
        return function() {
          return {
            sum: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[attr]))) {return this.sum += parseFloat(record[attr]);}
            },
            value: function() {return this.sum;},
            format: numberFormat(sigfig, scaler),
            label: "Sum of " + attr
          };
        };
      };
    },
	 sumUnit: function(sigfig, scaler) {
	 
      if (sigfig == null) {sigfig = 3;}
      if (scaler == null) {scaler = 1;}
	  
      return function(_arg) {
        var attr;
        attr = _arg[0];
		
        return function() {
          return {
              sum: 0,
              unit:"**",
            push: function(record) {
            if(this.unit=="**"){this.unit=record["unit"];}
            else if(this.unit!=record["unit"]){this.unit="--";}
            if (!isNaN(parseFloat(record[attr]))) {
                if(this.unit!="--"){
                return this.sum += parseFloat(record[attr]);}
		else{return this.sum="na";}
              }
            },
            value: function() {return this.sum;},
            format: numberFormat(sigfig, scaler),
            label: "Sum of " + attr
          };
        };
      };
    },
        sum2: function(sigfig, scaler) {
	
      if (sigfig == null) {sigfig = 3;}
      if (scaler == null) {scaler = 1;}
      sigfig=FAOSTATNEWOLAP.decimal;
      return function(_arg) {   
        var attr;//function(){var ret=[];for(var i=0;i<_arg;i++){ret.push(0);};return ret}
        attr = _arg[0];
        var emptyInitTab=[0,"",""];
        //for(var i in _arg){emptyInitTab.push(0);}
        /*function(){t=[0];
            if(FAOSTATOLAP2.displayOption.showFlag==1){t.push("");}
            if(FAOSTATOLAP2.displayOption.showUnit==1){t.push("");}
            return t;
            }*/
	   return function() {
          return {
            sum: [0,"_","_"],
            push: function(record) {
             //if (!isNaN(parseFloat(record[_arg[j]]))) {
             for(var j=0;j<_arg.length;j++)
		{_arg[j]=_arg[j].trim();
                    if(_arg[j]=="Flag"|| _arg[j]=="Symbole"|| _arg[j]=="Simbolo"){
                       
                        if(this.sum[j]=="_"){//|| this.sum[j]==record[_arg[j]]){
                            if(record[_arg[j]].trim()!=""){this.sum[j]=""+record[_arg[j]]+"";}
                             else{this.sum[j]="&nbsp;";}
                             FAOSTATNEWOLAP.flags[record[_arg[j]]]=1;
			  }
			  else{this.sum[j]="Agg";}
			  }
			  else if(_arg[j]=="Value" || _arg[j]=="Valeur"|| _arg[j]=="Valor"){
			
			  this.sum[j]+=parseFloat(record[_arg[j]].replace(",",""));
			  }
			  else if(_arg[j]=="Unit" || _arg[j]=="Unidad" || _arg[j]=="Unite"){
			 if(this.sum[j]=="_" || this.sum[j]==""+record[_arg[j]]+"" ){
			 
			 // this.sum[j]="("+record[_arg[j]]+")";
			  
			  if(record[_arg[j]].trim()!=""){
			  this.sum[j]=""+record[_arg[j]]+"";}
			  else{this.sum[j]="&nbsp;";}
			  
			  
			  }
			  else{this.sum[0]=NaN;
			  this.sum[j]="nan";}
			  }
			  }
			 
                return this.sum;
              },
            value: function() {return this.sum; },
            format: arrayFormat(sigfig, scaler),
            label: "Sum of " + attr
          };
        };
      };},
          sum3: function(sigfig, scaler) {
      if (sigfig == null) {sigfig = 3;}
      if (scaler == null) {scaler = 1;}
	  
      return function(_arg) {
	
        var attr;//function(){var ret=[];for(var i=0;i<_arg;i++){ret.push(0);};return ret}
        attr = _arg[0];
		var emptyInitTab=[0,"",""];
		//for(var i in _arg){emptyInitTab.push(0);}
		
		/*function(){t=[0];
            if(FAOSTATOLAP2.displayOption.showFlag==1){t.push("");}
            if(FAOSTATOLAP2.displayOption.showUnit==1){t.push("");}
            return t;
            }*/
	   return function() {
          return {
            sum: [0,"_","_"],
            push: function(record) {
        for(var j=0;j<_arg.length;j++){
			  if(_arg[j]=="Flag"){
			  if(this.sum[j]=="_"){
			  this.sum[j]="["+record[_arg[j]]+"]";}
                           else{this.sum[j]=" Agg";}
			  }
			  else if(_arg[j]=="Value")
                          {this.sum[j]+=parseFloat(record[_arg[j]].replace(",",""));	 }
			  else if(_arg[j]=="Unit"){
                            if(this.sum[j]=="_" || this.sum[j]=="("+record[_arg[j]]+")" )
                            { this.sum[j]="("+record[_arg[j]]+")";}
                             else{this.sum[0]=NaN;
                             this.sum[j]="nan";}
                            }
			  }
                return this.sum;
            },
            value: function() {	  return this.sum[0];},
            format: numberFormat(sigfig, scaler),
            label: "Sum of " + attr
          };
        };
      };},
     average: function(sigfig, scaler) {
      if (sigfig == null) {sigfig = 3;}
      if (scaler == null) {scaler = 1;}
      return function(_arg) {
        var attr;
        attr = _arg[0];
        return function() {
          return {
            sum: 0,
            len: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[attr]))) {
                this.sum += parseFloat(record[attr]);
                return this.len++;
              }
            },
            value: function() {   return this.sum / this.len;   },
            format: numberFormat(sigfig, scaler),
            label: "Average of " + attr
          };
        };
      };
    },
    sumOverSum: function(sigfig, scaler) {
      if (sigfig == null) {sigfig = 3;}
      if (scaler == null) { scaler = 1;}
      return function(_arg) {
        var denom, num;
        num = _arg[0], denom = _arg[1];
        return function() {
          return {
            sumNum: 0,
            sumDenom: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[num]))) {this.sumNum += parseFloat(record[num]);}
              if (!isNaN(parseFloat(record[denom]))){return this.sumDenom += parseFloat(record[denom]);}
            },
            value: function() { return this.sumNum / this.sumDenom;},
            format: numberFormat(sigfig, scaler),
            label: "" + num + "/" + denom
          };
        };
      };
    },
    sumOverSumBound80: function(sigfig, scaler, upper) {
      if (sigfig == null) {sigfig = 3; }
      if (scaler == null) {scaler = 1;}
      if (upper == null) {upper = true;}
      return function(_arg) {
        var denom, num;
        num = _arg[0], denom = _arg[1];
        return function() {
          return {
            sumNum: 0,
            sumDenom: 0,
            push: function(record) {
              if (!isNaN(parseFloat(record[num]))) {this.sumNum += parseFloat(record[num]);}
              if (!isNaN(parseFloat(record[denom]))) {return this.sumDenom += parseFloat(record[denom]);}
            },
            value: function() {
              var sign;
              sign = upper ? 1 : -1;
              return (0.821187207574908 / this.sumDenom + this.sumNum / this.sumDenom + 1.2815515655446004 * sign * Math.sqrt(0.410593603787454 / (this.sumDenom * this.sumDenom) + (this.sumNum * (1 - this.sumNum / this.sumDenom)) / (this.sumDenom * this.sumDenom))) / (1 + 1.642374415149816 / this.sumDenom);
            },
            format: numberFormat(sigfig, scaler),
            label: "" + (upper ? "Upper" : "Lower") + " Bound of " + num + "/" + denom
          };
        };
      };
    }
  };
  
  
  aggregators = {
  sumUnit: aggregatorTemplates.sum2(FAOSTATNEWOLAP.decimal),
  sum:aggregatorTemplates.sum3(3),
  count: function() {
      return function() {
        return {
          count: 0,
          push: function() {
            return this.count++;
          },
          value: function() {return this.count;},
          format: numberFormat(0),
          label: "Count"
        };
      };
    },
    countUnique: function(_arg) {
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) 
            {return this.uniq.push(record[attr]); }
          },
          value: function() {return this.uniq.length;},
          format: numberFormat(0),
          label: "Count Unique " + attr
        };
      };
    },
    listUnique: function(_arg) {
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) 
            { return this.uniq.push(record[attr]);   }
          },
          value: function() { return this.uniq.join(", ");},
          format: function(x) { return x;},
          label: "List Unique " + attr
        };
      };
    },
	concat:function(_arg){
	
	  var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            return this.uniq.push(record[attr]);
          },
          value: function() {return this.uniq.join(", "); },
          format: function(x) { return x;},
          label: "List Unique " + attr
        };
      };
	},
    intSum: aggregatorTemplates.sum(0),
   average: aggregatorTemplates.average(3)
  };
  
  aggregatorsText = {
listUnique: function(_arg) {
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) 
            {return this.uniq.push(record[attr]);}
          },
          value: function() { return this.uniq.join(", "); },
          format: function(x) { return x;},
          label: "List Unique " + attr
        };
      };
    },
  count: function() {
      return function() {
        return {
          count: 0,
          push: function() {return this.count++; },
          value: function() { return this.count; },
          format: numberFormat(0),
          label: "Count"
        };
      };
    },
    countUnique: function(_arg) {
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) 
            { return this.uniq.push(record[attr]);}
          },
          value: function() {return this.uniq.length; },
          format: numberFormat(0),
          label: "Count Unique " + attr
        };
      };
    },
    
	concat:function(_arg){
    var attr;
    attr = _arg[0];
    return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            return this.uniq.push(record[attr]);
          },
          value: function() {   return this.uniq.join(", ");  },
          format: function(x) {     return x;    },
          label: "List Unique " + attr
        };
      };
    },
    intSum: aggregatorTemplates.sum(0),
    average: aggregatorTemplates.average(3)
  };
  aggregatorsCountry = {
  sum:aggregatorTemplates.sum(3),
        count: function() {
    return function() {
        return {
          count: 0,
          push: function() {return this.count++;},
          value: function() {return this.count;},
          format: numberFormat(0),
          label: "Count"
        };
      };
    },
    countUnique: function(_arg) {
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) {
              return this.uniq.push(record[attr]);
            }
          },
          value: function() { return this.uniq.length;},
          format: numberFormat(0),
          label: "Count Unique " + attr
        };
      };
    },
    listUnique: function(_arg) {
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            if (_ref = record[attr], __indexOf.call(this.uniq, _ref) < 0) 
            {return this.uniq.push(record[attr]); }
          },
          value: function() { return this.uniq.join(", ");},
          format: function(x) { return x;},
          label: "List Unique " + attr
        };
      };
    },
          concat:function(_arg){
      var attr;
      attr = _arg[0];
      return function() {
        return {
          uniq: [],
          push: function(record) {
            var _ref;
            return this.uniq.push(record[attr]);
          },
          value: function() {  return this.uniq.join(", "); },
          format: function(x) {return x;  },
          label: "List Unique " + attr
        };
      };
    },
    intSum: aggregatorTemplates.sum(0),
    average: aggregatorTemplates.average(3)
  };
  /*
  sum: aggregatorTemplates.sum(3),
  
    sumOverSum: aggregatorTemplates.sumOverSum(3),
    ub80: aggregatorTemplates.sumOverSumBound80(3, 1, true),
    lb80: aggregatorTemplates.sumOverSumBound80(3, 1, false)*/
  
  renderers = {
    "Table": function(pvtData) {return pivotTableRenderer(pvtData);    },
    "Table Barchart": function(pvtData) { return pivotTableRenderer(pvtData).barchart(); },
    "Heatmap": function(pvtData) {return pivotTableRenderer(pvtData).heatmap();    },
    "Row Heatmap": function(pvtData) { return pivotTableRenderer(pvtData).heatmap("rowheatmap");},
    "Col Heatmap": function(pvtData) { return pivotTableRenderer(pvtData).heatmap("colheatmap"); }
  };
  mthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  zeroPad = function(number) {return ("0" + number).substr(-2, 2);  };
  derivers = {
    bin: function(col, binWidth) {return function(record) {return record[col] - record[col] % binWidth;};},
    dateFormat: function(col, formatString) {
      return function(record) {
        var date;
        date = new Date(Date.parse(record[col]));
        return formatString.replace(/%(.)/g, function(m, p) {
          switch (p) {
            case "y":
              return date.getFullYear();
            case "m":
              return zeroPad(date.getMonth() + 1);
            case "n":
              return mthNames[date.getMonth()];
            case "d":
              return zeroPad(date.getDate());
            case "w":
              return dayNames[date.getDay()];
            case "x":
              return date.getDay();
            case "H":
              return zeroPad(date.getHours());
            case "M":
              return zeroPad(date.getMinutes());
            case "S":
              return zeroPad(date.getSeconds());
            default:
              return "%" + p;
          }
        });
      };
    }
  };
  $.pivotUtilities = {
    aggregatorTemplates: aggregatorTemplates,
    aggregators: aggregators,
    renderers: renderers,
    derivers: derivers
  };
  /*
  functions for accessing input
  */
  deriveAttributes = function(record, derivedAttributes, f) {
    var k, v, _ref, _ref2;
    for (k in derivedAttributes) {
      v = derivedAttributes[k];
      record[k] = (_ref = v(record)) != null ? _ref : record[k];
    }
    for (k in record) {
      if (!__hasProp.call(record, k)) continue;
      if ((_ref2 = record[k]) == null) {record[k] = "null";}
    }
    return f(record);
  };
  forEachRecord = function(input, derivedAttributes, f) {
    var addRecord, compactRecord, i, j, k, record, tblCols, _i, _len, _ref, _results, _results2;
    addRecord = function(record) {return deriveAttributes(record, derivedAttributes, f);};
	
    if (Object.prototype.toString.call(input) === '[object Function]') 
	{return input(addRecord);}
	else if (Array.isArray(input)) {
      if (Array.isArray(input[0])) {
        _results = [];
        for (i in input) {
          if (!__hasProp.call(input, i)) continue;
          compactRecord = input[i];
          if (i > 0) {
            record = {};
            _ref = input[0];
            for (j in _ref) {
              if (!__hasProp.call(_ref, j)) continue;
              k = _ref[j];
              record[k] = compactRecord[j];
            }
            _results.push(addRecord(record));
          }
        }
        return _results;
      } else {
        _results2 = [];
        for (_i = 0, _len = input.length; _i < _len; _i++) {
          record = input[_i];
          _results2.push(addRecord(record));
        }
        return _results2;
      }
    } else {
      tblCols = [];
      $("thead > tr > th", input).each(function(i) {return tblCols.push($(this).text());});
      return $("tbody > tr", input).each(function(i) {
        record = {};
        $("td", this).each(function(j) {return record[tblCols[j]] = $(this).text();});
        return addRecord(record);
      });
    }
  };
  convertToArray = function(input) {
    var result;
    result = [];
    forEachRecord(input, {}, function(record) {return result.push(record);});
    return result;
  };
  PivotData = (function() {
    function PivotData(aggregator, colAttrs, rowAttrs) {
      this.aggregator = aggregator;
      this.colAttrs = colAttrs;
      this.rowAttrs = rowAttrs;
      this.getAggregator = __bind(this.getAggregator, this);
      this.flattenKey = __bind(this.flattenKey, this);
      this.getRowKeys = __bind(this.getRowKeys, this);
      this.getColKeys = __bind(this.getColKeys, this);
      this.sortKeys = __bind(this.sortKeys, this);
      this.arrSort = __bind(this.arrSort, this);
      this.natSort = __bind(this.natSort, this);
      this.tree = {};
      this.rowKeys = [];
      this.colKeys = [];
      this.flatRowKeys = [];
      this.flatColKeys = [];
      this.rowTotals = {};
      this.colTotals = {};
      this.allTotal = this.aggregator();
      this.sorted = false;
    }
    PivotData.prototype.natSort = function(as, bs) {
      var a, a1, b, b1, rd, rx, rz;
      rx = /(\d+)|(\D+)/g;
      rd = /\d/;
      rz = /^0/;
      if (typeof as === "number" || typeof bs === "number") {
        if (isNaN(as)) {return 1;}
        if (isNaN(bs)) {return -1;}
        return as - bs;
      }
      a = String(as).toLowerCase();
      b = String(bs).toLowerCase();
      if (a === b) {return 0;}
      if (!(rd.test(a) && rd.test(b))) {
        if (a > b) {return 1;} else {return -1;}
      }
      a = a.match(rx);
      b = b.match(rx);
      while (a.length && b.length) {
        a1 = a.shift();
        b1 = b.shift();
            if (a1 !== b1) {
              if (rd.test(a1) && rd.test(b1)) {return a1.replace(rz, ".0") - b1.replace(rz, ".0");}
            else {if (a1 > b1) {return 1;} else {return -1;}}
        }
      }
      return a.length - b.length;
    };
    PivotData.prototype.arrSort = function(a, b) {return this.natSort(a.join(), b.join());};
	
    PivotData.prototype.sortKeys = function() {
      if (!this.sorted) {
        this.rowKeys.sort(this.arrSort);
        this.colKeys.sort(this.arrSort);
      }
      return this.sorted = true;
    };
	
    PivotData.prototype.getColKeys = function(){this.sortKeys();return this.colKeys;};
	
    PivotData.prototype.getRowKeys = function() {  this.sortKeys();return this.rowKeys;};
    //PivotData.prototype.flattenKey = function(x) {return x.join(String.fromCharCode(0));};
    PivotData.prototype.flattenKey = function(x) {return x.join("||");};
	
    PivotData.prototype.processRecord = function(record) {
      var colKey, flatColKey, flatRowKey, rowKey, x;
      colKey = (function() {
        var _i, _len, _ref, _results;
        _ref = this.colAttrs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(record[x]);
        }
        return _results;
      }).call(this);
      rowKey = (function() {
        var _i, _len, _ref, _results;
        _ref = this.rowAttrs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(record[x]);
        }
        return _results;
      }).call(this);
	  
      flatRowKey = this.flattenKey(rowKey);
      flatColKey = this.flattenKey(colKey);
      this.allTotal.push(record);
      if (rowKey.length !== 0) {
        if (__indexOf.call(this.flatRowKeys, flatRowKey) < 0) {
          this.rowKeys.push(rowKey);
          this.flatRowKeys.push(flatRowKey);
        }
        if (!this.rowTotals[flatRowKey]) {this.rowTotals[flatRowKey] = this.aggregator();}	
        this.rowTotals[flatRowKey].push(record);
      }
      if (colKey.length !== 0) {
        if (__indexOf.call(this.flatColKeys, flatColKey) < 0) {
          this.colKeys.push(colKey);
          this.flatColKeys.push(flatColKey);
        }
        if (!this.colTotals[flatColKey]) {this.colTotals[flatColKey] = this.aggregator();}	
        this.colTotals[flatColKey].push(record);
      }
      if (colKey.length !== 0 && rowKey.length !== 0) {
        if (!(flatRowKey in this.tree)) {this.tree[flatRowKey] = {};}	
        if (!(flatColKey in this.tree[flatRowKey])) {this.tree[flatRowKey][flatColKey] = this.aggregator();}	
        return this.tree[flatRowKey][flatColKey].push(record);
      }
    };
    PivotData.prototype.getAggregator = function(rowKey, colKey) {
      var agg, flatColKey, flatRowKey;
      flatRowKey = this.flattenKey(rowKey);
      flatColKey = this.flattenKey(colKey);
      if (rowKey.length === 0 && colKey.length === 0) {agg = this.allTotal;} 
	  else if (rowKey.length === 0) {agg = this.colTotals[flatColKey];} 
	  else if (colKey.length === 0) {agg = this.rowTotals[flatRowKey];} 
	  else {agg = this.tree[flatRowKey][flatColKey];}
      return agg != null ? agg : {
        value: (function() {return null;}),
        format: function() {return "";}
      };
    };
    return PivotData;
  })();
  
  getPivotData = function(input, cols, rows, aggregator, filter, derivedAttributes) {
    var pivotData;
    pivotData = new PivotData(aggregator, cols, rows);
    forEachRecord(input, derivedAttributes, function(record) {
      if (filter(record)) {return pivotData.processRecord(record);}
    });
    return pivotData;
  };
  
  spanSize = function(arr, i, j) {
    var len, noDraw, stop, x;
    if (i !== 0) {
      noDraw = true;
      for (x = 0; 0 <= j ? x <= j : x >= j; 0 <= j ? x++ : x--) 
	  {if (arr[i - 1][x] !== arr[i][x]) {noDraw = false;}}
      if (noDraw) {return -1;}
    }
    len = 0;
    while (i + len < arr.length) {
      stop = false;
      for (x = 0; 0 <= j ? x <= j : x >= j; 0 <= j ? x++ : x--) 
	  {if (arr[i][x] !== arr[i + len][x]) {stop = true;}}
      if (stop) {break;}
      len++;
    }
    return len;
  };
  
  pivotTableRenderer = function(pivotData) {
  FAOSTATNEWOLAP.internalData=pivotData;
    var aggregator, c, colAttrs, colKey, colKeys, i, j, r, result, rowAttrs, rowKey, rowKeys, th, totalAggregator, tr, txt, val, x;
    colAttrs = pivotData.colAttrs;
    rowAttrs = pivotData.rowAttrs;
    rowKeys = pivotData.getRowKeys();
    colKeys = pivotData.getColKeys();
    result = $("<table class='table table-bordered pvtTable' id='pivot_table'>");
    //result = $("<table class='table table-bordered pvtTable' id='pivot_table'>");
    
      for (j in colAttrs) {
      if (!__hasProp.call(colAttrs, j)) continue;
      c = colAttrs[j];
      tr = $("<tr>");
      if (parseInt(j) === 0 && rowAttrs.length !== 0) 
	  {tr.append($("<th>").attr("colspan", rowAttrs.length).attr("rowspan", colAttrs.length));}
      tr.append($("<th class='pvtAxisLabel'>").text(c));
	  var myPos=0;
      for (i in colKeys) {
        if (!__hasProp.call(colKeys, i)) continue;
        colKey = colKeys[i];
        x = spanSize(colKeys, parseInt(i), parseInt(j));
        if (x !== -1) {
	    th = $("<th class='pvtColLabel' onclick='colapseCol(this,"+x+","+myPos+")'>").html(colKey[j]).attr("colspan", x);
		myPos+=x;
          if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0){th.attr("rowspan", 2);}
          tr.append(th);
        }
      }
      if (parseInt(j) === 0) 
      {tr.append($("<th class='pvtTotalLabel'>").text("Totals").attr("rowspan", colAttrs.length + (rowAttrs.length === 0 ? 0 : 1)));}
      result.append(tr);
    }
    if (rowAttrs.length !== 0) {
      tr = $("<tr>");
      for (i in rowAttrs) {
        if (!__hasProp.call(rowAttrs, i)) continue;
        r = rowAttrs[i];
        tr.append($("<th class='pvtAxisLabel'>").text(r));
      }
	  
      th = $("<th class=\"invi\">");
      if (colAttrs.length === 0) {th.addClass("pvtTotalLabel").text("Totals");}
      tr.append(th);
      result.append(tr);
    }
    for (i in rowKeys) {
      if (!__hasProp.call(rowKeys, i)) continue;
      rowKey = rowKeys[i];
      tr = $("<tr>");
      for (j in rowKey) {
        if (!__hasProp.call(rowKey, j)) continue;
        txt = rowKey[j];
        x = spanSize(rowKeys, parseInt(i), parseInt(j));
        if (x !== -1) {
            if(j==0 && FAOSTATNEWOLAP.nestedby==1){
                tr2 = $("<tr>");
                th = $("<th class='pvtRowLabel nestedby' colspan='3' style='background-color:white'>").html(txt);
		tr2.append(th);result.append(tr2);txt="";
		}
          th = $("<th class='pvtRowLabel'>").html(txt).attr("rowspan", x);
          if (parseInt(j) === rowAttrs.length - 1 && colAttrs.length !== 0){th.attr("colspan", 2);}
          tr.append(th);
        }
      }
      for (j in colKeys) {
          if (!__hasProp.call(colKeys, j)) continue;
          colKey = colKeys[j];
          aggregator = pivotData.getAggregator(rowKey, colKey);
          val = aggregator.value();
         // tr.append($("<td class='pvtVal row" + i + " col" + j + "'>").html(aggregator.format(val)).data("value", val));
	  tr.append($("<td>").html(aggregator.format(val)).data("value", val));
	 
          }
      totalAggregator = pivotData.getAggregator(rowKey, []);
      val = totalAggregator.value();
      tr.append($("<td class='pvtTotal rowTotal'>").html(totalAggregator.format(val)).data("value", val).data("for", "row" + i));
      result.append(tr);
    }
    tr = $("<tr>");
    th = $("<th class='pvtTotalLabel'>").text("Totals");
    th.attr("colspan", rowAttrs.length + (colAttrs.length === 0 ? 0 : 1));
    tr.append(th);
    for (j in colKeys) {
      if (!__hasProp.call(colKeys, j)) continue;
      colKey = colKeys[j];
      totalAggregator = pivotData.getAggregator([], colKey);
      val = totalAggregator.value();
      tr.append($("<td class='pvtTotal colTotal'>").html(totalAggregator.format(val)).data("value", val).data("for", "col" + j));
    }
    totalAggregator = pivotData.getAggregator([], []);
    val = totalAggregator.value();
    tr.append($("<td class='pvtGrandTotal'>").html(totalAggregator.format(val)).data("value", val));
    result.append(tr);
    result.data("dimensions", [rowKeys.length, colKeys.length]);
    result=$("<div id='finaltable'>").append(result);
    return result;
  };
  /*
  Pivot Table
  */
  $.fn.pivot = function(input, opts) {
    var defaults;
    defaults = {
      cols: [],
      rows: [],
      filter: function() {return true;},
      aggregator: aggregatorTemplates.sum(3),
      derivedAttributes: {},
      renderer: pivotTableRenderer
    };
    opts = $.extend(defaults, opts);
    this.html(opts.renderer(getPivotData(input, opts.cols, opts.rows, opts.aggregator, opts.filter, opts.derivedAttributes)));
    return this;
  };
  /*
  UI code, calls pivot table above
  */
  $.fn.pivotUI = function(input, inputOpts, overwrite) {
    var aggregator, axisValues, c, colList, defaults, existingOpts, k, opts, pivotTable, refresh, renderer, rendererControl, tblCols, tr1, tr2, uiTable, x, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (overwrite == null) {overwrite = false;}

    defaults = {
      derivedAttributes: {},
      aggregators: aggregators,
      renderers: renderers,
      hiddenAttributes: [],
      cols: [],
      rows: [],
      vals: []
    };
    existingOpts = this.data("pivotUIOptions");
    if (!(existingOpts != null) || overwrite) 
	{opts = $.extend(defaults, inputOpts);} 
	else {opts = existingOpts;}
    input = convertToArray(input);
    tblCols = (function() {
      var _ref, _results;
      _ref = input[0];
      _results = [];
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        _results.push(k);
      }
      return _results;
    })();
    _ref = opts.derivedAttributes;
    for (c in _ref) {
      if (!__hasProp.call(_ref, c)) continue;
      if ((__indexOf.call(tblCols, c) < 0)) {tblCols.push(c);}
    }
    axisValues = {};
    for (_i = 0, _len = tblCols.length; _i < _len; _i++) 
	{x = tblCols[_i];axisValues[x] = {};}
	
    forEachRecord(input, opts.derivedAttributes, function(record) {
      var k, v, _base, _ref2, _results;
      _results = [];
      for (k in record) {
        if (!__hasProp.call(record, k)) continue;
        v = record[k];
        if (v == null) {v = "null";}
        if ((_ref2 = (_base = axisValues[k])[v]) == null) {_base[v] = 0;}
        _results.push(axisValues[k][v]++);
      }
      return _results;
    });
    uiTable = $("<table class='table table-bordered' cellpadding='5'>");
    rendererControl = $("<td>");
    renderer = $("<select id='renderer'>").bind("change", function() {
    if($("#renderer").val()=="Table")
    {$('#aggregator option[value="sumUnit"]').prop('selected', true);}
    else{$('#aggregator option[value="sum"]').prop('selected', true);}
    console.log("i");
    return refresh();
    });
    _ref2 = opts.renderers;
    for (x in _ref2) {
      if (!__hasProp.call(_ref2, x)) continue;
      renderer.append($("<option>").val(x).text(x));
    }
    rendererControl.append(renderer);
    colList = $("<td id='unused' class='pvtAxisContainer pvtHorizList'>");
    for (_j = 0, _len2 = tblCols.length; _j < _len2; _j++) {
      c = tblCols[_j];
      if (__indexOf.call(opts.hiddenAttributes, c) < 0) {
        (function(c) {
          var btns, colLabel, filterItem, k, numKeys, v, valueList, _k, _len3, _ref3;
          numKeys = Object.keys(axisValues[c]).length;
          colLabel = $("<nobr id='my_"+c.replace(/\s/,"_")+"'>").text(c);
          valueList = $("<div>").css({
            "z-index": 100,
            "width": "280px",
            "height": "350px",
            "overflow": "scroll",
            "border": "1px solid gray",
            "background": "white",
            "display": "none",
            "position": "absolute",
            "padding": "20px"
          });
          valueList.append($("<strong>").text("" + numKeys + " values for " + c));
          if (numKeys > 50) {valueList.append($("<p>").text("(too many to list)"));} 
		  else {
            btns = $("<p>");
            btns.append($("<button>").text("Select All").bind("click", function() 
			{return valueList.find("input").attr("checked", true);}));
			
            btns.append($("<button>").text("Select None").bind("click", function() 
			{return valueList.find("input").attr("checked", false);}));
			
            valueList.append(btns);
            _ref3 = Object.keys(axisValues[c]).sort();
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              k = _ref3[_k];
              v = axisValues[c][k];
              filterItem = $("<label>");
              filterItem.append($("<input type='checkbox' class='pvtFilter'>").attr("checked", true).data("filter", [c, k]));
              filterItem.append($("<span>").html("" + k + " (" + v + ")"));
              valueList.append($("<p>").append(filterItem));
            }
          }
          colLabel.bind("dblclick", function(e) {
		  /*{
              left: e.pageX,
              top: e.pageY
            }*/
              alert('1299');
            valueList.css({color:"black"}).toggle();
            valueList.bind("click", function(e) {return e.stopPropagation();});
            return $(document).one("click", function() { refresh(); return valueList.toggle();});
          });
          return colList.append($("<li class='label label-info' id='axis_" + (c.replace(/\s/g, "")) + "'>").append(colLabel).append(valueList));
        })(c);
      }
    }
    uiTable.append($("<tr>").append(rendererControl).append(colList));
    tr1 = $("<tr>");
    aggregator = $("<select id='aggregator'>").css("margin-bottom", "5px").bind("change", function() {
	if($("#aggregator").val()==="sumUnit"){$('#renderer option[value="Table"]').prop('selected', true);	}
	console.log("i");
        return refresh();
    });
	
    _ref3 = opts.aggregators;
    for (x in _ref3) {
      if (!__hasProp.call(_ref3, x)) continue;
      aggregator.append($("<option>").val(x).text(x));
    }
	if(FAOSTATNEWOLAP.viewVals===0)
	{
            tr1.append($("<td id='vals'>").css("text-align", "center").append(aggregator).append($("<br>")).append($("<div id='mesVals'>")));
	}
	else{
            tr1.append($("<td id='vals' class='pvtAxisContainer pvtHorizList'>").css("text-align", "center").append(aggregator).append($("<br>")).append($("<div id='mesVals'>")));
        }

    tr1.append($("<td id='rows' class='pvtAxisContainer pvtHorizList'>"));
    uiTable.append(tr1);
    tr3=$("<tr>");
    tr3.append($("<td>"));
    tr3.append($("<td valign='top' id='cols' class='pvtAxisContainer pvtHorizList'>").append($("<span style=' float: left;width: 80px;'>Colums</span>")));
    uiTable.append(tr3);
    tr2 = $("<tr>");
    //tr2.append($("<td valign='top' id='rows' class='pvtAxisContainer'>").append($("<span >Rows</span>")));
    tr2.append($("<td valign='top' id='rows2' class='pvtAxisContainer5' style'width:0px'>"));
    
    pivotTable = $("<td valign='top'>");
    tr2.append(pivotTable);
    uiTable.append(tr2);
    this.html(uiTable);
	
    _ref4 = opts.cols;
    for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
      x = _ref4[_k];
      this.find("#cols").append(this.find("#axis_" + (x.replace(/\s/g, ""))));
    }
    _ref5 = opts.rows;
    // this.find("#rows").append($("<span  style=' float: left;width: 60px;' >Rows</span>"));
    for (_l = 0, _len4 = _ref5.length; _l < _len4; _l++) {
      x = _ref5[_l];
      
        
        if(_l==0 ){
          if(!FAOSTATNEWOLAP.nestedby){
          this.find("#rows").append($("<span  style=' float: left;width: 80px;' >Rows</span>"));
          }
      else{ this.find("#rows").append($("<span  style=' float: left;width: 80px;' >ok"+$.i18n.prop('_nestedby2')+"</span>"));}
  } else if(_l==1 && FAOSTATNEWOLAP.nestedby)
      { this.find("#rows").append($("<br><br><span  style=' float: left;width: 80px;' > Rows </span>"));}
      
      this.find("#rows").append(this.find("#axis_" + (x.replace(/\s/g, ""))));
    }
    _ref6 = opts.vals;
    for (_m = 0, _len5 = _ref6.length; _m < _len5; _m++) {
      x = _ref6[_m];
      this.find("#mesVals").append(this.find("#axis_" + (x.replace(/\s/g, ""))));
    }
    if (opts.aggregatorName !== null) {this.find("#aggregator").val(opts.aggregatorName);}
    if (opts.rendererName !== null) {this.find("#renderer").val(opts.rendererName);}
    refresh = __bind(function() {
      
      var exclusions, subopts, vals;
      subopts = {derivedAttributes: opts.derivedAttributes};
      subopts.cols = [];
      subopts.rows = [];
      vals = [];
      this.find("#rows li nobr").each(function() {return subopts.rows.push($(this).text());});
      this.find("#cols li nobr").each(function() {return subopts.cols.push($(this).text());});
      this.find("#vals li nobr").each(function() {return vals.push($(this).text());});  
      subopts.aggregator = opts.aggregators[aggregator.val()](vals);
      subopts.renderer = opts.renderers[renderer.val()];
      exclusions = [];
      this.find('input.pvtFilter').not(':checked').each(function() {return exclusions.push($(this).data("filter"));});
      subopts.filter = function(record) {
        var v, _len6, _n, _ref7;
        for (_n = 0, _len6 = exclusions.length; _n < _len6; _n++) {
          _ref7 = exclusions[_n], k = _ref7[0], v = _ref7[1];
          if (record[k] === v) {return false;}
        }
        return true;
      };
      pivotTable.pivot(input, subopts);
      try{$(".pvtAxisLabel")[$(".pvtAxisLabel").length-1].setAttribute("colspan",2);}catch(er){}
      
      /*FIG ULTIMAINE*/
      
      
       /**/
                   var c= $("#rows li");
                  $("#rows").empty();
                  
                  
              for (var testi=0;testi<c.length;testi++){
                       
                       
                        if(testi==0 ){
          if(!FAOSTATNEWOLAP.nestedby){
          $("#rows").append($("<span  style=' float: left;width: 80px;' >Rows</span>"));}
      else{ $("#rows").append($("<span  style=' float: left;width: 80px;' >"+$.i18n.prop('_nestedby2')+"</span>"));}
  } 
  else if(testi==1 && FAOSTATNEWOLAP.nestedby)
      { $("#rows").append($("<br><br><span  style=' width: 80px;float:left' > Rows </span>"));}
                       
                       
                       
                       $("#rows").append(c[testi]);
                   
              }/**/
      
      
      return this.data("pivotUIOptions", {
        cols: subopts.cols,
        rows: subopts.rows,
        vals: vals,
        hiddenAttributes: opts.hiddenAttributes,
        renderers: opts.renderers,
        aggregators: opts.aggregators,
        derivedAttributes: opts.derivedAttributes,
        aggregatorName: aggregator.val(),
        rendererName: renderer.val()
      });
    }, this);
   
    refresh();
    this.find(".pvtAxisContainer").sortable({
      connectWith: ".pvtAxisContainer",
      items: 'li',
      receive:function(e){
 
          var my_id=e.originalEvent.target.id.split("_")[1];
          if(e.target.id!=="unused"){
              for(k in inputOpts.linkedAttributes){
                  if(inputOpts.linkedAttributes[k].indexOf(my_id)!==-1){
			   for(kk in inputOpts.linkedAttributes[k]){
				   internalTest=$("#axis_"+inputOpts.linkedAttributes[k][kk]);
                                  
				  try{
                                      if(  internalTest.parent().get(0).id!=="unused")
				   {
                                       
                                       $("#"+e.target.id).append($("#axis_"+inputOpts.linkedAttributes[k][kk]));
                                   }
                                  }catch(e){console.log(e);}	
                          }
				break;
			}
		  }
                  
			  
			  
	  }
	 else{ $("#"+e.target.id).append($("#axis_"+my_id));}
	}
    }).bind("sortstop", refresh);
    return this;
  };
  
  
  $.fn.pivotUITOCSV = function(input, inputOpts, overwrite) {
    var aggregator, axisValues, c, colList, defaults, existingOpts, k, opts, pivotTable, refresh, renderer, rendererControl, tblCols, tr1, tr2, uiTable, x, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (overwrite == null) {overwrite = false;}

    defaults = {
      derivedAttributes: {},
      aggregators: aggregators,
      renderers: renderers,
      hiddenAttributes: [],
      cols: [],
      rows: [],
      vals: []
    };
    existingOpts = this.data("pivotUIOptions");
    if (!(existingOpts != null) || overwrite) 
	{opts = $.extend(defaults, inputOpts);} 
	else {opts = existingOpts;}
    input = convertToArray(input);
    tblCols = (function() {
      var _ref, _results;
      _ref = input[0];
      _results = [];
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        _results.push(k);
      }
      return _results;
    })();
    _ref = opts.derivedAttributes;
    for (c in _ref) {
      if (!__hasProp.call(_ref, c)) continue;
      if ((__indexOf.call(tblCols, c) < 0)) {tblCols.push(c);}
    }
    axisValues = {};
    for (_i = 0, _len = tblCols.length; _i < _len; _i++) 
	{x = tblCols[_i];axisValues[x] = {};}
	
    forEachRecord(input, opts.derivedAttributes, function(record) {
      var k, v, _base, _ref2, _results;
      _results = [];
      for (k in record) {
        if (!__hasProp.call(record, k)) continue;
        v = record[k];
        if (v == null) {v = "null";}
        if ((_ref2 = (_base = axisValues[k])[v]) == null) {_base[v] = 0;}
        _results.push(axisValues[k][v]++);
      }
      return _results;
    });
    uiTable = $("<table class='table table-bordered' cellpadding='5'>");
    rendererControl = $("<td>");
    renderer = $("<select id='renderer'>").bind("change", function() {
    if($("#renderer").val()=="Table")
    {$('#aggregator option[value="sumUnit"]').prop('selected', true);}
    else{$('#aggregator option[value="sum"]').prop('selected', true);}
       
    return refresh();
    });
    _ref2 = opts.renderers;
    for (x in _ref2) {
      if (!__hasProp.call(_ref2, x)) continue;
      renderer.append($("<option>").val(x).text(x));
    }
    rendererControl.append(renderer);
    colList = $("<td id='unused' class='pvtAxisContainer pvtHorizList'>");
    for (_j = 0, _len2 = tblCols.length; _j < _len2; _j++) {
      c = tblCols[_j];
      if (__indexOf.call(opts.hiddenAttributes, c) < 0) {
        (function(c) {
          var btns, colLabel, filterItem, k, numKeys, v, valueList, _k, _len3, _ref3;
          numKeys = Object.keys(axisValues[c]).length;
          colLabel = $("<nobr id='my_"+c+"'>").text(c);
          valueList = $("<div>").css({
            "z-index": 100,
            "width": "280px",
            "height": "350px",
            "overflow": "scroll",
            "border": "1px solid gray",
            "background": "white",
            "display": "none",
            "position": "absolute",
            "padding": "20px"
          });
          valueList.append($("<strong>").text("" + numKeys + " values for " + c));
          if (numKeys > 50) {valueList.append($("<p>").text("(too many to list)"));} 
		  else {
            btns = $("<p>");
            btns.append($("<button>").text("Select All").bind("click", function() 
			{return valueList.find("input").attr("checked", true);}));
			
            btns.append($("<button>").text("Select None").bind("click", function() 
			{return valueList.find("input").attr("checked", false);}));
			
            valueList.append(btns);
            _ref3 = Object.keys(axisValues[c]).sort();
            for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
              k = _ref3[_k];
              v = axisValues[c][k];
              filterItem = $("<label>");
              filterItem.append($("<input type='checkbox' class='pvtFilter'>").attr("checked", true).data("filter", [c, k]));
              filterItem.append($("<span>").html("" + k + " (((((" + v + ")"));
              valueList.append($("<p>").append(filterItem));
            }
          }
          colLabel.bind("dblclick", function(e) {
		  /*{
              left: e.pageX,
              top: e.pageY
            }*/ alert('1579');
            valueList.css({color:"black"}).toggle();
            valueList.bind("click", function(e) {return e.stopPropagation();});
            return $(document).one("click", function() {
			      refresh();
              return valueList.toggle();
            });
          });
          return colList.append($("<li class='label label-info' id='axis_" + (c.replace(/\s/g, "")) + "'>").append(colLabel).append(valueList));
        })(c);
      }
    }
    uiTable.append($("<tr>").append(rendererControl).append(colList));
    tr1 = $("<tr>");
    aggregator = $("<select id='aggregator'>").css("margin-bottom", "5px").bind("change", function() {
	if($("#aggregator").val()=="sumUnit"){$('#renderer option[value="Table"]').prop('selected', true);	}
	  
        return refresh();
    });
	
    _ref3 = opts.aggregators;
    for (x in _ref3) {
      if (!__hasProp.call(_ref3, x)) continue;
      aggregator.append($("<option>").val(x).text(x));
    }
	if(	FAOSTATNEWOLAP.viewVals==0)
	{
            tr1.append($("<td id='vals'>").css("text-align", "center").append(aggregator).append($("<br>")).append($("<div id='mesVals'>")));
	}
	else{
            tr1.append($("<td id='vals' class='pvtAxisContainer pvtHorizList'>").css("text-align", "center").append(aggregator).append($("<br>")).append($("<div id='mesVals'>")));
	}

    tr1.append($("<td id='cols' class='pvtAxisContainer pvtHorizList'>").append($("<span >Colums</span>")));
    uiTable.append(tr1);
    tr2 = $("<tr>");
    tr2.append($("<td valign='top' id='rows' class='pvtAxisContainer'>").append($("<span >Rows</span>")));
    pivotTable = $("<td valign='top'>");
    tr2.append(pivotTable);
    uiTable.append(tr2);
    this.html(uiTable);
	
    _ref4 = opts.cols;
    for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
      x = _ref4[_k];
      this.find("#cols").append(this.find("#axis_" + (x.replace(/\s/g, ""))));
    }
    _ref5 = opts.rows;
    for (_l = 0, _len4 = _ref5.length; _l < _len4; _l++) {
      x = _ref5[_l];
      this.find("#rows").append(this.find("#axis_" + (x.replace(/\s/g, ""))));
    }
    _ref6 = opts.vals;
    for (_m = 0, _len5 = _ref6.length; _m < _len5; _m++) {
      x = _ref6[_m];
      this.find("#mesVals").append(this.find("#axis_" + (x.replace(/\s/g, ""))));
    }
    if (opts.aggregatorName != null) {this.find("#aggregator").val(opts.aggregatorName);}
    if (opts.rendererName != null) {this.find("#renderer").val(opts.rendererName);}
    refresh = __bind(function() {
    
      var exclusions, subopts, vals;
      subopts = {derivedAttributes: opts.derivedAttributes};
      subopts.cols = [];
      subopts.rows = [];
      vals = [];
      this.find("#rows li nobr").each(function() {return subopts.rows.push($(this).text());});
      this.find("#cols li nobr").each(function() {return subopts.cols.push($(this).text());});
      this.find("#vals li nobr").each(function() {return vals.push($(this).text());});
	 
      subopts.aggregator = opts.aggregators[aggregator.val()](vals);
      subopts.renderer = opts.renderers[renderer.val()];
      exclusions = [];
      this.find('input.pvtFilter').not(':checked').each(function() {return exclusions.push($(this).data("filter"));});
      subopts.filter = function(record) {
        var v, _len6, _n, _ref7;
        for (_n = 0, _len6 = exclusions.length; _n < _len6; _n++) {
          _ref7 = exclusions[_n], k = _ref7[0], v = _ref7[1];
          if (record[k] === v) {return false;}
        }
        return true;
      };
      pivotTable.pivot(input, subopts);
      try{$(".pvtAxisLabel")[$(".pvtAxisLabel").length-1].setAttribute("colspan",2);}catch(er){}
      return this.data("pivotUIOptions", {
        cols: subopts.cols,
        rows: subopts.rows,
        vals: vals,
        hiddenAttributes: opts.hiddenAttributes,
        renderers: opts.renderers,
        aggregators: opts.aggregators,
        derivedAttributes: opts.derivedAttributes,
        aggregatorName: aggregator.val(),
        rendererName: renderer.val()
      });
    }, this);
       
    refresh();
    this.find(".pvtAxisContainer").sortable({
      connectWith: ".pvtAxisContainer",
      items: 'li',
	  receive:function(e){
     
	  var my_id=e.originalEvent.target.id.split("_")[1];
		  if(e.target.id!="unused"){
		  for(k in inputOpts.linkedAttributes){
		  if(inputOpts.linkedAttributes[k].indexOf(my_id)!=-1){
			   for(kk in inputOpts.linkedAttributes[k]){
				   internalTest=$("#axis_"+inputOpts.linkedAttributes[k][kk]);
				   if(  internalTest.parent().get(0).id!="unused")
				   {
                                 
                                  $("#"+e.target.id).append($("#axis_"+inputOpts.linkedAttributes[k][kk]));
                              }
				}
				break;
			}
		  }
                     /**/
                   var c= $("#rows li");
                  $("#rows").empty();
                
                
              for (var testi=0;testi<c.length;testi++){
                       
                       
                        if(testi==0 ){
          if(!FAOSTATNEWOLAP.nestedby){
          $("#rows").append($("<span  style=' float: left;width: 80px;' >Rows</span>"));}
      else{ $("#rows").append($("<span  style=' float: left;width: 80px;' >"+$.i18n.prop('_nestedby2')+"</span>"));}
  } 
  else if(testi==1 && FAOSTATNEWOLAP.nestedby)
      { $("#rows").append($("<br><br><span  style=' width: 80px;' > Rows </span>"));}
                       
                       
                       
                       $("#rows").append(c[testi]);
                   
              }/**/
	  }
	 else{
            
                  $("#"+e.target.id).append($("#axis_"+my_id));
              }
	}
    }).bind("sortstop", refresh2);
    return this;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*
  Heatmap post-processing
  */
  $.fn.heatmap = function(scope) {
    var colorGen, heatmapper, i, j, numCols, numRows, _ref;
    if (scope == null) {scope = "heatmap";}
    _ref = this.data("dimensions"), numRows = _ref[0], numCols = _ref[1];
    colorGen = function(color, min, max) {
      var hexGen;
      hexGen = (function() {
        switch (color) {
          case "red":
            return function(hex) {return "ff" + hex + hex;};
          case "green":
            return function(hex) {return "" + hex + "ff" + hex;};
          case "blue":
            return function(hex) {return "" + hex + hex + "ff";};
        }
      })();
      return function(x) {
        var hex, intensity;
        intensity = 255 - Math.round(255 * (x - min) / (max - min));
        hex = intensity.toString(16).split(".")[0];
        if (hex.length === 1) {hex = 0 + hex;}
        return hexGen(hex);
      };
    };
    heatmapper = __bind(function(scope, color) {
      var colorFor, forEachCell, values;
      forEachCell = __bind(function(f) {
        return this.find(scope).each(function() {
          var x;
          x = $(this).data("value");
          if ((x != null) && isFinite(x)) {return f(x, $(this));}
        });
      }, this);
      values = [];
      forEachCell(function(x) {return values.push(x);});
	  
      colorFor = colorGen(color, Math.min.apply(Math, values), Math.max.apply(Math, values));
      return forEachCell(function(x, elem) {return elem.css("background-color", "#" + colorFor(x));});
    }, this);
    switch (scope) {
      case "heatmap":
        heatmapper(".pvtVal", "red");
        break;
      case "rowheatmap":
        for (i = 0; 0 <= numRows ? i < numRows : i > numRows; 0 <= numRows ? i++ : i--)
		{heatmapper(".pvtVal.row" + i, "red");}
        break;
      case "colheatmap":
        for (j = 0; 0 <= numCols ? j < numCols : j > numCols; 0 <= numCols ? j++ : j--) 
		{heatmapper(".pvtVal.col" + j, "red");}
    }
    heatmapper(".pvtTotal.rowTotal", "red");
    heatmapper(".pvtTotal.colTotal", "red");
    return this;
  };
  /*
  Barchart post-processing
  */
  $.fn.barchart = function() {
    var barcharter, i, numCols, numRows, _ref;
    _ref = this.data("dimensions"), numRows = _ref[0], numCols = _ref[1];
    barcharter = __bind(function(scope) {
      var forEachCell, max, scaler, values;
      forEachCell = __bind(function(f) {
        return this.find(scope).each(function() {
          var x;
          x = $(this).data("value");
          if ((x != null) && isFinite(x)) {return f(x, $(this));}
        });
      }, this);
      values = [];
      forEachCell(function(x) {return values.push(x);});
      max = Math.max.apply(Math, values);
      scaler = function(x) {return 100 * x / (1.4 * max);};
      return forEachCell(function(x, elem) {
        var text, wrapper;
        text = elem.text();
        wrapper = $("<div>").css({
          "position": "relative",
          "height": "55px"
        });
        wrapper.append($("<div>").css({
          "position": "absolute",
          "bottom": 0,
          "left": 0,
          "right": 0,
          "height": scaler(x) + "%",
          "background-color": "gray"
        }));
        wrapper.append($("<div>").text(text).css({
          "position": "relative",
          "padding-left": "5px",
          "padding-right": "5px"
        }));
        return elem.css({
          "padding": 0,
          "padding-top": "5px",
          "text-align": "center"
        }).html(wrapper);
      });
    }, this);
    for (i = 0; 0 <= numRows ? i < numRows : i > numRows; 0 <= numRows ? i++ : i--) 
	{barcharter(".pvtVal.row" + i);}
    barcharter(".pvtTotal.colTotal");
    return this;
  };
}
).call(this);
