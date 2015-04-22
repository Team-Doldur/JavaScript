define(['mustache'], function (Mustache) {
    return (function() {
        function RegisterView(selector) {
            $.get('templates/register.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector) {
                return new RegisterView(selector);
            }
        }
    }());
});