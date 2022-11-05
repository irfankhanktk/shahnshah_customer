import React from 'react';
import Toast from 'react-native-toast-message';

const ShowErrorSuccessMessage = (messageType = 'success', message) => {
  Toast.show({
    type: messageType,
    text1: message,
    position: 'top',
    autoHide: true,
    visibilityTime: 3000,
  });
};

export default ShowErrorSuccessMessage;
