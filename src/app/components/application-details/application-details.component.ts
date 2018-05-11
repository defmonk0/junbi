import { Component, NgZone, OnInit } from "@angular/core";
import { ElectronService } from "ngx-electron";

@Component({
	selector: "app-application-details",
	templateUrl: "./application-details.component.html",
	styleUrls: ["./application-details.component.css"],
})
export class ApplicationDetailsComponent implements OnInit {
	private storage;
	public clientId;
	public secretKey;

	constructor(
		private electronService: ElectronService,
		private ngZone: NgZone
	) {
		this.storage = electronService.remote.require("electron-json-storage");

		this.storage.get("application-details", (error, details) => {
			if (error) {
				throw error;
			}

			this.ngZone.run(() => {
				if (details.clientId != undefined) {
					this.clientId = details.clientId;
				}

				if (details.secretKey != undefined) {
					this.secretKey = details.secretKey;
				}
			});
		});
	}

	ngOnInit() {}

	public cancel(): void {
		this.electronService.remote.getCurrentWindow().close();
	}

	public save(): void {
		let data = {
			clientId: this.clientId,
			secretKey: this.secretKey,
		};

		this.storage.set(
			"application-details",
			JSON.parse(JSON.stringify(data)),
			error => {
				if (error) {
					throw error;
				}

				let win = this.electronService.remote.getCurrentWindow();
				let parent = win.getParentWindow();
				parent.webContents.send("application:added", data);

				win.close();
			}
		);
	}
}
