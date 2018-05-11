import { TestBed, inject } from "@angular/core/testing";

import { EveUniverseDataService } from "./eve-universe-data.service";

describe("EveUniverseDataService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EveUniverseDataService],
		});
	});

	it(
		"should be created",
		inject([EveUniverseDataService], (service: EveUniverseDataService) => {
			expect(service).toBeTruthy();
		})
	);
});
