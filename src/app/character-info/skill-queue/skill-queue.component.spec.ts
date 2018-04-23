import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SkillQueueComponent } from "./skill-queue.component";

describe("SkillQueueComponent", () => {
	let component: SkillQueueComponent;
	let fixture: ComponentFixture<SkillQueueComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [SkillQueueComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SkillQueueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
