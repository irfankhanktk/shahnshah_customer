import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Buttons from '../../components/atoms/Button';
import {INPUT_FIELD} from '../../components/atoms/Input';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import allColors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {BlackCamera} from '../../assets/common-icons';
import {Personal_Details_Styles as styles} from './personal-details-styles';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import PhoneInput from 'react-native-phone-number-input';
import {Tick} from '../../assets/common-icons';
import Row from '../../components/atoms/row';
import colors from '../../services/colors';
import SERVICES from './../../services/common-services';
import {BaseURL} from '../../ApiServices';
import {getData} from '../../localStorage';
import Toast from 'react-native-toast-message';
const PersonalDetails = props => {
  const {route} = props;
  const {mobile} = route.params;
  console.log('mobile=======', mobile);
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneInput = useRef(null);
  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    confirmPassword: '',
    image: '',
  });
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

  const UpdateProfile = async () => {
    if (payload.name === '') {
      showToast('error', 'Name is required');
      return;
    } else if (payload.email === '') {
      showToast('error', 'Email is required');
      return;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email)
    ) {
      showToast('error', 'Email formate is not valid');
      return;
    } else if (phoneNumber === '') {
      showToast('error', 'Mobile Number is required');
      return;
    } else {
      alert('good to go');
    }
  };

  const onSigin = async () => {};
  const getCustomerProfile = async () => {
    const token = await getData('token');
    console.log('Profile token======', token);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}b/om/businesses/1/customers/find?mobile=${mobile}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setLoading(false);
          //setphoneNumber(result[0]?.mobile);
          setPayload({
            ...payload,
            image: result[0]?.image,
            name: result[0]?.name,
            email: result[0]?.email,
            mobile: result[0]?.mobile,
          });

          console.log('customer Account Find=======', payload.mobile);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };
  useEffect(() => {
    getCustomerProfile();
  }, [loading]);
  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <CustomHeader
        colors={colors}
        title="Personal Details"
        allowBackBtn
        spacebetween
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(16)}}>
          <View style={styles.body}>
            <Row>
              <View style={styles.imageView}>
                <ImagePlaceholder
                  uri={payload?.image != null ? {uri: payload?.image} : null}
                  isUser={true}
                  containerStyle={styles.profileImage}
                />
                <TouchableOpacity
                  style={styles.cameraStyle}
                  onPress={async () => {
                    try {
                      const res = await SERVICES._returnImageGallery();
                      setPayload({...payload, image: res});
                    } catch (error) {
                      console.log('error:', error);
                    }
                  }}>
                  <BlackCamera />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, paddingLeft: mvs(16)}}>
                <Bold
                  label={'Change profile image'}
                  style={styles.welcomeText}
                />
                <Regular
                  label={'Please upload an image to be'}
                  style={styles.welcomeSubText}
                />
                <Regular
                  label={'recognizable by others'}
                  style={styles.welcomeSubText}
                />
              </View>
            </Row>
            <View style={styles.input_container}>
              <INPUT_FIELD.InputSecondary
                rightIcon={false}
                leftIcon="User"
                value={payload?.name}
                onChangeText={t => setPayload({...payload, name: t})}
                label="FULL NAME"
                placeholder="John Doe"
              />

              <INPUT_FIELD.InputSecondary
                value={payload?.email}
                leftIcon="User"
                rightIcon="Tick"
                onChangeText={t => setPayload({...payload, email: t})}
                label="EMAIL"
                placeholder="lehieuds@gmail.com"
              />
            </View>
            <Bold label={'MOBILE'} style={{marginTop: mvs(5)}}>
              <Regular label={' NUMBER'} />
            </Bold>
            <View style={{...styles.phoneNumberView, marginTop: mvs(10)}}>
              <PhoneInput
                ref={phoneInput}
                // value={phoneNumber}
                defaultValue={payload?.mobile}
                defaultCode="PK"
                layout="first"
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.textInput}
                onChangeFormattedText={text => {
                  // setFormattedValue(text);
                  console.log('Formated Value ' + text);
                }}
                onChangeText={text => {
                  setphoneNumber(text);
                }}
              />
              <Tick style={{}} />
            </View>
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={UpdateProfile}
              //onClick={onSigin}
              textStyle={{...styles.buttonText, color: colors.white}}
              style={{...styles.button}}
              title={'Save Changes'}
            />
          </View>
        </ScrollView>
      )}
      <Toast />
    </View>
  );
};

export default PersonalDetails;
