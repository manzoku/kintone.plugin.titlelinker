jQuery.noConflict();

(function(pluginId, $) {
	"use strict";

	$(function() {

		kintone.api(kintone.api.url('/k/v1/form', true), 'GET', {
			'app': kintone.app.getId()
		}, function(resp) {
			$.each(resp['properties'], function(index, property) {
				$('#target-column').append('<option value="' + property['code'] + '">' + property['label'] + '</option>');
			});
			var config = kintone.plugin.app.getConfig(pluginId);
			if (config['target']) {
				$('#target-column').val(config['target']);
			}
		});

		$('#setting-submit').click(function() {
			var config = {};
			config['target'] = $('#target-column').val();
			kintone.plugin.app.setConfig(config);
		});
		$('#setting-cancel').on('click', function() {
			history.back();
		});
	});
})(kintone.$PLUGIN_ID, jQuery);
