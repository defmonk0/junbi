const { BrowserWindow } = require("electron");

class MainWindow {
	constructor() {
		// Set up window.
		this.win = new BrowserWindow({
			backgroundColor: "#ffffff",
			height: 800,
			width: 1000,
			title: "Junbi",
		});

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
