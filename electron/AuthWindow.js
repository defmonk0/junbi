const { BrowserWindow } = require("electron");
const AuthHandler = require("./AuthHandler");
const CONSTANTS = require("./Constants");

class AuthWindow {
	constructor(parent) {
		// Set up window.
		this.win = new BrowserWindow({
			"node-integration": false,
			"web-security": false,
			autoHideMenuBar: true,
			height: 850 + 39,
			modal: true,
			parent: parent,
			title: "Authentication",
			width: 850 + 16,
		});

		// Set up our AuthHandler.
		this.handler = new AuthHandler(() => {
			// Navigate to our proper location.
			this.win.loadURL(this.handler.getAuthorizationUrl());
		});

		// Catch redirection for authorization code.
		this.win.webContents.on("will-navigate", (event, url) => {
			// Process the URL to extract our parameters.
			this.handler.processURL(url);

			// Check if we have a valid authorization setup.
			if (this.handler.hasValidAuthorization()) {
				this.handler.getTokens(tokens => {
					// Let our main window know to load new characters.
					if (tokens != null) {
						this.win
							.getParentWindow()
							.webContents.send("character:added", tokens);
					}

					// Close this window. We're done!
					this.win.close();
				});
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
