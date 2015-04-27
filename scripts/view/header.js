define(['mustache', 'userModel'], function (Mustache, userModel) {
    return (function () {
        function HeaderView(selector, data) {
            var output;
            if (sessionStorage['sessionToken']) {
                $.get('templates/userHeader.tpl', function(template){
                    output = Mustache.render(template, data);
                    $(selector).html(output);
                    $('.logout').click(function(){
                        userModel.logout();
                    })
                })
            } else {
                $.get('templates/guestHeader.tpl', function (template) {
                    output = Mustache.render(template);
                    $(selector).html(output);
                })
            }
        }

        return {
            load: function (selector, data) {
                return new HeaderView(selector, data);
            }
        }
    }());
});