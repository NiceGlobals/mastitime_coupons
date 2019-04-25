import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import * as firebase from 'firebase/app';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavComponent } from './comp/nav/nav.component';
import { FooterComponent } from './comp/footer/footer.component';
import { AuthComponent } from './comp/auth/auth.component';
import { MainComponent } from './comp/main/main.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FireService } from './services/fire.service';
import { DataService } from './services/data.service';
import { AdminComponent } from './comp/admin/admin.component';
import { CouponsComponent } from './comp/admin/coupons/coupons.component';
import { ManageCouponComponent } from './comp/admin/manage-coupon/manage-coupon.component';
import { LoadingComponent } from './comp/basic/loading/loading.component';
import { SendCouponComponent } from './comp/admin/send-coupon/send-coupon.component';
import { ClaimComponent } from './comp/claim/claim.component';

// const config = {
//   apiKey: 'AIzaSyCiRsz0SvHP8UpD_o6C9du_nHpBcDmv6-Q',
//   authDomain: 'mastitime-projects.firebaseapp.com',
//   databaseURL: 'https://mastitime-projects.firebaseio.com',
//   // databaseURL: 'https://job-board-central-prod.firebaseio.com',
//   projectId: 'mastitime-projects',
//   storageBucket: 'mastitime-projects.appspot.com',
//   messagingSenderId: '873517723368'
// };

@NgModule({
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireDatabaseModule, FormsModule, RouterModule.forRoot(appRoutes), NgbModule, AngularFireStorageModule, QuillModule  ],
  declarations: [ AppComponent, HelloComponent, NavComponent, FooterComponent, AuthComponent, MainComponent, AdminComponent, CouponsComponent, ManageCouponComponent, LoadingComponent, SendCouponComponent, ClaimComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthService, AuthGuardService, FireService, DataService,{ provide: StorageBucket, useValue: 'mastitime-projects.appspot.com'}, AngularFireAuth]
})
export class AppModule { }
