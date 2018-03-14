import { TestBed, inject } from "@angular/core/testing";

import { EveSsoService } from "./eve-sso.service";

describe("EveSsoService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EveSsoService],
		});
	});

	it(
		"should be created",
		inject([EveSsoService], (service: EveSsoService) => {
			expect(service).toBeTruthy();
		})
	);
});
