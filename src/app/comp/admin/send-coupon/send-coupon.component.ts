import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from '../../../services/fire.service';
import { DataService } from '../../../services/data.service';
import { Coupon } from '../../../models/coupon.model';
import { SentCoupon } from '../../../models/sent-coupon.model';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-send-coupon',
  templateUrl: './send-coupon.component.html',
  styleUrls: ['./send-coupon.component.css']
})
export class SendCouponComponent implements OnInit {
  Coupons: Coupon[];
  sentCoupon: SentCoupon = new SentCoupon();
  constructor(
    private _fs: FireService,
    private _ds: DataService,
    private _router: Router
  ) { }
  ngOnInit() {
    this._fs.getCouponsList().on('value', snap => {
      if (snap.val() !== null) {
        const extCoupons = this._ds.getExtractedDataWithKeys(snap.val());
        this.Coupons = extCoupons.sort((a: Coupon, b: Coupon) => b.created - a.created);
      }
    })
  }

  onSubmit(form) {
    console.log(form);
    this.sentCoupon = form;
    this.followByCouponCode();
  }
  
  followByCouponCode() {
    const tmpCCode = this._ds.getNewCouponCode();
    firebase.database().ref(`/cpns-db/winners`).orderByChild('couponCode').equalTo(tmpCCode).once('value').then(snap => {
      // console.log(tmpCCode, snap.val());
      if (snap.val() == null) {
        this.sentCoupon.couponCode = tmpCCode;
        this._fs.registerCoupon(this.sentCoupon).then(snap => {
          alert('Winner with coupon added successfully, He will recieve the coupon soon');
          this._router.navigateByUrl('ap');
        })
      } else {
        this.followByCouponCode();
      }
    })
  }
} 