var app = app || {};

define(['mustache'], function (Mustache) {
    app.categoriesView = (function() {
        function CategoriesView(selector, data) {
            $.get('templates/category.tpl', function (template) {
                var output = Mustache.render(template, data);
                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return new CategoriesView(selector, data);
            }
        }
    })();
});