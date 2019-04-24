import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { MainComponent } from './comp/main/main.component';
import { AuthComponent } from './comp/auth/auth.component';
import { AdminComponent } from './comp/admin/admin.component';
import { CouponsComponent } from './comp/admin/coupons/coupons.component';
import { ManageCouponComponent } from './comp/admin/manage-coupon/manage-coupon.component';
import { SendCouponComponent } from './comp/admin/send-coupon/send-coupon.component';
import { ClaimComponent } from './comp/claim/claim.component';

export const appRoutes: Routes = [
  {path: '', component: MainComponent, canActivate:[AuthGuardService]},
  {path: 'home', component: MainComponent, canActivate:[AuthGuardService]},
  {path: 'ap', component: AdminComponent, canActivate:[AuthGuardService], children: [
    {path: '', component: CouponsComponent },
    {path: 'coupons', component: CouponsComponent },
    {path: 'send_coupon', component: SendCouponComponent },
    {path: 'coupon/new', component: ManageCouponComponent},
    {path: 'coupon/edit/:id', component: ManageCouponComponent}
  ]},
  {path: 'login', component: AuthComponent},
  {path: 'claim', component: ClaimComponent},
  {path: 'claim/:code', component: ClaimComponent}
];