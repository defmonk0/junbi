import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ManageCharactersComponent } from "./manage-characters/manage-characters.component";
import { OverviewComponent } from "./overview/overview.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/overview",
		pathMatch: "full",
	},
	{
		path: "overview",
		component: OverviewComponent,
	},
	{
		path: "manage",
		component: ManageCharactersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
