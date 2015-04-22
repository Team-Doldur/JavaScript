define(['mustache'], function (Mustache) {
    return (function() {
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