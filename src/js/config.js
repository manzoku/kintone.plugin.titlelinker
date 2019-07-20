jQuery.noConflict();

(function(pluginId, $) {
	"use strict";

	$(function() {

		kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', {'app': kintone.app.getId()})
		.then(function(resp) {
			$.each(resp['properties'], function(index, property) {
				if (property['type'] === 'SUBTABLE' || property['type'] === 'CATEGORY' || property['type'] === 'STATUS') {
					return;
				}
				$('#target-column').append('<option value="' + property['code'] + '">' + property['label'] + '</option>');
			});
			var config = kintone.plugin.app.getConfig(pluginId);
			if (config['target']) {
				$('#target-column').val(config['target']);
			}

			$('#setting-submit').click(function() {
				var config = {};
				config['target'] = $('#target-column').val();
				kintone.plugin.app.setConfig(config);
			});
		}, function(fieldsResp) {
			alert('フォーム情報の取得ができませんでした。');
			$('#setting-submit').on('click', function() {
				alert('フォームデータ取得ができなかったため保存できません。\nキャンセルしてください。');
			});
		});

		$('#setting-cancel').on('click', function() {
			history.back();
		});
	});
})(kintone.$PLUGIN_ID, jQuery);
