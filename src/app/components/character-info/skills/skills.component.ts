import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EveCharacterDataService } from "../../../services/eve-character-data/eve-character-data.service";
import { EveUniverseDataService } from "../../../services/eve-universe-data/eve-universe-data.service";
import { NgbProgressbarConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-skills",
	templateUrl: "./skills.component.html",
	styleUrls: ["./skills.component.css"],
	providers: [NgbProgressbarConfig],
})
export class SkillsComponent implements OnInit {
	public hash: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private eveCharacterDataService: EveCharacterDataService,
		private eveUniverseDataService: EveUniverseDataService,
		private ngbProgressbarConfig: NgbProgressbarConfig
	) {
		ngbProgressbarConfig.height = "1rem";
		ngbProgressbarConfig.max = 5;
		ngbProgressbarConfig.striped = true;
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.hash = params.hash;
		});
	}

	public sortedSkillGroups() {
		let category = JSON.parse(
			JSON.stringify(this.eveUniverseDataService.get("category", 16))
		);

		let groups = category.groups.map(g =>
			JSON.parse(
				JSON.stringify(this.eveUniverseDataService.get("group", g))
			)
		);

		groups = groups.filter(g => g.published);

		groups.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		return groups;
	}

	public universeData(type: string, id: number, token: any = null): any {
		return this.eveUniverseDataService.get(type, id, token);
	}
}
