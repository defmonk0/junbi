import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ManageCharactersComponent } from "./manage-characters.component";

describe("ManageCharactersComponent", () => {
	let component: ManageCharactersComponent;
	let fixture: ComponentFixture<ManageCharactersComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ManageCharactersComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ManageCharactersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
