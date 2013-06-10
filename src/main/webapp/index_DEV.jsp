<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		
		<!-- Metadata -->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>FAOSTAT Download</title>

        <!-- External Style-sheets -->
        <link type='text/css' rel='stylesheet' href='http://fenixapps.fao.org/repository/css/jqwidgets/2.8.3/styles/jqx.base.css' />

        <!-- Local CSS -->
        <link type='text/css' rel='stylesheet' href='/faostat-download-js/css/faostat-download.css' />
        <link type='text/css' rel='stylesheet' href='/faostat-download-js/js/chromatable/style.css' />

        <!-- JQuery -->
        
         <script type="text/javascript" src="/faostat-download-js/resources/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="/faostat-download-js/resources/js/jquery-ui-1.8.21.custom.min.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="/faostat-download-js/resources/js/tag-it.js"></script>
        
        <!--script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.9.1/jquery-1.9.1.min.js'></script-->
        <!--script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min.js'></script-->
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.0.9/jquery.i18n.properties-min.js'></script>
        <script type='text/javascript' src='http://fenixapps.fao.org/repository/js/jquery/1.8.0/jquery.url.js'></script>

        
	
        
        
        <!-- JQWidgets -->
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxcore.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxbuttons.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxscrollbar.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxpanel.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxtree.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxbuttongroup.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxradiobutton.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxbuttons.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxlistbox.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxdropdownlist.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxtabs.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxgrid.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxdata.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxgrid.selection.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxgrid.columnsresize.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxswitchbutton.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxpanel.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxcheckbox.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxexpander.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxnavigationbar.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxgrid.edit.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxslider.js"></script>
		<script type="text/javascript" src="http://fenixapps.fao.org/repository/js/jqwidgets/2.8/jqxcombobox.js"></script>

        <!-- FENIX -->
        <script type="text/javascript" src="/faostat-download-js/js/cpi.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/collector.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download-options.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download-selectors-advanced.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download-selectors-classic.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download-selectors.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download-tree.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/faostat-download-wizard.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/google-analytics-manager.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/I18N.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/index.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/JQUERY-FIELD.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/wizard-navigator.js"></script>
        <script type="text/javascript" src="/faostat-download-js/js/chromatable/jquery.chromatable.js"></script>
		
        
        
        
        <script type="text/javascript" src="/faostat-download-js/js/fanzybox/source/helpers/jquery.fancybox-media.js?v=1.0.5"></script>
<link href="/faostat-download-js/fbs_style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/faostat-download-js/FBSN.js"></script>

 <script type="text/javascript" src="/test2/js/loader.js"></script> 
        <!--script type="text/javascript" src="/test2/js/bootstrap.js"></script> 
        <script type="text/javascript" src="/test2/js/pivot.js"></script> 
        <script type="text/javascript" src="/test2/js/ghostdrag.js"></script> 
        <script type="text/javascript" src="/test2/js/statistics.js"></script> 
        <script type="text/javascript" src="/test2/js/tree.js"></script> 
        <script type="text/javascript" src="/test2/js/animation.js"></script> 
        <script type="text/javascript" src="/test2/js/barchart.js"></script> 
        <script type="text/javascript" src="/test2/js/instant.js"></script--> 

<!--/*OLAP ALONE*/-->

<script type="text/javascript" src="/test2/monscript.js"></script>
<script type="text/javascript" src="/test2/moninit3.js"></script>
<link rel="stylesheet" type="text/css" href="/test2/style.css" />

        
	</head>

	<body class='default' onload="FAOSTATDownload.initUI('Q', 'QC', 'E')">
		
            <%@include  file="index.html"%>

	</body>

</html>
