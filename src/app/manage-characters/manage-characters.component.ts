import { Component, OnInit } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { EveSsoService } from "../eve-sso/eve-sso.service";

@Component({
	selector: "app-manage-characters",
	templateUrl: "./manage-characters.component.html",
	styleUrls: ["./manage-characters.component.css"],
})
export class ManageCharactersComponent implements OnInit {
	constructor(
		private electronService: ElectronService,
		private eveSsoService: EveSsoService
	) {}

	ngOnInit() {}

	public get tokens(): Array<any> {
		try {
			return this.eveSsoService.tokens.sort((a, b) =>
				a.verification.CharacterName.localeCompare(
					b.verification.CharacterName
				)
			);
		} catch {
			return [];
		}
	}

	public eveImage(type: string, id: number, width: number): string {
		let extension = "png";
		if (type == "Character") {
			extension = "jpg";
		}

		let url = "https://imageserver.eveonline.com/";
		url += type;
		url += "/";
		url += id;
		url += "_";
		url += width;
		url += ".";
		url += extension;

		return url;
	}

	public expireToken(token: any): void {
		token.expiration = Date.now();
	}

	public isExpired(time: number): boolean {
		if (time > Date.now()) {
			return false;
		}

		return true;
	}

	public toClipboard(content: string): void {
		let { clipboard } = this.electronService.remote.require("electron");
		clipboard.writeText(content);
	}

	public removeToken(token: any): void {
		this.eveSsoService.deleteToken(token);
	}
}
