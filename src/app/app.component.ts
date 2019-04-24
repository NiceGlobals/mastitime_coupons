import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  isAuth = false;
  constructor(
    private _as: AuthService
  ) {
    this.isAuth = this._as.getAuthState();
    this._as.onAuthStateUpdate.subscribe(auth => {
      this.isAuth = auth;
    })
  }
  name = 'Angular';
}
