var app = app || {};

define(['q'], function (Q) {
    app.requestHandler = (function () {
        function RequestHandler(baseUrl) {
            this._baseUrl = baseUrl;
        }

        RequestHandler.prototype.getRequest = function (serviceUrl) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;

            return makeRequest('GET', headers, url);
        };

        function makeRequest(method, headers, url, data) {
            var deffer = Q.defer();

            $.ajax({
                method: method,
                headers: headers,
                url: url,
                data: JSON.stringify(data),
                success: function (data) {
                    deffer.resolve(data);
                },
                error: function (error) {
                    deffer.reject(error);
                }
            });

            return deffer.promise;
        }

        function getHeaders() {
            var headers = {
                'X-Parse-Application-Id' : 'HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn',
                'X-Parse-REST-API-Key' : 'ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH',
                'Content-Type' : 'application/json'
            };

            if(sessionStorage['logged-in']) {
                headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
            }

            return headers;
        }

        return {
            load: function (baseUrl) {
                return new RequestHandler(baseUrl);
            }
        }
    })();
});