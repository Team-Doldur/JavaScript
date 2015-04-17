var app = app || {};

define(['mustache'], function (Mustache) {
    app.homeView = (function() {
        function HomeView(selector, data) {
            $.get('templates/home.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return HomeView(selector, data);
            }
        }
    }());
});