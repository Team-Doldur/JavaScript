define(['mustache'], function (Mustache) {
    return (function() {
        function LoginView(selector) {
            $.get('templates/login.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector) {
                return new LoginView(selector);
            }
        }
    }());
});