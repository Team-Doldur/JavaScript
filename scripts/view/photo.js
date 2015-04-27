define(['mustache'], function (Mustache) {
    return (function() {
        function PhotoView(selector, data) {
            $.get('templates/photo.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return new PhotoView(selector, data);
            }
        }
    })();
});

