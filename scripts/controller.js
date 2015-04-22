var app = app || {};

define(['headerView', 'homeView', 'registerView', 'categoryModel', 'categoryView'], function () {
    app.controller = (function () {
        function Controller(model) {
        }

        Controller.prototype.getHeader = function (headerSelector) {
            app.headerView.load(headerSelector);
        };

        Controller.prototype.getHomePage = function (mainSelector) {
            app.homeView.load(mainSelector);
        };

        Controller.prototype.getRegisterPage = function (mainSelector) {
            app.registerView.load(mainSelector);
        };

        Controller.prototype.getCategoryPage = function (mainSelector, model) {
            model.getCategories().then(
                function (data) {
                    app.categoriesView.load(mainSelector, data);
                },
                function (error) {
                    console.error(error);
                }
            )
        };

        Controller.prototype.getAlbumPage = function (mainSelector, model) {
            model.getAlbums()
                .then(function (data){
                    //TODO: add view model call here.
                },function(error){
                    console.error(error)
                })
        };

        return {
            load: function (model) {
                return new Controller(model);
            }
        }
    })();
});
