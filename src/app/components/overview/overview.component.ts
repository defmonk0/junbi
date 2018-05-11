import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import { EveCharacterDataService } from "../../services/eve-character-data/eve-character-data.service";
import { EveUniverseDataService } from "../../services/eve-universe-data/eve-universe-data.service";

@Component({
	selector: "app-overview",
	templateUrl: "./overview.component.html",
	styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
	constructor(
		private eveCharacterDataService: EveCharacterDataService,
		private eveUniverseDataService: EveUniverseDataService
	) {}

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
			return this.eveCharacterDataService.characters[hash][type].data;
		} catch {
			return TYPES[type];
		}
	}

	public skillCountdown(skills: Array<any>, which: string): string {
		let end = null;

		if (which == "first") {
			let now = moment();

			for (let i in skills) {
				end = moment(skills[i].finish_date);

				if (end.isAfter(now)) {
					break;
				}
			}
		}

		if (which == "last") {
			end = moment(skills.slice(-1)[0].finish_date);
		}

		return end.fromNow();
	}

	public get tokens(): Array<any> {
		try {
			return this.eveCharacterDataService.tokens.sort((a, b) =>
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

	public universeData(type: string, id: number, token: string = null): any {
		return this.eveUniverseDataService.get(type, id, token);
	}
}
