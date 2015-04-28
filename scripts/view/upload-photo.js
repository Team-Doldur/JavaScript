define(['mustache', 'albumModel'], function (Mustache, albumModel) {
    return (function() {
        var _albumModel = albumModel.load('https://api.parse.com/1/');
        function UploadPhotoView(selector, data, controller) {
            $.get('templates/upload-photo.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
                $('#photo-category').on('change', function () {
                    var categoryId = $('#photo-category').val();
                    _albumModel.getAlbumsByCategory(categoryId).then(
                        function (response) {
                            $.get('templates/album-option.tpl', function (template) {
                                    var output = Mustache.render(template, response);
                                    $('#photo-album').html(output);
                            });
                        },
                        function (error) {
                            console.error(error);
                        }
                    )




                })
            })
            .then(function () {
                var photo;
                var title;
                $('#upload-photo').bind("change", function (e) {
                    var files = e.target.files || e.dataTransfer.files;
                    photo = files[0];
                });

                $('#uploadbutton').click(function () {
                    title = $('#photo-title').val();
                    controller.sendPhoto(photo, title);
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