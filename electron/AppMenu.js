const { app, Menu, shell } = require("electron");
const AuthWindow = require("./AuthWindow");

class AppMenu {
	constructor() {
		this.template = [
			{
				label: "File",
				submenu: [
					{ label: "Clear Cache" },
					{ type: "separator" },
					{
						label: "Exit",
						accelerator: "CmdOrCtrl+W",
						click(item, win, event) {
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
						click(item, win, event) {
							let auth = new AuthWindow(win);
						},
					},
					{
						label: "Manage Characters",
						click(item, win, event) {
							win.webContents.send("menu:route", "/manage");
						},
					},
					{ type: "separator" },
					{
						label: "Create Eve Application",
						click(item, win, event) {
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
						click(item, win, event) {
							shell.openExternal("https://github.com");
						},
					},
					{
						label: "Report An Issue",
						click(item, win, event) {
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
						click(item, win, event) {
							win.toggleDevTools();
						},
					},
					{ role: "reload" },
				],
			},
		];
	}

	enable() {
		Menu.setApplicationMenu(Menu.buildFromTemplate(this.template));
	}
}

module.exports = AppMenu;
