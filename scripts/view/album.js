define(['mustache'], function (Mustache) {
    return (function() {
        function AlbumView(selector, data) {
            $.get('templates/album.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return new AlbumView(selector, data);
            }
        }
    })();
});
