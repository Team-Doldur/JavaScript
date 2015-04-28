define(['q', 'requestHandler'], function (Q, requestHandler) {
    var serviceUrl = '/classes/Comment';

    function Comment(baseUrl) {
        this._requestHandler = requestHandler.load(baseUrl);
    }

    Comment.prototype.getComments = function(resourceType, resourceId) {
        var defer = Q.defer();
        var comments = [];

        this._requestHandler.getRequest(serviceUrl + '?order=createdAt&where=' + JSON.stringify({
                resourceType: resourceType,
                resourceId : resourceId
            }))
            .then(function (result) {
                result.results.forEach(function (comment) {
                    comments.push({
                        objectId: comment.objectId,
                        authorName: comment.authorName,
                        authorEmail: comment.authorEmail,
                        date: parseDate(comment.createdAt),
                        text: comment.text
                    });
                });

                defer.resolve(comments);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    Comment.prototype.postComment = function (resourceType, resourceId, author, authorEmail, text) {
        //TODO validate data
        var data = {
            resourceType: resourceType,
            resourceId: resourceId,
            authorName: author,
            authorEmail: authorEmail,
            text: text
        };

        return this._requestHandler.postRequest(serviceUrl, data);
    };

    function parseDate(date) {
        var d = new Date(date);
        var hours = d.getHours();
        var minutes = d.getMinutes();

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear() + ' ' +
             hours + ':' + minutes;
    }

    return {
        load: function (baseUrl) {
            return new Comment(baseUrl);
        }
    }
});
