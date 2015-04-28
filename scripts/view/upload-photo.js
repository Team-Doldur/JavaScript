define(['mustache'], function (Mustache) {
    return (function() {
        function UploadPhotoView(selector, data, controller) {
            $.get('templates/upload-photo.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
            .then(function () {
                var photo;
                var title='';
                $('#upload-photo').bind("change", function (e) {
                    var files = e.target.files || e.dataTransfer.files;
                    photo = files[0];
                });

                $('#uploadbutton').click(function () {
                    controller.sendPhoto(photo, name, albumId, authorId);
                });



            })
        }

        return {
            load: function (selector, data, controller) {
                return new UploadPhotoView(selector, data, controller);
            }
        }
    })();
});