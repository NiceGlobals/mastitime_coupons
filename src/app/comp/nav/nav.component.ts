import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navOpen = false;
  constructor(
    private _as: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  navToggle(e?: boolean) {
    if (e === false) {
      this.navOpen = false;
    } else {
      this.navOpen = !this.navOpen;
    }
  }

  logout() {
    this.navToggle(false);
    this._as.logout().then(e => {
      this._router.navigateByUrl('login')
    });
  }
}