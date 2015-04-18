var app = app || {};

define(['headerView', 'homeView', 'registerView', 'categoryModel', 'categoryView'], function () {
    app.controller = (function() {
        function Controller(model) {
            this.model = model;
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

        Controller.prototype.getCategoryPage = function (mainSelector) {
            this.model.getCategories().then(
                function (data) {
                    app.categoriesView.load(mainSelector, data);
                },
                function (error) {
                    console.error(error);
                }
            )
        };

        return {
            load: function (model) {
                return new Controller(model);
            }
        }
    })();
});
