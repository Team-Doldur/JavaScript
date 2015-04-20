define(['q', 'requestHandler'], function (Q, requestHandler) {
    var photos = (function () {
        
        var Photo = (function () {
            function Photo(url, id, comments, rank, author) {
                this.photoUrl = url;
                this.id = id;
                this.comments = comments;
                this.rank = rank;
                this.author = author;
            }
            
            return Photo;
        })();
        
        var PhotosRepo = (function (baseUrl) {
            function PhotosRepo(baseUrl) {
                this.requester = requestHandler.load(baseUrl);
                this.url = 'classes/Picture';
                this.allPhotos = [];
                this.albumPhotos = [];
                this.highRankPhotos = [];

            }
            
            PhotosRepo.prototype.getAllPhotos = function getAllPhotos(albumId) {
                var _this = this;
                
                var deferred = Q.defer();
                this.allPhotos.length = 0;
                
                if (albumId) {
                    this.url = this.url + '?where={"album":{"__type":"Pointer","className":"Album","objectId":"' + albumId + '"}}';
                }
                
                this.requester.getRequest(this.url, null)
                    .then(function (data) {
                    data.results.forEach(function (result) {
                        var pictureUrl = result.picture.url;
                        var id = result.objectId;
                        var comments = result.comments;
                        var photo = new Photo(pictureUrl, id, comments);
                        _this.allPhotos.push(photo);
                    });
                    deferred.resolve(_this.allPhotos);
                }, function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            }
            
            PhotosRepo.prototype.postPhoto = function postPhoto() {
                var _this = this;
                
                var deferred = Q.defer();
                
                this.requester.postRequest(serviceUrl, data, contentType)
                    .then(function (data) {
                    
                    deferred.resolve();
                }, function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            }
            
            return PhotosRepo;
        })();

        return {
            loadPhotos: function photos(baseUrl) {
                return new PhotosRepo(baseUrl);
            }
        }
    })();
    
    return photos;
    
});
