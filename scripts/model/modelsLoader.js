define(['categoryModel', 'albumModel', 'photoModel', 'commentModel'], function (categoryModel, albumModel, photoModel, commentModel){
    return (function() {
        function Model(baseUrl) {
            this.categories = categoryModel.load(baseUrl);
            this.albums = albumModel.load(baseUrl);
            this.photos = photoModel.load(baseUrl);
            this.comments = commentModel.load(baseUrl);
        }

        return {
            load: function (baseUrl) {
                return new Model(baseUrl);
            }
        }
    })();
});
