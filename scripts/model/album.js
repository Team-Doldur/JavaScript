define(['q', 'requestHandler', 'categoryModel'], function (Q, requestHandler, categoryModel) {
    var albumURL, filter, _categoryModel;
    _categoryModel = categoryModel.load('https://api.parse.com/1/');
    albumURL = "classes/Album";

    var Album = (function () {
        var deffer, _category, _id;

        function AlbumForRepo(id, name, author, category) {
            this.id = id;
            this.name = name;
            this.author = author;
            this.category = category;
        }

        function AlbumForDB(name, author, category) {
            this.name = name;
            this.author = author;
            this.category = category;
        }

        function Pointer(id) {
            this.__type = "Pointer";
            this.className = "Category";
            this.objectId = id;
        }

        function createAlbum(id, name, author, category, forDB) {
            deffer = Q.defer();

            if (forDB) {
                _id = category;
                _category = new Pointer(_id);
                deffer.resolve(new AlbumForDB(name, author, _category));
            } else {
                _categoryModel.getCategoryNameById(category)
                    .then(function (category) {
                        deffer.resolve(new AlbumForRepo(id, name, author, category));
                    });
            }
            return deffer.promise;
        }

        return {
            createAlbum: createAlbum
        };
    }());

    var AlbumRepo = (function () {
        function AlbumRepo(baseUrl) {
            this._requestHandler = requestHandler.load(baseUrl);
            this.albumsData = {
                albums: []
            };
        }

        AlbumRepo.prototype.getAlbums = function (categoryName) {
            var _this, deffer, repo;
            _this = this;
            repo = this.albumsData;
            repo['albums'] = [];

            deffer = Q.defer();

            if (categoryName) {
                filterAlbums(categoryName)
                    .then(function (filter) {
                        return getAlbumAndPushToRepo(_this._requestHandler, repo, albumURL + filter)
                    })
                    .then(function (album) {
                        deffer.resolve(album)
                    })
            } else {
                getAlbumAndPushToRepo(_this._requestHandler, repo, albumURL)
                    .then(function (album) {
                        deffer.resolve(album)
                    })
            }
            return deffer.promise;
        };

        function getAlbumAndPushToRepo(requestHandler, repo, url) {
            var deffer;
            deffer = Q.defer();
            requestHandler.getRequest(url)
                .then(function (data) {
                    data['results'].forEach(function (album, index) {
                        //Album.createAlbum(album.objectId, album.name, album.author, album.category.objectId, false)
                        //    .then(function (album) {
                        //        repo['albums'].push(album);
                        //    });

                        //TODO: Fix this so it works as it should... Album category should return a name not id.
                        repo['albums'].push({id : album.objectId, name: album.name, author: album.author, category: album.category})
                        deffer.resolve(repo);
                    });
                }, function (err) {
                    deffer.reject(err)
                });
            return deffer.promise;
        }

<<<<<<< HEAD
        function filterAlbums(categoryName) {
            var deffer;
            deffer = Q.defer();
            _categoryModel.getCategoryIdByName(categoryName)
                .then(function (id) {
                    filter = '?where={"category":{"__type":"Pointer","className":"Category","objectId":"' + id + '"}}';
                    deffer.resolve(filter);
                }, function (err) {
                    deffer.reject(err);
                });
            return deffer.promise;
=======
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
>>>>>>> origin/master
        }

        return AlbumRepo
    }());

    function publishAlbum(url, name, author, category) {
        requestHandler.load(url).postRequest(albumURL, new Album(null, name, author, category, true));
    }

    return {
        load: function (baseURL) {
            return new AlbumRepo(baseURL)
        },
        publish: publishAlbum
    }
});