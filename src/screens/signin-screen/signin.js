import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Apple, Facebook, Google, Services, SLogo, Tick } from '../../assets/common-icons';
import Buttons from '../../components/atoms/Button';
import { INPUT_FIELD } from '../../components/atoms/Input';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import allColors from '../../services/colors';
import { mvs } from '../../services/metrices';
import PhoneInput from 'react-native-phone-number-input';
import { Signin_Styles as styles } from './signin-styles';
import Toast from 'react-native-toast-message';
import { BaseURL } from '../../ApiServices';
import SERVICES from '../../services/common-services';
import API_REQUESTS from '../../store/api-requests';

const Signin = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('');
  const [isSignUpWithPhone, setPhoneSignUp] = React.useState(true);
  const [phoneNumber, setphoneNumber] = useState('507285969');
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState('507285969');
  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const { colors } = useTheme();

  const onSigin = async () => {
    setSelectedTab('login');
  };
  const onSigUp = async () => {
    setSelectedTab('signup');
    setPhoneSignUp(false);
  };
  const onSigUpWithPhone = async () => {
    setPhoneSignUp(true);
  };
  const delayAPI = (phone) => {
    navigation.navigate('Otp', { phone });
  };
  const getMobile = async () => {
    if (formattedValue.length <= 0) {
      return showToast('error', 'Please Enter mobile number');
    } else {
      var phone = `${phoneInput?.current?.getCallingCode()}-${phoneNumber}`//formattedValue.substring(1, formattedValue.length);
      console.log('Phone Number ', phone);
      var myHeaders = new Headers();
      // myHeaders.append('Content-Type', 'application/json');
      try {
        setLoading(true);

        const result = await API_REQUESTS.postData('users/gate',
          {
            phone: phone,
          }
        )
        console.log('result=>>>>', result?.data);
        showToast('success', result.data);
        delayAPI(phone);
      } catch (error) {
        console.log('error=>', error);
        showToast('error', SERVICES._returnError(error));
      } finally {
        setLoading(false);
      }

      // var body = JSON.stringify({
      //   phone: phone,
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   // headers: myHeaders,
      //   body: body,
      //   // redirect: 'follow',
      // };
      // await fetch(BaseURL + 'users/gate', requestOptions)
      //   .then(response => {
      //     console.log('response=>>>',response);
      //     return response.json()})
      //   .then(result => {
      //     if (result != null) {
      //       setLoading(false);
      //       console.log(result.message.message);
      //       showToast('success', result.message.message);
      //       delayAPI(result.data.phone);
      //     }
      //   })
      //   .catch(error => {
      //     setLoading(false);
      //     console.log(BaseURL + 'users/gate');

      //     showToast('error', 'Something went wrong!');
      //     console.log('error', SERVICES._returnError(error));
      //   });
    }
  };

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
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          {/* <View style={{alignItems: 'center'}}>
            <SLogo  />
          </View>
         <View style={styles.tabView}>
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={onSigin}
              style={selectedTab=="login"?styles.selectedTabButton:styles.unSelectedTabButton}
              textStyle={selectedTab=="login"?styles.selectedTabButtonText:styles.unSelectedTabButtonText}
              title={'Log in'}
            />
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={onSigUp}
              style={selectedTab=="signup"?styles.selectedTabButton:styles.unSelectedTabButton}
              textStyle={selectedTab=="signup"?styles.selectedTabButtonText:styles.unSelectedTabButtonText}
              title={'Register '}
            />
          </View> */}
          {selectedTab == 'login' ? (
            <>
              <Bold label={'Welcome Back!'} style={styles.welcomeText} />
              <Regular
                label={'Please enter your email and password'}
                style={styles.welcomeSubText}
              />
              <Regular label={'to contiue'} style={styles.welcomeSubText} />
              <View style={styles.input_container}>
                <INPUT_FIELD.InputSecondary
                  value={payload.email}
                  leftIcon="User"
                  rightIcon=""
                  onChangeText={t => setPayload({ ...payload, email: t })}
                  label="EMAIL"
                  placeholder="lehieuds@gmail.com"
                />
                <INPUT_FIELD.InputSecondary
                  secureTextEntry
                  leftIcon="User"
                  rightIcon=""
                  value={payload.password}
                  onChangeText={t => setPayload({ ...payload, password: t })}
                  label="PASSWORD"
                  placeholder="Password"
                />
              </View>
              <Bold label={'Forgot Password?'} style={styles.forgotText} />
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigin}
                textStyle={styles.buttonText}
                style={{ ...styles.button }}
                title={'Login'}
              />
              <Regular
                label={'Continue With'}
                style={styles.continueWithText}
              />
              <View style={styles.socialIconView}>
                <Google />
                <Regular
                  label={'Sign in with Google'}
                  style={styles.socialIconText}
                />
              </View>
              <View style={styles.socialIconView}>
                <Facebook />
                <Regular
                  label={'Sign in with Facebook'}
                  style={styles.socialIconText}
                />
              </View>
              <View style={styles.socialIconView}>
                <Apple />
                <Regular
                  label={'Sign in with Facebook'}
                  style={styles.socialIconText}
                />
              </View>
            </>
          ) : selectedTab == 'signup' && isSignUpWithPhone == false ? (
            <>
              <Bold label={'Create Your Account'} style={styles.welcomeText} />
              <Regular
                label={'Enter your full name and email address to'}
                style={styles.welcomeSubText}
              />
              <Regular
                label={'create your account'}
                style={styles.welcomeSubText}
              />

              <View style={styles.input_container}>
                <INPUT_FIELD.InputSecondary
                  rightIcon={false}
                  leftIcon="User"
                  value={payload.name}
                  onChangeText={t => setPayload({ ...payload, name: t })}
                  label="FULL NAME"
                  placeholder="John Doe"
                />

                <INPUT_FIELD.InputSecondary
                  value={payload.email}
                  leftIcon="User"
                  rightIcon="Tick"
                  onChangeText={t => setPayload({ ...payload, email: t })}
                  label="EMAIL"
                  placeholder="lehieuds@gmail.com"
                />
                <INPUT_FIELD.InputSecondary
                  secureTextEntry
                  leftIcon="Lock"
                  value={payload.password}
                  onChangeText={t => setPayload({ ...payload, password: t })}
                  label="PASSWORD"
                  placeholder="Password"
                />

                <INPUT_FIELD.InputSecondary
                  secureTextEntry
                  leftIcon="User"
                  rightIcon="Lock"
                  value={payload.confirmPassword}
                  onChangeText={t =>
                    setPayload({ ...payload, confirmPassword: t })
                  }
                  label="CONFIRM PASSWORD"
                  placeholder="Confirm Password"
                />
              </View>
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigin}
                textStyle={{ ...styles.buttonText, color: colors.white }}
                style={{ ...styles.button }}
                title={'Continue'}
              />
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigUpWithPhone}
                textStyle={styles.buttonText}
                style={{
                  ...styles.button,
                  backgroundColor: colors.white,
                  borderWidth: 1.4,
                  borderColor: allColors.primary,
                }}
                title={'Sign up with Phone Number'}
              />
            </>
          ) : isSignUpWithPhone == true ? (
            <>
              <Regular label={'Front Row'} style={styles.frontRowText} />
              <Bold label={'Welcome Back!'} style={styles.welcomeText} />
              <Regular
                label={'Enter your mobile number'}
                style={styles.welcomeSubText}
              />
              <Regular label={'to continue.'} style={styles.welcomeSubText} />
              <Bold label={'MOBILE'} style={{ marginTop: mvs(30) }}>
                <Regular label={' NUMBER'} />
              </Bold>
              <View style={{ ...styles.phoneNumberView, marginTop: mvs(10) }}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue="507285969"
                  defaultCode="AE"
                  layout="first"
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textInput}
                  onChangeFormattedText={text => {
                    console.log('Formated Value ' + text);
                    setFormattedValue(text);
                  }}
                  onChangeText={text => {
                    console.log('Formated Value ' + text);
                    setphoneNumber(text);
                  }}
                />
                <Tick style={{}} />
              </View>
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={getMobile}
                //onClick={() => navigation.navigate('Otp')}
                textStyle={{ ...styles.buttonText, color: colors.white }}
                style={{ ...styles.button }}
                title={'Continue'}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Signin;
