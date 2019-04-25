import { Component, OnInit } from '@angular/core';
import { FireService } from '../../../services/fire.service';
import { DataService } from '../../../services/data.service';
import { Coupon } from '../../../models/coupon.model'

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
coupons: Coupon[] = [];
  constructor(
    private _fs: FireService,
    private _ds: DataService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._fs.getCouponsList().on('value', snap => {
      console.log(snap.val());
      const extCoupons = this._ds.getExtractedDataWithKeys(snap.val());
      this.coupons = extCoupons.sort((a: Coupon, b: Coupon) => b.created - a.created);
    })
  }
}