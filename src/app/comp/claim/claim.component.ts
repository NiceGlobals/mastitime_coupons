import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  showFrame = true;
  viewSt = 0;
  couponCode: string;
  constructor(
    private _route: ActivatedRoute,
    public _router: Router,
    private _ds: DataService
  ) { }

  ngOnInit() {
    const curRoute = this._route.snapshot.url;
    console.log(curRoute);
    if (curRoute.length > 1) {
      this.couponCode = curRoute[1].path;
      this.viewSt = 0;
      this.findCouponwithCode(this.couponCode);
      console.log(curRoute[1].path);
    } else {
      this.viewSt = 1;
    }
  }

  toggleFrame() {
    this.showFrame = !this.showFrame;
  }

  onSubmit(form) {
    this.viewSt = 0;
    console.log(form);
    this.findCoupon(form);
  }

  findCoupon(form: any) {
    this.viewSt = 0;
    this.findCouponwithCode(this.couponCode);
  }

  findCouponwithCode(code: string) {
    firebase.database().ref(`cpns-db/winners/`).orderByChild('couponCode').equalTo(code).once('value').then(snap => {
      console.log(snap.val());
      if (snap.val() !== null) {
        const data = this._ds.getExtractedDataWithKeys(snap.val());
        // alert('You will recieve your coupon / Moviepass in your email soon.');
        const obj = {winnerId: data[0].uid};
        this.sendCouponEmail(obj).then(snap => {
          this.viewSt = 2;
          setTimeout(() => {
            window.location.assign('https://www.mastitimeradio.com');
          }, 5000)
        }).catch(err => {this.viewSt = 4; });
      } else {
        this.viewSt = 4;
      }
    });
  } 

  sendCouponEmail(obj: any) {
    return firebase.database().ref(`/cpns-db/couponMails/`).push(obj);
  }
}