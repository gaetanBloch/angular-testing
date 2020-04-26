import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

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


  it('should not display the user name if the user is not logged in', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(userComponent.user.name);
  });

  it('should not fetch data successfully if not called asynchronously', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get<DataService>(DataService);
    spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(userComponent.data).toEqual(undefined);
  });

  it('[async] should fetch data successfully if called asynchronously', async(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get<DataService>(DataService);
    const data = 'Data';
    spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve(data));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(userComponent.data).toEqual(data);
    });
  }));

  it('[fakeAsync] should fetch data successfully if called asynchronously', fakeAsync(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const userComponent = fixture.componentInstance;
    const dataService = fixture.debugElement.injector.get<DataService>(DataService);
    const data = 'Data';
    spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve(data));
    fixture.detectChanges();
    tick();
    expect(userComponent.data).toEqual(data);
  }));
});
