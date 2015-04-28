define(['mustache'], function (Mustache) {
    return (function() {
        function PhotoView(selector, data, controller, albumName) {
            $.get('templates/photo.tpl', function (template) {
                data.albumName = albumName;
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
                .done(function () {
                    controller.loadAlbumComments('#comments', 'Album', albumName);
                });
        }

        return {
            load: function (selector, data, controller, albumName) {
                return new PhotoView(selector, data, controller, albumName);
            }
        }
    })();
});

