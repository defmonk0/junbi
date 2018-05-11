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
import { ApiModule } from "./services/esi/api.module";
import { Configuration } from "./services/esi/configuration";

// Internal
import { AppComponent } from "./app.component";
import { ApplicationDetailsComponent } from "./components/application-details/application-details.component";
import { CharacterInfoComponent } from "./components/character-info/character-info.component";
import { EveCharacterDataService } from "./services/eve-character-data/eve-character-data.service";
import { EveUniverseDataService } from "./services/eve-universe-data/eve-universe-data.service";
import { ManageCharactersComponent } from "./components/manage-characters/manage-characters.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { SkillQueueComponent } from "./components/character-info/skill-queue/skill-queue.component";
import { SkillsComponent } from "./components/character-info/skills/skills.component";
import { WalletComponent } from "./components/character-info/wallet/wallet.component";

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
		CharacterInfoComponent,
		ManageCharactersComponent,
		OverviewComponent,
		SkillQueueComponent,
		SkillsComponent,
		WalletComponent,
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
	providers: [EveCharacterDataService, EveUniverseDataService],
})
export class AppModule {}
