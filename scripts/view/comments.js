define(['mustache'], function (Mustache) {
    return (function () {
        function CommentsView(selector, data, albumId) {
            $.get('templates/comments.tpl', function (template) {
                Mustache.parse(template);
                var rendered = Mustache.render(template, {
                    comments: data.results,
                    resourceId: albumId,
                    resourceType: 'Album'
                });
                $(selector).html(rendered);
            })
        }

        return {
            load: function (selector, data, albumId) {
                return new CommentsView(selector, data, albumId);
            }
        }
    })();
});