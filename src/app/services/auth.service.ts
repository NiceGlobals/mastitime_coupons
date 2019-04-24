import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
// import { CurUserService } from './cur-user.service';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  authState = false;
  onAuthStateUpdate = new Subject<boolean>();
  constructor(private _afAuth: AngularFireAuth,
  // private _cus: CurUserService
  ) {
    this.user = this._afAuth.authState;
    console.log('User', this.user);
    this.user.subscribe((auth) => {
      if (auth !== null) {
        this.authState = true;
        this.onAuthStateUpdate.next(this.authState);
        // this._cus.watchUser(auth.uid);
      } else {
        this.authState = false;
        this.onAuthStateUpdate.next(this.authState);
      }
      return null;
    })
  }

  login(email: string, password: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  registerUser(e: string, p: string) {
    return this._afAuth.auth.createUserWithEmailAndPassword(e, p);
  }

  getAuthState() {
    return this.authState || false;
  }
}