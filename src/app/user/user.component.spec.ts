import { async, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
    }).compileComponents();
  }));

  it('should create the user component', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    expect(userComponent).toBeTruthy();
  });
});
