// Native
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// External
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxElectronModule } from "ngx-electron";

// Generated

// Internal
import { AppComponent } from "./app.component";
import { EveSsoService } from "./eve-sso/eve-sso.service";
import { ManageCharactersComponent } from "./manage-characters/manage-characters.component";
import { OverviewComponent } from "./overview/overview.component";

// Routing
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent, ManageCharactersComponent, OverviewComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		NgbModule.forRoot(),
		NgxElectronModule,
	],
	providers: [EveSsoService],
})
export class AppModule {}
