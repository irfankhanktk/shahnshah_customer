import axios from 'axios';
import {BaseURL} from '../ApiServices';

export const getBusinessProfileReviewsApi = data => {
  console.log(BaseURL + `p/public/businesses/${data}/reviews?page=1`);
  return axios.get(BaseURL + `p/public/businesses/${data}/reviews?page=1`);
};

export const getBusinessCoupensApi = data => {
  return axios.get(
    BaseURL + `p/public/businesses/${data}/services/${data}/coupons`,
  );
};
