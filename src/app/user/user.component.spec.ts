import { async, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

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

  it('should use the user name from the service', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get<UserService>(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(userComponent.user.name);
  });

  it('should display the user name if the user is logged in', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    userComponent.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(userComponent.user.name);
  });
});
