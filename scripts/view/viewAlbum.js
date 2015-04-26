define(['mustache'], function (Mustache) {
    return (function() {
        function ViewAlbumView(selector, data, controller) {
            $.get('templates/viewAlbum.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
                .done(function () {
                    controller.loadComments('#comments', 'Album', data.objectId);
                });
        }

        return {
            load: function (selector, data, controller) {
                return new ViewAlbumView(selector, data, controller);
            }
        }
    })();
});
