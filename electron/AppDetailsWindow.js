const { BrowserWindow } = require("electron");

class AppDetailsWindow {
	constructor(parent) {
		// Set up window.
		this.win = new BrowserWindow({
			autoHideMenuBar: true,
			backgroundColor: "#ffffff",
			height: 550 + 59,
			modal: true,
			parent: parent,
			show: false,
			title: "Application Details",
			width: 750 + 16,
		});

		// Load app in window.
		this.win.loadURL("file://" + __dirname + "/../dist/index.html");

		// Catch window closed event.
		this.win.on("closed", () => {
			this.win = null;
		});

		// Catch window closed event.
		this.win.on("ready-to-show", () => {
			this.win.webContents.send("menu:route", "/application-details");
			this.win.show();
		});
	}

	getBrowserWindow() {
		return this.win;
	}
}

module.exports = AppDetailsWindow;
