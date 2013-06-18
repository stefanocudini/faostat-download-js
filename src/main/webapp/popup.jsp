<html>
<head>
<script type="text/javascript" src="js/chromatable/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="js/chromatable/jquery.chromatable.js"></script>

<link href="fbs_style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="FBSN.js">
</script>
<script>

function init2(){
document.getElementById('myResult2').innerHTML="<table id=\"resultTable\">"+parent.document.getElementById('resultTable').innerHTML+"</table>";
totChroma=$("#resultTable").chromatable(CTOptionsPopUp);	
}
</script>
<style>
#btnFS{display:none}
#btnExcel{display:block}
</style>
</head>
<body onload="init2()">
<div id="mainTD">
<div id="myResult2" ></div>
</div>
</body>
</html>