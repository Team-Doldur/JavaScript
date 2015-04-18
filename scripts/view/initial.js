var app = app || {};

define(['mustache'], function (Mustache) {
    app.initialView = (function() {
        function InitialView(selector, data) {
            $.get('templates/initial.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector, data) {
                return InitialView(selector, data);
            }
        }
    }());
});
