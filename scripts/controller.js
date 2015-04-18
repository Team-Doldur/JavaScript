var app = app || {};

define(['categoryModel', 'categoryView', 'initialView', 'homeView'], function () {
    app.controller = (function() {
        function Controller(model) {
            this.model = model;
        }

        Controller.prototype.getInitialPage = function (selector) {
            app.initialView.load(selector);
        };

        Controller.prototype.getHomePage = function (selector) {
            app.homeView.load(selector);
        };

        Controller.prototype.getCategoryPage = function (selector) {
            this.model.getCategories().then(
                function (data) {
                    app.categoriesView.load(selector, data);
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
