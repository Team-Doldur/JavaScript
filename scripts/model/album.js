define(['q', 'requestHandler', 'categoryModel'], function (Q, requestHandler, categoryModel) {
    var albumURL, filter, _categoryModel, _requestHandler;
    _categoryModel = categoryModel.load('https://api.parse.com/1/');
    albumURL = "classes/Album";
    var Album = (function () {
        var _category, _author;
        var _requestHandler = requestHandler.load('https://api.parse.com/1/');

        function AlbumForRepo(id, name, address, author, category) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.author = author;
            this.category = category;
        }

        function AlbumForDB(name, address, author, category) {
            this.name = name;
            this.address = address;
            this.author = author;
            this.category = category;
        }

        AlbumForDB.prototype.publish = function () {
            var currentUserID = sessionStorage.getItem('currentUserId');
            this.ACL = { };
            this.ACL[currentUserID] = {"write": true, "read": true};
            this.ACL['*'] = {"read": true};
            return _requestHandler.postRequest(albumURL, this, 'application/json');
        };

        function Pointer(name, id) {
            this.__type = "Pointer";
            this.className = name;
            this.objectId = id;
        }


        function createAlbum(id, name, address, author, category, forDB) {
            if (category) {
                if (forDB) {
                    _category = new Pointer("Category", category);
                    _author = new Pointer("_User", author);
                    return new AlbumForDB(name, address, _author, _category);
                }
                _category = category.address;
                return new AlbumForRepo(id, name, address, author, _category)
            }
        }

        return createAlbum;
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
                        return getAlbumAndPushToRepo(_this._requestHandler, repo, albumURL + filter + "&include=category,author")
                    })
                    .then(function (album) {
                        deffer.resolve(album)
                    })
            } else {
                getAlbumAndPushToRepo(_this._requestHandler, repo, albumURL + "?include=category,author")
                    .then(function (album) {
                        deffer.resolve(album)
                    })
            }
            return deffer.promise;
        };

        AlbumRepo.prototype.getAlbumById = function (id) {
            var defer = Q.defer();

            this._requestHandler.getRequest(albumURL + '/' + id + '?include=author')
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        AlbumRepo.prototype.getAlbumsByCategory = function (categoryId) {
            var defer = Q.defer();

            this._requestHandler.getRequest(albumURL + '?where={"category": { "__type": "Pointer", "className": "Category", "objectId": "' + categoryId + '"}}')
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        AlbumRepo.prototype.getAlbumIdByName = function (name) {
            var deffer = Q.defer();
            var filter = '?where={"name":"' + name + '"}';
            this._requestHandler.getRequest(albumURL + filter)
                .then(function (data) {
                    deffer.resolve(data['results'][0].objectId);
                }, function (error) {
                    deffer.reject(error);
                });
            return deffer.promise;
        };

        function getAlbumAndPushToRepo(requestHandler, repo, url) {
            var deffer, newAlbum;
            deffer = Q.defer();
            requestHandler.getRequest(url)
                .then(function (data) {
                    data['results'].forEach(function (album, index) {
                        newAlbum = new Album(album.objectId, album.name, album.address, album.author, album.category, false);
                        repo['albums'].push(newAlbum);
                        deffer.resolve(repo);
                    });
                }, function (err) {
                    deffer.reject(err)
                });
            return deffer.promise;
        }

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
        }

        return AlbumRepo
    }());


    return {
        load: function (baseURL) {
            return new AlbumRepo(baseURL)
        },
        createAlbum: function (name, author, category) {
            var address = name.split(' ').join('+');
            var newAlbum = new Album(null, name, address, author, category, true);
            return newAlbum.publish();
        }
    }
});