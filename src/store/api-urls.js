export const IP = 'http://124.29.208.60:8080';
// export const IP='http://192.168.100.3:3000';
export const URLS = {
  //    base_url:'http://192.168.100.3:3000/api/',
  base_url: `${IP}/api/`,
  image_url: `${IP}/`,
  slot: {
    book_slot: 'p/public/bookings/',
  },
  booking:{
    complete_booking:'p/public/bookings/',
    //new
    create_booking:"p/public/bookings",
    get_booking:'b/om/businesses/',//attach booking id at end
    get_available_slots:'p/public/bookings/',
    update_slot:'p/public/bookings/',
    remove_slot:'p/public/bookings/',
    get_available_coupons:'c/cus/customers/',
    apply_coupon:'c/cus/customers/',
    remove_discount:'b/om/businesses/',
    update_payment:'p/public/bookings/',
    get_service_bookings:'b/om/businesses/',
    get_service_jobs:'b/om/businesses/'
  },
  history:{
    get_customer_bookings:'c/cus/customers/',
  },
  coupon:{
    get_coupon_details:'p/public/businesses/',
    update_coupon:'c/cus/customers/',
    get_available_coupons:'c/cus/customers/'
  },
  review:{
    rate_booking:'c/cus/customers/'
  },
  lifecycle:{
    no_show:'b/om/businesses/',
    get_workers:'b/om/businesses/',
    assign_worker:'b/om/businesses/',
    checkin:'b/om/businesses/',
    start:'b/om/businesses/',
    complete_job:'b/om/businesses/',
  }
};
