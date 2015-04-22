define(['mustache'], function (Mustache) {
    return (function() {
        function UploadPhotoView(selector, data) {
            $.get('templates/upload-photo.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return new UploadPhotoView(selector, data);
            }
        }
    })();
});