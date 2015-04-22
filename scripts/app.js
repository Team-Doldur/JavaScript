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

var app = app || {};

define(['jquery', 'sammy', 'controller', 'categoryModel', 'albumModel'], function ($, Sammy, controller, categoryModel, albumModel) {
    (function() {
        var categories = categoryModel.load('https://api.parse.com/1/');
        var albums = albumModel.load('https://api.parse.com/1/');
        var controller = app.controller.load();

        app.router = Sammy(function () {
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
                controller.getCategoryPage(mainSelector, categories);
            });

            this.get('#/Albums', function(){
                controller.getHeader(headerSelector);
                controller.getAlbumPage(mainSelector, albums);
            });

        });

        app.router.run('#/');
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