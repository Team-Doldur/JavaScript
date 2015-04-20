var app = app || {};

define(['q', 'requestHandler'], function (Q) {
    app.category = (function() {
        function Category(name, id) {
            this.name = name;
            this.id = id;
        }

        return Category;
    })();

    app.categoryData = (function() {
        function CategoryRepo(baseUrl) {
            this._requestHandler = app.requestHandler.load(baseUrl);
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
                        var category = new app.category(dataCategory.name, dataCategory.objectId);
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
});