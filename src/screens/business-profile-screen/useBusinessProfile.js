import {useDispatch} from 'react-redux';
import ShowErrorSuccessMessage from '../../components/ShowErrorSuccessMessage';
import {getBusinessProfileReviews} from '../../Redux/Reducers/ReviewsReducer';

export const useBusinessProfile = businessHourse => {
  console.log('businessHourse:', businessHourse);
  const dispatch = useDispatch();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const getDays = hourIndex =>
    days.filter((item, index) => hourIndex === index);

  const isObjectEmpty = dataPassed => {
    if (dataPassed) {
      if (dataPassed.hasOwnProperty('view')) {
        if (dataPassed.view.hasOwnProperty('statusLine')) {
          return true;
        }
      }
    }
    return false;
  };

  //making array of object
  const getUpdatedBusinessHours = businessHourse => {
    return businessHourse?.map((objectKey, index) => ({
      workingTime: objectKey,
      day: getDays(index)[0],
    }));
  };

  const handleGetBusinessesReviews = data => {
    dispatch(getBusinessProfileReviews(data))
      .then(response => {
        if (response?.error) {
          console.log('REPONSE.ERROR:', response?.error);
          ShowErrorSuccessMessage('Error', response?.error?.message);
          console.log('RESPONSE.ERROR:', response?.error);
        } else if (response?.payload?.status === 200) {
          ShowErrorSuccessMessage('success', response?.payload?.status);
        } else {
          ShowErrorSuccessMessage('Error', response?.payload?.data?.message);
          console.log(response?.payload?.data?.message);
        }
      })
      .catch(e => console.log('ERROR:', e));
  };

  return {getUpdatedBusinessHours, isObjectEmpty, handleGetBusinessesReviews};
};
