// Native
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

// External
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxElectronModule } from "ngx-electron";

// Generated
import { ApiModule } from "./esi/api.module";
import { Configuration } from "./esi/configuration";

// Internal
import { AppComponent } from "./app.component";
import { ApplicationDetailsComponent } from "./application-details/application-details.component";
import { EveSsoService } from "./eve-sso/eve-sso.service";
import { ManageCharactersComponent } from "./manage-characters/manage-characters.component";
import { OverviewComponent } from "./overview/overview.component";

// Routing
import { AppRoutingModule } from "./app-routing.module";

// ESI API Configuration
export const apiConfig = new Configuration({});
export function getApiConfig() {
	return apiConfig;
}

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		ApplicationDetailsComponent,
		ManageCharactersComponent,
		OverviewComponent,
	],
	imports: [
		ApiModule.forRoot(getApiConfig),
		AppRoutingModule,
		BrowserModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgbModule.forRoot(),
		NgxElectronModule,
	],
	providers: [EveSsoService],
})
export class AppModule {}
