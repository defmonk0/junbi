import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ApplicationDetailsComponent } from "./application-details/application-details.component";
import { CharacterInfoComponent } from "./character-info/character-info.component";
import { ManageCharactersComponent } from "./manage-characters/manage-characters.component";
import { OverviewComponent } from "./overview/overview.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/overview",
		pathMatch: "full",
	},
	{
		path: "application-details",
		component: ApplicationDetailsComponent,
	},
	{
		path: "character-info/:hash",
		component: CharacterInfoComponent,
	},
	{
		path: "manage",
		component: ManageCharactersComponent,
	},
	{
		path: "overview",
		component: OverviewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
