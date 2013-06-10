if (!window.I18N) {

	window.I18N = {
	
		init : function() {
		
			var lang = null;
			
			switch (FAOSTATDownload.language) {
				case 'F' : lang = 'fr'; break;
				case 'S' : lang = 'es'; break;
				default: lang = 'en'; break;
			}

            $.i18n.properties({
			
				name: 'I18N',
				path: FAOSTATDownload.prefix + 'I18N/',
				mode: 'both',
				language: lang
			
			});
			
		},
		
		translate : function (id) {
			try {
				return($.i18n.prop(id));
			} catch (err) {
				alert(id + ", " + err);
			}
		},
		
		translateButton : function (className, id) {
			$('.' + className).attr('value', $.i18n.prop(id));
		}
	
	};

}