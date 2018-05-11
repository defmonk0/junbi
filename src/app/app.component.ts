import { Component, NgZone } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { EveCharacterDataService } from "./services/eve-character-data/eve-character-data.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-root",
	styleUrls: ["./app.component.css"],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	constructor(
		private electronService: ElectronService,
		private eveCharacterDataService: EveCharacterDataService,
		private ngZone: NgZone,
		private router: Router
	) {
		electronService.ipcRenderer.on("menu:route", (event, route) => {
			// Go to route requested.
			ngZone.run(() => {
				router.navigate([route]);
			});
		});

		electronService.ipcRenderer.on("character:added", (event, tokens) => {
			// Replace our tokens to catch new ones.
			ngZone.run(() => {
				this.eveCharacterDataService.loadTokens(tokens, null);
			});
		});

		electronService.ipcRenderer.on(
			"application:added",
			(event, details) => {
				// Replace our details to catch new ones.
				ngZone.run(() => {
					this.eveCharacterDataService.loadApplicationDetails(
						details,
						null
					);
				});
			}
		);
	}
}
