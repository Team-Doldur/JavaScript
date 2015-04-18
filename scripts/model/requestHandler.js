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
            var deffer = Q.defer();
            
            $.ajax({
                method: method,
                headers: headers,
                url: url,
                data: JSON.stringify(data),
                contentType: contentType,
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
            };
            
            if (sessionStorage['logged-in']) {
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