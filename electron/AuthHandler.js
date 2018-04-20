const request = require("request");
const storage = require("electron-json-storage");
const CONSTANTS = require("./Constants");

class AuthHandler {
	constructor(callback) {
		storage.get("application-details", (error, details) => {
			if (error) {
				throw error;
			}

			if (details.clientId != undefined) {
				this.clientId = details.clientId;
			}

			if (details.secretKey != undefined) {
				this.secretKey = details.secretKey;
			}

			callback();
		});
	}

	getAuthorizationUrl() {
		// Set up our state.
		let a = Date.now();
		let b = Math.random();
		this.state = Buffer.from(a + ":" + b).toString("base64");

		// Set up query data.
		let data = {
			client_id: CONSTANTS.SSO_DEFAULT_CLIENT_ID,
			redirect_uri: CONSTANTS.SSO_REDIRECT_URL,
			response_type: "token",
			scope: CONSTANTS.SCOPES,
			state: this.state,
		};

		// Set up for secret authorization if available.
		if (
			this.clientId != undefined &&
			this.clientId != null &&
			this.clientId != "" &&
			this.secretKey != undefined &&
			this.secretKey != null &&
			this.secretKey != ""
		) {
			data.client_id = this.clientId;
			data.response_type = "code";
		}

		// Generate our query parameters from the data.
		let query = Object.keys(data)
			.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
			.join("&");

		// Return our completed URL.
		return CONSTANTS.SSO_AUTH_URL + "?" + query;
	}

	getParam(key) {
		if (
			this.params[key] == undefined ||
			this.params[key] == null ||
			this.params[key] == ""
		) {
			return null;
		}

		return this.params[key];
	}

	getTokens(callback, retries = 0) {
		if (this.getParam("access_token")) {
			this.verifyToken(this.getParam("access_token"), verification => {
				this.saveToken(
					this.getParam("access_token"),
					null,
					verification,
					callback
				);
			});
		} else if (this.getParam("code")) {
			// Headers needed for token retrieval.
			var headers = {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": CONSTANTS.USER_AGENT,
				Accept: "application/json",
				Authorization:
					"Basic " +
					Buffer.from(this.clientId + ":" + this.secretKey).toString(
						"base64"
					),
			};

			// Body content to send with request.
			let data = {
				code: this.getParam("code"),
				grant_type: "authorization_code",
			};

			// Change the body content into a url-encoded list.
			let query = Object.keys(data)
				.map(
					k =>
						encodeURIComponent(k) +
						"=" +
						encodeURIComponent(data[k])
				)
				.join("&");

			// Set up options for the request.
			var options = {
				body: query,
				headers: headers,
				method: "POST",
				url: CONSTANTS.SSO_TOKEN_URL,
			};

			// Actually try and get the token.
			request(options, (error, response, body) => {
				if (!error && response.statusCode === 200 && body) {
					let value = JSON.parse(body);
					this.verifyToken(value.access_token, verification => {
						this.saveToken(
							value.access_token,
							value.refresh_token,
							verification,
							callback
						);
					});
				} else if (retries < 5) {
					console.log("Failed to get token: trying again.");
					this.getTokens(callback, ++retries);
				} else {
					console.log("Failed to get token: giving up.");
					callback(null);
				}
			});
		}
	}

	hasValidAuthorization() {
		if (this.getParam("code") || this.getParam("access_token")) {
			if (
				this.getParam("state") &&
				this.getParam("state") == this.state
			) {
				return true;
			} else {
				console.log("Invalid state.");
			}
		} else {
			console.log("No code or token found.");
		}

		return false;
	}

	processURL(url) {
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

	saveToken(token, refresh, verification, callback) {
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
				refresh: refresh,
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
			url: CONSTANTS.ESI_VERIFY_TOKEN_URL + "?" + query,
		};

		// Actually try and get the token.
		request(options, (error, response, body) => {
			if (!error && response.statusCode === 200 && body) {
				callback(JSON.parse(body));
			} else if (retries < 5) {
				console.log("Failed to get verification: trying again.");
				this.verifyToken(token, callback, ++retries);
			} else {
				console.log("Failed to get verification: giving up.");
				callback(null);
			}
		});
	}
}

module.exports = AuthHandler;
