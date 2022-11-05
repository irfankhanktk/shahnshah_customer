//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log('saving token=====', res);
  } catch (e) {
    console.log('saving Error=====', e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log('getting token=====', value);
      return value;
    }
  } catch (e) {
    console.log('getting Error=====', e);
  }
};
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log('removing error=====', e);
    return false;
  }
};
