var app = app || {};
var appId, RESTApiKey;
appId = 'HvWzY9d2JMZkKx37DHCDXmrTWFMVtqHbFWdPaIsn';
RESTApiKey = 'ZoKpEeNBk0reOJJTkT4QxCwYzvMkqokNasyoDLhH';
function sendRequest(method, url, data, token, success, error) {
	$.ajax({
		async: false,
		type: method,
		url: url,
		headers: {
			'X-Parse-Application-Id': appId,
			'X-Parse-REST-API-Key': RESTApiKey,
			'X-Parse-Session-Token': token
		},
		data: JSON.stringify(data),
		success: success,
		error: error
	});
}