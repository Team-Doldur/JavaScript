define(['mustache', 'userModel'], function (Mustache, userModel) {
    return (function() {
        function RegisterView(selector) {
            $.get('templates/register.tpl', function(template) {
                var output = Mustache.render(template);
                $(selector).html(output);
                $('.submit-btn').click(function(){
                    var username = $('.username').val();
                    var password = $('.password').val();
                    var email = $('.email').val();
                    userModel.register(username, password, email);
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