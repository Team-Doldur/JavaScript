define(['q', 'requestHandler'], function (Q, requestHandler) {
    var serviceUrl = '/classes/Comment';

    function Comment(baseUrl) {
        this._requestHandler = requestHandler.load(baseUrl);
    }

    Comment.prototype.getComments = function(resourceType, resourceId) {
        return this._requestHandler.getRequest(serviceUrl + '?include=author&where=' + JSON.stringify({
                resourceType: resourceType,
                resourceId : resourceId
            }));
    };

    Comment.prototype.getAlbumComments = function (id) {
        return this.getComments('Album', id);
    };

    Comment.prototype.getPictureComments = function (id) {
        return this.getComments('Picture', id);
    };

    Comment.prototype.postComment = function () {

    };

    return {
        load: function (baseUrl) {
            return new Comment(baseUrl);
        }
    }
});
