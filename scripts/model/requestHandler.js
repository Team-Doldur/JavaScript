var app = app || {};

app.requestHandler = (function () {

    var appId, RESTApiKey;

    appId = 'HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn';
    RESTApiKey = 'ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH';

    function makeRequest(method, url, data, token, success, error, async) {
        data = data || null;
        token = token || null;
        success = success || logSuccess;
        error = error || logError;
        async = !!async || false;
        $.ajax({
            async: async,
            method: method,
            url: url,
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': RESTApiKey,
                'X-Parse-Session-Token': token
            },
            data: JSON.stringify(data),
            //contentType: 'application/json',
            success: success,
            error: error
        });
    }

    function logSuccess(data){
        console.log(data);
    }

    function logError(data){
        console.log(data.statusText)
    }

    function getRequest(url, token, success, error) {
        makeRequest('GET', url, null, token, success, error)
    }
        
    function postRequest(url, data, token, success, error) {
        makeRequest('POST', url, data,token, success, error);
    }
        
    function deleteRequest(url, token, success, error) {
        makeRequest('DELETE', url, null, token, success, error)
    }

    function editRequest(url, data, token, success, error) {
        makeRequest('PUT', url, data, token, success, error)
    }

    return {
            getRequest : getRequest,
            postRequest : postRequest,
            deleteRequest : deleteRequest,
            editRequest : editRequest
        }
})();
