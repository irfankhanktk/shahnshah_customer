import {configureStore} from '@reduxjs/toolkit';
import CommonSlice from '../Reducers';

import businessReviews from '../Reducers/ReviewsReducer';
export const store = configureStore({
  reducer: {
    common: CommonSlice,
    businessReviews: businessReviews,
  },
});
