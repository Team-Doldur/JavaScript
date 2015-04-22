define(['mustache'], function (Mustache) {
    return (function() {
        function HeaderView(selector) {
            $.get('templates/header.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector) {
                return new HeaderView(selector);
            }
        }
    }());
});