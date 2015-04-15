var app = app || {};

app.requestHandler = (function () {
    function makeRequest(method, url, data, success, error) {
        $.ajax({
            method: method,               
            headers: {
                'X-Parse-Application-Id': 'HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn',
                'X-Parse-REST-API-Key': 'ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH'
            },
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: success,
            error: error
        })
    }
        
    function getRequest(url, success, error) {
        makeRequest('GET', url, null, success, error);
    }
        
    function postRequest(url, data, success, error) {
        makeRequest('POST', url, data, success, error);
    }
        
    function deleteRequest(url, success, error) {
        makeRequest('DELETE', url, null, success, error);
    }

    function editRequest(url, success, error) {
        makeRequest('PUT', url, data, success, error);
    }    

    return {
            getRequest : getRequest,
            postRequest : postRequest,
            deleteRequest : deleteRequest,
            editRequest : editRequest
        }
})();
