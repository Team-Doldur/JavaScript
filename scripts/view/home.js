define(['mustache'], function (Mustache) {
    return (function() {
        function HomeView(selector) {
            $.get('templates/home.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector) {
                return new HomeView(selector);
            }
        }
    }());
});