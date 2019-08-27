import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared';

@Component({
  selector: 'app-callback',
  template: `
    <p>
      Logging in...
    </p>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.handleAuthentication();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }
  }

}
