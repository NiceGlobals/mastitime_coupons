import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{
user: Observable<firebase.User>;
authUser = {uid: null};
authState: any = false;
  constructor(private afAuth: AngularFireAuth, private _as: AuthService,private router: Router) {
    afAuth.authState.subscribe((auth) => {
      if (auth !== null) {
        this.user = this.afAuth.authState;
        this.authUser.uid = auth.uid;
      } else {
        this.user = null;
        this.authUser.uid = null;
      }
    });
    this.authState = this._as.getAuthState();
    // console.log(this.authState);
    this._as.onAuthStateUpdate.subscribe(
      (auth: boolean) => {
        this.authState = auth;
        console.log(this.authState);
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log('can Activate triggered');
    console.log(this.authState);
    if (this.authState) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}