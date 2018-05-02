jQuery.noConflict();

(function(pluginId, $) {
    "use strict";

    var APPID = kintone.app.getId();
    var config = kintone.plugin.app.getConfig(pluginId);

    kintone.events.on("app.record.index.show", function(e) {
        if (config['target'] === null) {
            return e;
        }
        var target = kintone.app.getFieldElements(config['target']);
        if (target !== null && target.length > 0) {
            var idx = target[0].cellIndex;
            $('.recordlist-show-gaia').each(function() {
                const $t = $(this);
                const $s = $t.parent().siblings().filter(':eq(' + (idx-1) + ')').find('span');
                $s.html('<a href="' + $t.attr('href') + '">' + $s.text() + '</a>');
            });
        }
    });
})(kintone.$PLUGIN_ID, jQuery);
