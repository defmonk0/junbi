import { Component } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { EveSsoService } from "./eve-sso/eve-sso.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-root",
	styleUrls: ["./app.component.css"],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	title = "app";

	constructor(
		private electron: ElectronService,
		private router: Router,
		private sso: EveSsoService
	) {
		electron.ipcRenderer.on("menu:route", (event, route) => {
			// Go to route requested.
			router.navigate([route]);
		});

		sso.checkForTokens();
	}
}
