requirejs.config({
    baseUrl: 'scripts',

    paths: {
        // libs
        jquery: 'lib/jquery-2.1.3.min',
        lodash: 'lib/lodash.min',
        mustache: 'lib/mustache.min',
        q: 'lib/q',
        sammy: 'lib/sammy-latest.min',

        // controller
        controller: 'controller',

        // models
        albumModel: 'model/album',
        categoryModel: 'model/category',
        commentModel: 'model/comment',
        modelsLoader: 'model/modelsLoader',
        photoModel: 'model/photo',
        rateModel: 'model/rate',
        requestHandler: 'model/requestHandler',
        userModel: 'model/user',


        // views
        albumView: 'view/album',
        categoryView: 'view/category',
        commentView: 'view/comment',
        headerView: 'view/header',
        homeView: 'view/home',
        registerView: 'view/register',
        photoView: 'view/photo',
        rateView: 'view/rate',
        uploadPhotoView: 'view/upload-photo'
    },

    shim: {
        sammy: {
            deps: ['jquery'],
            exports: 'Sammy'
        }
    }
});

define(['jquery', 'sammy', 'controller', 'modelsLoader'], function ($, Sammy, ctrl, modelsLoader) {
    (function() {
        var baseUrl = 'https://api.parse.com/1/';
        var model = modelsLoader.load(baseUrl);
        var controller = ctrl.load(model);

        var router = Sammy(function () {
            var headerSelector = '#header';
            var mainSelector = '#wrapper';

            this.get('#/', function () {
                controller.getHeader(headerSelector);
                controller.getHomePage(mainSelector);
            });

            this.get('#/register', function () {
                controller.getHeader(headerSelector);
                controller.getRegisterPage(mainSelector);
            });

            this.get('#/Category', function () {
                controller.getHeader(headerSelector);
                controller.getCategoryPage(mainSelector, model.categories);
            });

            this.get('#/upload', function () {
                controller.getHeader(headerSelector);
                controller.getUploadPhotoPage(mainSelector);
            });

            this.get('#/Albums', function(){
                controller.getHeader(headerSelector);
                controller.getAlbumPage(mainSelector, model.albums);
            });

        });

        router.run('#/');
    })();
});

//Test new requestHandler with photo:

//require(['jquery', 'photoModel'], function ($, photo) {
//(function () {
//    var photos = photo.loadPhotos('https://api.parse.com/1/');
//    photos.getAllPhotos();
//    console.log(photos.allPhotos);
//})();
//});