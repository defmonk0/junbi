import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

@NgModule({
	declarations: [AppComponent],
	imports: [NgbModule.forRoot(), BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
