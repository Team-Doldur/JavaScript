define(['q', 'requestHandler', 'albumModel'], function (Q, requestHandler, albumModel) {
    var _albumModel = albumModel.load('https://api.parse.com/1/');
    var filter;
    var photos = (function () {
        
        var Photo = (function () {
            function Photo(id, name, address, author, album) {
                this.id = id;
                this.name = name;
                this.address = address;
                this.author = author;
                this.album = album;
            }
            
            return Photo;
        })();
        
        var PhotosRepo = (function () {
            function PhotosRepo(baseUrl) {
                this._requestHandler = requestHandler.load(baseUrl);
                this.url = 'classes/Picture';
                this.photosData = {
                    photos: []
                };
            }
            
            PhotosRepo.prototype.getPhotos = function getAllPhotos(albumName) {
                var _this = this;
                var repo = this.photosData;
                repo['photos'] = [];
                var deffer = Q.defer();

                if (albumName) {
                    filterPhotos(albumName)
                        .then(function (filter) {
                            return getPhotoAndPushToRepo(_this._requestHandler, repo, _this.url + filter + "&include=album,author")
                        })
                        .then(function (photo) {
                            deffer.resolve(photo)
                        })
                } else {
                    getPhotoAndPushToRepo(_this._requestHandler, repo, _this.url + "?include=album,author")
                        .then(function (photo) {
                            deffer.resolve(photo)
                        })
                }

                return deffer.promise;
            };
            
            PhotosRepo.prototype.postPhoto = function postPhoto() {
                var deferred = Q.defer();

                this.requester.postRequest(serviceUrl, data, contentType)
                    .then(function (data) {
                    
                    deferred.resolve();
                }, function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };

            function getPhotoAndPushToRepo(requestHandler, repo, url) {
                var deffer, newPhoto;
                deffer = Q.defer();
                requestHandler.getRequest(url)
                    .then(function (data) {
                        data['results'].forEach(function (photo) {
                            newPhoto = new Photo(photo.objectId, photo.name, photo.picture.url, photo.author, photo.album, false);
                            repo['photos'].push(newPhoto);
                            deffer.resolve(repo);
                        });
                    }, function (err) {
                        deffer.reject(err)
                    });
                return deffer.promise;
            }

            function filterPhotos(albumName) {
                var deffer;
                deffer = Q.defer();
                _albumModel.getAlbumIdByName(albumName)
                    .then(function (id) {
                        filter = '?where={"album":{"__type":"Pointer","className":"Album","objectId":"' + id + '"}}';
                        deffer.resolve(filter);
                    }, function (err) {
                        deffer.reject(err);
                    });
                return deffer.promise;
            }
            
            return PhotosRepo;
        })();

        return {
            load: function photos(baseUrl) {
                return new PhotosRepo(baseUrl);
            }
        }
    })();
    
    return photos;
    
});
