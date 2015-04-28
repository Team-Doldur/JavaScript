define(['mustache', 'userModel'], function (Mustache, userModel) {
    return (function () {
        function RegisterView(selector) {
            $.get('templates/register.tpl', function (template) {
                var output = Mustache.render(template);
                $(selector).html(output);
                $('.submit-btn').click(function () {
                    var notificationContainer, redirectTimeout, redirectMsg, username, password, email, interval;

                    notificationContainer = $('.signup-form-wrap').children().first();
                    username = $('.username').val();
                    password = $('.password').val();
                    email = $('.email').val();

                    userModel.register(username, password, email)
                        .then(function () {
                            redirectTimeout = 3;
                            redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                            notificationContainer.html(redirectMsg);
                            interval = setInterval(function () {
                                redirectTimeout -= 1;
                                redirectMsg = 'Redirecting to main page in ' + redirectTimeout;
                                notificationContainer.html(redirectMsg);
                                if (redirectTimeout <= 0) {
                                    clearInterval(interval);
                                    notificationContainer.html('Redirecting...');
                                    setTimeout(function () {
                                        window.location.replace('#/');
                                    }, 1000);
                                }
                            }, 1000);
                            notificationContainer.parent().noty({text: "Login success", type: 'success'})
                        }, function () {
                            notificationContainer.noty({text: "Invalid register parameters", type: 'error'})
                        });
                })
            })
        }

        return {
            load: function (selector) {
                return new RegisterView(selector);
            }
        }
    }());
});