const { BrowserWindow } = require("electron");

class MainWindow {
	constructor() {
		// Set up window.
		this.win = new BrowserWindow({
			height: 750 + 59,
			title: "Junbi",
			width: 875 + 16,
		});

		// this.win.webContents.openDevTools();

		// Load app in window.
		this.win.loadURL("file://" + __dirname + "/../dist/index.html");

		// Catch window closed event.
		this.win.on("closed", () => {
			this.win = null;
		});
	}

	getBrowserWindow() {
		return this.win;
	}
}

module.exports = MainWindow;
