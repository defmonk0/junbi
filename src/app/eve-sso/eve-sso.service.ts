import { ElectronService } from "ngx-electron";
import { Injectable, NgZone } from "@angular/core";

@Injectable()
export class EveSsoService {
	private storage;
	public tokens = [];

	constructor(
		private electronService: ElectronService,
		private ngZone: NgZone
	) {
		this.storage = electronService.remote.require("electron-json-storage");
		this.updateTokens();
	}

	deleteToken(token: any): void {
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

	updateTokens(tokens: any = null): void {
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
