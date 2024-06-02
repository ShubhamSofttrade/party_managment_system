import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyformComponent } from './partyform.component';

describe('PartyformComponent', () => {
  let component: PartyformComponent;
  let fixture: ComponentFixture<PartyformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyformComponent]
    });
    fixture = TestBed.createComponent(PartyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
