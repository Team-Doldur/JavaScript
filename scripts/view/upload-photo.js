define(['mustache', 'albumModel'], function (Mustache, albumModel) {
    return (function() {
        var _albumModel = albumModel.load('https://api.parse.com/1/');
        function UploadPhotoView(selector, data, controller) {
            $.get('templates/upload-photo.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
                loadAlbums();
                $('#photo-category').on('change', function () {
                    loadAlbums();
                })
            })
            .then(function () {
                var photo,
                    title,
                    albumId,
                    authorId;
                $('#upload-photo').bind("change", function (e) {
                    var notificationContainer = $('.signup-wrap');

                    var maxSize = 5000000;
                    var files = e.target.files || e.dataTransfer.files;
                    var fileType = this.files[0].type;
                    var fileFormat = (fileType.split('/'))[1];
                    if(!(fileFormat==='jpeg' || fileFormat==='png' || fileFormat==='gif')){
                        notificationContainer.noty({text: "Format not allowed. Also for some reason you will have to reaload tha whole damn page for the thing to work again.", type: "warning"})
                        notificationContainer.noty({text: "And I have no clue how to fix it and it's like 4 am and I've had about 20 hours of sleep total during the last 10 days and we will have to present this whole thing in about uhm 6 hours and 13 minutes at the time of writing this", type: "warning"})
                    }
                    else if (this.files[0].size>maxSize){
                        notificationContainer.noty({text: "The file size is limited to 5 MB!", type: "warning"})
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
                        notificationContainer.noty({text: "Please select appropriate file", type: "warning"})
                    }
                });
            })
        }


        function loadAlbums(){
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
        }
        return {
            load: function (selector, data, controller) {
                return new UploadPhotoView(selector, data, controller);
            }
        }
    })();
});