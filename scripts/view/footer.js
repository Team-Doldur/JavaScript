define(['mustache'], function (Mustache) {
    return (function() {
        function FooterView(selector) {
            $.get('templates/footer.tpl', function(template) {
                var output = Mustache.render(template);

                $(selector).html(output);
            })
        }

        return {
            load: function (selector) {
                return new FooterView(selector);
            }
        }
    }());
});
