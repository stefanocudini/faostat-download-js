if (!window.FAOSTATDownload) {
    
    window.FAOSTATDownload = {
		
        /** To be used to deploy this code under FENIX FAOSTAT */
        prefix : 'http://localhost:8080/faostat-download-js/',

        MyMetaData : {
            "AS" : {
                "E" : "Agricultural Science and Technology Indicators (ASTI) intiative International Food Policy Research Institute (IFPRI)" +
                      "Source: Agricultural Science and Technology Indicators (ASTI) intiative International Food Policy Research Institute (IFPRI)"
            }
        },

        theme : "faostat",

        countriesTabSelectedIndex : 0,

        itemsTabSelectedIndex : 0,

        shift : false,

        /** base URL for WDS, default: fenixapps.fao.org */
        baseurl : "",

        /** datasource for WDS, default: faostat */
        datasource : "",

        /** maximum rows number shown in the interface */
        tablelimit : "",

        /** language for the tree, default: en */
        language : "E",

        /** this code is set when a leaf of the tree is clicked, to be used by other JS's */
        selectedDomainCode : "",

        item : null,

        /** flag to determine wheter codelists must be linked or not */
        linkCodelists : false,

        /** determine which download interface must be shown */
        showWizard : false,

        downloadType : 0,

        groupCode : null,

        domainCode : null,

        init : function(groupCode, domainCode, language) {
            FAOSTATDownload.initUI(groupCode, domainCode, language);
        },

        /**
		 * This function initiate the user interface and links controllers to the tree
		 */
        initUI : function(groupCode, domainCode, language) {

            /**
             * FAOSTAT Download is loaded by GWT, so the language
             * will be passed as a parameter rather than
             * read it from the URL
             */
            FAOSTATDownload.language = language;	
            FAOSTATDownload.groupCode = groupCode != '*' ? groupCode : null;
            FAOSTATDownload.domainCode = domainCode != '*' ? domainCode : null;

            /**
             * But we may need to have it from the URL...
             */
            var lang = $.url().param('lang');
            if (lang != null && lang.length > 0)
                FAOSTATDownload.language = lang;

            /**
             * Optional parameter domain code to show the UI
             * on a given domain
             */
            FAOSTATDownload.selectedDomainCode = domainCode;

            /**
             * Initiate multi-language functionalities
             */
            I18N.init();
            $(document).bind({
                keydown : function(e) {
                    if (e.which == 16)
                        FAOSTATDownload.shift = true;
                },
                keyup : function(e) {
                    FAOSTATDownload.shift = false;
                }
            });

            /**
             * Translate download type labels
             */
            $('#linkCodelistsButton').jqxSwitchButton({
                height: 27,
                width: 150,
                theme: FAOSTATDownload.theme,
                checked: false,
                onLabel: I18N.translate('_wizard'),
                offLabel: I18N.translate('_classic')
            });

            $('#linkCodelistsButton').bind('change', function (event) {
                FAOSTATDownload.showWizard = event.args.check;
                FAOSTATDownload.showClassicOrWizard();
                document.getElementById('output_area').innerHTML = '';
                CPI.removeCPITableNotes();
            });

            FAOSTATDownload.showSelectionMode(false);

            FAOSTATDownloadTree.init();

        },

        showFB:function(){
  $('#mainTD').show();
                        $('#OLAPTD').hide();

            if (navigator.appVersion.indexOf("MSIE 7.") == -1 ){
                $.ajax({
                    type: 'GET',
                    url: FAOSTATDownload.prefix + 'FBSN.html',
                    dataType: 'html',
                    success : function(response) {	
                        document.getElementById("testinline").innerHTML="";
                        document.getElementById('OLAPTD').className="invi";
                        document.getElementById('trWizardMode').className="invi";
                        document.getElementById('mainTD').className="visi2";
                        document.getElementById('mainTD').innerHTML = response;
                        FAOSTATFBS.lang=FAOSTATDownload.language;
                        FAOSTATFBS.init();
                    },
                    error : function(err,b,c) {alert(err.status + ", " + b + ", " + c);}
                });
            }
            else{
                document.getElementById('OLAPTD').className="invi";
                document.getElementById('trWizardMode').className="invi";
                document.getElementById('mainTD').className="visi2";
                document.getElementById('mainTD').innerHTML = "<iframe src=\""+FAOSTATDownload.prefix + "FBS.html\" width=\"800\" height=\"600\"/>" ;
            }
        },

        bulkDownload : function() {
            FAOSTATDownload.downloadType = 1;
            FAOSTATDownload.showSelectionMode(false);
            FAOSTATDownload.showDownloadOptionsAndButtons(false);
            var item = {};
            // item.value = FAOSTATDownload.selectedDomainCode;
            item.value = (FAOSTATDownload.domainCode == 'null') ? FAOSTATDownload.groupCode : FAOSTATDownload.domainCode;
//            if (FAOSTATDownload.domainCode == 'null' || FAOSTATDownload.domainCode == '*' || FAOSTATDownload.domainCode == null || FAOSTATDownload.domainCode == 'FB')
            if (FAOSTATDownload.domainCode == 'FB')
              item.value = 'FB';
            FAOSTATDownloadTree.showBulkDownloads(item);
            CPI.removeCPITableNotes();
        },

        standardDownload : function() {
            FAOSTATDownload.downloadType = 0;
            FAOSTATDownload.showSelectionMode(false);
            FAOSTATDownload.showDownloadOptionsAndButtons(true);
            FAOSTATDownload.showClassicOrWizard();
            CPI.removeCPITableNotes();
        },

        showDownloadOptionsAndButtons : function(show) {
		    if (show) {
                $('#output_options').show();
                $('#output_buttons').show();
            } else {
                $('#output_options').hide();
                $('#output_buttons').hide();
            }
        },

        showSelectionMode : function(show) {
            if (show) {
                $('#settings-section').show();
            } else {
                $('#settings-section').hide();
            }
        },

        showClassicOrWizard : function() {
            if (FAOSTATDownload.domainCode.length > 1) {
                if( FAOSTATDownload.domainCode!="*"){
                // Wizard
               try{document.getElementById('testinline').className="visi2";}catch(err){}
                if(FAOSTATDownload.domainCode=="FB" /*&&
                    FAOSTATDownload.item.hasItems == false*/){
                    //alert('la')
                    this.showFB();
                }
                else{
                    document.getElementById('OLAPTD').className="visi2";
                    document.getElementById('trWizardMode').className="visi2";
                    document.getElementById('mainTD').className="invi";
                    if (FAOSTATDownload.showWizard) {
                        $('#listArea').load(FAOSTATDownload.prefix + 'faostat-download-wizard.html', function() {
                            FAOSTATDownloadWizard.init();
                            FAOSTATDownloadSelectorsClassic.initOLAP();
                        });
                    } // classic
                    else {


                        $.ajax({
                            type: 'GET',
                            url: FAOSTATDownload.prefix + 'faostat-download-selectors-classic.html',
                            dataType: 'html',
                            success : function(response) {
                                document.getElementById('listArea').innerHTML = response;
                                FAOSTATDownloadSelectorsClassic.initUI();
                                FAOSTATDownloadSelectorsClassic.translateUI();
                                FAOSTATDownload.showDownloadOptionsAndButtons(true);
                            },
                            error : function(err,b,c) {alert(err.status + ", " + b + ", " + c);}
                        });
                    }
                }
                // output buttons
				
                $('#output_buttons').load(FAOSTATDownload.prefix + 'output-buttons.html', function() {
                    FAOSTATDownload.initOuputButtons();
                });

                // Upgrade the URL
                var domainCode = (FAOSTATDownload.domainCode == 'null') ? '*' : FAOSTATDownload.domainCode;
                CORE.upgradeURL('download', FAOSTATDownload.groupCode, domainCode, FAOSTATDownload.language);}
            else{//just the metadata
              document.getElementById('OLAPTD').className="visi2";
              document.getElementById('trWizardMode').className="visi2";
              document.getElementById('mainTD').className="invi";
              document.getElementById('testinline').className="invi";
          }
      }
  },
  // BUTTONS AND OPTIONS SECTION 
 initOutputOptions : function() {
     var width = '140';
     $(".output_options").jqxExpander({
         width: '100%', 
         theme: FAOSTATDownload.theme
     });
     $(".output_options").jqxExpander('collapse'); 
     $("#options_output_type").jqxDropDownList({
         source: [ {
                 label: I18N.translate('_pivot'), 
                 value: 'pivot'
             },
             {
                 label: I18N.translate('_table'), 
                 value: 'table'
             }], 
         width: width, 
         height: '25',
         selectedIndex: 0, 
         theme: FAOSTATDownload.theme 
     });
      $("#options_output_type").on('change',function(event){
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
          
                if (item.value!="pivot"){  
          $('#buttonExportToCSV')[0].style.display="inline-block";}
      else{$('#buttonExportToCSV')[0].style.display="none";}
      
      
      });
     $("#options_thousand_separator").jqxDropDownList({
         source: [{
                 label: I18N.translate('_comma'), 
                 value: ',',
                 olap_value:1
             },
             {
                 label: I18N.translate('_period'), 
                 value: '.',
                 olap_value:2
             },
             {
                 label: I18N.translate('_space'), 
                 value: ' ',
                 olap_value:3
             }, 
             {
                 label: I18N.translate('_none'), 
                 value: ' ',
                 olap_value:4
             }],
         width: width, 
         height: '25',
         selectedIndex: 0, 
         theme: FAOSTATDownload.theme 
     });
     $("#options_thousand_separator").bind('change', function (event) 
            {
                var ts = $('#options_thousand_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
                document.getElementById("option").value=document.getElementById("option").value.replace(/thousandSeparator:./g,"thousandSeparator:"+ts+"");
                var v=ts;
                //alert(document.getElementById("option").value); 
                try{
                    //OLAP.window.document.getElementById('option').value=document.getElementById("option").value;
                    FAOSTATOLAP.option.thousandSeparator=v;
                    DEMO.pivot.cb();
                }catch(E){}
            });
            $("#options_decimal_separator").jqxDropDownList({
                source: [{
                    label: I18N.translate('_comma'), 
                    value: ',',
                    olap_value:1
                },
                {
                    label: I18N.translate('_period'), 
                    value: '.',
                    olap_value:2
                }, 
                {
                    label: I18N.translate('_space'), 
                    value: ' ',
                    olap_value:3
                }, 
                {
                    label: I18N.translate('_none'), 
                    value: ' ',
                    olap_value:4
                }],
            width: width, 
            height: '25',
            selectedIndex: 1, 
            theme: FAOSTATDownload.theme 
            });
            $("#options_decimal_separator").bind('change', function (event) 
            {
                var ds = $('#options_decimal_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
                document.getElementById("option").value=document.getElementById("option").value.replace(/decimalSeparator:./g,"decimalSeparator:"+ds+"");
                var v=ds;
                try{FAOSTATOLAP.option.decimalSeparator=v;DEMO.pivot.cb();}catch(e){}
            });
            $("#options_decimal_numbers").jqxDropDownList({
                source: [{
                    label: '0', 
                    value: 0
                }, {
                    label: '1', 
                    value: 1
                }, {
                    label: '2', 
                    value: 2
                }, {
                    label: '3', 
                    value: 3
                }, {
                    label: '4', 
                    value: 4
                }],
                width: width, 
                height: '25',
                selectedIndex: 2, 
                theme: FAOSTATDownload.theme 
            });
			
            $("#options_decimal_numbers").bind('change', function (event) {
                var nbDec = $('#options_decimal_numbers').jqxDropDownList('getSelectedItem').label.toString();
                var v=0;
                document.getElementById("option").value=document.getElementById("option").value.replace(/nbDec:(\d)/g,"nbDec:"+nbDec);
                v=nbDec;
                try{
                    FAOSTATOLAP.option.nbDec=v;
                    DEMO.pivot.cb();
                } catch(e){}
            });
			
            /*
                $("#options_show_flags").jqxDropDownList({
                    source: [{
                        label: I18N.translate('_trueTrue'), 
                        value: true
                    }, {
                        label: I18N.translate('_falseFalse'), 
                        value: false
                    }],
                    width: width, 
                    height: '25',
                    selectedIndex: 1, 
                    theme: FAOSTATDownload.theme 
                });
            */

            $("#options_show_flags").jqxCheckBox({
                checked : false,
                theme: FAOSTATDownload.theme
            });
            $("#options_show_flags").bind('change', function (event) {
              
                var item = event.args.checked;
                var checked =0;
               if(item){checked=1;}
               // var checked = item.index;
                var v=0;
                if (checked==1) {
                    FAOSTATOLAP.option.showFlags=1;
                    v=1;   
                } else {
                    v=0;
                    FAOSTATOLAP.option.showFlags=0;
                }
                {
                    FAOSTATOLAP.option.showFlags=v;
                    try{DEMO.pivot.cb();}
                    catch(er){}
                }
            });

            /*
            $("#options_show_codes").jqxDropDownList({
                source: [{
                    label: I18N.translate('_trueTrue'), 
                    value: true
                }, {
                    label: I18N.translate('_falseFalse'), 
                    value: false
                }],
                width: width, 
                height: '25',
                selectedIndex: 1, 
                theme: FAOSTATDownload.theme 
            });
            */
            $("#options_show_codes").jqxCheckBox({
                checked : false,
                theme: FAOSTATDownload.theme
            });
            $("#options_show_codes").bind('change', function (event) { 
                  var item = event.args.checked;
                var checked =1;
               if(item){checked=0;}
                if(checked==1){
                    FAOSTATOLAP.option.showCode=0;
                }
                else{
                    FAOSTATOLAP.option.showCode=1;
                }
                showCode();
            });

            /*
            $("#options_show_units").jqxDropDownList({
                source: [{
                    label: I18N.translate('_trueTrue'), 
                    value: true
                }, {
                    label: I18N.translate('_falseFalse'), 
                    value: false
                }],
                width: width, 
                height: '25',
                selectedIndex: 1,
                theme: FAOSTATDownload.theme 
            });
            */
            $("#options_show_units").jqxCheckBox({
                checked : false,
                theme: FAOSTATDownload.theme
            });
            $("#options_show_units").bind('change', function (event) {
                 var item = event.args.checked;
                var checked =1;
               if(item){checked=0;}
                if (checked==0) {
                    document.getElementById("option").value=document.getElementById("option").value.replace("showUnits:0","showUnits:1");
                    v=1;
                }
                else {
                    document.getElementById("option").value=document.getElementById("option").value.replace("showUnits:1","showUnits:0");  
                    v=0;
                }
                try{
                    FAOSTATOLAP.option.showUnits=v;
                    DEMO.pivot.cb();
                }
                catch(e){}
            });

            /*
            $("#options_show_null_values").jqxDropDownList({
                source: [{
                    label: I18N.translate('_trueTrue'), 
                    value: true
                }, {
                    label: I18N.translate('_falseFalse'), 
                    value: false
                }],
                width: width, 
                height: '25',
                selectedIndex: 0, 
                theme: FAOSTATDownload.theme 
            });
            */  
            $("#options_show_null_values").jqxCheckBox({
                checked : true,
                theme: FAOSTATDownload.theme
            });
        },	

	// INITIALIZATION OF THE BUTTONS
        initOuputButtons : function() {


            /**$(".faostat-download-button").jqxButton({ 
                width: '100%', 
                height: '35', 
                theme: FAOSTATDownload.theme 
            }); **/

            // download table
            $('#buttonExportToCSV').bind('click', function() {
                var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
                if (item.value=="pivot")
                {// window.FAOSTATDownloadSelectorsClassic.falseclick();
                     STATS.exportPivotDownloadStandard();
				var footNotes="";
				if(typeof FAOSTATDownload.MyMetaData[FAOSTATDownload.domainCode]!="undefined")
				{footNotes="<table><tr><td>"+FAOSTATDownload.MyMetaData[FAOSTATDownload.domainCode]["E"]+"</td></tr></table>"}
				var myFFlag="";
				if(FAOSTATOLAP.option.showFlags==1)
				{myFFlag=document.getElementById("myFlags").innerHTML;}
				FAOSTATOLAP.pivots[0].toExcel("<table><tr><td>FAOSTAT 2013</td></tr></table>",
				"<table><tr><td>"+myFFlag+"</td></tr></table>"+footNotes);
				
			//	"<table><tr><td>"+FAOSTATDownload.MyMetaData[FAOSTATDownload.domainCode]["E"]+
				}
                else{
                    
                    C.collect(false); }
            });
            // view table
            $('#buttonViewTables').bind('click', function() {
                $('#buttonExportToCSV')[0].style.display="inline-block";
		$('#testinline').empty();
//                document.geElementById('output_area').innerHTML = '';
                var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
                if (item.value=="pivot"){ window.FAOSTATDownloadSelectorsClassic.falseclick();
                } else {
                    C.collect(true);
                    STATS.showTableDownloadStandard(FAOSTATDownload.selectedDomainCode);
                }
		
            });
        },
        showDialog : function(dialogCode, text) {
            document.getElementById(dialogCode).innerHTML = text;
            $("#" + dialogCode).dialog({
                modal: true
            });
        },
        closeDialog : function(dialogCode, text) {
            document.getElementById(dialogCode).innerHTML = "";
            $("#" + dialogCode).dialog("close");
        }
    };
}
