define(['categoryModel', 'albumModel', 'photoModel'], function (categoryModel, albumModel, photoModel){
    return (function() {
        function Model(baseUrl) {
            this.categories = categoryModel.load(baseUrl);
            this.albums = albumModel.load(baseUrl);
            this.photos = photoModel.load(baseUrl);
        }

        return {
            load: function (baseUrl) {
                return new Model(baseUrl);
            }
        }
    })();
});
