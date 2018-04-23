import * as moment from "moment";
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

	public characterData(hash: string, type: string): any {
		const TYPES = {
			location: null,
			online: null,
			shipType: null,
			skillQueue: [],
			skills: null,
			wallet: 0,
			walletJournal: [],
			walletTransactions: [],
		};

		try {
			return this.eveSsoService.characters[hash][type].data;
		} catch {
			return TYPES[type];
		}
	}

	public countdown(date: string): string {
		return moment(date).fromNow();
	}

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

	public isExpired(time: number): boolean {
		if (time > Date.now()) {
			return false;
		}

		return true;
	}
}
