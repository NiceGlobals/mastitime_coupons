import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { FireService } from '../../../services/fire.service';
import  { Coupon } from '../../../models/coupon.model'
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-manage-coupon',
  templateUrl: './manage-coupon.component.html',
  styleUrls: ['./manage-coupon.component.css']
})
export class ManageCouponComponent implements OnInit {
  editMode = false;
  selectedImage: any;
  coupon: Coupon = new Coupon();
  bannerImage: File;
  quillData = ``;
  curRouteUrl = [];
  BccIp = '';
  ccIp = '';
  formSubmitted = false;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ds: DataService,
    private _fs: FireService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.curRouteUrl = this._route.snapshot.url;
    console.log(this.curRouteUrl);
    if (this.curRouteUrl[1].path == 'new') {
      this.editMode = false;
    }
    if (this.curRouteUrl[1].path == 'edit') {
      this.editMode = true;
      this._fs.getCoupon(this.curRouteUrl[2].path).then(snap => {
        console.log(snap.val());
        this.coupon = snap.val();
        this.quillData = this._ds.deCryptQuillData(this.coupon.fDesc);
      });
      console.log(this.coupon);
    }
  }

  onSubmit(form: any) {
    this.formSubmitted = true;
    console.log(form);
    this.coupon.fDesc = this._ds.encryptQuillData(this.quillData);
    console.log(this.coupon.fDesc);
    if (this.bannerImage) {
      console.log('following banner image upload');
      this.uploadBanner(form);
    } else {
      this.followFormUpload(form);
    }
  }

  followFormUpload(form: any) {
    if (this.editMode) {
      this.coupon.updated = new Date().getTime();
      this._fs.updateCoupon(this.curRouteUrl[2].path, this.coupon).then(snap => {
        alert('Coupon updated successfully');
        this._router.navigateByUrl('ap');
      })
    } else {
      this.coupon.created = new Date().getTime();
      this._fs.createCoupon(this.coupon).then(snap => {
        console.log(snap);
        alert('Coupon created successfully');
        this._router.navigateByUrl('ap');
      })
    }
  }

  getQuillToolbar() {
    return this._ds.getQuillToolbar(0);
  }

  addBCC(val: string) {
    const iVal = this._ds.getCSV(val);
    iVal.forEach((x) => {
      const dt = x.replace(" ", "");
      this.coupon.bcc.push(dt);
    });
    this.BccIp = '';
    // document.getElementById('BccIp').value = '';
  }

  removeBCC(id: number) {
    this.coupon.bcc.splice(id, 1);
  }

  addCC(val: any) {
    const iVal = this._ds.getCSV(val);
    iVal.forEach((x) => {
      const dt = x.replace(" ", "");
      this.coupon.cc.push(dt);
    });
    this.ccIp = '';
    // document.getElementById('ccIp').value = '';
  }

  removeCC(id: number) {
    this.coupon.cc.splice(id, 1);
  }

  formDummyCoupon() {
    this.coupon.title = 'hdsjafgjdbvdjfbvdsjhf';
    this.coupon.type = 1;
    this.coupon.bcc = ['harindra36@gmail.com'];
    this.coupon.cc = ['harindra36@gmail.com'];
    this.coupon.subj = 'jhsdjhjvdfjhvbjhbvhsfdhvjbdvhds';
  }

  fileChangeEvent(event: any) {
    let file: File = event.target.files[0];
    console.log(file);
    let reader = new FileReader();
    // reader.onload = 
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.bannerImage = file;
      const reader = new FileReader();
      reader.onload = e => this.selectedImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  uploadBanner(form: any) {
    // this.isUploading = true;
    const file = this.bannerImage;
    const filePath = `/email_banners/${this.bannerImage.name}`;
    const fileRef = this.storage.ref(`/email_banners/${this.bannerImage.name}`);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    task.percentageChanges().subscribe((data) => {
      console.log(data);
      // this.uploadPercent = data;
    });
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((data) => {
          this.selectedImage = data;
          this.coupon.bannerImg = data;
          console.log('Download Url is: ', this.selectedImage);
          this.followFormUpload(form);
        });
      })
    ).subscribe()
  }
}