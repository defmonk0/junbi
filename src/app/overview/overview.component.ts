import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-overview",
	templateUrl: "./overview.component.html",
	styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	public get tokens(): any {
		return [1, 2, 3];
	}
}
