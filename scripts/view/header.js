define(['mustache', 'userModel'], function (Mustache, userModel) {
    return (function () {
        function HeaderView(selector, data) {
            var output;
            if (sessionStorage['sessionToken']) {
                $.get('templates/userHeader.tpl', function (template) {
                    output = Mustache.render(template, data);
                    $(selector).html(output);
                    $('.logout').click(function () {
                        userModel.logout()
                            .then(function () {
                                sessionStorage.clear();
                                $('.profile').html('').noty({text: "Please come again"});
                                setTimeout(function(){
                                    $.get('templates/guestHeader.tpl', function (template) {
                                        output = Mustache.render(template);
                                        $(selector).html(output);
                                    })
                                }, 1000);
                            })
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