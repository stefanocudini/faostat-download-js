<html>
<head>
<script type="text/javascript" src="js/chromatable/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="js/chromatable/jquery.chromatable.js"></script>
<link rel="stylesheet" type="text/css" href="/faostat-gateway/static/faostat.css" />
<link rel="stylesheet" type="text/css" href="/faostat-download-js/css/myPivot.css" />
<!--link rel="stylesheet" type="text/css" href="/test2/style.css" />

<link rel="stylesheet" type="text/css" href="/test2/styles/pivot.css" /-->

<script>
var CTOptionsPopUp={width: "100%",height: "95%",scrolling: "yes"};
//CTOptionsPopUp={};
function init2(){
document.getElementById('myResult2').innerHTML="<table  class=\"pivot_table\" >"+parent.document.getElementById('pivot_table').innerHTML+"</table>";
//totChroma=$(".pivot_table").chromatable(CTOptionsPopUp);	
}
</script>
<style>
#btnFS{display:none}
#btnExcel{display:block}
</style>
</head>
<body onload="init2()">
<div id="mainTDOLD">
<div id="myResult2" ></div>
</div>
</body>
</html>
