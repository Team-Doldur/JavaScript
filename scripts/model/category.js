define(['q', 'requestHandler'], function (Q, requestHandler) {
    var Category = (function() {
        function Category(name, id, address) {
            this.name = name;
            this.id = id;
            this.address = address;
        }

        return Category;
    })();

    return (function () {
        function CategoryRepo(baseUrl) {
            this._requestHandler = requestHandler.load(baseUrl);
            this.url = 'classes/Category/';
            this.caregoriesData = {
                categories: []
            };
        }

        CategoryRepo.prototype.getCategories = function () {
            var deffer = Q.defer();
            var _this = this;
            this.caregoriesData['categories'].length = 0;

            this._requestHandler.getRequest(this.url)
                .then(function (data) {
                    data['results'].forEach(function (dataCategory) {
                        var address = dataCategory.name.split(' ').join('+');
                        var category = new Category(dataCategory.name, dataCategory.objectId, address);
                        _this.caregoriesData['categories'].push(category);
                    });
                    deffer.resolve(_this.caregoriesData);
                }, function (error) {
                    deffer.reject(error);
                });

            return deffer.promise;
        };

        CategoryRepo.prototype.addCategory = function (categoryName) {
            var categoryExist = false;
            var _this = this;
            

            this._requestHandler.getRequest(this.url)
                .then(function (data) {
                    data['results'].forEach(function (category) {
                        if (category.name.toLowerCase() === categoryName.toLowerCase()) {
                            categoryExist = true;
                        }
                    });
                    if (categoryExist) {
                        console.error('Category exists!');
                        throw new Error('Category exists!');
                    }
                    var dataForPush = {name: categoryName};
                    var contentType = 'application/json';
                    _this._requestHandler.postRequest(_this.url, dataForPush, contentType);
                }, function (error) {
                    console.error('Cannot load categories ' + error);
                });
        };

        CategoryRepo.prototype.getCategoryNameById = function(id) {
            var deffer = Q.defer();
            var filter = '?where={"objectId":"' + id + '"}';
            this._requestHandler.getRequest(this.url+filter)
                .then(function (data) {
                    deffer.resolve(data['results'][0].name);
                }, function (error) {
                    deffer.reject(error);
                });
            return deffer.promise;
        };

        CategoryRepo.prototype.getCategoryIdByName = function(name) {
            var deffer = Q.defer();
            var filter = '?where={"name":"' + name + '"}';
            this._requestHandler.getRequest(this.url+filter)
                .then(function (data) {
                    deffer.resolve(data['results'][0].objectId);
                }, function (error) {
                    deffer.reject(error);
                });
            return deffer.promise;
        };


        return {
            load: function (baseUrl) {
                return new CategoryRepo(baseUrl);
            }
        }
    })();
});