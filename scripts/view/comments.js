define(['mustache'], function (Mustache) {
    return (function () {
        function CommentsView(selector, data) {
            $.get('templates/comments.tpl', function (template) {
                Mustache.parse(template);
                var rendered = Mustache.render(template, {
                    comments: data.results
                });
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