define(['requestHandler'], function (requestHandler) {
    return (function () {
        var newUser, namePattern, minNameLength, minPasswordLength, isValid, loginURL, mailPattern, filter, userSignUpURL, userLoginURL;

        userSignUpURL = 'https://api.parse.com/1/users';
        userLoginURL = 'https://api.parse.com/1/login';

        minNameLength = 4;
        minPasswordLength = 6;


        namePattern = new RegExp('[a-zA-Z0-9_\\-.]{' + minNameLength + ',}');

        //As long as the above doesn't contain '@' as an allowed character this should suffice if it gets changed use the regex below.
        mailPattern = new RegExp('@');

        //new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]" +
        //"+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b" +
        //"\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|" +
        //"\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]" +
        //"*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");


        function User(username, name, password, email) {
            isValid = validateUsername(username) && validateDisplayName(name) && validatePassword(password);
            if (isValid) {
                this.username = username;
                this.name = name;
                this.password = password;
                this.email = email;
            }
        }

        function validateUsername(name) {
            return namePattern.test(name.trim());
        }

        function validateDisplayName(name) {
            var DBNames, isContained;
            DBNames = [];
            requestHandler.getRequest(userSignUpURL, null,
                function (data) {
                    $.each(data.results,
                        function (index, user) {
                            DBNames.push(user.name);
                        });
                });
            isContained = DBNames.indexOf(name) > -1;
            return !!(validateUsername(name) && !isContained);
        }

        function validatePassword(password) {
            return password > minPasswordLength;
        }

        function register(accountName, name, password, email) {
            newUser = new User(accountName, name, password, email);
            requestHandler.postRequest(userSignUpURL, newUser, 'application/json');
        }

        function login(user, password, keepMeLogged) {
            if (mailPattern.test(user)) {
                filter = '?where={"email":"' + user.trim() + '"}';
                requestHandler.getRequest(userSignUpURL + filter, null, function (data) {
                    user = data.results[0].username;
                });
            }
            loginURL = userLoginURL + '?username=' + user.trim() + '&password=' + password;
            requestHandler.getRequest(loginURL, null, function (data) {
                if (keepMeLogged) {
                    localStorage['sessionToken'] = data.sessionToken;
                }
            });
        }

        return {
            register: register,
            login: login
        }
    })();
});