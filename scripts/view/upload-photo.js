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
                                console.log(response);
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
                var photo,
                    title,
                    albumId,
                    authorId;
                $('#upload-photo').bind("change", function (e) {
                    var maxSize = 5000000;
                    var files = e.target.files || e.dataTransfer.files;
                    var fileType = this.files[0].type;
                    var fileFormat = (fileType.split('/'))[1];
                    if(!(fileFormat==='jpeg' || fileFormat==='png' || fileFormat==='gif')){
                        alert("Not allowed format!")
                    }
                    else if (this.files[0].size>maxSize){
                        alert("The file size is limited to 5 MB!");
                    }else{
                        photo = files[0];
                    }
                });

                $('#uploadbutton').click(function () {
                    title = $('#photo-title').val();
                    albumId=$('#photo-album>option:selected').attr('value');
                    authorId = sessionStorage['currentUserId'];
                    var notificationContainer = $('.signup-wrap');
                    if(photo){
                        notificationContainer = $('.upload-photo');
                        controller.sendPhoto(photo, title,albumId, authorId)
                            .then(function () {
                            var redirectTimeout = 3;
                            var redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                            notificationContainer.html(redirectMsg);
                            var interval = setInterval(function () {
                                redirectTimeout -= 1;
                                redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                                notificationContainer.html(redirectMsg);

                                if (window.location.hash != "#/Upload") {
                                    clearInterval(interval);
                                }

                                if (redirectTimeout <= 0) {
                                    clearInterval(interval);
                                    notificationContainer.html('Redirecting...');
                                    setTimeout(function () {
                                        window.location.replace('#/');
                                    }, 1000);
                                }
                            }, 1000);
                            notificationContainer.parent().noty({text: "Upload successful", type: 'success'})
                        })
                    }else{
                        notificationContainer.noty({text: "Please slect appropriate file", type: "warning"})
                    }
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