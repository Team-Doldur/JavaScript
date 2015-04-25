define(['mustache'], function (Mustache) {
    return (function () {
        function CommentsView(selector, data) {
            $.get('templates/comments.tpl', function (template) {
                Mustache.parse(template);
                var rendered = Mustache.render(template, data);
                $(selector).html(rendered);
            })
        }

        return {
            load: function (selector, data) {
                return new CommentsView(selector, data);
            }
        }
    })();
});