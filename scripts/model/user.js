define(['requestHandler', 'q'], function (requestHandler, Q) {
    return (function () {
        var newUser, namePattern, minNameLength, minPasswordLength, isValid, loginURL, mailPattern, filter, userSignUpURL, userLoginURL;

        userSignUpURL = 'users';
        userLoginURL = 'login';

        ////Validation beta \o/
        //
        //namePattern = new RegExp('[a-zA-Z0-9_\\-.]{' + minNameLength + ',}');
        //minNameLength = 4;
        //minPasswordLength = 6;
        //
        //function validateUsername(name) {
        //    return namePattern.test(name.trim());
        //}
        //
        //function validatePassword(password) {
        //    return password > minPasswordLength;
        //}


        //As long as the above doesn't contain '@' as an allowed character this should suffice if it gets changed use the regex below.
        mailPattern = new RegExp('@');

        //new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]" +
        //"+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b" +
        //"\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|" +
        //"\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]" +
        //"*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");


        function User(username, password, email) {
            this.username = username;
            this.password = password;
            this.email = email;
        }

        function register(name, password, email) {
            var _requestHandler = requestHandler.load('https://api.parse.com/1/');
            newUser = new User(name, password, email);
            _requestHandler.postRequest(userSignUpURL, newUser, 'application/json');
        }

        function login(user, password, keepMeLogged) {
            var deffer = Q.defer();
            var _requestHandler = requestHandler.load('https://api.parse.com/1/');

            //if user enter mail he can log in as well
            if (mailPattern.test(user)) {
                filter = '?where={"email":"' + user.trim() + '"}';
                _requestHandler.getRequest(userSignUpURL + filter, null, function (data) {
                    user = data.results[0].username;
                });
            }

            loginURL = userLoginURL + '?username=' + user.trim() + '&password=' + password;
            _requestHandler.getRequest(loginURL)
                .then(function (data) {
                    sessionStorage['sessionToken'] = data.sessionToken;
                    sessionStorage['logged-in'] = true;
                    _requestHandler.getRequest('users/' + data.objectId)
                        .then(function (data) {
                            sessionStorage['currentUser'] = data.username;
                            sessionStorage['currentUserId'] = data.objectId;
                            //window.location.replace('#/');
                            deffer.resolve();
                        });
                    if (keepMeLogged) {
                        localStorage['sessionToken'] = data.sessionToken;
                    }
                }, function(err){
                    deffer.reject(err);
                });
            return deffer.promise
        }

        function logout() {
            var _requestHandler = requestHandler.load('https://api.parse.com/1/')

            _requestHandler.postRequest('logout')
                .then(function(){
                    sessionStorage.clear();
                    window.location.reload(true);
                });
        }

        return {
            register: register,
            login: login,
            logout: logout
        }
    })();
});