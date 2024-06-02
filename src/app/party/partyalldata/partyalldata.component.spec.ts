import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyalldataComponent } from './partyalldata.component';

describe('PartyalldataComponent', () => {
  let component: PartyalldataComponent;
  let fixture: ComponentFixture<PartyalldataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyalldataComponent]
    });
    fixture = TestBed.createComponent(PartyalldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
