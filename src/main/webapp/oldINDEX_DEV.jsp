<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <!-- Metadata -->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
	<title>FAOSTAT Download</title>
	<!-- 3rd Party CSS -->
        <link rel="stylesheet" href="resources/css/jqx.base.css" type="text/css" />
        <link rel="stylesheet" href="resources/css/widget.css" type="text/css" />
        <link rel="stylesheet" href="resources/css/jquery-ui-1.8.21.custom.css" type="text/css"/>
        <link rel="stylesheet" href="resources/css/jquery-ui.css" type="text/css">
    	<link rel="stylesheet" href="resources/css/jquery.tagsinput.css" type="text/css" />
        <!-- FENIX CSS -->
        <link rel="icon" href="src/images/faostat.png" type="image/png" >
        <!-- <link rel="stylesheet" href="src/css/faostat-download.css" type="text/css" /> -->
        <!-- CSS -->
        <link href="http://ldvapp07.fao.org:8030/downloads/fao.png" type="image/png" rel="icon">
        <link rel="stylesheet" href="resources/jqwidgets/styles/jqx.base.css" type="text/css" />
        <link rel="stylesheet" href="resources/jqwidgets/styles/widget.css" type="text/css" />
        <link rel="stylesheet" href="src/css/faostat-download.css" type="text/css" />
        <link rel="stylesheet" href="src/css/faostat-download-options.css" type="text/css" />
        <link rel="stylesheet" href="src/css/faostat-download-selectors.css" type="text/css" />
        <link rel="stylesheet" href="src/css/faostat-download-tree.css" type="text/css" />
        <link rel="stylesheet" href="src/css/faostat-download-wizard.css" type="text/css" />
        <link rel="stylesheet" href="resources/css/jquery-ui-1.8.21.custom.css" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/flick/jquery-ui.css">
    	<link rel="stylesheet" href="resources/css/jquery.tagsinput.css" type="text/css" />
    	<link rel="stylesheet" href="src/css/note.css" type="text/css" />
        
        <!-- CSS -->
        <script type="text/javascript" src="resources/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="resources/js/jquery-ui-1.8.21.custom.min.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="resources/js/tag-it.js"></script>
	<script  type="text/javascript" >window.calledFromHomepage=false;</script>
	<!-- FENIX -->
        <!-- <script type="text/javascript" src="faostat-download-combined.js"></script> -->
        <script type="text/javascript" src="src/js/faostat-download.js"></script>
        <script type="text/javascript" src="src/js/I18N.js"></script>
        <script type="text/javascript" src="src/js/faostat-download-selectors-classic.js"></script>
	<script type="text/javascript" src="src/js/faostat-download-selectors-advanced.js"></script>
	<script type="text/javascript" src="src/js/faostat-download-tree.js"></script>
        <script type="text/javascript" src="src/js/faostat-download-options.js"></script>
	<script type="text/javascript" src="src/js/faostat-download-wizard.js"></script>
	<script type="text/javascript" src="src/js/wizard-navigator.js"></script>
	<script type="text/javascript" src="src/js/collector.js"></script>
	<script type="text/javascript" src="src/js/google-analytics-manager.js"></script>
	<script type="text/javascript" src="resources/js/jquery.url.js"></script>
	<script type="text/javascript" src="resources/js/jquery.fixedheader.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxcore.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxbuttons.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxscrollbar.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxpanel.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxtree.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxbuttongroup.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxradiobutton.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxbuttons.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxlistbox.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxdropdownlist.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxtabs.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxgrid.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxdata.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxgrid.selection.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxgrid.columnsresize.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxswitchbutton.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxpanel.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxcheckbox.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxexpander.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxnavigationbar.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxgrid.edit.js"></script>
	<script type="text/javascript" src="resources/jqwidgets/jqxcombobox.js"></script>
	<script type="text/javascript" src="resources/js/jquery.i18n.properties-min-1.0.9.js"></script>
	<!--[if lt IE 8]>
    <script src="json2.js"></script>
<![endif]-->
<!--script type="text/javascript" src="src/js/chromatable/jquery-1.3.2.min.js"></script-->
<!-- script type="text/javascript" src="/faostat-download-js/src/js/fanzybox/lib/jquery-1.9.0.min.js"></script-->
<!--script type="text/javascript" src="src/js/chromatable/jquery-ui-1.7.2.custom.min.js"></script-->
<script type="text/javascript" src="/faostat-download-js/src/js/chromatable/jquery.chromatable.js"></script>
<!--script type="text/javascript" src="src/js/fanzybox/lib/jquery-1.9.0.min.js"></script-->
<script type="text/javascript" src="/faostat-download-js/src/js/fanzybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript" src="/faostat-download-js/src/js/fanzybox/source/jquery.fancybox.js?v=2.1.4"></script>
<link rel="stylesheet" type="text/css" href="/faostat-download-js/src/js/fanzybox/source/jquery.fancybox.css?v=2.1.4" media="screen" />
<link rel="stylesheet" type="text/css" href="/faostat-download-js/src/js/fanzybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
<script type="text/javascript" src="/faostat-download-js/src/js/fanzybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
<link rel="stylesheet" type="text/css" href="/faostat-download-js/src/js/fanzybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
<script type="text/javascript" src="/faostat-download-js/src/js/fanzybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>
<script type="text/javascript" src="/faostat-download-js/src/js/fanzybox/source/helpers/jquery.fancybox-media.js?v=1.0.5"></script>
<link href="/faostat-download-js/fbs_style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/faostat-download-js/FBSN.js"></script>

/*OLAP ALONE*/
<script type="text/javascript" src="/test2/monscript.js"></script>
        <script type="text/javascript" src="/test2/moninit3.js">
        </script>
        <link rel="stylesheet" type="text/css" href="/test2/style.css" />
        <script type="text/javascript" src="/test2/js/loader.js"></script>

<!--GOOGLE ANALYTICS: START-->
<!-- 
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-29534670-1']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackPageLoadTime']); 
_gaq.push(['_setSiteSpeedSampleRate', 5]);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
 -->
		<!--GOOGLE ANALYTICS: END-->	
	</head>
<!-- 	<body class='default' onload="FAOSTATDownload.initUI('en', 'QC')"> -->
	<body class='default' onload="FAOSTATDownload.initUI('en')" style='background-image: url(bg.jpg);'>
            <jsp:include page="index.html"></jsp:include>
	</body>
</html>
