const { app } = require("electron");
const AppMenu = require("./AppMenu");
const MainWindow = require("./MainWindow");
const storageHelper = require("./storageHelper");

let win = null;
let menu = null;

// Generate window when we're loaded up.
app.on("ready", () => {
	win = new MainWindow();

	menu = new AppMenu();
	menu.enable();

	storageHelper.bindEvents();
});

// Catch to recreate window if it was closed without exiting the app.
app.on("activate", () => {
	if (win.getBrowserWindow() === null) {
		win = new MainWindow();
	}
});

// If everything is closed, exit the app.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
