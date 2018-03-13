const { app, BrowserWindow, Menu, shell } = require("electron");

let mainWindow;

let createWindow = () => {
	// Set up primary window.
	mainWindow = new BrowserWindow({
		backgroundColor: "#ffffff",
		height: 600,
		icon: "file://" + __dirname + "/dist/assets/logo.png",
		width: 600,
		title: "Junbi",
	});

	// Load our angular app into it.
	mainWindow.loadURL("file://" + __dirname + "/dist/index.html");

	// Catch main window events.
	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	// Prep menu.
	Menu.setApplicationMenu(
		Menu.buildFromTemplate([
			{
				label: "File",
				submenu: [
					{ label: "Clear Cache" },
					{ type: "separator" },
					{
						label: "Exit",
						accelerator: "CmdOrCtrl+W",
						click() {
							app.quit();
						},
					},
				],
			},
			{
				label: "Edit",
				submenu: [
					{
						label: "Add Character",
						click() {
							console.log("ipcMain send login");
						},
					},
					{
						label: "Manage Characters",
						click() {
							console.log("redirect to manage chars page");
						},
					},
					{ type: "separator" },
					{
						label: "Create Eve Application",
						click() {
							shell.openExternal(
								"https://developers.eveonline.com/applications/create"
							);
						},
					},
					{ label: "Enter Application Details" },
				],
			},
			{
				label: "Help",
				submenu: [
					{
						label: "Information",
						click() {
							shell.openExternal("https://github.com");
						},
					},
					{
						label: "Report An Issue",
						click() {
							shell.openExternal("https://github.com");
						},
					},
					{ type: "separator" },
					{ label: "About" },
				],
			},
			{
				label: "Developer",
				submenu: [
					{
						label: "Toggle Tools",
						accelerator: "CmdOrCtrl+I",
						click(item, window) {
							window.toggleDevTools();
						},
					},
					{ role: "reload" },
				],
			},
		])
	);
};

app.on("ready", createWindow);

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
