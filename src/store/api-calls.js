import alertService from '../services/alert.service';
import SERVICES from '../services/common-services';
import API_REQUESTS from './api-requests';
import {URLS} from './api-urls';

const book_slot = (id, payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.slot.book_slot + id + '/slot',
        payload,
      );
      console.log('res::', response?.data);
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_payment = (id, payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.booking.update_payment + id + '/payment',
        payload,
      );
      console.log('res::', response?.data);
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const complete_booking = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.booking.complete_booking + id + '/complete',
      );
      console.log('res::', response?.data);
      alertService.show('Booking Confirmed', 'Booking');
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_customer_bookings = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.history.get_customer_bookings + id + '/bookings',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_customer_bookings_history = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.history.get_customer_bookings + id + '/bookings/history',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_customer_coupons_history = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.history.get_customer_bookings + id + '/coupons',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_coupons_details = (id, bussinessId, cid) => {
  //bussinessId=3334;
  console.log('Coupon detail api:::', id, 'cid :', cid);
  return async (dispatch, getState) => {
    try {
      console.log(
        URLS.coupon.get_coupon_details +
          bussinessId +
          '/coupons/' +
          id +
          '?customerId=' +
          cid,
      );
      const response = await API_REQUESTS.getData(
        URLS.coupon.get_coupon_details +
          bussinessId +
          '/coupons/' +
          id +
          '?customerId=' +
          cid,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_bussiness_coupons = bussinessId => {
  //bussinessId=3334
  return async (dispatch, getState) => {
    try {
      // console.log(URLS.coupon.get_coupon_details + bussinessId + '/coupons');
      console.log('URLS.coupon.get_coupon_details + bussinessId',URLS.coupon.get_coupon_details + bussinessId + '/coupons');
      const response = await API_REQUESTS.getData(
        URLS.coupon.get_coupon_details +
          bussinessId +
          `/services/${bussinessId}/coupons`,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_coupon_sale_details = (customerId, saleId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.coupon.get_available_coupons + customerId + '/sales/' + saleId,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const rate_booking = (customerId, bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.review.rate_booking +
          customerId +
          '/bookings/' +
          bookingId +
          '/rate',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_review_rating = (customerId, reviewId, rating) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.review.rate_booking +
          customerId +
          '/reviews/' +
          reviewId +
          '/rate/' +
          rating,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_review_remarks = (customerId, reviewId, payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.review.rate_booking +
          customerId +
          '/reviews/' +
          reviewId +
          '/remark',
        payload,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const upload_review_picture = (customerId, reviewId, payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.review.rate_booking +
          customerId +
          '/reviews/' +
          reviewId +
          '/picture',
        payload,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const remove_review_picture = (customerId, reviewId, payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        URLS.review.rate_booking +
          customerId +
          '/reviews/' +
          reviewId +
          '/picture',
        payload,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_available_booking_coupons = (cid, bid) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.coupon.get_available_coupons +
          cid +
          '/bookings/' +
          bid +
          '/coupons',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const avail_coupon = (id, couponId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.coupon.update_coupon + id + '/coupons/' + couponId,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_coupon_payment = (id, couponId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.coupon.update_coupon + id + '/coupons/' + couponId + '/payment',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const complete_coupon_purchase = (id, couponId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.coupon.update_coupon + id + '/coupons/' + couponId + '/complete',
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_booking = (bookingId,businessId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_booking}${businessId}/bookings/${bookingId}/byBusiness`
      );
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_available_slots = (bookingId,date) => {
  const payLoad={date:date}
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        `${URLS.booking.get_available_slots}${bookingId}/slots`,
         payLoad
      );
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_booking_coupons = (bookingId,customerId) => {
 
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_available_coupons}${customerId}/bookings/${bookingId}/coupons`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const checkin = (businessId,bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.checkin}${businessId}/bookings/${bookingId}/checkin`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const no_show = (businessId,bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.no_show}${businessId}/bookings/${bookingId}/noshow`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const complete_job = (businessId,bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.complete_job}${businessId}/bookings/${bookingId}/completeJob`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const start = (businessId,bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.start}${businessId}/bookings/${bookingId}/start`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_workers = (businessId,bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.lifecycle.get_workers}${businessId}/bookings/${bookingId}/workers`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const assign_worker = (businessId,bookingId,workerId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.assign_worker}${businessId}/bookings/${bookingId}/worker/${workerId}`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const update_booking_payment = (bookingId,paymentMethod,reference) => {
  var paymentData={
    "method": paymentMethod,
    "reference": reference
  }
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        `${URLS.booking.update_payment}${bookingId}/payment`,
        paymentData
      );
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const update_slot = (bookingId,slotId) => {
  var slotData={"slotId": slotId}
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        `${URLS.booking.update_slot}${bookingId}/slot`,
         slotData
      );
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const remove_slot = (bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        `${URLS.booking.remove_slot}${bookingId}/slot`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const apply_coupon = (bookingId,couponId,customerId) => {
 
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.booking.apply_coupon}${customerId}/bookings/${bookingId}/coupon/${couponId}`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const remove_discount = (bookingId,businessId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        `${URLS.booking.remove_discount}${businessId}/bookings/${bookingId}/discount`);
     return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const DIVIY_API = {
  apply_coupon,
  remove_discount,
  remove_slot,
  update_slot,
  update_booking_payment,
  assign_worker,
  get_workers,
  start,
  complete_job,
  no_show,
  checkin,
  get_booking_coupons,
  get_available_slots,
  get_booking,
  //above
  book_slot,
  update_payment,
  get_customer_bookings,
  get_customer_bookings_history,
  get_customer_coupons_history,
  get_coupons_details,
  avail_coupon,
  update_coupon_payment,
  complete_coupon_purchase,
  rate_booking,
  update_review_rating,
  update_review_remarks,
  upload_review_picture,
  remove_review_picture,
  complete_booking,
  get_available_booking_coupons,
  get_bussiness_coupons,
  get_coupon_sale_details,
};

export default DIVIY_API;
