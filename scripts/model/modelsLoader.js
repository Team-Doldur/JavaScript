define(['categoryModel', 'albumModel'], function (categoryModel, albumModel){
    return (function() {
        function Model(baseUrl) {
            this.categories = categoryModel.load(baseUrl);
            this.albums = albumModel.load(baseUrl);
        }

        return {
            load: function (baseUrl) {
                return new Model(baseUrl);
            }
        }
    })();
});
