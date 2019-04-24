import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  regEx = {email: `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`, pass1: `^[a-zA-Z]\w{5,14}$`};
  constructor() { }

  validateEmail(email: string) {
    if (email.match(this.regEx[0])) {
      return true;
    } else {
      return false;
    }
  }

  getQuillToolbar(n: number) {
    if (n == 0) {
    const controls = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'clean'],        // toggled buttons
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'align': [] }],
        ['link'],
      ]
    }
    return controls;
    }
  }

  getCSV(str: String) {
    let STR: any =  str;
    return STR = STR.split(',');
  }

  encryptQuillData(data: string) {
    const dtArr = data.split('"');
    let txt = dtArr[0];
    if (dtArr.length > 1) {
      for (let x = 1; x < dtArr.length; x++) {
        txt += '&#34;' + dtArr[x];
      }
    }
    // dtArr.forEach(x => {
    //   txt += '&#34;' + x;
    // })
    return txt;
  }
  deCryptQuillData(data: string) {
    const dtArr = data.split('&#34;');
    console.log(data, dtArr);
    let txt = dtArr[0];
    if (dtArr.length > 1) {
      for (let x = 1; x < dtArr.length; x++) {
        txt += '"' + dtArr[x];
      }
    }
    return txt;
    // return data.replace('&#34;', '"'); 
  }

  getExtractedDataWithKeys(data: any) {
    let Data = [];
    const keys = Object.keys(data);
    for (let x = 0; x < keys.length; x++) {
      const edt = data[Object.keys(data)[x]];
      edt.uid = keys[x];
      Data.push(edt);
    }
    return Data;
  }

  getNewCouponCode() {
    const x = Math.random().toString(36).substr(2, 8).toUpperCase();
    return x;
  }
}