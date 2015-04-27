define(['mustache', 'userModel'], function (Mustache, userModel) {
    return (function() {
        function LoginView(selector) {
            $.get('templates/login.tpl', function(template) {
                var output = Mustache.render(template);
                $(selector).html(output);
                $('.submit-btn').click(function(){
                    var username = $('.username').val();
                    var password = $('.password').val();
                    userModel.login(username, password);
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