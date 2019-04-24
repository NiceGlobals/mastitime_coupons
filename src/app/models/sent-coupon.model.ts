export class SentCoupon {
  constructor(
    public assigned?: number,
    public coupon?: string,
    public radioShow?: string,
    public winnerEmail?: string,
    public winnerName?: string,
    public winnerPhone?: number,
    public couponCode?: string
  ) {
    const Obj = {
    assigned: assigned || new Date().getTime(),
    coupon: coupon || '',
    radioShow: radioShow || '',
    winnerEmail: winnerEmail || '',
    winnerName: winnerName || '',
    winnerPhone: winnerPhone || null,
    couponCode: couponCode || ''      
    };
    return Obj;
  }
}