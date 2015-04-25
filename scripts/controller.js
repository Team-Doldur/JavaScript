define(['headerView' ,'footerView', 'homeView', 'registerView', 'loginView', 'categoryView', 'albumView', 'uploadPhotoView'],
    function (headerView, footerView, homeView, registerView, loginView, categoryView, albumView, uploadPhotoView) {
    return (function () {
        function Controller(model) {
        }

        Controller.prototype.getHeader = function (headerSelector) {
            headerView.load(headerSelector);
        };

        Controller.prototype.getFooter = function (footerSelector) {
            footerView.load(footerSelector);
        };

        Controller.prototype.getHomePage = function (mainSelector) {
            homeView.load(mainSelector);
        };

        Controller.prototype.getRegisterPage = function (mainSelector) {
            registerView.load(mainSelector);
        };

        Controller.prototype.getLoginPage = function (mainSelector) {
            loginView.load(mainSelector);
        };

        Controller.prototype.getCategoryPage = function (mainSelector, model) {
            model.getCategories().then(
                function (data) {
                    categoryView.load(mainSelector, data);
                },
                function (error) {
                    console.error(error);
                }
            );
        };

        Controller.prototype.getUploadPhotoPage = function (mainSelector, model) {
            model.categories.getCategories().then(
                function (data) {
                    uploadPhotoView.load(mainSelector, data);
                },
                function (error) {
                    console.error(error);
                }
            )
        };

        Controller.prototype.getAlbumPage = function (mainSelector, model, categoryName) {
            model.getAlbums(categoryName)
                .then(function (data){
                    albumView.load(mainSelector, data)
                },function(error){
                    console.error(error)
                })
        };

        Controller.prototype.getViewAlbumPage = function (mainSelector, model, albumId) {
            model.getAlbumById(albumId)
                .then(function (data) {
                    albumView.load(mainSelector, data);
                }, function (error) {
                    console.error(error);
                })
        };

        return {
            load: function (model) {
                return new Controller(model);
            }
        }
    })();
});