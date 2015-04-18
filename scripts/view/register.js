var app = app || {};

define(['mustache'], function (Mustache) {
    app.registerView = (function() {
        function RegisterView(selector, data) {
            $.get('templates/register.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return RegisterView(selector, data);
            }
        }
    }());
});
