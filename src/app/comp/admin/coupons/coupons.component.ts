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
  dispCoupons: Coupon[] = [];
  page = 1;
  pageSize = 12;
  searchKey = '';
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
      this.setDispCoupons();
    })
  }

  onPageChange(e) {
    console.log(e);
    this.setDispCoupons();
  }

  setDispCoupons() {
    const init = (this.page - 1) * this.pageSize;
    const end = init + this.pageSize;
    this.dispCoupons = this.coupons.slice(init, end);
  }

  filterCoupons(skey: string) {
    const key = skey.toLowerCase();
    if (key.length > 0 && key !== '') {
      this.dispCoupons = this.coupons.filter(coupon => coupon.title.toLowerCase().indexOf(key) >= 0);
      this.page = 1;
    } else {
      this.resetFilter();
    }
  }

  resetFilter() {
    this.page = 1;
    this.searchKey = '';
    this.setDispCoupons();
  }

}