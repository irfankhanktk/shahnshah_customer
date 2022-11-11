//import liraries
import React, {useState, useRef} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Regular from '../../presentation/typography/regular-text';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {useNavigation, CommonActions, useTheme} from '@react-navigation/native';
import styles from './otp-styles';
import moment from 'moment';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import colors from './../../services/colors';
import Bold from '../../presentation/typography/bold-text';
import {INPUT_FIELD} from './../../components/atoms/Input';
import {Active} from '../../assets/tabbar-icons';
import Buttons from '../../components/atoms/Button';
import Toast from 'react-native-toast-message';
import {BaseURL} from '../../ApiServices';
import {storeData} from '../../localStorage';
import {customerData} from '../../Redux/Reducers';
import API_REQUESTS from '../../store/api-requests';

const Otp = ({navigation, route}, props) => {
  // const navigation = useNavigation();
  const {phone} = route.params
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('786576');
  const [isMatch, setIsMatch] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const {} = props;
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: 'top',
      autoHide: true,
      visibilityTime: 3000,
    });
  };

  const delayAPI = (user, id) => {
      navigation.navigate(user ? 'BottomTab' : 'About', {id, phone:route.params?.phone});
  };
  const verifyOTP = async () => {
    if (value.length <= 0) {
      return showToast('error', 'Please enter Verification Code');
    } else {
      try {
        setLoading(true);
        const result =await API_REQUESTS.postData('users/login',{
          phone:route.params?.phone,
          code: value,
        })
        console.log('result data=>',result?.data);
        storeData('token', result.data.token);
        storeData('user', JSON.stringify(result.data));
        storeData('customer_id', result.data.id.toString());
        dispatch(customerData(result.data));
        delayAPI(result.data, result.data.id);
  
      } catch (error) {
        console.log('error=>',error);
        showToast('error',SERVICES._returnError(error));
      }finally{
        setLoading(false);
      }
      // setLoading(true);
      // await fetch(BaseURL + 'auth/verify-otp', requestOptions)
      //   .then(response => response.json())
      //   .then(result => {
      //     if (result != null) {
      //       if (result.error) {
      //         setLoading(false);
      //         setIsMatch(false);
      //         showToast('error', result.message);
      //         return;
      //       } else {
      //         setLoading(false);
      //         dispatch(customerData(result.data));
      //         showToast('success', result.message.message);
      //         console.log('otp=======', result);
      //         if (result.data.user) {
      //           storeData('token', result.data.token);
      //           storeData('user', JSON.stringify(result.data.user));
      //           storeData('customer_id', result.data.id.toString());
      //           dispatch(customerData(result.data.user));
      //           delayAPI(result.data.user, result.data.id);
      //         } else {
      //           delayAPI(result.data.user, result.data.id);
      //         }
      //       }
      //     }
      //   })
      //   .catch(error => {
      //     setLoading(false);
      //     showToast('error', 'Something went wrong!');
      //     console.log('error', error);
      //   });
    }
  };

  return (
    <View style={{...styles.conntainer, backgroundColor: colors.white}}>
      <CustomHeader colors={colors} title="" allowBackBtn />
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(22)}}>
          <Bold
            size={mvs(24)}
            style={{textAlign: 'center', marginTop: mvs(108)}}
            label={'Enter Verification Code'}
          />
          <Regular
            size={mvs(18)}
            lineHeight={mvs(26)}
            numberOfLines={2}
            style={{textAlign: 'center'}}
            label={`Enter verification code. We've sent you the PIN at ${phone}`}
          />
          <INPUT_FIELD.CustomOtpInput
            isMatch={isMatch}
            value={value}
            setValue={setValue}
          />
          {isMatch ? (
            <View
              style={{
                alignItems: 'center',
                marginTop: mvs(30),
                marginBottom: mvs(18),
              }}>
              <Active />
              <Regular
                size={mvs(14)}
                color={colors.B363F4D}
                label={'Code’ll be active for another 40 seconds'}
                style={{textAlign: 'center', marginTop: mvs(4)}}
              />
            </View>
          ) : (
            <Regular
              size={mvs(14)}
              color={colors.FF0000}
              label={'Passcode Incorrect'}
              style={{
                textAlign: 'center',
                marginTop: mvs(45),
                marginBottom: mvs(28),
              }}
            />
          )}
          <Buttons.ButtonPrimary
            style={{}}
            loading={loading}
            title="Continue"
            onClick={verifyOTP}
          />
        </ScrollView>
      </View>
      <Toast />
    </View>
  );
};

export default Otp;
