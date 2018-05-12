import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EveCharacterDataService } from "../../../services/eve-character-data/eve-character-data.service";
import { EveUniverseDataService } from "../../../services/eve-universe-data/eve-universe-data.service";

@Component({
	selector: "app-skill-queue",
	templateUrl: "./skill-queue.component.html",
	styleUrls: ["./skill-queue.component.css"],
})
export class SkillQueueComponent implements OnInit {
	public hash: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private eveCharacterDataService: EveCharacterDataService,
		private eveUniverseDataService: EveUniverseDataService
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.hash = params.hash;
		});
	}

	public characterData(hash: string, type: string): any {
		const TYPES = {
			attributes: 0,
			characterPublic: null,
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

	public universeData(type: string, id: number, token: any = null): any {
		return this.eveUniverseDataService.get(type, id, token);
	}
}
