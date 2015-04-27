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
        requestHandler: 'model/requestHandler',
        userModel: 'model/user',


        // views
        albumView: 'view/album',
        categoryView: 'view/category',
        commentView: 'view/comment',
        headerView: 'view/header',
        footerView: 'view/footer',
        homeView: 'view/home',
        registerView: 'view/register',
        loginView: 'view/login',
        photoView: 'view/photo',
        createAlbumView: 'view/create-album',
        uploadPhotoView: 'view/upload-photo',
        commentsView: 'view/comments',
        viewAlbumView: 'view/viewAlbum'
    },

    shim: {
        sammy: {
            deps: ['jquery'],
            exports: 'Sammy'
        }
    }
});

define(['jquery', 'sammy', 'controller', 'modelsLoader'], function ($, Sammy, ctrl, modelsLoader) {
    (function () {
        var baseUrl = 'https://api.parse.com/1/';
        var model = modelsLoader.load(baseUrl);
        var controller = ctrl.load(model);

        var router = Sammy(function () {
            var headerSelector = '#header';
            var mainSelector = '#wrapper';
            var secondarySelector = '#albums';
            var footerSelector = '#main-footer';

            this.get('#/', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getHomePage(mainSelector);
                controller.getFooter(footerSelector);
            });

            this.get('#/Register', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getRegisterPage(mainSelector);
            });

            this.get('#/Login', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getLoginPage(mainSelector);
            });

            this.get('#/Category', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getCategoryPage(mainSelector, model.categories);
            });

            this.get('#/Category/:categoryAddress', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getCategoryPage(mainSelector, model.categories);
                controller.getAlbumPage(secondarySelector, model.albums, this.params['categoryAddress']);
            });

            this.get('#/Category/:categoryAddress/:albumAddress', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getCategoryPage(mainSelector, model.categories);
                controller.getPhotoPage(secondarySelector, this.params['albumAddress']);
            });

            this.get('#/NewAlbum', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getCreateAlbumPage(mainSelector, model);
            });

            this.get('#/Upload', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getUploadPhotoPage(mainSelector, model);
            });

            this.get('#/Albums/:id', function () {
                controller.getHeader(headerSelector, sessionStorage);
                controller.getViewAlbumPage(mainSelector, this.params['id']);
            });

            this.post('#/StoreComment', function () {
                controller.storeComment(this.params);
            });
        });

        router.run('#/');
    })();
});
