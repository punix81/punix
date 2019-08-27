import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth';

/**
 * Very rough example of a AuthGuard unit test
 */
describe('AuthGuard', () => {
  // AuthService stub, later overriden by spies
  const authServiceStub = {
    handleAuthentication: () => true,
    isAuthenticated: () => true,
    renewTokens: () => true,
    login: () => true,
  };

  // to mock the ActivatedRouteSnapshot dependency;
  const routeMock = { snapshot: {} };

  // to mock the RouterStateSnapshot dependency used to obtain a protected path
  // that a user tried to access – '/customers'
  const routerStateMock = { snapshot: {}, url: '/customers' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: authServiceStub
        }
      ]
    });
  });

  // no need for getTestBed when injector is preconfiguring the test callback
  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should should deny access', () => {
    const injector = getTestBed();

    // the spy needs to be created befor asking the injector to create the AuthGuard instance,
    // as this requires the AuthService to be ready

    // return false when authService.isAuthenticated() is being called
    spyOn(authServiceStub, 'isAuthenticated').and.returnValue(false);

    // spy for authService.login() being called
    const authServiceSpy = spyOn(authServiceStub, 'login').and.callThrough();

    // Create the testing environment and instantiate AuthGuard
    const guard = injector.get(AuthGuard);

    // authService.isAuthenticated() is false, therefore the guard should return false
    expect(guard.canActivate(routeMock, routerStateMock)).toEqual(false);

    // canActivate() is supposed to call authService.login() when not authenticated
    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('should grant access', () => {
    const injector = getTestBed();

    // spy for authService.renewTokens() being called
    const authServiceSpy = spyOn(authServiceStub, 'renewTokens').and.callThrough();

    // Create the testing environment and instantiate AuthGuard
    const guard = injector.get(AuthGuard);

    // authService.isAuthenticated() is true, therefore the guard should return true
    expect(guard.canActivate(routeMock, routerStateMock)).toEqual(true);

    // canActivate() is supposed to call authService.renewTokens() when authenticated
    expect(authServiceSpy).toHaveBeenCalled();
  });

});
