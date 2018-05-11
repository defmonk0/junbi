import { ElectronService } from "ngx-electron";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";

import { UniverseService } from "../esi/api/api";

const MINIMUM_CACHE_OFFSET = 3 * 60 * 1000;
const REFRESH_TIMER_INTERVAL = 10 * 1000;

const SCOPES = ["category", "group", "station", "structure", "system", "type"];

@Injectable()
export class EveUniverseDataService {
	private cache;
	private constants;
	private load;
	private storage;

	constructor(
		private electronService: ElectronService,
		private ngZone: NgZone,
		private universeService: UniverseService
	) {
		// Set up our defaults.
		this.cache = {};
		this.constants = this.electronService.remote.require("./constants");
		this.load = { storage: 0 };
		this.storage = electronService.remote.require("electron-json-storage");

		// Get our existing data, if they exist.
		this.loadUniverseData(null);
	}

	// ==================== UNIVERSE DATA MANAGEMENT

	// ===== HELPERS

	private forceUniverseTypeExistence(type: string): void {
		if (this.cache == undefined || this.cache == null) {
			this.cache = {};
		}

		if (this.cache[type] == undefined || this.cache[type] == null) {
			this.cache[type] = {};
		}
	}

	private forceUniverseTypeIdExistence(type: string, id: number): void {
		if (this.cache[type] == undefined || this.cache[type] == null) {
			this.cache[type] = {};
		}

		if (this.cache[type][id] == undefined || this.cache[type][id] == null) {
			this.cache[type][id] = {};
		}

		if (this.load[type] == undefined || this.load[type] == null) {
			this.load[type] = {};
		}

		if (this.load[type][id] == undefined || this.load[type][id] == null) {
			this.load[type][id] = false;
		}
	}

	private getUniverseDataStatus(type: string, id: number): string {
		if (this.load.storage != SCOPES.length) {
			return "disk";
		}

		if (this.cache[type] == undefined || this.cache[type] == null) {
			return "invalid";
		}

		if (this.cache[type][id] == undefined || this.cache[type][id] == null) {
			return "invalid";
		}

		if (
			this.cache[type][id].expiration == undefined ||
			this.cache[type][id].expiration == null
		) {
			return "invalid";
		}

		if (this.cache[type][id].expiration <= Date.now()) {
			return "outdated";
		}

		return "valid";
	}

	private updateUniverseData(result: any, type: string, id: number): void {
		// Get our cache expiration.
		let date = new Date(result.headers.get("Expires"));

		// A minimum cache, we don't need data more often.
		let rand = Math.random() * MINIMUM_CACHE_OFFSET;
		let min = Date.now() + MINIMUM_CACHE_OFFSET + rand;

		// Save the data locally.
		this.cache[type][id] = {
			expiration: Math.max(date.getTime(), min),
			data: result.body,
		};

		// Write the data to storage.
		this.storage.set(
			"universe-" + type,
			JSON.parse(JSON.stringify(this.cache[type])),
			error => {
				if (error) {
					throw error;
				}
			}
		);
	}

	// ===== RETRIEVAL

	public get(type: string, id: number, token: string = null): any {
		switch (this.getUniverseDataStatus(type, id)) {
			case "disk":
				return null;
			case "invalid":
				this.getSpecific[type](id, token);
				return null;
			case "outdated":
				this.getSpecific[type](id, token);
				return this.cache[type][id].data;
			case "valid":
				return this.cache[type][id].data;
		}
	}

	private getSpecific = {
		category: (id, token): any => {
			// Force id existence.
			this.forceUniverseTypeIdExistence("category", id);

			// Call service if we're not already loading it.
			if (!this.load["category"][id]) {
				// Track the start of our load.
				this.load["category"][id] = true;

				// Call the service.
				this.universeService
					.getUniverseCategoriesCategoryId(
						id,
						this.constants.ESI_DATASOURCE,
						undefined,
						this.constants.USER_AGENT,
						this.constants.USER_AGENT,
						"response",
						false
					)
					.subscribe(res => {
						// Save the new data.
						this.updateUniverseData(res, "category", id);

						// Track the end of our load.
						this.load["category"][id] = false;
					});
			}
		},

		group: (id, token): any => {
			// Force id existence.
			this.forceUniverseTypeIdExistence("group", id);

			// Call service if we're not already loading it.
			if (!this.load["group"][id]) {
				// Track the start of our load.
				this.load["group"][id] = true;

				// Call the service.
				this.universeService
					.getUniverseGroupsGroupId(
						id,
						this.constants.ESI_DATASOURCE,
						undefined,
						this.constants.USER_AGENT,
						this.constants.USER_AGENT,
						"response",
						false
					)
					.subscribe(res => {
						// Save the new data.
						this.updateUniverseData(res, "group", id);

						// Track the end of our load.
						this.load["group"][id] = false;
					});
			}
		},

		station: (id, token): any => {
			// Force id existence.
			this.forceUniverseTypeIdExistence("station", id);

			// Call service if we're not already loading it.
			if (!this.load["station"][id]) {
				// Track the start of our load.
				this.load["station"][id] = true;

				// Call the service.
				this.universeService
					.getUniverseStationsStationId(
						id,
						this.constants.ESI_DATASOURCE,
						this.constants.USER_AGENT,
						this.constants.USER_AGENT,
						"response",
						false
					)
					.subscribe(res => {
						// Save the new data.
						this.updateUniverseData(res, "station", id);

						// Track the end of our load.
						this.load["station"][id] = false;
					});
			}
		},

		structure: (id, token): any => {
			// Force id existence.
			this.forceUniverseTypeIdExistence("structure", id);

			// Call service if we're not already loading it.
			if (!this.load["structure"][id]) {
				// Track the start of our load.
				this.load["structure"][id] = true;

				// Call the service.
				this.universeService
					.getUniverseStructuresStructureId(
						id,
						this.constants.ESI_DATASOURCE,
						token,
						this.constants.USER_AGENT,
						this.constants.USER_AGENT,
						"response",
						false
					)
					.subscribe(res => {
						// Save the new data.
						this.updateUniverseData(res, "structure", id);

						// Track the end of our load.
						this.load["structure"][id] = false;
					});
			}
		},

		system: (id, token): any => {
			// Force id existence.
			this.forceUniverseTypeIdExistence("system", id);

			// Call service if we're not already loading it.
			if (!this.load["system"][id]) {
				// Track the start of our load.
				this.load["system"][id] = true;

				// Call the service.
				this.universeService
					.getUniverseSystemsSystemId(
						id,
						this.constants.ESI_DATASOURCE,
						undefined,
						this.constants.USER_AGENT,
						this.constants.USER_AGENT,
						"response",
						false
					)
					.subscribe(res => {
						// Save the new data.
						this.updateUniverseData(res, "system", id);

						// Track the end of our load.
						this.load["system"][id] = false;
					});
			}
		},

		type: (id, token): any => {
			// Force id existence.
			this.forceUniverseTypeIdExistence("type", id);

			// Call service if we're not already loading it.
			if (!this.load["type"][id]) {
				// Track the start of our load.
				this.load["type"][id] = true;

				// Call the service.
				this.universeService
					.getUniverseTypesTypeId(
						id,
						this.constants.ESI_DATASOURCE,
						undefined,
						this.constants.USER_AGENT,
						this.constants.USER_AGENT,
						"response",
						false
					)
					.subscribe(res => {
						// Save the new data.
						this.updateUniverseData(res, "type", id);

						// Track the end of our load.
						this.load["type"][id] = false;
					});
			}
		},
	};

	// ==================== STORAGE DATA INITIALIZATION

	public loadUniverseData(
		callback: (savedData: any) => void | null | undefined
	) {
		// Iterate through all possible data files.
		for (let type of SCOPES) {
			// Try to get the data.
			this.storage.get("universe-" + type, (error, data) => {
				if (error) {
					throw error;
				}

				this.ngZone.run(() => {
					// Make sure this data is set up and available.
					this.forceUniverseTypeExistence(type);

					// We have the character data. Overwrite it.
					this.cache[type] = data;

					// Increment our loaded counter.
					this.load.storage++;

					// Hit our callback.
					if (callback) {
						callback(this.cache[type]);
					}
				});
			});
		}
	}
}
