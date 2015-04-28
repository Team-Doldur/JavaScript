define(['q', 'parse'], function (Q) {
    return (function () {
        function RequestHandler(baseUrl) {
            this._baseUrl = baseUrl;
            this.parse_app_id = "HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn" ;
            this.parse_javascript_id = "5UVOxRluuQhnXj2YzpWGUrh5r6oAfCcE5qpA727c" ;
            this.parse_rest_id = "ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH" ;
        }

        RequestHandler.prototype.getRequest = function (serviceUrl) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;

            return makeRequest('GET', headers, url);
        };

        RequestHandler.prototype.postRequest = function (serviceUrl, data, contentType) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;

            return makeRequest('POST', headers, url, data, contentType);
        };

        RequestHandler.prototype.deleteRequest = function (serviceUrl) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;

            return makeRequest('DELETE', headers, url);
        };

        RequestHandler.prototype.editRequest = function (serviceUrl, data, contentType) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;

            return makeRequest('PUT', headers, url, data, contentType);
        };

        function makeRequest(method, headers, url, data, contentType) {
            var deferred = Q.defer();

            $.ajax({
                method: method,
                headers: headers,
                url: url,
                data: JSON.stringify(data),
                contentType: contentType,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        }

        function getHeaders() {
            var headers = {
                'X-Parse-Application-Id': 'HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn',
                'X-Parse-REST-API-Key': 'ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH'
            };

            if (sessionStorage['logged-in']) {
                headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];
            }

            return headers;
        }

        RequestHandler.prototype.postFile = function postFile(file){
            var deferred = Q.defer();
            var serverUrl = this._baseUrl +'files/' + file.name;

            Parse.initialize(this.parse_app_id, this.parse_javascript_id);

            $.ajax({
                type: "POST",
                headers: {
                    'X-Parse-Application-Id': 'HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn',
                    'X-Parse-REST-API-Key': 'ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH',
                    'Content-Type':'' + file.type
                },
                url: serverUrl,
                data: file,
                processData: false,
                contentType: false,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        }

        return {
            load: function (baseUrl) {
                return new RequestHandler(baseUrl);
            }
        }
    })();
});