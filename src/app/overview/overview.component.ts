import { Component, OnInit } from "@angular/core";
import { EveSsoService } from "../eve-sso/eve-sso.service";

@Component({
	selector: "app-overview",
	templateUrl: "./overview.component.html",
	styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
	constructor(private eveSsoService: EveSsoService) {}

	ngOnInit() {}

	public get characters(): any {
		return this.eveSsoService.characters;
	}

	public get tokens(): any {
		return this.eveSsoService.tokens.sort((a, b) =>
			a.verification.CharacterName.localeCompare(
				b.verification.CharacterName
			)
		);
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

	public isExpired(time: number): boolean {
		if (time > Date.now()) {
			return false;
		}

		return true;
	}
}
