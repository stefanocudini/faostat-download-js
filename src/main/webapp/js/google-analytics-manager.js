if (!window.STATS) {
	
	window.STATS = {
		
		track : function(category, action, label) {
			_gaq.push(['_trackEvent', category, action, label]);
		},
		
		exportTableDownloadStandard : function(domain) {
			STATS.track('DOWNLOAD_STANDARD', 'EXPORT_CSV - TABLE', domain);
		},
		
		exportPivotDownloadStandard : function(domain) {
			STATS.track('DOWNLOAD_STANDARD', 'EXPORT_CSV - PIVOT_TABLE', domain);
		},
		
		showTableDownloadStandard : function(domain) {
			STATS.track('DOWNLOAD_STANDARD', 'Show Tables - TABLE', domain);
		},
		
		showPivotDownloadStandard : function(domain) {
			STATS.track('DOWNLOAD_STANDARD', 'Show Tables - PIVOT_TABLE', domain);
		},
		
		exportTableDownloadBulk : function(domain) {
			STATS.track('DOWNLOAD_BULK', 'EXPORT_CSV - TABLE', domain);
		},
		
		exportPivotDownloadBulk : function(domain) {
			STATS.track('DOWNLOAD_BULK', 'EXPORT_CSV - PIVOT_TABLE', domain);
		},
		
		showTableDownloadBulk : function(domain) {
			STATS.track('DOWNLOAD_BULK', 'Show Tables - TABLE', domain);
		},
		
		showPivotDownloadBulk : function(domain) {
			STATS.track('DOWNLOAD_BULK', 'Show Tables - PIVOT_TABLE', domain);
		}
	
	};
	
}