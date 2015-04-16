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
        photoView: 'view/photo',
        rateView: 'view/rate'
    }
});

var app = app || {};

define(['jquery', 'sammy', 'q', 'lodash', 'mustache'], function () {
    //TODO: implement sammy router
});