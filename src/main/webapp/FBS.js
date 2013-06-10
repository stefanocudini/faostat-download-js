
var lang="E";
//Waste out ,5123:9
var traduction={S:{filterOff:"Filtro",filterOn:"Filtro ",countries:"Pais",regions:"Regiones",both:"Ambos",year:"A&ntilde;o",items:"Articulos",choosecountries:"Selecciona un pais",chooseitem:"Selecciona un articulo",showdata:"Mostrar datos",exportdata:"Exportar datos",commodities:"Articulos",aggregate:"agregado",domesticsupply:"Suministro interno",domesticutilization:"Utilizacion interna",percatitasupply:"Suministro per capita",metricstons:"1000 Toneladas",population:"Poblacion (Miles)",all:"Todos",none:"Ninguno",reverse:"Reverso",fullscreen:"Pantalla completa",fbs:"Balances Alimentarios",total:"Total",protein:"Protein",fat:"Fat",supply:"Supply",utilisation:"Utilisation",showcode:"Show Code",domestic:"Supply/Utilization"},

F:{filterOff:"Filtre",filterOn:"Filtre",countries:"Pays",regions:"Region",both:"Tous",year:"Annee",items:"Produits",choosecountries:"Choisir un pays",chooseitem:"Choisir un item",showdata:"Previsualisation",exportdata:"Export Excel",commodities:"Produits",domesticsupply:"Offre interieure",aggregate:"agreggation",domesticutilization:"Utilisation domestique",percatitasupply:"Approvisionnements par habitant",metricstons:"1000 Tonnes",population:"Population",all:"Tous",none:"Aucun",reverse:"Inverse",fullscreen:"Plein ecran",fbs:"Bilans Alimentaires",total:"Total",protein:"Protein",fat:"Fat",supply:"Supply",utilisation:"Utilisation",showcode:"Show Code",domestic:"Supply/Utilization"},

E:{filterOff:"Filter",filterOn:"Filter",countries:"Countries",regions:"Regions",both:"Both",year:"Year",items:"Items",choosecountries:"Choose a country",chooseitem:"Choose an item",aggregate:"Item aggregations",showdata:"Show Data",exportdata:"Export Data",commodities:"Single Items",domesticsupply:"Domestic Supply",domesticutilization:"Domestic Utilization",percatitasupply:"Per Capita Supply",metricstons:"1000 Metric tons",population:"Population (Thousand)",all:"ALL",none:"none",reverse:"Reverse",fullscreen:"Full screen",fbs:"Food Balance Sheets",total:"Total",protein:"Prot.",fat:"Fat",supply:"Supply",utilisation:"Utilisation",showcode:"Show Code",domestic:"Supply/Utilization"}

};

var myIndex={5511:1,5611:2,5072:3,5911:4,5301:5,5521:6,5527:7,5131:8,5154:9,5142:10,645:11,664:12,674:13,684:14};

var myIndexNoDom={5511:1,5611:2,5072:3,5911:5,5301:4,5521:6,5527:7,5131:8,5154:9,5142:10,645:11,664:12,674:13,684:14};
//Waste out {t:"Waste",v:5123},
 var header=[
 {t:"Prod.",v:5511,E:"Prod-"},
 {t:"Impo.",v:5611,E:"Impo-"},
 {t:"Stock Var.",v:5072,E:"Invent"},
 {t:"Exp.",v:5911,E:"Exp-"},
 {t:"Total",v:5301,E:"Total"},
 {t:"Feed",v:5521,E:"Alim-"},
 {t:"Seed",v:5527,E:"Semi-"},
 {t3:"Processing",t:"Food Manu",v:5131,E:"Manu/alim"},
 
 {t3:"Other Util",t:"Oth. Uses",v:5154,E:"Usos"},//;628
 {t:"Food",v:5142,E:"Alimentos"},
 {t:"Kg / Yr",v:645,E:"Kg/An"},
 {t:"KCal / Day",v:664,E:"Por dia Cal-Num"},
 {t:"Gr / Day",v:674,E:"Por dia Pro. Gr."},
 {t:"Gr / Day",v:684,E:"Por dia Grasa Gr"}
 ];
  var headerNoDom=[
 {t:"Prod.",v:5511,E:"Prod-"},
 {t:"Impo.",v:5611,E:"Impo-"},
 {t:"Stock Var.",v:5072,E:"Invent"},
 {t:"Total",v:5301,E:"Total"},
  {t:"Exp.",v:5911,E:"Exp-"},
 {t:"Feed",v:5521,E:"Alim-"},
 {t:"Seed",v:5527,E:"Semi-"},
 {t3:"Processing",t:"Food Manu",v:5131,E:"Manu/alim"},
 
 {t3:"Other Util",t:"Oth. Uses",v:5154,E:"Usos"},//;628
 {t:"Food",v:5142,E:"Alimentos"},
 {t:"Kg / Yr",v:645,E:"Kg/An"},
 {t:"KCal / Day",v:664,E:"Por dia Cal-Num"},
 {t:"Gr / Day",v:674,E:"Por dia Pro. Gr."},
 {t:"Gr / Day",v:684,E:"Por dia Grasa Gr"}
 ];
 
 var tri=0;
 var asc=0;//sort asc or desc?
var arrF=[];
var totChroma;
var tFinal="";
var filterOnOff=0;
CTOptions={width: "100%",
		height: "95%",
		scrolling: "yes"};



if (window.XMLHttpRequest) {
var reqC = new XMLHttpRequest();//Country
var req = new XMLHttpRequest();//Item
var reqRes = new XMLHttpRequest();//Result
 }
else {
        try {
		var reqC = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		var req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		var reqRes = new ActiveXObject("MSXML2.XMLHTTP.3.0");
        }
        catch(ex) {alert("Your browser don t support XMLHTTP objects")}
    }




function init()
{
Year();
Country();
Items();
document.getElementById("result").innerHTML="";
document.getElementById('menu_tabCountry').style.backgroundImage="url('img/countriesTabOn.gif')";
}


function Year()
{ 
  mycountry=document.getElementById('sYear');
  var d = new Date();
  dd=d.getFullYear();
  for(var i=2009;i>1960;i--)
  {
		var o=document.createElement("option");
		o.setAttribute('value',i);
		var t=document.createTextNode(i);
		o.appendChild(t);
		mycountry.appendChild(o);
	}
 }

function Country()
{
var param={
"selects":[{"aggregation":"NONE","column":"A.AreaCode","alias":"AreaCode"},
	{"aggregation":"NONE","column":"A.AreaName"+lang,"alias":"AreaName"+lang},
	{"aggregation":"NONE","column":"A.AreaLevel","alias":"AreaLevel"}
],
"froms":[
		{"column":"Area","alias":"A"},
		{"column":"DomainArea","alias":"DA"}
		],
"wheres":[
		{"datatype" : "TEXT",
		"column" : "DA.DomainCode",
		"operator" : "=",
		"value" : "FB",
		"ins" : []},
		{"datatype" : "DATE",
		"column" : "A.AreaCode",
		"operator" : "=",
		"value" : "DA.AreaCode",
		"ins" : []}
		
		],
		 "orderBys" :[{"column" : "A.AreaLevel"},{"column" : "A.AreaName"+lang}]
		,"limit" : null,
		 "query" : "NONE",
		 "frequency" : "NONE"
		
};

 var data = {};
                        data.datasource = 'faostat';
                        data.thousandSeparator = ',';
                        data.decimalSeparator = '.';
                        data.decimalNumbers = '2';
                        data.json = JSON.stringify(param);
                        data.cssFilename = 'faostat';
                        data.valueIndex = '1';

						//	req.open("POST", "http://faostat3.fao.org/wds/api"+param,true);

						
						 $.ajax({
						 type : 'POST',
						 url : 'http://faostat3.fao.org/wds/rest/table/json',
						 data : data,
						 success : function(response) {
						 var myJson=response;
						 mycountry=document.getElementById('sCountry');
						 for(var i=1;i<myJson.length;i++)
							 {
							 var o=document.createElement("option");
							 o.setAttribute('value',myJson[i][0]);
							 var t=document.createTextNode(myJson[i][1]);
							 o.appendChild(t);
							 mycountry.appendChild(o);
							 }
						 },
						 error : function(err, b, c) {console.log(err);}
                        });
}

function fillCountries()
{ if (reqC.readyState == 4 && reqC.status =="200" ) 
   {
   var myJson=JSON.parse(reqC.responseText);
   mycountry=document.getElementById('sCountry');
  for(var i=1;i<myJson.length;i++)
	{
		var o=document.createElement("option");
		o.setAttribute('value',myJson[i][0]);
		var t=document.createTextNode(myJson[i][1]);
		o.appendChild(t);
		mycountry.appendChild(o);
	}
   }
 }
 
 
 
 function Items(){
var param={
"selects":[{"aggregation":"NONE","column":"A.ItemCode","alias":"ItemCode"},	{"aggregation":"NONE","column":"A.ItemName"+lang,"alias":"ItemName"+lang}],
"froms":[
		{"column":"Item","alias":"A"},{"column":"DomainItem","alias":"DA"}],
"wheres":[
		{"datatype" : "TEXT",
		"column" : "DA.DomainCode",
		"operator" : "=",
		"value" : "FB",
		"ins" : []},
		{"datatype" : "DATE",
		"column" : "A.ItemCode",
		"operator" : "=",
		"value" : "DA.ItemCode",
		"ins" : []}
		],
		 "orderBys" :[{"column" : "A.ItemName"+lang}]
		,"limit" : null,
		 "query" : "NONE",
		 "frequency" : "NONE"
};

 var data = {};
data.datasource = 'faostat';
data.thousandSeparator = ',';
data.decimalSeparator = '.';
data.decimalNumbers = '2';
data.json = JSON.stringify(param);
data.cssFilename = 'faostat';
data.valueIndex = '1';
$.ajax({type : 'POST',
        url : 'http://faostat3.fao.org/wds/rest/table/json',
        data : data,
         success : function(response) {
		 var myJson=response;
		 mycountry=document.getElementById('sItem');
		 for(var i=1;i<myJson.length;i++){
		 var o=document.createElement("option");
		 o.setAttribute('value',myJson[i][0]);
		 var t=document.createTextNode(myJson[i][1]);
		 o.appendChild(t);
		 mycountry.appendChild(o);
		 }
		},
		error : function(err, b, c) {console.log(err);}
		});
	
}

function fillItems()
{ if (req.readyState == 4 && req.status =="200" ) 
   {
	var myJson=JSON.parse(req.responseText);
	mycountry=document.getElementById('sItem');
	  for(var i=1;i<myJson.length;i++)
		{
			var o=document.createElement("option");
			o.setAttribute('value',myJson[i][0]);
			
			var t=document.createTextNode(myJson[i][1]);
			o.appendChild(t);
			if(myJson[i][2]>5){var sep=document.createTextNode("+");o.appendChild(sep);}
			mycountry.appendChild(o);
		}
   }
 }
 
function showDataTEST(){}
 
function showData()
{
var pays=document.getElementById("sCountry").value;

var items=document.getElementById("sItem").value;
var annee=document.getElementById("sYear").value;
//console.log(items+" "+pays);
if (items!="" || pays!=""){
document.getElementById("result").innerHTML="<img src=\"/home/faostat-download-js/preloadFBS.gif\" />";

//try{
var myTata=0;
if (document.getElementById("tabItem").className=="invi"){myTata=1;}else{myTata=0;}
if((document.getElementById("rc3").checked && myTata==1)|| (document.getElementById("ri3").checked && myTata==0))
{
myFilter2.style.display="block";
myFilter3.style.display="block";

myFilter2Button.style.display="block";
myFilter3Button.style.display="block";
}
else if((document.getElementById("rc2").checked && myTata==1) || (document.getElementById("ri2").checked  && myTata==0))
{

myFilter2.style.display="none";
myFilter3.style.display="block";
myFilter2Button.style.display="none";
myFilter3Button.style.display="block";
}
else
{

myFilter2.style.display="block";
myFilter3.style.display="none";
myFilter2Button.style.display="block";
myFilter3Button.style.display="none";
}

//}catch(e){console.log("pas trouve")}




	if(items=="")
		{
		var param={
"selects":[{"aggregation":"NONE","column":"ItemLevel","alias":"ItemLevel"}
,{"aggregation":"NONE","column":"AreaCode","alias":"AreaCode"}
,	{"aggregation":"NONE","column":"AreaName"+lang,"alias":"AreaName"+lang}
,	{"aggregation":"NONE","column":"ItemCode","alias":"ItemCode"}
,	{"aggregation":"NONE","column":"ItemName"+lang,"alias":"ItemName"+lang}
,	{"aggregation":"NONE","column":"ElementCode","alias":"ElementCode"}
,	{"aggregation":"NONE","column":"ElementName"+lang,"alias":"ElementName"+lang}
,	{"aggregation":"NONE","column":"Year","alias":"Year"}
,	{"aggregation":"NONE","column":"Value","alias":"Value"}
,	{"aggregation":"NONE","column":"Flag","alias":"Flag"}
],
"froms":[
		{"column":"vFBSItem","alias":"vFBSItem"}],
"wheres":[
		{"datatype" : "TEXT",
		"column" : "AreaCode",
		"operator" : "=",
		"value" : pays,
		"ins" : []},
		{"datatype" : "DATE",
		"column" : "Year",
		"operator" : "=",
		"value" : annee,
		"ins" : []}
		],
		 "orderBys" :[{"column" : "Year"},{"column" : "AreaCode"},{"column" : "Ord"}]
		,"limit" : null,
		 "query" : "NONE",
		 "frequency" : "NONE"
};

if(document.getElementById("rc1").checked){param["wheres"].push({"datatype" : "TEXT",
		"column" : "ItemLevel",
		"operator" : "=",
		"value" : 15,
		"ins" : []})
		}
		else if(document.getElementById("rc2").checked){param["wheres"].push({"datatype" : "TEXT",
		"column" : "ItemLevel",
		"operator" : ">",
		"value" : 15,
		"ins" : []})
		}

 var data = {};
data.datasource = 'faostat';
data.thousandSeparator = ',';
data.decimalSeparator = '.';
data.decimalNumbers = '2';
data.json = JSON.stringify(param);
//console.log(param)
data.cssFilename = 'faostat';
data.valueIndex = '1';
//console.log(param);
$.ajax({type : 'POST',
        url : 'http://faostat3.fao.org/wds/rest/table/json',
        data : data,
        success : function(response) {

document.getElementById("result").innerHTML="";

  var myJson=response;
   var curPos="";
   var curItem="";
   var myLine=[];
   var body=document.getElementById("result");
   var tbl = document.createElement("table");
   tbl.setAttribute("id","resultTable");
   var tblB = document.createElement("tbody");
   var tblH = document.createElement("thead");
   
   
   
   var row=document.createElement("tr");
var cell = document.createElement("th");
cell.setAttribute("id","thTitle");
	if(document.getElementById("showCode").checked){cell.colSpan=12;}else{cell.colSpan=11;}
	var txtCell = document.createTextNode(document.getElementById("sCountry").getElementsByTagName("option")[document.getElementById("sCountry").selectedIndex].innerHTML);
	cell.appendChild(txtCell);
	var txtCell = document.createElement("br");
	cell.appendChild(txtCell);
	var txtCell = document.createTextNode(document.getElementById("sYear").getElementsByTagName("option")[document.getElementById("sYear").selectedIndex].innerHTML);
	
	var myI=document.createElement("i");
	myI.appendChild(txtCell);
	cell.appendChild(myI);
	row.appendChild(cell);
	
	var cell = document.createElement("th");
	cell.setAttribute("id","titleFBS");
	
	cell.colSpan=4;
	var txtCell = document.createTextNode(traduction[lang].fbs);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	
	tblH.appendChild(row);
   
   
   
   
   
   var row = document.createElement("tr");
 //  row.style.height="40px";
	var cell = document.createElement("th");
	if(document.getElementById("showCode").checked){cell.colSpan=12;}else{cell.colSpan=11;}
	cell.setAttribute("id","emptyPop");
	cell.setAttribute("class","thPopEmpty");
	
	

	var mybutton=document.createElement("div");
	mybutton.setAttribute("id","btnFilter");
	mybutton.setAttribute("onclick","cache('myFilter')");
		mybutton.setAttribute("class","myButton");
	mybutton.innerHTML="<img src=\"/home/faostat-download-js/images/filter.png\" /><p class=\"up\">"+traduction[lang].filterOff+"</p>";
	
	cell.appendChild(mybutton); 
	

	var myA=document.createElement("div");

	myA.setAttribute("onClick","toExcel()");
	myA.setAttribute("id","btnExcel");
	myA.innerHTML="<img src=\"/home/faostat-download-js/images/export.png\" /><p class=\"up\">"+traduction[lang].exportdata+"</p>";
	
	cell.appendChild(myA);
	
	var myA=document.createElement("div");
	myA.setAttribute("class","various myButton");
	myA.setAttribute("id","btnFS");
	myA.setAttribute("data-fancybox-type","iframe");
	myA.setAttribute("href","popup.jsp");
	myA.setAttribute("target","myFanzy");
	myA.innerHTML=	"<img src=\"/home/faostat-download-js/images/full.png\"/><p class=\"up\">"+traduction[lang].fullscreen+"</p>";
	cell.appendChild(myA);
	
	row.appendChild(cell); 
	
	
var cell = document.createElement("th");
cell.setAttribute("class","popClass");
cell.colSpan=3;
var txtCell = document.createTextNode(traduction[lang].population);//trad
cell.setAttribute("class","bgBlue");
cell.appendChild(txtCell);
row.appendChild(cell);


var cell = document.createElement("td");
var txtCell = document.createTextNode(myJson[1][8]);
cell.setAttribute("class","popTotal");
cell.appendChild(txtCell);
row.appendChild(cell);
tblH.appendChild(row);
/*FIN POPULATION*/

var row = document.createElement("tr");
row.setAttribute("id","myFilter");
row.setAttribute("class","invi");
var cell = document.createElement("th");
if(document.getElementById("showCode").checked){
	cell.colSpan=16;}
	else{cell.colSpan=15;}

cell.appendChild(myFilter2Button);




cell.appendChild(myFilter3Button);


var mydiv=document.createElement("div");
mydiv.setAttribute("style","display:block;clear:both");


mydiv.appendChild(myFilter2);

mydiv.appendChild(myFilter3);
cell.appendChild(mydiv);

row.appendChild(cell);
tblH.appendChild(row);


/*FIN FILTER*/

var row = document.createElement("tr");
var cell = document.createElement("th");
if(document.getElementById("showCode").checked){
cell.colSpan=2;}
cell.rowSpan=3;
var txtCell = document.createTextNode(traduction[lang].commodities);//trad
cell.style.cursor="pointer";
cell.setAttribute("class","thCol");
cell.setAttribute("OnClick","showData()");
cell.appendChild(txtCell); 
row.appendChild(cell); 


var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticsupply);//trad
}
else{cell.colSpan=4;
var txtCell = document.createTextNode(traduction[lang].supply);}
cell.setAttribute("class","bgBlue");
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticutilization);//trad
}
else{cell.colSpan=6;
var txtCell = document.createTextNode(traduction[lang].utilisation);//trad
}
cell.setAttribute("class","bgBlue");
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
var txtCell = document.createTextNode(traduction[lang].percatitasupply);//trad
cell.setAttribute("class","bgBlue");
cell.colSpan=4;
cell.appendChild(txtCell);
row.appendChild(cell);

tblH.appendChild(row);

var row = document.createElement("tr");
{
var cell = document.createElement("th");
cell.colSpan=10;
var txtCell = document.createTextNode(traduction[lang].metricstons);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=2;
var txtCell = document.createTextNode(traduction[lang].total);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].protein);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].fat);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

}
tblH.appendChild(row);

var row = document.createElement("tr");
if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{
var cell = document.createElement("th");
cell.style.cursor="pointer";

cell.setAttribute("OnClick","reTri("+i+")");
var txtCell = document.createTextNode(headert[i].t);
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);




var row = document.createElement("tr");
row.style.display="none";
var cell = document.createElement("th");
var txtCell = document.createTextNode("");
cell.appendChild(txtCell);
row.appendChild(cell);
if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{var cell = document.createElement("td");
var txtCell = document.createTextNode(headert[i].t);
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);

tbl.appendChild(tblH);
/*DEBUT DATA*/
var imax=0;
var nl=0;
try{
myFilter2.innerHTML="";
}catch(e){}
try{
myFilter3.innerHTML="";
}catch(e){}
 for(var i=2;i<myJson.length;i++)
 {
	 if(curItem!=myJson[i][3])
		 {
		 curItem=myJson[i][3];
		 var myfil=	document.createElement("input");
		myfil.setAttribute("type","checkbox");
		myfil.setAttribute("id","chk_"+i);
		myfil.setAttribute("checked",true);
		myfil.setAttribute("onclick","cache('myTr_"+nl+"');");
		myfil.setAttribute("value","myTr_"+nl);
		//nl++;
		var mylab=	document.createElement("label");
		mylab.setAttribute("for","chk_"+i);

		var txtCell = document.createTextNode(myJson[i][4]);
if(myJson[i][0]==15){		
			myFilter2.appendChild(myfil);
			mylab.appendChild(txtCell);
			myFilter2.appendChild(mylab);
			var myBr=document.createElement("br");
			myFilter2.appendChild(myBr);
		 }
		 else{
			myFilter3.appendChild(myfil);
			mylab.appendChild(txtCell);
			myFilter3.appendChild(mylab);
			var myBr=	document.createElement("br");
			myFilter3.appendChild(myBr);
		 }
		 nl++;
		 if(myLine.length>0){
			
			nlt=nl-2;
		
			writeTR(tblB,myLine,"myTr_"+nlt);
			}
			
		 myLine=[];
		 }
	 myLine[0]=myJson[i][0]+"_"+myJson[i][4]+"_"+myJson[i][3];
	
 
 if(document.getElementById("showDomestic").checked){
 if(myIndex[myJson[i][5]]>0){ myLine[myIndex[myJson[i][5]]]=parseFloat(myJson[i][8]); }
 }
 else{ if(myIndexNoDom[myJson[i][5]]>0){ myLine[myIndexNoDom[myJson[i][5]]]=parseFloat(myJson[i][8]); } }
 }
  nlt=nl-1;
writeTR(tblB,myLine,"myTr_"+nlt);//derniere Ligne

 tbl.appendChild(tblB);

tbl.setAttribute("width", "100%"); 
body.appendChild(tbl);

document.getElementById('btnExcel').className="myButton"
totChroma=$("#resultTable").chromatable(CTOptions);	
		},
		error : function(err, b, c) {console.log(err);}
		});
		/*
		var param="?out=json&db=faostat";
		param+="&select=ItemLevel,AreaCode,AreaName"+lang+",ItemCode,ItemName"+lang+",ElementCode,ElementName"+lang+",Year,Value,Flag";
		param+="&from=vFBSItem";
		if(document.getElementById("rc3").checked){
		param+="&where=AreaCode%28"+pays+"%29,Year%28"+annee+"%29";
		}else
		if(document.getElementById("rc1").checked){
		param+="&where=AreaCode%28"+pays+"%29,Year%28"+annee+"%29,ItemLevel%2815%29";
		}else
		if(document.getElementById("rc2").checked){
		param+="&where=AreaCode%28"+pays+"%29,Year%28"+annee+"%29,ItemLevel%2820:25:30:35%29";
		}
		param+="&orderby=Year,AreaCode,Ord";
		console.log("http://faostat3.fao.org/wds/api"+param);
		reqRes.open("POST", "http://faostat3.fao.org/wds/api"+param,true);
		reqRes.onreadystatechange = createMyTableCountry; 
		reqRes.send(null);*/
		}
	else
		{
		var param={
"selects":[{"aggregation":"NONE","column":"ItemLevel","alias":"ItemLevel"}
,{"aggregation":"NONE","column":"AreaCode","alias":"AreaCode"}
,	{"aggregation":"NONE","column":"AreaName"+lang,"alias":"AreaName"+lang}
,	{"aggregation":"NONE","column":"ItemCode","alias":"ItemCode"}
,	{"aggregation":"NONE","column":"ItemName"+lang,"alias":"ItemName"+lang}
,	{"aggregation":"NONE","column":"ElementCode","alias":"ElementCode"}
,	{"aggregation":"NONE","column":"ElementName"+lang,"alias":"ElementName"+lang}
,	{"aggregation":"NONE","column":"Year","alias":"Year"}
,	{"aggregation":"NONE","column":"Value","alias":"Value"}
,	{"aggregation":"NONE","column":"Flag","alias":"Flag"}
],
"froms":[
		{"column":"vFBSCountry","alias":"vFBSCountry"}],
"wheres":[
		{"datatype" : "TEXT",
		"column" : "ItemCode",
		"operator" : "=",
		"value" : items,
		"ins" : []},
		{"datatype" : "DATE",
		"column" : "Year",
		"operator" : "=",
		"value" : annee,
		"ins" : []}
		],
		 "orderBys" :[{"column" : "Year"},{"column" : "ItemCode"},{"column" : "Ord"}]
		,"limit" : null,
		 "query" : "NONE",
		 "frequency" : "NONE"
};

if(document.getElementById("ri1").checked){param["wheres"].push({"datatype" : "TEXT",
		"column" : "ItemLevel",
		"operator" : "=",
		"value" : 15,
		"ins" : []})
		}
		else if(document.getElementById("ri2").checked){param["wheres"].push({"datatype" : "TEXT",
		"column" : "ItemLevel",
		"operator" : ">",
		"value" : 15,
		"ins" : []})
		}

 var data = {};
data.datasource = 'faostat';
data.thousandSeparator = ',';
data.decimalSeparator = '.';
data.decimalNumbers = '2';
data.json = JSON.stringify(param);
data.cssFilename = 'faostat';
data.valueIndex = '1';
$.ajax({type : 'POST',
        url : 'http://faostat3.fao.org/wds/rest/table/json',
        data : data,
        success : function(response) {


document.getElementById("result").innerHTML="";
//var myJson=JSON.parse(reqRes.responseText);
var myJson=response;
var curPos="";
var curItem="";
var myLine=[];
var body=document.getElementById("result");
var tbl = document.createElement("table");
tbl.setAttribute("id","resultTable");
var tblB = document.createElement("tbody");
var tblH = document.createElement("thead");
var row=document.createElement("tr");
var cell = document.createElement("th");

	if(document.getElementById("showCode").checked){cell.colSpan=12;}else{cell.colSpan=11;}
	cell.setAttribute("id","thTitle");
	var txtCell = document.createTextNode(document.getElementById("sItem").getElementsByTagName("option")[document.getElementById("sItem").selectedIndex].innerHTML);
	cell.appendChild(txtCell);
	var txtCell = document.createElement("br");
	cell.appendChild(txtCell);
	
	var txtCell = document.createTextNode(document.getElementById("sYear").getElementsByTagName("option")[document.getElementById("sYear").selectedIndex].innerHTML);
	var myI=document.createElement("i");
	myI.appendChild(txtCell);
	cell.appendChild(myI);
	row.appendChild(cell);
	
	var cell = document.createElement("th");
	cell.setAttribute("id","titleFBS");
	cell.colSpan=4;
	var txtCell = document.createTextNode(traduction[lang].fbs);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	
	tblH.appendChild(row);
	var row = document.createElement("tr");
    //row.style.height="40px";
	var cell = document.createElement("th");
	if(document.getElementById("showCode").checked){
	cell.colSpan=16;}
	else{cell.colSpan=15;}
	cell.setAttribute("id","emptyPop");
	cell.setAttribute("class","thPopEmpty");
	
	
	
	filterOnOff=0;
	var mybutton=document.createElement("div");
	mybutton.setAttribute("id","btnFilter");
	mybutton.setAttribute("onclick","cache('myFilter')");
		mybutton.setAttribute("class","myButton");
		
	mybutton.innerHTML="<img src=\"/home/faostat-download-js/images/filter.png\" /><p class=\"up\" id=\"pup\">"+traduction[lang].filterOff+"</p>";

	
	cell.appendChild(mybutton); 
	

	var myA=document.createElement("div");
	
	myA.setAttribute("onClick","toExcel()");
	myA.setAttribute("id","btnExcel");
	myA.innerHTML="<img src=\"/home/faostat-download-js/images/export.png\" /><p class=\"up\">"+traduction[lang].exportdata+"</p>";
	cell.appendChild(myA);
	
	var myA=document.createElement("div");
	myA.setAttribute("class","various myButton");
	myA.setAttribute("id","btnFS");
	myA.setAttribute("data-fancybox-type","iframe");
	myA.setAttribute("href","/home/faostat-download-js/popup.jsp");
	myA.setAttribute("target","myFanzy");
	myA.innerHTML=	"<img src=\"/home/faostat-download-js/images/full.png\"/><p class=\"up\">"+traduction[lang].fullscreen+"</p>";
	cell.appendChild(myA);
	row.appendChild(cell); 
	tblH.appendChild(row);
/**FILTER*/

var row = document.createElement("tr");
row.setAttribute("id","myFilter");
row.setAttribute("class","invi");
var cell = document.createElement("th");
if(document.getElementById("showCode").checked){cell.colSpan=16;}else{cell.colSpan=15;}
cell.appendChild(myFilter2Button);
cell.appendChild(myFilter3Button);
var mydiv=document.createElement("div");
mydiv.setAttribute("style","display:block;clear:both");
mydiv.appendChild(myFilter2);
mydiv.appendChild(myFilter3);
cell.appendChild(mydiv);
row.appendChild(cell);
tblH.appendChild(row);
/*FIN FILTER*/
var row = document.createElement("tr");
var cell = document.createElement("th");
cell.rowSpan=3;
if(document.getElementById("showCode").checked){cell.colSpan=2;}
var txtCell = document.createTextNode(traduction[lang].countries);
//trad
cell.setAttribute("class","thCol");
cell.appendChild(txtCell); 
cell.style.cursor="pointer";
cell.setAttribute("OnClick","showData()");
row.appendChild(cell); 




var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticsupply);
}
else{cell.colSpan=4;
var txtCell = document.createTextNode(traduction[lang].supply);}
//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticutilization);
}
else{cell.colSpan=6;
var txtCell = document.createTextNode(traduction[lang].utilisation);}
//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
var txtCell = document.createTextNode(traduction[lang].percatitasupply);
//trad
cell.colSpan=4;
cell.appendChild(txtCell);
row.appendChild(cell);

tblH.appendChild(row);



var row = document.createElement("tr");

var cell = document.createElement("th");
cell.colSpan=10;
var txtCell = document.createTextNode(traduction[lang].metricstons);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=2;
var txtCell = document.createTextNode(traduction[lang].total);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].protein);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].fat);//trad
cell.appendChild(txtCell);
row.appendChild(cell);


tblH.appendChild(row);


var row = document.createElement("tr");

if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{
var cell = document.createElement("th");
cell.style.cursor="pointer";
var txtCell = document.createTextNode(headert[i].t);
cell.setAttribute('OnClick',"reTri("+i+")");
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);

var row = document.createElement("tr");
row.style.display="none";
var cell = document.createElement("th");
var txtCell = document.createTextNode("");
cell.appendChild(txtCell);
row.appendChild(cell);
if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{var cell = document.createElement("td");
var txtCell = document.createTextNode(headert[i].t);
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);
tbl.appendChild(tblH);


/*DEBUT DATA*/
var nl=0;
myFilter2.innerHTML="";
myFilter3.innerHTML="";
 for(var i=2;i<myJson.length;i++)
 {
 if(curItem!=myJson[i][2])
 {
 curItem=myJson[i][2];
 var myfil=	document.createElement("input");
		myfil.setAttribute("type","checkbox");
		myfil.setAttribute("id","chk_"+i);
		myfil.setAttribute("checked",true);
		myfil.setAttribute("value","myTr_"+nl);
		myfil.setAttribute("onclick","cache('myTr_"+nl+"')");
		
		var mylab=	document.createElement("label");
		mylab.setAttribute("for","chk_"+i);

		var txtCell = document.createTextNode(myJson[i][2]);	
		if(myJson[i][0]==15){myFilter2.appendChild(myfil);
		mylab.appendChild(txtCell);
		myFilter2.appendChild(mylab);
		 var myBr=	document.createElement("br");
		 myFilter2.appendChild(myBr);}
		
		 else{myFilter3.appendChild(myfil);
		mylab.appendChild(txtCell);
		myFilter3.appendChild(mylab);
		 var myBr=	document.createElement("br");
		 myFilter3.appendChild(myBr);}
		 nl++;
 
 
 if(myLine.length>0){nlt=nl-2;writeTR(tblB,myLine,"myTr_"+nlt);}
 myLine=[];
 }
 myLine[0]=myJson[i][0]+"_"+myJson[i][2]+"_"+myJson[i][1];
 if(document.getElementById("showDomestic").checked){
 if(myIndex[myJson[i][5]]>0){ myLine[myIndex[myJson[i][5]]]=parseFloat(myJson[i][8]); }
 }
 else{
 if(myIndexNoDom[myJson[i][5]]>0){ myLine[myIndexNoDom[myJson[i][5]]]=parseFloat(myJson[i][8]); }
 }
 }
   nlt=nl-1;
writeTR(tblB,myLine,"myTr_"+nlt);//derniere Ligne
 tbl.appendChild(tblB);
body.appendChild(tbl);
tFinal=$("#resultTable");
document.getElementById('btnExcel').className="myButton";
totChroma=$("#resultTable").chromatable(CTOptions);	



		},
		error : function(err, b, c) {console.log(err);}
		});
		
		/*
		var param="?out=json&db=faostat";
		param+="&select=ItemLevel,AreaCode,AreaName"+lang+",ItemCode,ItemName"+lang+",ElementCode,ElementName"+lang+",Year,Value,Flag";
		param+="&from=vFBSCountry";
		if(document.getElementById("ri3").checked){
		param+="&where=ItemCode%28"+items+"%29,Year%28"+annee+"%29";
		}else
		if(document.getElementById("ri1").checked){
		param+="&where=ItemCode%28"+items+"%29,Year%28"+annee+"%29,ItemLevel%2815%29";
		}else
		if(document.getElementById("ri2").checked){
		param+="&where=ItemCode%28"+items+"%29,Year%28"+annee+"%29,ItemLevel%2820:25:30:35%29";
		}
		
		param+="&orderby=Year,ItemCode,Ord";
		reqRes.open("POST", "http://faostat3.fao.org/wds/api"+param,true);
		reqRes.onreadystatechange = createMyTableItem; 
		reqRes.send(null);
		*/
		
		
		}
}
else{document.getElementById("result").innerHTML="";}
}


function createMyTableItem()
{
if (reqRes.readyState == 4 && reqRes.status =="200" ) {
document.getElementById("result").innerHTML="";
var myJson=JSON.parse(reqRes.responseText);
var curPos="";
var curItem="";
var myLine=[];
var body=document.getElementById("result");
var tbl = document.createElement("table");
tbl.setAttribute("id","resultTable");
var tblB = document.createElement("tbody");
var tblH = document.createElement("thead");
var row=document.createElement("tr");
var cell = document.createElement("th");

	if(document.getElementById("showCode").checked){cell.colSpan=12;}else{cell.colSpan=11;}
	cell.setAttribute("id","thTitle");
	var txtCell = document.createTextNode(document.getElementById("sItem").getElementsByTagName("option")[document.getElementById("sItem").selectedIndex].innerHTML);
	cell.appendChild(txtCell);
	var txtCell = document.createElement("br");
	cell.appendChild(txtCell);
	var txtCell = document.createTextNode(document.getElementById("sYear").getElementsByTagName("option")[document.getElementById("sYear").selectedIndex].innerHTML);
	var myI=document.createElement("i");
	myI.appendChild(txtCell);
	cell.appendChild(myI);
	row.appendChild(cell);
	
	var cell = document.createElement("th");
	cell.setAttribute("id","titleFBS");
	cell.colSpan=4;
	var txtCell = document.createTextNode(traduction[lang].fbs);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	
	tblH.appendChild(row);
	var row = document.createElement("tr");
    //row.style.height="40px";
	var cell = document.createElement("th");
	if(document.getElementById("showCode").checked){
	cell.colSpan=16;}
	else{cell.colSpan=15;}
	cell.setAttribute("id","emptyPop");
	cell.setAttribute("class","thPopEmpty");
	
	
	
	filterOnOff=0;
	var mybutton=document.createElement("div");
	mybutton.setAttribute("id","btnFilter");
	mybutton.setAttribute("onclick","cache('myFilter')");
		mybutton.setAttribute("class","myButton");
		
	mybutton.innerHTML="<img src=\"/home/faostat-download-js/images/filter.png\" /><p class=\"up\" id=\"pup\">"+traduction[lang].filterOff+"</p>";

	
	cell.appendChild(mybutton); 
	

	var myA=document.createElement("div");
	
	myA.setAttribute("onClick","toExcel()");
	myA.setAttribute("id","btnExcel");
	myA.innerHTML="<img src=\"/home/faostat-download-js/images/export.png\" /><p class=\"up\">"+traduction[lang].exportdata+"</p>";
	cell.appendChild(myA);
	
	var myA=document.createElement("div");
	myA.setAttribute("class","various myButton");
	myA.setAttribute("id","btnFS");
	myA.setAttribute("data-fancybox-type","iframe");
	myA.setAttribute("href","popup.jsp");
	myA.setAttribute("target","myFanzy");
	myA.innerHTML=	"<img src=\"/home/faostat-download-js/images/full.png\"/><p class=\"up\">"+traduction[lang].fullscreen+"</p>";
	cell.appendChild(myA);
	row.appendChild(cell); 
	tblH.appendChild(row);
/**FILTER*/

var row = document.createElement("tr");
row.setAttribute("id","myFilter");
row.setAttribute("class","invi");
var cell = document.createElement("th");
if(document.getElementById("showCode").checked){cell.colSpan=16;}else{cell.colSpan=15;}
cell.appendChild(myFilter2Button);
cell.appendChild(myFilter3Button);
var mydiv=document.createElement("div");
mydiv.setAttribute("style","display:block;clear:both");
mydiv.appendChild(myFilter2);
mydiv.appendChild(myFilter3);
cell.appendChild(mydiv);
row.appendChild(cell);
tblH.appendChild(row);
/*FIN FILTER*/
var row = document.createElement("tr");
var cell = document.createElement("th");
cell.rowSpan=3;
if(document.getElementById("showCode").checked){cell.colSpan=2;}
var txtCell = document.createTextNode(traduction[lang].countries);
//trad
cell.setAttribute("class","thCol");
cell.appendChild(txtCell); 
cell.style.cursor="pointer";
cell.setAttribute("OnClick","showData()");
row.appendChild(cell); 




var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticsupply);
}
else{cell.colSpan=4;
var txtCell = document.createTextNode(traduction[lang].supply);}
//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticutilization);
}
else{cell.colSpan=6;
var txtCell = document.createTextNode(traduction[lang].utilisation);}
//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
var txtCell = document.createTextNode(traduction[lang].percatitasupply);
//trad
cell.colSpan=4;
cell.appendChild(txtCell);
row.appendChild(cell);

tblH.appendChild(row);



var row = document.createElement("tr");

var cell = document.createElement("th");
cell.colSpan=10;
var txtCell = document.createTextNode(traduction[lang].metricstons);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=2;
var txtCell = document.createTextNode(traduction[lang].total);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].protein);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].fat);//trad
cell.appendChild(txtCell);
row.appendChild(cell);


tblH.appendChild(row);


var row = document.createElement("tr");

if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{
var cell = document.createElement("th");
cell.style.cursor="pointer";
var txtCell = document.createTextNode(headert[i].t);
cell.setAttribute('OnClick',"reTri("+i+")");
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);

var row = document.createElement("tr");
row.style.display="none";
var cell = document.createElement("th");
var txtCell = document.createTextNode("");
cell.appendChild(txtCell);
row.appendChild(cell);
if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{var cell = document.createElement("td");
var txtCell = document.createTextNode(headert[i].t);
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);
tbl.appendChild(tblH);


/*DEBUT DATA*/
var nl=0;
myFilter2.innerHTML="";
myFilter3.innerHTML="";
 for(var i=2;i<myJson.length;i++)
 {
 if(curItem!=myJson[i][2])
 {
 curItem=myJson[i][2];
 var myfil=	document.createElement("input");
		myfil.setAttribute("type","checkbox");
		myfil.setAttribute("id","chk_"+i);
		myfil.setAttribute("checked",true);
		myfil.setAttribute("value","myTr_"+nl);
		myfil.setAttribute("onclick","cache('myTr_"+nl+"')");
		
		var mylab=	document.createElement("label");
		mylab.setAttribute("for","chk_"+i);

		var txtCell = document.createTextNode(myJson[i][2]);	
		if(myJson[i][0]==15){myFilter2.appendChild(myfil);
		mylab.appendChild(txtCell);
		myFilter2.appendChild(mylab);
		 var myBr=	document.createElement("br");
		 myFilter2.appendChild(myBr);}
		
		 else{myFilter3.appendChild(myfil);
		mylab.appendChild(txtCell);
		myFilter3.appendChild(mylab);
		 var myBr=	document.createElement("br");
		 myFilter3.appendChild(myBr);}
		 nl++;
 
 
 if(myLine.length>0){nlt=nl-2;writeTR(tblB,myLine,"myTr_"+nlt);}
 myLine=[];
 }
 myLine[0]=myJson[i][0]+"_"+myJson[i][2]+"_"+myJson[i][1];
 if(document.getElementById("showDomestic").checked){
 if(myIndex[myJson[i][5]]>0){ myLine[myIndex[myJson[i][5]]]=parseFloat(myJson[i][8]); }
 }
 else{
 if(myIndexNoDom[myJson[i][5]]>0){ myLine[myIndexNoDom[myJson[i][5]]]=parseFloat(myJson[i][8]); }
 }
 }
   nlt=nl-1;
writeTR(tblB,myLine,"myTr_"+nlt);//derniere Ligne
 tbl.appendChild(tblB);
body.appendChild(tbl);
tFinal=$("#resultTable");
document.getElementById('btnExcel').className="myButton";
totChroma=$("#resultTable").chromatable(CTOptions);	
 }
 }
 

 {
 var myFilter2Button=document.createElement("div");
myFilter2Button.setAttribute("id","myFilter2Button");
myFilter2Button.setAttribute("class","myFilterButton");
var b1=document.createElement("input");
b1.setAttribute("type","button");
b1.setAttribute("value",traduction[lang].all);//trad
b1.setAttribute("onclick","refAll(0)");
myFilter2Button.appendChild(b1);

var b1=document.createElement("input");
b1.setAttribute("type","button");
b1.setAttribute("value",traduction[lang].none);
//trad
b1.setAttribute("onclick","refNone(0)");
myFilter2Button.appendChild(b1);
var b1=document.createElement("input");
b1.setAttribute("type","button");
b1.setAttribute("value",traduction[lang].reverse);
//trad
b1.setAttribute("onclick","refRev(0)");
myFilter2Button.appendChild(b1);


var myFilter3Button=document.createElement("div");
myFilter3Button.setAttribute("id","myFilter3Button");
myFilter3Button.setAttribute("class","myFilterButton");
var b1=document.createElement("input");
b1.setAttribute("type","button");
b1.setAttribute("value",traduction[lang].all);
//trad
b1.setAttribute("onclick","refAll(1)");
myFilter3Button.appendChild(b1);

var b1=document.createElement("input");
b1.setAttribute("type","button");
b1.setAttribute("value",traduction[lang].none);
//trad
b1.setAttribute("onclick","refNone(1)");
myFilter3Button.appendChild(b1);
var b1=document.createElement("input");
b1.setAttribute("type","button");
b1.setAttribute("value",traduction[lang].reverse);
//trad
b1.setAttribute("onclick","refRev(1)");
myFilter3Button.appendChild(b1);

 var myFilter2=document.createElement("div");
myFilter2.setAttribute("class","divMyFilter");
myFilter2.setAttribute("id","myFilter2");
 
 var myFilter3=document.createElement("div");
myFilter3.setAttribute("class","divMyFilter");
myFilter3.setAttribute("id","myFilter3");
 }
 
function createMyTableCountry()
{

if (reqRes.readyState == 4 && reqRes.status =="200" ) 
   {document.getElementById("result").innerHTML="";
  try{ var myJson=JSON.parse(reqRes.responseText);}
  catch(e){console.log(e);}
   var curPos="";
   var curItem="";
   var myLine=[];
   var body=document.getElementById("result");
   var tbl = document.createElement("table");
   tbl.setAttribute("id","resultTable");
   var tblB = document.createElement("tbody");
   var tblH = document.createElement("thead");
   
   
   
   var row=document.createElement("tr");
var cell = document.createElement("th");
cell.setAttribute("id","thTitle");
	if(document.getElementById("showCode").checked){cell.colSpan=12;}else{cell.colSpan=11;}
	var txtCell = document.createTextNode(document.getElementById("sCountry").getElementsByTagName("option")[document.getElementById("sCountry").selectedIndex].innerHTML);
	cell.appendChild(txtCell);
	var txtCell = document.createElement("br");
	cell.appendChild(txtCell);
	var txtCell = document.createTextNode(document.getElementById("sYear").getElementsByTagName("option")[document.getElementById("sYear").selectedIndex].innerHTML);
	var myI=document.createElement("i");
	myI.appendChild(txtCell);
	cell.appendChild(myI);
	row.appendChild(cell);
	
	var cell = document.createElement("th");
	cell.setAttribute("id","titleFBS");
	
	cell.colSpan=4;
	var txtCell = document.createTextNode(traduction[lang].fbs);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	
	tblH.appendChild(row);
   
   
   
   
   
   var row = document.createElement("tr");
 //  row.style.height="40px";
	var cell = document.createElement("th");
	if(document.getElementById("showCode").checked){cell.colSpan=12;}else{cell.colSpan=11;}
	cell.setAttribute("id","emptyPop");
	cell.setAttribute("class","thPopEmpty");
	
	

	var mybutton=document.createElement("div");
	mybutton.setAttribute("id","btnFilter");
	mybutton.setAttribute("onclick","cache('myFilter')");
		mybutton.setAttribute("class","myButton");
	mybutton.innerHTML="<img src=\"/home/faostat-download-js/images/filter.png\" /><p class=\"up\">"+traduction[lang].filterOff+"</p>";
	
	cell.appendChild(mybutton); 
	

	var myA=document.createElement("div");

	myA.setAttribute("onClick","toExcel()");
	myA.setAttribute("id","btnExcel");
	myA.innerHTML="<img src=\"/home/faostat-download-js/images/export.png\" /><p class=\"up\">"+traduction[lang].exportdata+"</p>";
	
	cell.appendChild(myA);
	
	var myA=document.createElement("div");
	myA.setAttribute("class","various myButton");
	myA.setAttribute("id","btnFS");
	myA.setAttribute("data-fancybox-type","iframe");
	myA.setAttribute("href","popup.jsp");
	myA.setAttribute("target","myFanzy");
	myA.innerHTML=	"<img src=\"/home/faostat-download-js/images/full.png\"/><p class=\"up\">"+traduction[lang].fullscreen+"</p>";
	cell.appendChild(myA);
	
	row.appendChild(cell); 
	
	
var cell = document.createElement("th");
cell.setAttribute("class","popClass");
cell.colSpan=3;
var txtCell = document.createTextNode(traduction[lang].population);//trad
cell.setAttribute("class","bgBlue");
cell.appendChild(txtCell);
row.appendChild(cell);


var cell = document.createElement("td");
var txtCell = document.createTextNode(myJson[1][8]);
cell.setAttribute("class","popTotal");
cell.appendChild(txtCell);
row.appendChild(cell);
tblH.appendChild(row);
/*FIN POPULATION*/

var row = document.createElement("tr");
row.setAttribute("id","myFilter");
row.setAttribute("class","invi");
var cell = document.createElement("th");
if(document.getElementById("showCode").checked){
	cell.colSpan=16;}
	else{cell.colSpan=15;}

cell.appendChild(myFilter2Button);




cell.appendChild(myFilter3Button);


var mydiv=document.createElement("div");
mydiv.setAttribute("style","display:block;clear:both");


mydiv.appendChild(myFilter2);

mydiv.appendChild(myFilter3);
cell.appendChild(mydiv);

row.appendChild(cell);
tblH.appendChild(row);


/*FIN FILTER*/

var row = document.createElement("tr");
var cell = document.createElement("th");
if(document.getElementById("showCode").checked){
cell.colSpan=2;}
cell.rowSpan=3;
var txtCell = document.createTextNode(traduction[lang].commodities);//trad
cell.style.cursor="pointer";
cell.setAttribute("class","thCol");
cell.setAttribute("OnClick","showData()");
cell.appendChild(txtCell); 
row.appendChild(cell); 


var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticsupply);//trad
}
else{cell.colSpan=4;
var txtCell = document.createTextNode(traduction[lang].supply);}
cell.setAttribute("class","bgBlue");
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
if(document.getElementById("showDomestic").checked){
cell.colSpan=5;
var txtCell = document.createTextNode(traduction[lang].domesticutilization);//trad
}
else{cell.colSpan=6;
var txtCell = document.createTextNode(traduction[lang].utilisation);//trad
}
cell.setAttribute("class","bgBlue");
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
var txtCell = document.createTextNode(traduction[lang].percatitasupply);//trad
cell.setAttribute("class","bgBlue");
cell.colSpan=4;
cell.appendChild(txtCell);
row.appendChild(cell);

tblH.appendChild(row);

var row = document.createElement("tr");
{
var cell = document.createElement("th");
cell.colSpan=10;
var txtCell = document.createTextNode(traduction[lang].metricstons);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=2;
var txtCell = document.createTextNode(traduction[lang].total);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].protein);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

var cell = document.createElement("th");
cell.colSpan=1;
var txtCell = document.createTextNode(traduction[lang].fat);//trad
cell.appendChild(txtCell);
row.appendChild(cell);

}
tblH.appendChild(row);

var row = document.createElement("tr");
if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{
var cell = document.createElement("th");
cell.style.cursor="pointer";

cell.setAttribute("OnClick","reTri("+i+")");
var txtCell = document.createTextNode(headert[i].t);
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);




var row = document.createElement("tr");
row.style.display="none";
var cell = document.createElement("th");
var txtCell = document.createTextNode("");
cell.appendChild(txtCell);
row.appendChild(cell);
if(document.getElementById("showDomestic").checked){headert=header;}else{headert=headerNoDom;}
for(var i=0;i<headert.length;i++)
{var cell = document.createElement("td");
var txtCell = document.createTextNode(headert[i].t);
cell.appendChild(txtCell);
row.appendChild(cell);
}
tblH.appendChild(row);

tbl.appendChild(tblH);
/*DEBUT DATA*/
var imax=0;
var nl=0;
try{
myFilter2.innerHTML="";
}catch(e){}
try{
myFilter3.innerHTML="";
}catch(e){}
 for(var i=2;i<myJson.length;i++)
 {
	 if(curItem!=myJson[i][3])
		 {
		 curItem=myJson[i][3];
		 var myfil=	document.createElement("input");
		myfil.setAttribute("type","checkbox");
		myfil.setAttribute("id","chk_"+i);
		myfil.setAttribute("checked",true);
		myfil.setAttribute("onclick","cache('myTr_"+nl+"');");
		myfil.setAttribute("value","myTr_"+nl);
		//nl++;
		var mylab=	document.createElement("label");
		mylab.setAttribute("for","chk_"+i);

		var txtCell = document.createTextNode(myJson[i][4]);
if(myJson[i][0]==15){		
			myFilter2.appendChild(myfil);
			mylab.appendChild(txtCell);
			myFilter2.appendChild(mylab);
			var myBr=document.createElement("br");
			myFilter2.appendChild(myBr);
		 }
		 else{
			myFilter3.appendChild(myfil);
			mylab.appendChild(txtCell);
			myFilter3.appendChild(mylab);
			var myBr=	document.createElement("br");
			myFilter3.appendChild(myBr);
		 }
		 nl++;
		 if(myLine.length>0){
			
			nlt=nl-2;
		
			writeTR(tblB,myLine,"myTr_"+nlt);
			}
			
		 myLine=[];
		 }
	 myLine[0]=myJson[i][0]+"_"+myJson[i][4]+"_"+myJson[i][3];
	
 
 if(document.getElementById("showDomestic").checked){
 if(myIndex[myJson[i][5]]>0){ myLine[myIndex[myJson[i][5]]]=parseFloat(myJson[i][8]); }
 }
 else{ if(myIndexNoDom[myJson[i][5]]>0){ myLine[myIndexNoDom[myJson[i][5]]]=parseFloat(myJson[i][8]); } }
 }
  nlt=nl-1;
writeTR(tblB,myLine,"myTr_"+nlt);//derniere Ligne

 tbl.appendChild(tblB);

tbl.setAttribute("width", "100%"); 
body.appendChild(tbl);

document.getElementById('btnExcel').className="myButton"
totChroma=$("#resultTable").chromatable(CTOptions);	
}
}
 
 

 
 
 
 
 
function cache(id)
 {
 totChroma.resize();
 if(id=="myFilter"){
 if(filterOnOff==0){filterOnOff=1;}else{filterOnOff=0;}
if(document.getElementById(id).className=="visi"){document.getElementById(id).className="invi";}
else{document.getElementById(id).className="visi";}
/*
if(filterOnOff==0){document.getElementById("pup").innerHTML=traduction[lang].filterOff;}
else{document.getElementById("pup").innerHTML=traduction[lang].filterOn;}*/
 }
 else{
	 if(document.getElementById(id).className=="visi"){document.getElementById(id).className="invi";}
	 else{document.getElementById(id).className="visi";}
	 }
totChroma.resize();	
 }
 
 
 function reTri(i){
if(i==tri){asc++;if(asc==2){asc=0;}}
tri=i;
triDataset();
}


function triDataset()
{
arrF=[];
$("#resultTable tbody tr").each(function()
{
c=$(this);
if(c[0].getElementsByTagName("td").length>0)
{
cc=c[0].getElementsByTagName("td")[tri].innerHTML;
arrF.push([cc,$(this)]);
}
});


arrF.sort(function(a,b)
{
var aa=parseInt(a[0]);var bb=parseInt(b[0]);
if(isNaN(aa)){aa=0;}
if(isNaN(bb)){bb=0;}
if(asc==0){return -aa+bb;}
else{return aa-bb;}
}
);

$("#resultTable tbody").empty();
for(i in arrF)
{$("#resultTable tbody")[0].appendChild(arrF[i][1][0]);}

}


 function writeTR(tb,line,id)
 {
 var row = document.createElement("tr");
 row.setAttribute("id",id);
  row.setAttribute("class","visi");
 for(var i=0;i<15;i++)
 {
 if(i==0){ 
 var text="";
 if(line[i]!="undefined" && line[i]!=undefined){ text=line[i]; } 
 var nom=text.split("_");
 if(nom[0]==15){
	if(document.getElementById("showCode").checked){
	var cell = document.createElement("th");
	cell.className="subTitle2";
	var txtCell = document.createTextNode(nom[2]);
	cell.appendChild(txtCell);
	row.appendChild(cell);}
	var cell = document.createElement("th");
	cell.className="subTitle2";
	var txtCell = document.createTextNode(nom[1]);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	}
	else
	{ 
	var cell = document.createElement("th");
	if(document.getElementById("showCode").checked){
	cell.className="subTitle";
	var txtCell = document.createTextNode(nom[2]);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	}
	var cell = document.createElement("th");
	cell.className="subTitle";
	var txtCell = document.createTextNode(nom[1]);
	cell.appendChild(txtCell);
	row.appendChild(cell);
	}
}
else{
	 var cell = document.createElement("td");
	 if(document.getElementById("showDomestic").checked){
		 if(i<6){cell.className="td1";}
		 else if(i<11){cell.className="td2";}
		 else{cell.className="td3";}
	 }
	 else{if(i<5){cell.className="td1";}
			else if(i<11){cell.className="td2";}
			else{cell.className="td3";}
		}
	 var text="";
	 if(line[i]!="undefined" && line[i]!=undefined){ text=line[i]; }
	 var txtCell = document.createTextNode(text);
	 cell.appendChild(txtCell);
	 row.appendChild(cell);
	 }
 }
 tb.appendChild(row);
 }

function myReset(id)
{document.getElementById(id).selectedIndex=0;}

function refAll(c)
{
if(c==0){var mesCheck=document.getElementById("myFilter2").getElementsByTagName("input");}
else{var mesCheck=document.getElementById("myFilter3").getElementsByTagName("input");}
for(var i=0;i<mesCheck.length;i++)
	{
	mesCheck[i].checked=true;
	document.getElementById(mesCheck[i].value).className="visi";
	}
}

function refNone(c){
if(c==0){var mesCheck=document.getElementById("myFilter2").getElementsByTagName("input");}
else{var mesCheck=document.getElementById("myFilter3").getElementsByTagName("input");}
for(var i=0;i<mesCheck.length;i++)
	{
	mesCheck[i].checked=false
	document.getElementById(mesCheck[i].value).className="invi";
	}
}

function refRev(c)
{
if(c==0){var mesCheck=document.getElementById("myFilter2").getElementsByTagName("input");}
else{var mesCheck=document.getElementById("myFilter3").getElementsByTagName("input");}
for(var i=0;i<mesCheck.length;i++)
	{
	if(mesCheck[i].checked){mesCheck[i].checked=false;	document.getElementById(mesCheck[i].value).className="invi";}
	else{mesCheck[i].checked=true;	document.getElementById(mesCheck[i].value).className="visi";}
	}
}

function toExcel()
	{
	var test=window.location.toString().split("/");
	var dd="";
	var df="";
	if(test[test.length-1]=="popup.jsp"){dd=parent.window.document.getElementById("excelData");
	df=parent.window.document.getElementById("formExcel");
	}
	else{dd=document.getElementById("excelData");	df=document.getElementById("formExcel");}
	
	document.getElementById("emptyPop").setAttribute("id","emptyPop2");
	var temp=document.getElementById("emptyPop").innerHTML;
	document.getElementById("emptyPop").innerHTML="";
var ret=document.getElementById("resultTable").innerHTML.toString();

dd.value="<style>.invi,.myButton{display:none} </style><table>"+ret+"</table>";
df.submit();
document.getElementById("emptyPop").innerHTML=temp;
/*var ret2=document.getElementById("resultTable");
ret2.getElementById
	*/	
	};
function changeTab(param)
{
document.getElementById("result").innerHTML="";
document.getElementById('tabCountry').className="invi";
document.getElementById('tabItem').className="invi";
document.getElementById('sCountry').className="invi";
document.getElementById('sItem').className="invi";
document.getElementById('menu_tabCountry').style.backgroundImage="url('img/countriesTab.gif')";
document.getElementById('menu_tabItem').style.backgroundImage="url('img/itemsTab.gif')";
document.getElementById('rc3').checked=true;
document.getElementById('ri3').checked=true;
document.getElementById(param).className="visi2";
if(param=="tabItem"){document.getElementById("sItem").className="visi2";}
else{document.getElementById("sCountry").className="visi2";}
document.getElementById('menu_'+param).style.color="red";
if (param=='tabCountry'){document.getElementById('menu_'+param).style.backgroundImage="url('img/countriesTabOn.gif')";}
if (param=='tabItem'){document.getElementById('menu_'+param).style.backgroundImage="url('img/itemsTabOn.gif')";}
}



$(document).ready(function() {

	$(".various").fancybox({
		maxWidth	: 1500,
		maxHeight	: 900,
		fitToView	: false,
		width		: '90%',
		height		: '90%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});