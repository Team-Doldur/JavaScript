requirejs.config({
    baseUrl: 'scripts',

    paths: {
        // libs
        jquery: 'lib/jquery-2.1.3.min',

        // controllers
        albumController: 'controller/album',
        categoryController: 'controller/category',
        photoController: 'controller/photo',

        // models
        albumModel: 'model/album',
        categoryModel: 'model/category',
        photoModel: 'model/photo',
        requestHandler: 'model/requestHandler',
        userModel: 'model/user',

        // views
        albumView: 'view/album',
        categoryView: 'view/category',
        photoView: 'view/photo'
    }
});

var app = app || {};

define(['jquery', 'userModel'], function () {
    return (function() {

    })();
});