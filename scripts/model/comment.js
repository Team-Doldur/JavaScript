define(['q', 'requestHandler'], function (Q, requestHandler) {
    var serviceUrl = '/classes/Comment';

    function Comment(baseUrl) {
        this._requestHandler = requestHandler.load(baseUrl);
    }

    Comment.prototype.getComments = function(resourceType, resourceId) {
        return this._requestHandler.getRequest(serviceUrl + '?where=' + JSON.stringify({
                resourceType: resourceType,
                resourceId : resourceId
            }));
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

    return {
        load: function (baseUrl) {
            return new Comment(baseUrl);
        }
    }
});
