define(['q', 'requestHandler'], function (Q, requestHandler, categoryModel) {
    var albumURL, filter;

    albumURL = "classes/Album";

    var Album = (function () {
        function Album(id, name, author, category) {
            this.id = id;
            this.name = name;
            this.author = author;
            this.category = category
        }

        return Album;
    });

    function createAlbum(id, name, author, category) {
        //Get category id here.
        return new Album(id, name, author, category);
    }

    function pushAlbumToDB(album) {
        requestHandler.postRequest(albumURL, album, 'application/json');
    }

    return (function () {
        function AlbumRepo(baseUrl) {
            this._requestHandler = requestHandler.load(baseUrl);
            this.albumsData = {
                albums: []
            };
        }

        AlbumRepo.prototype.getAlbums = function (categoryName) {
            var deffer = Q.defer();
            var _this = this;
            this.albumsData['albums'].length = 0;



            if (categoryName) {
                filter = '?where={"category":{"__type":"Pointer","className":"Category","objectId":"' + categoryName + '"}}'
            } else {
                filter = '';
            }

            this._requestHandler.getRequest(albumURL + filter)
                .then(function (data) {
                    data['results'].forEach(function (album, index) {
                        _this.albumsData['albums'].push({id: album.objectId, name: album.name, author: album.author, category: album.category});
                    });
                    deffer.resolve(_this.albumsData)
                }, function (err) {
                    deffer.reject(err);
                });

            return deffer.promise;
        };

        AlbumRepo.prototype.getAlbumById = function (id) {
            var defer = Q.defer();

            this._requestHandler.getRequest(albumURL + '/' + id)
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        return {
            load: function (baseURL) {
                return new AlbumRepo(baseURL)
            }
        }
    }())
});