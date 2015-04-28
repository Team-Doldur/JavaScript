define(['mustache', 'userModel', 'noty'], function (Mustache, userModel) {
    return (function () {
        function LoginView(selector) {
            $.get('templates/login.tpl', function (template) {
                var output = Mustache.render(template);
                $(selector).html(output);
                $('.submit-btn').click(function () {
                    var container, redirectTimeout, redirectMsg, username, password, interval;

                    container = $('.login-form-wrap');
                    username = $('.username').val();
                    password = $('.password').val();

                    userModel.login(username, password)
                        .then(function () {
                            redirectTimeout = 3;
                            redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                            container.html(redirectMsg);
                            interval = setInterval(function () {
                                redirectTimeout -= 1;
                                redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                                container.html(redirectMsg);

                                if (window.location.hash != "#/Login") {
                                    clearInterval(interval);
                                }

                                if (redirectTimeout <= 0) {
                                    clearInterval(interval);

                                    container.html('Redirecting...');
                                    setTimeout(function () {
                                        window.location.replace('#/');
                                    }, 1000);
                                }
                            }, 1000);
                            container.parent().noty({text: "Login success", type: 'success'})
                        }, function () {
                            container.noty({text: "Invalid info", type: 'error'})
                        }
                    )
                })
            })
        }

        return {
            load: function (selector) {
                return new LoginView(selector);
            }
        }
    }());
});