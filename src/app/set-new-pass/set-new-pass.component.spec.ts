import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewPassComponent } from './set-new-pass.component';

describe('SetNewPassComponent', () => {
  let component: SetNewPassComponent;
  let fixture: ComponentFixture<SetNewPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetNewPassComponent]
    });
    fixture = TestBed.createComponent(SetNewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
