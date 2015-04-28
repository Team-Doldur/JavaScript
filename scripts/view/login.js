define(['mustache', 'userModel', 'noty'], function (Mustache, userModel) {
    return (function () {
        function LoginView(selector) {
            $.get('templates/login.tpl', function (template) {
                var output = Mustache.render(template);
                $(selector).html(output);
                $('.submit-btn').click(function () {
                    var username = $('.username').val();
                    var password = $('.password').val();
                    userModel.login(username, password)
                        .then(function () {
                            var container, redirectTimeout, redirectMsg;
                            container = $('.login-form-wrap');
                            redirectTimeout = 3;
                            redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                            container.html(redirectMsg);
                            setInterval(function () {
                                redirectTimeout -= 1;
                                redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                                container.html(redirectMsg);
                                if (redirectTimeout <= 0) {
                                    $('.login-form-wrap').html('Redirecting...');
                                    setTimeout(function () {
                                        window.location.replace('#/');
                                    }, 1000);
                                }
                            }, 1000);
                            container.parent().noty({text: "Login success", type: 'success'})
                        }, function () {
                            $('.login-form-wrap').noty({text: "Invalid info", type: 'error'})
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