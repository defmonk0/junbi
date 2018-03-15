const { BrowserWindow } = require("electron");
const AuthHandler = require("./AuthHandler");

class AuthWindow {
	constructor(parent) {
		// Set up window.
		this.win = new BrowserWindow({
			"node-integration": false,
			"web-security": false,
			autoHideMenuBar: true,
			backgroundColor: "#000000",
			height: 850,
			modal: true,
			parent: parent,
			title: "Junbi",
			width: 850,
		});

		// Base SSO url.
		let url = "https://login.eveonline.com/oauth/authorize/";

		// Set up our scopes.
		let scopes = [
			"esi-location.read_location.v1",
			"esi-location.read_ship_type.v1",
			"esi-skills.read_skills.v1",
			"esi-skills.read_skillqueue.v1",
			"esi-wallet.read_character_wallet.v1",
			"esi-location.read_online.v1",
		].join(" ");

		// Set up our state.
		let a = Date.now();
		let b = Math.random();
		let state = Buffer.from(a + ":" + b).toString("base64");

		// Set up query data.
		let data = {
			client_id: "87f5e6722d904820acb88ee3970c4149",
			redirect_uri: "https://localhost/manage/",
			response_type: "token",
			scope: scopes,
			state: state,
		};

		// Generate our query parameters from the data.
		let query = Object.keys(data)
			.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
			.join("&");

		// Load url in window.
		this.win.loadURL(url + "?" + query);

		// Catch redirection for authorization code.
		this.win.webContents.on("will-navigate", (event, url) => {
			let handler = new AuthHandler(url);

			// If our states are the same, we can use the data.
			if (handler.getParam("access_token") != undefined) {
				if (handler.getParam("state") == state) {
					// Get basic verification data with token.
					handler.verifyToken(
						handler.getParam("access_token"),
						data => {
							handler.saveToken(
								{
									access_token: handler.getParam(
										"access_token"
									),
								},
								data,
								tokens => {
									this.win
										.getParentWindow()
										.webContents.send(
											"character:added",
											tokens
										);

									// Close this window. We're done!
									this.win.close();
								}
							);
						}
					);
				} else {
					throw "State changed while accessing SSO.";
				}
			}
		});

		// Catch window closed event.
		this.win.on("closed", () => {
			this.win = null;
		});
	}

	getBrowserWindow() {
		return this.win;
	}
}

module.exports = AuthWindow;
