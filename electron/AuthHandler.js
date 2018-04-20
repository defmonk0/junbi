const request = require("request");
const storage = require("electron-json-storage");
const CONSTANTS = require("./Constants");

class AuthHandler {
	constructor(url) {
		// Get our query or hash.
		let a = url.indexOf("?");
		let b = url.indexOf("#");

		let index = a == -1 ? b : a;

		// Extract our query.
		let query = url.substring(index + 1);

		// Generate our params object.
		let params = query.split("&").reduce((ret, x) => {
			let i = x.indexOf("=");

			let a = decodeURIComponent(x.substring(0, i));
			let b = decodeURIComponent(x.substring(i + 1));

			ret[a] = b;
			return ret;
		}, {});

		// Save it so we can continue using it.
		this.params = params;
	}

	getParam(key) {
		return this.params[key];
	}

	getTokenFromAuthCode(code, callback, retries = 0) {
		// Headers needed for token retrieval.
		var headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": CONSTANTS.USER_AGENT,
			Accept: "application/json",
			Authorization: "Basic ",
		};

		// Body content to send with request.
		let data = {
			grant_type: "authorization_code",
			code: code,
		};

		// Change the body content into a url-encoded list.
		let query = Object.keys(data)
			.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
			.join("&");

		// Set up options for the request.
		var options = {
			body: query,
			headers: headers,
			method: "POST",
			url: CONSTANTS.SSO_TOKEN_URL,
		};

		// Actually try and get the token.
		request(options, function(error, response, body) {
			if (!error && response.statusCode === 200 && body) {
				callback(JSON.parse(body));
			} else if (retries < 5) {
				console.log("Failed to get token: trying again.");
				console.log(error, response.statusCode, body);

				this.getTokenFromAuthCode(code, callback, ++retries);
			} else {
				console.log("Failed to get token: giving up.");
				console.log(error, response.statusCode, body);
				callback(null);
			}
		});
	}

	saveToken(token, verification, callback) {
		// Need to get existing data.
		storage.get("tokens", (error, tokens) => {
			if (error) {
				throw error;
			}

			let expiration = verification.ExpiresOn;
			if (
				expiration.indexOf("Z") == -1 &&
				expiration.indexOf("+") == -1
			) {
				expiration += "Z";
			}
			expiration = new Date(expiration);

			// Put our new token into the object.
			tokens[verification.CharacterOwnerHash] = {
				expiration: expiration.getTime(),
				token: token,
				verification: verification,
			};

			// Save the tokens back to file.
			storage.set("tokens", tokens, error => {
				if (error) {
					throw error;
				}

				callback(tokens);
			});
		});
	}

	verifyToken(token, callback, retries = 0) {
		// Headers needed for token retrieval.
		var headers = {
			"User-Agent": CONSTANTS.USER_AGENT,
			Accept: "application/json",
		};

		// Body content to send with request.
		let data = {
			datasource: CONSTANTS.ESI_DATASOURCE,
			token: token,
		};

		// Change the body content into a url-encoded list.
		let query = Object.keys(data)
			.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
			.join("&");

		// Set up options for the request.
		var options = {
			headers: headers,
			method: "GET",
			url: CONSTANTS.ESI_DATASOURCE + "?" + query,
		};

		// Actually try and get the token.
		request(options, function(error, response, body) {
			if (!error && response.statusCode === 200 && body) {
				callback(JSON.parse(body));
			} else if (retries < 5) {
				console.log("Failed to get verification: trying again.");
				console.log(error, response.statusCode, body);

				this.getTokenFromAuthCode(token, callback, ++retries);
			} else {
				console.log("Failed to get verification: giving up.");
				console.log(error, response.statusCode, body);
				callback(null);
			}
		});
	}
}

module.exports = AuthHandler;
