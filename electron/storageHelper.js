const { ipcMain } = require("electron");
const storage = require("electron-json-storage");

let bindEvents = () => {
	ipcMain.on("storage:get", (event, key, callback) => {
		storage.get(key, (error, data) => {
			if (error) {
				throw error;
			}

			event.sender.send("storage:end", data, callback);
		});
	});
};

exports.bindEvents = bindEvents;
