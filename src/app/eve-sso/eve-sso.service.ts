import { ElectronService } from "ngx-electron";
import { Injectable } from "@angular/core";

@Injectable()
export class EveSsoService {
	private characters;
	private ipc;
	private tokens;

	constructor(private e: ElectronService) {
		// Hold onto our store variables.
		this.ipc = e.ipcRenderer;

		// Load existing data from file(s).
		this.ipc.send("storage:get", "tokens", "handleTokens");

		// Bind functions for handling retrieval of data.
		this.ipc.on("storage:end", (event, data, callback) => {
			this[callback](data);
		});
	}

	checkForTokens() {
		console.log(window.location.href);
	}

	handleTokens(data) {
		this.tokens = data.tokens || [];
	}
}
