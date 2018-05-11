import { ElectronService } from "ngx-electron";
import { Injectable } from "@angular/core";

import { UniverseService } from "../esi/api/api";

@Injectable()
export class EveUniverseDataService {
	private cache;
	private constants;
	private storage;

	constructor(private electronService: ElectronService) {
		// Set up our defaults.
		this.cache = {};
		this.constants = this.electronService.remote.require("./constants");
		this.storage = electronService.remote.require("electron-json-storage");
	}

	// ==================== UNIVERSE DATA MANAGEMENT

	public getCategory(): any {}
	public getGroup(): any {}
	public getType(): any {}

	// ==================== STORAGE DATA INITIALIZATION
}
