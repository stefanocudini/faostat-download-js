FAOSTATOLAP2={};
FAOSTATOLAP2.displayOption=
{
showUnit:0,
showCode:0,
showFlag:0,
overwrite:true
}

FAOSTATOLAP2.options= 
{
derivedAttributes: {

"Area_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table class=\"innerCol\"><th>"+mp["Country"]+"</th><th>"+mp["Country Code"]+"</th></table>";}
else{return mp["Country"];}},
"Element_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table  class=\"innerCol\"><th>"+mp["Element"]+"</th><th>"+mp["Element Code"]+"</th></table>";}
else{return mp["Element"];}},
"Item_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table  class=\"innerCol\"><th>"+mp["Item"]+"</th><th>"+mp["Item Code"]+"</th></table>";}
else{return mp["Item"];}}
/*
"Continent": function(mp) {
try{return "User selection in "+countryAgg[mp["AreaCode"]][1] ;}
catch(er){return "_"+mp["AreaName"]+"++"}
},
"SubContinent":function(mp) {
try{return "User selection in "+countryAgg[mp["AreaCode"]][2] ;}
catch(er){return "_"+mp["AreaName"]+"++";}
}*/
 },
 //"Continent","SubContinent"
 //,"Item","Item Code","Country","Country Code","Element","Element Code"
 hiddenAttributes:["ValueColumnIndex","Domain"],
	rows:["Area_","Item_","Element_"],
	cols: ["Year"],
	vals:["Value","Unit","Flag"],
	linkedAttributes:[]
	};

	
	
	
	FAOSTATOLAP2.optionsCountry= 
{
 hiddenAttributes:["Annee","CodeItem","Pays"],
derivedAttributes: {
"Level1": function(mp) {
try{return "User selection in "+ItemAgg[mp["CodeItem"].substring(0,2)] ;}
catch(er){return "_"+mp["CodeItem"].substring(0,2)+"++"}
},
"Level2":function(mp) {
try{return "User selection in "+ItemAgg[mp["CodeItem"].substring(0,4)] ;}
catch(er){return "_"+mp["CodeItem"].substring(0,4)+"++";}
},
"Level3":function(mp) {
try{return ""+ItemAgg[mp["CodeItem"].substring(0,6)] ;}
catch(er){return "_"+mp["CodeItem"].substring(0,6)+"++";}
}
 },
 aggregators:aggregatorsCountry,

	rows:["Level1"],
	cols: ["Mois"],
	vals:["Valeur","Poids_Kg"],
	linkedAttributes:[["Level1","Level2","Level3","Description"]]
	};
	
	
	//{"datatype":"TEXT","column":"AreaCode","operator":"IN","value":"","ins":[68]}
	/*
	JSON.stringify({
	"selects":[
		{"aggregation":"NONE","column":"DomainCode","alias":"DomainCode"},
		{"aggregation":"NONE","column":"AreaCode","alias":"AreaCode"},
		{"aggregation":"NONE","column":"ItemCode","alias":"ItemCode"},
		{"aggregation":"NONE","column":"ElementCode","alias":"ElementCode"},
		{"aggregation":"NONE","column":"ElementListCode","alias":"ElementListCode"},
	],
	"froms":[{"column":"DomainAreaItemElement","alias":"DAIE"}],
	"wheres":[
	{"datatype":"TEXT","column":"AreaCode","operator":"IN","value":"","ins":[68,69]}
	],
	"orderBys":[{"column":"DomainCode"},{"column":"AreaCode"}],
	"limit":5000,
	"query":null,
	"frequency":"NONE"})
	*/
	
	FAOSTATOLAP2.queryParams={"datasource":"faostatproddiss","thousandSeparator":",","decimalSeparator":".","decimalNumbers":"2",
	"json":JSON.stringify({
	"selects":null,
	"froms":null,
	"wheres":null,
	"orderBys":null,
	"limit":null,
	"query":"select GroupCode,DomainCode,ItemGroupCode,ItemGroupNameE,ItemCode,ItemNameE,A1.ElementCode,A2.ElementNameE from dbo.DomainItemGroupItemElement A1 inner join Element A2 on A1.ElementCode=A2.ElementCode ",
	"frequency":"NONE"}),
	"cssFilename":"faostat","valueIndex":"1" };
	
	
	
	FAOSTATOLAP2.queryParamsTM={"datasource":"faostatproddiss","thousandSeparator":",","decimalSeparator":".","decimalNumbers":"2",
	"json":JSON.stringify({
	"selects":null,
	"froms":null,
	"wheres":null,
	"orderBys":null,
	"limit":null,
	"query":"select D.ReporterAreaCode,A.AreaNameE as Area,D.PartnerAreaCode,AA.AreaNameE as Area,D.ItemCode,ItemNameE as Item,D.ElementCode,ElementNameE as Element,Year,Value, E.UnitNameE as Unit,Flag from TradeMatrix D inner join Item I on D.ItemCode=I.ItemCode 	inner join Element E on D.ElementCode=E.ElementCode 	inner join Area A on D.ReporterAreaCode=A.AreaCode inner join Area AA on D.PartnerAreaCode=AA.AreaCode 	where D.ReporterAreaCode=68 and D.Year>2007",
	"frequency":"NONE"}),
	"cssFilename":"faostat","valueIndex":"1" };
		
		
		FAOSTATOLAP2.attr=[["Dom","AreaCode","Area","ItemCode","Item","ElementCode","Element","Year","Value","Unit","Flag"]];
		FAOSTATOLAP2.attrM=[["GroupCode","DomainCode","ItemGroupCode","ItemGroupNameE","ItemCode","ItemNameE","ElementCode","ElementName"]];
		FAOSTATOLAP2.attrTM=[["ReporterC","Reporter","partnerC","partner","ItemCode","ItemNameE","ElementCode","ElementName","Year","Value","Unit","Flag"]];
		FAOSTATOLAP2.optionsM= {
		/*hiddenAttributes:["DomainCode","ItemGroupCode","ItemCode","ItemNameE","ElementCode"],*/
		
		aggregators:aggregatorsText,
		derivedAttributes:{url:function(mp){return "<a href=\"/faostat-gateway/go/to/download/"+mp["GroupCode"]+"/"+mp["DomainCode"]+"/E\" target=\"_blank\">"+mp["DomainCode"]+"</a>"}},
		rows:["ItemGroupNameE","ElementName"],
	cols: [],
	vals:["url"]
		
		};
		FAOSTATOLAP2.optionsTM= {
                 
derivedAttributes: {

"Reporter_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table class=\"innerCol\"><th>"+mp["Reporter Countries"]+"</th><th>"+mp["Reporter Country Code"]+"</th></table>";}
else{return mp["Reporter Countries"];}},
    "Partner_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table class=\"innerCol\"><th>"+mp["Partner Countries"]+"</th><th>"+mp["Partner Country Code"]+"</th></table>";}
else{return mp["Partner Countries"];}},
"Element_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table  class=\"innerCol\"><th>"+mp["Element"]+"</th><th>"+mp["Element Code"]+"</th></table>";}
else{return mp["Element"];}},
"Item_":function(mp) 
{if(F3DWLD.CONFIG.wdsPayload.showCodes)
{return "<table  class=\"innerCol\"><th>"+mp["Item"]+"</th><th>"+mp["Item Code"]+"</th></table>";}
else{return mp["Item"];}}
/*
"Continent": function(mp) {
try{return "User selection in "+countryAgg[mp["AreaCode"]][1] ;}
catch(er){return "_"+mp["AreaName"]+"++"}
},
"SubContinent":function(mp) {
try{return "User selection in "+countryAgg[mp["AreaCode"]][2] ;}
catch(er){return "_"+mp["AreaName"]+"++";}
}*/
 },
 //"Continent","SubContinent"
 //,"Item","Item Code","Country","Country Code","Element","Element Code"
 hiddenAttributes:["NoRecords","RecordOrder","Domain Code","Domain"],
	rows:["Reporter_","Partner_","Item_","Element_"],
	cols: ["Year"],
	vals:["Value","Unit","Flag"],
	linkedAttributes:[] 
                    
                    
		/*hiddenAttributes:["DomainCode","ItemGroupCode","ItemCode","ItemNameE","ElementCode"],*/
		
		/*
		rows:["ReporterName","PartnerName","ItemName","ElementName"],
	cols: ["Year"],
	vals:["Value","Unit","Flag"]
		*/
		};
	
		  google.load("visualization", "1", {packages:["corechart", "charteditor"]});
		  
		