import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getBusinessCoupensApi,
  getBusinessProfileReviewsApi,
} from '../../apis/businessProfileApi';

const initialState = {
  businessReviews: [],
  getBusinessReviewsLoading: false,
  getBusinessReviewsSuccess: false,
  getBusinessReviews: [],
  getBusinessReviewsFailure: false,
  getBusinessReviewsError: false,

  getBusinessCoupinsLoading: false,
  getBusinessCoupins: [],
  getBusinessCoupinsSuccess: false,
  getBusinessCoupinsFailure: false,
  getBusinessCoupinsError: null,
};

export const getBusinessProfileReviews = createAsyncThunk(
  'businessReviews/getBusinessProfileReviews',
  async data => {
    const response = await getBusinessProfileReviewsApi(data);
    console.log('responseresponseresponseresponse', response);
    return response;
  },
);

export const getBusinessProfileCoupens = createAsyncThunk(
  'businessReviews/getBusinessProfileCoupens',
  async data => {
    const response = await getBusinessCoupensApi(data);
    console.log('getBusinessCoupensApi response ', response);
    return response;
  },
);

const businessReviews = createSlice({
  name: 'businessReviews',
  initialState: initialState,
  reducers: {
    addReviews: (state, action) => {
      state.businessReviews = action.payload;
    },
    getBusinessProfileReviews: (state, action) => {
      state.getBusinessReviews = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getBusinessProfileReviews.pending, state => {
      return {
        ...state,
        getBusinessReviewsLoading: true,
      };
    });

    builder.addCase(getBusinessProfileReviews.fulfilled, (state, action) => {
      console.log('FULFILLED action payload:', action.payload);
      return {
        ...state,
        getBusinessReviewsLoading: false,
        getBusinessReviewsSuccess: true,
        getBusinessReviews: action.payload.data,
        getBusinessReviewsFailure: false,
        getBusinessReviewsError: null,
      };
    });

    builder.addCase(getBusinessProfileReviews.rejected, (state, action) => {
      console.log('REJECTEDDDDDD action.payload', action.payload);
      return {
        ...state,
        getBusinessReviewsLoading: false,
        getBusinessReviewsSuccess: false,
        getBusinessReviews: null,
        getBusinessReviewsFailure: true,
        getBusinessReviewsError: action.payload,
      };
    });
  },
});

export const {addReviews, getBusinessProfileReviews: getProfileReviewsDetails} =
  businessReviews.actions;
export default businessReviews.reducer;
