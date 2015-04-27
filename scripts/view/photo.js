define(['mustache'], function (Mustache) {
    return (function() {
        function PhotoView(selector, data, controller, albumName) {
            $.get('templates/photo.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
                .done(function () {
                    controller.loadComments('#comments', 'Album', albumName);
                });
        }

        return {
            load: function (selector, data, controller, albumName) {
                return new PhotoView(selector, data, controller, albumName);
            }
        }
    })();
});

