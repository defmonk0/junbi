import { Component, OnInit } from "@angular/core";

import { SkillQueueComponent } from "./skill-queue/skill-queue.component";
import { SkillsComponent } from "./skills/skills.component";
import { WalletComponent } from "./wallet/wallet.component";

@Component({
	selector: "app-character-info",
	templateUrl: "./character-info.component.html",
	styleUrls: ["./character-info.component.css"],
})
export class CharacterInfoComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
