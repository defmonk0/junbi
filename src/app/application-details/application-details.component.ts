import { Component, NgZone, OnInit } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { EveSsoService } from "../eve-sso/eve-sso.service";

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
		private eveSsoService: EveSsoService,
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

	private close(): void {
		this.electronService.remote.getCurrentWindow().close();
	}

	public cancel(): void {
		this.close();
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

				this.close();
			}
		);
	}
}
