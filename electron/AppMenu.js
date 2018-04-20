const { app, Menu, shell } = require("electron");
const AppDetailsWindow = require("./AppDetailsWindow");
const AuthWindow = require("./AuthWindow");
const CONSTANTS = require("./Constants");

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
							shell.openExternal(CONSTANTS.SSO_CREATE_URL);
						},
					},
					{
						label: "Enter Application Details",
						click(item, win, event) {
							let app = new AppDetailsWindow(win);
						},
					},
				],
			},
			{
				label: "Help",
				submenu: [
					{
						label: "Information",
						click(item, win, event) {
							shell.openExternal(CONSTANTS.GITHUB_HOME_URL);
						},
					},
					{
						label: "Report An Issue",
						click(item, win, event) {
							shell.openExternal(CONSTANTS.GITHUB_ISSUE_URL);
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
				],
			},
		];
	}

	enable() {
		Menu.setApplicationMenu(Menu.buildFromTemplate(this.template));
	}
}

module.exports = AppMenu;
