define(['mustache', 'albumModel'], function (Mustache, albumModel) {
    return (function() {
        function CreateAlbumView(selector, data) {
            $.get('templates/create-album.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
                $('.submit-btn').click(function(){
                    var category = $('#album-category').val();
                    var author = sessionStorage['currentUserId'];
                    var name = $('#album-title').val();
                    var address = name.split(' ').join('+');
                    albumModel.createAlbum(name, author, category);
                });
            })
        }

        return {
            load: function (selector, data) {
                return new CreateAlbumView(selector, data);
            }
        }
    })();
});
