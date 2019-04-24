export class Coupon {
  constructor(
    public title?: string,
    public type?: number,
    public qty?: number,
    public bcc?: string[],
    public cc?: string[],
    public subj?: string,
    public fDesc?: string,
    public created?: number,
    public updated?: number,
    public avlQty?: number,
    public bannerImg?: string
  ) {
    const Obj = {
      title: title || '',
      type: type || 0,
      qty: qty || 0,
      bcc: bcc || [],
      cc: cc || [],
      subj: subj || '',
      fDesc: fDesc || ``,
      created: created || new Date().getTime(),
      updated: updated || new Date().getTime(),
      avlQty: avlQty || 0,
      bannerImg: bannerImg || ''
    }
    return Obj;
  }
}