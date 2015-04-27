define(['mustache'], function (Mustache) {
    return (function() {
        function CreateAlbumView(selector, data) {
            $.get('templates/create-album.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return new CreateAlbumView(selector, data);
            }
        }
    })();
});
