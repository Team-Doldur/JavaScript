define(['q', 'requestHandler'], function (Q, requestHandler) {
    var Category = (function() {
        function Category(name, id) {
            this.name = name;
            this.id = id;
        }

        return Category;
    })();

    var categoryData = (function() {
        function CategoryRepo(baseUrl) {
            this._requestHandler = requestHandler.load(baseUrl);
            this.caregoriesData = {
                categories: []
            };
        }

        CategoryRepo.prototype.getCategories = function () {
            var deffer = Q.defer();
            var _this = this;
            this.caregoriesData['categories'].length = 0;

            this._requestHandler.getRequest('classes/Category/')
                .then(function (data) {
                    data['results'].forEach(function(dataCategory) {
                        var category = new Category(dataCategory.name, dataCategory.objectId);
                        _this.caregoriesData['categories'].push(category);
                    });

                    deffer.resolve(_this.caregoriesData);
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

    return categoryData;
});