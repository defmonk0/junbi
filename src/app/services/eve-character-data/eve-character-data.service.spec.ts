import { TestBed, inject } from "@angular/core/testing";

import { EveCharacterDataService } from "./eve-character-data.service";

describe("EveCharacterDataService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EveCharacterDataService],
		});
	});

	it(
		"should be created",
		inject(
			[EveCharacterDataService],
			(service: EveCharacterDataService) => {
				expect(service).toBeTruthy();
			}
		)
	);
});
