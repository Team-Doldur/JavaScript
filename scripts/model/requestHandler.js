define(['q'], function (Q) {
    var requestHandler = (function (baseUrl) {
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
        }
        
        RequestHandler.prototype.deleteRequest = function (serviceUrl) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;
            
            return makeRequest('DELETE', headers, url);
        }
        
        RequestHandler.prototype.editRequest = function (serviceUrl, data, contentType) {
            var headers = getHeaders();
            var url = this._baseUrl + serviceUrl;
            
            return makeRequest('PUT', headers, url, data, contentType);
        }
        
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
    
    return requestHandler;
});