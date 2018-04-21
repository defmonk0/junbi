import { ElectronService } from "ngx-electron";
import { forkJoin } from "rxjs/observable/forkJoin";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { interval } from "rxjs/observable/interval";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { LocationService, SkillsService, WalletService } from "../esi/api/api";

const MINIMUM_CACHE_OFFSET = 5 * 60 * 1000;
const REFRESH_TIMER_INTERVAL = 5 * 1000;
const TOKEN_FILTER_OFFSET = 30 * 1000;

const SCOPES = {
	location: "esi-location.read_location.v1",
	online: "esi-location.read_online.v1",
	ship_type: "esi-location.read_ship_type.v1",
	skillQueue: "esi-skills.read_skillqueue.v1",
	skills: "esi-skills.read_skills.v1",
	wallet: "esi-wallet.read_character_wallet.v1",
	walletJournal: "esi-wallet.read_character_wallet.v1",
	walletTransactions: "esi-wallet.read_character_wallet.v1",
};

@Injectable()
export class EveSsoService {
	private clientId;
	private constants;
	private secretKey;
	private storage;
	public characters;
	public tokens;

	constructor(
		private electronService: ElectronService,
		private httpClient: HttpClient,
		private locationService: LocationService,
		private ngZone: NgZone,
		private skillsService: SkillsService,
		private universeService: UniverseService,
		private walletService: WalletService
	) {
		// Set up our defaults.
		this.characters = {};
		this.clientId = null;
		this.constants = this.electronService.remote.require("./constants");
		this.secretKey = null;
		this.storage = electronService.remote.require("electron-json-storage");
		this.tokens = [];

		// Get our application details, if they exist.
		this.loadApplicationDetails();

		// Initially get our tokens.
		this.loadTokens();

		// Initially get our character data.
		this.loadCharacterData();

		// Set up a timer to run all our refreshes.
		const timer = interval(REFRESH_TIMER_INTERVAL);
		timer.subscribe(n => {
			this.refreshTokens().subscribe(results => {
				// Save our new access tokens if there are any.
				this.updateAccessTokens(results);
			});

			// Iterate through our tokens and update other info.
			for (let token of this.tokens) {
				// Location update.
				this.updateCharacterLocation(token);

				// Online status update.
				this.updateCharacterOnlineStatus(token);

				// Ship type update.
				this.updateCharacterShip(token);

				// Skill queue update.
				this.updateCharacterSkillQueue(token);

				// Skills update.
				this.updateCharacterSkills(token);

				// Wallet update.
				this.updateCharacterWallet(token);

				// Wallet journal update.
				this.updateCharacterWallet(token);

				// Wallet transactions update.
				this.updateCharacterWallet(token);
			}
		});
	}

	private forceCharacterDataExistance(hash: string, type: string): void {
		if (this.characters == undefined || this.characters == null) {
			this.characters = {};
		}

		if (
			this.characters[hash] == undefined ||
			this.characters[hash] == null
		) {
			this.characters[hash] = {};
		}

		if (
			this.characters[hash][type] == undefined ||
			this.characters[hash][type] == null
		) {
			this.characters[hash][type] = {};
		}
	}

	private needsCharacterDataUpdate(token: any, type: string) {
		// Shorten the hash variable for easier use.
		let hash = token.verification.CharacterOwnerHash;

		// Does this token have the needed scope?
		if (token.verification.Scopes.indexOf(SCOPES[type]) < 0) {
			return false;
		}

		// Do we already have data, and is it expired?
		if (
			this.characters[hash][type] != undefined &&
			this.characters[hash][type] != null &&
			this.characters[hash][type].expiration != undefined &&
			this.characters[hash][type].expiration != null &&
			this.characters[hash][type].expiration > Date.now()
		) {
			return false;
		}

		return true;
	}

	private refreshTokens(): Observable<any> {
		// Can only update is we have our application details.
		if (
			this.clientId != undefined &&
			this.clientId != null &&
			this.clientId != "" &&
			this.secretKey != undefined &&
			this.secretKey != null &&
			this.secretKey != ""
		) {
			// Set up a bunch of misc variables for use.
			let ts = Date.now();

			// Set up our headers for token retrieval.
			let headers = new HttpHeaders({
				"Content-Type": this.constants.SSO_TOKEN_CONTENT_TYPE,
				"X-User-Agent": this.constants.USER_AGENT,
				Accept: "application/json",
				Authorization:
					"Basic " +
					Buffer.from(this.clientId + ":" + this.secretKey).toString(
						"base64"
					),
			});

			// Filter our tokens and run a map on them.
			const observables = this.tokens
				.filter(token => token.expiration < ts + TOKEN_FILTER_OFFSET)
				.map(token => {
					// Set up our body data.
					let data = {
						grant_type: "refresh_token",
						refresh_token: token.refresh,
					};

					// Change the body content into a url-encoded list.
					let query = Object.keys(data)
						.map(
							k =>
								encodeURIComponent(k) +
								"=" +
								encodeURIComponent(data[k])
						)
						.join("&");

					// Return the observable for the combined http requests via mergeMap.
					// We also want both requests, so we tell mergeMap to return an object with both.
					return this.httpClient
						.request("POST", this.constants.SSO_TOKEN_URL, {
							body: query,
							headers: headers,
						})
						.pipe(
							mergeMap(
								resp => {
									// Headers needed for verification retrieval.
									let headers = {
										"X-User-Agent": this.constants
											.USER_AGENT,
										Accept: "application/json",
									};

									// Body content to send with request.
									let data = {
										datasource: this.constants
											.ESI_DATASOURCE,
										token: resp["access_token"],
									};

									// Return the inner, second observable.
									return this.httpClient.request(
										"GET",
										this.constants.ESI_VERIFY_TOKEN_URL,
										{
											headers: headers,
											params: data,
										}
									);
								},
								(pre, post) => {
									return {
										token: pre,
										verification: post,
									};
								}
							)
						);
				});

			// Return an observable that completes when the array of them finishes.
			return forkJoin(observables);
		}

		return forkJoin([]);
	}

	private updateAccessTokens(newTokens: Array<any>): void {
		// Only do the work if we actually have tokens to save.
		if (newTokens.length > 0) {
			// Iterate through our new tokens we just got.
			newTokens.map(t => {
				// Find the one we currently have that matches.
				for (let i in this.tokens) {
					if (this.tokens[i].refresh == t.token.refresh_token) {
						// Keep our new access token.
						this.tokens[i].token = t.token.access_token;

						// Extract and keep our new expiration.
						let expiration = t.verification.ExpiresOn;
						if (
							expiration.indexOf("Z") == -1 &&
							expiration.indexOf("+") == -1
						) {
							expiration += "Z";
						}
						expiration = new Date(expiration);
						this.tokens[i].expiration = expiration.getTime();

						// Keep our new verification.
						this.tokens[i].verification = t.verification;
					}
				}
			});

			// Build our tokens back into the way they should be structured.
			let write = {};
			for (let token of this.tokens) {
				write[token.verification.CharacterOwnerHash] = token;
			}

			// Actually save the data back.
			this.storage.set("tokens", write, error => {
				if (error) {
					throw error;
				}
			});
		}
	}

	private updateCharacterLocation(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "location";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.locationService
				.getCharactersCharacterIdLocation(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterOnlineStatus(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "online";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.locationService
				.getCharactersCharacterIdOnline(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterShip(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "ship_type";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.locationService
				.getCharactersCharacterIdShip(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterSkillQueue(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "skills";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.skillsService
				.getCharactersCharacterIdSkillqueue(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterSkills(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "skills";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.skillsService
				.getCharactersCharacterIdSkills(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterWallet(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "wallet";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.walletService
				.getCharactersCharacterIdWallet(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterWalletJournal(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "walletJournal";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.walletService
				.getCharactersCharacterIdWalletJournal(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					0,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	private updateCharacterWalletTransactions(token: any): void {
		// Variables for easy use.
		let hash = token.verification.CharacterOwnerHash;
		let ts = Date.now();
		let type = "walletTransactions";

		// Make sure this data is set up and available.
		this.forceCharacterDataExistance(hash, type);

		// Skip if we don't have the scope.
		if (this.needsCharacterDataUpdate(token, type)) {
			this.walletService
				.getCharactersCharacterIdWalletTransactions(
					token.verification.CharacterID,
					this.constants.ESI_DATASOURCE,
					null,
					token.token,
					this.constants.USER_AGENT,
					this.constants.USER_AGENT,
					"response",
					false
				)
				.subscribe(res => {
					// Get our cache expiration.
					let date = new Date(res.headers.get("Expires"));

					// A minimum cache, we don't need data more often.
					let min = ts + MINIMUM_CACHE_OFFSET;

					this.characters[hash][type] = {
						expiration: Math.min(date.getTime(), min),
						data: res.body,
					};
				});
		}
	}

	public deleteToken(token: any): void {
		// Grab the existing tokens file.
		this.storage.get("tokens", (error, data) => {
			if (error) {
				throw error;
			}

			// Remove our current key from it.
			delete data[token.verification.CharacterOwnerHash];

			// Update the file to reflect the change.
			this.storage.set(
				"tokens",
				JSON.parse(JSON.stringify(data)),
				error => {
					if (error) {
						throw error;
					}

					// Remove the item from our local token list.
					this.ngZone.run(() => {
						let i = this.tokens.indexOf(token);
						if (i >= 0) {
							this.tokens.splice(i, 1);
						}
					});
				}
			);
		});
	}

	public loadApplicationDetails(details: any = null): void {
		// Check if we passed the details ahead of time.
		if (details != null) {
			// We have the details. Overwrite them.
			if (details.clientId != undefined) {
				this.clientId = details.clientId;
			}

			if (details.secretKey != undefined) {
				this.secretKey = details.secretKey;
			}
		} else {
			// We do not have details. We need to get them.
			this.storage.get("application-details", (error, data) => {
				if (error) {
					throw error;
				}

				// We have the details. Overwrite them.
				if (data.clientId != undefined) {
					this.clientId = data.clientId;
				}

				if (data.secretKey != undefined) {
					this.secretKey = data.secretKey;
				}
			});
		}
	}

	public loadCharacterData(chars: any = null): void {
		// Check if we passed the character data ahead of time.
		if (chars != null) {
			// We have the character data. Overwrite them.
			this.characters = {};
			for (let i in chars) {
				this.characters[i] = chars[i];
			}
		} else {
			// We do not have character data. We need to get them.
			this.storage.get("character-data", (error, data) => {
				if (error) {
					throw error;
				}

				this.ngZone.run(() => {
					// We have the character data. Overwrite them.
					this.characters = {};
					for (let i in chars) {
						this.characters[i] = chars[i];
					}
				});
			});
		}
	}

	public loadTokens(tokens: any = null): void {
		// Check if we passed the tokens ahead of time.
		if (tokens != null) {
			// We have the tokens. Overwrite them.
			this.tokens = [];
			for (let i in tokens) {
				this.tokens.push(tokens[i]);
			}
		} else {
			// We do not have tokens. We need to get them.
			this.storage.get("tokens", (error, data) => {
				if (error) {
					throw error;
				}

				this.ngZone.run(() => {
					// We have the tokens. Overwrite them.
					this.tokens = [];
					for (let i in data) {
						this.tokens.push(data[i]);
					}
				});
			});
		}
	}
}
