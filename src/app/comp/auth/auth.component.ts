import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  viewSt = 0;
  loggedIn = false;
  returnUrl: any = null;
  constructor(
    private _as: AuthService,
    private _ds: DataService,
    private _router: Router,
    private _afAuth: AngularFireAuth
  ) {
    const user = this._afAuth.authState;
    user.subscribe(auth => {
      console.log(auth);
      this.loggedIn = (auth !== null);
      if (auth !== null) {
        this.reDirectToAP();
      }
    })
  }

  ngOnInit() {
  }

  onSubmit(form: any) {
    console.log(form);
    this._as.login(form.email, form.pass).then(snap => {
      console.log(snap);
      this.reDirectToAP();
    })
  }

  reDirectToAP() {
    this._router.navigateByUrl('ap/send_coupon');
  }
}