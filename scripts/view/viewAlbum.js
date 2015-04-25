define(['mustache'], function (Mustache) {
    return (function() {
        function ViewAlbumView(selector, data) {
            $.get('templates/viewAlbum.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return new ViewAlbumView(selector, data);
            }
        }
    })();
});
