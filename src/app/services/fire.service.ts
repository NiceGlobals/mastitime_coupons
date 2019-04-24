import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable()
export class FireService {

  constructor() { }

  createCoupon(coupon: any) {
    return firebase.database().ref(`/cpns-db/coupons`).push(coupon);
  }

  updateCoupon(uid: string, coupon: any) {
    return firebase.database().ref(`/cpns-db/coupons/` + uid).set(coupon);
  }

  getCouponsList() {
    return firebase.database().ref(`/cpns-db/coupons`);
  }

  getCoupon(uid: string) {
    return firebase.database().ref(`/cpns-db/coupons/` + uid).once('value');
  }

  registerCoupon(coupon) {
    return firebase.database().ref(`/cpns-db/winners`).push(coupon);
  }
}