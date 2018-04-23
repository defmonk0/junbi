import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EveSsoService } from "../eve-sso/eve-sso.service";

import { SkillQueueComponent } from "./skill-queue/skill-queue.component";
import { SkillsComponent } from "./skills/skills.component";
import { WalletComponent } from "./wallet/wallet.component";

@Component({
	selector: "app-character-info",
	templateUrl: "./character-info.component.html",
	styleUrls: ["./character-info.component.css"],
})
export class CharacterInfoComponent implements OnInit {
	public hash: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private eveSsoService: EveSsoService
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.hash = params.hash;
		});
	}

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

	public eveImage(type: string, hash: string, width: number): string {
		let id = 0;
		let tokens = this.eveSsoService.tokens;
		for (let token of tokens) {
			if (token.verification.CharacterOwnerHash == hash) {
				id = token.verification.CharacterID;
			}
		}

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
}
