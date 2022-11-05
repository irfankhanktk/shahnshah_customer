import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Buttons from '../../components/atoms/Button';
import {INPUT_FIELD} from '../../components/atoms/Input';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import allColors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {BlackCamera} from '../../assets/common-icons';
import {About_Styles as styles} from './about-styles';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import alertService from '../../services/alert.service';
import DualText from '../../components/atoms/dual-text/dual-text';
import SERVICES from './../../services/common-services';
import Toast from 'react-native-toast-message';
import {BaseURL} from '../../ApiServices';
import {storeData} from '../../localStorage';
import {customerData} from '../../Redux/Reducers';

const About = ({route}, props) => {
  const {phone, id} = route.params;
  console.log(route.params)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const [payload, setPayload] = React.useState({
    email: '',
    name: '',
    image: '',
  });
  const {colors} = useTheme();
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
  const delayAPI = () => {
    setTimeout(() => {
      navigation.navigate('MyVehicle');
    }, 4000);
  };
  const saveProfile = async () => {
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (payload.name === '') {
      return showToast('error', 'Name is required');
    } else if (payload.email === '') {
      return showToast('error', 'Email is required');
    } else if (!payload.email.match(emailRegx)) {
      return showToast('error', 'Invalid email ');
    } else {
     
      var raw = JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: '123456',
        phone:phone+'',
        role_id: '4',
        user_type: 'shahshah_user',
      });
      console.log(raw)
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow',
      };
      setLoading(true);
      await fetch(`${BaseURL}auth/signup`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result != null) {
            setLoading(false);
            //dispatch(customerData(result.data));
            console.log(result?.data)
            storeData('user', JSON.stringify(result.data));
            storeData('token', result.data.token);
            storeData('customer_id', result.data.customer_id.toString());
            showToast('success', result.message.message);
            delayAPI();
            console.log('signup result=======', result);
          }
        })
        .catch(error => {
          console.log(error)
          showToast('error', 'Something went wrong!');
          setLoading(false);
          console.log('error', error);
        });
    }
  };

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <CustomHeader colors={colors} title="" allowBackBtn />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(16)}}>
        <View style={styles.body}>
          <Bold label={'More about you'} style={styles.welcomeText} />
          <Regular
            label={'Enter your personal information and '}
            style={styles.welcomeSubText}
          />
          <Regular
            label={'upload profile image'}
            style={styles.welcomeSubText}
          />
          <View style={styles.imageView}>
            <ImagePlaceholder
              uri={payload?.image?.uri ? {uri: payload?.image?.uri} : null}
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
          <Regular
            label={'Upload profile picture'}
            style={styles.welcomeSubText}
          />
          <View style={styles.input_container}>
            <INPUT_FIELD.InputSecondary
              rightIcon={false}
              leftIcon="User"
              value={payload.name}
              onChangeText={t => {
                console.log('name======', t);
                setPayload({...payload, name: t});
              }}
              label="FULL NAME"
              placeholder="John Doe"
            />

            <INPUT_FIELD.InputSecondary
              value={payload.email}
              leftIcon="User"
              rightIcon="Tick"
              onChangeText={t => {
                console.log('email======', t);
                setPayload({...payload, email: t});
              }}
              label="EMAIL"
              placeholder="lehieuds@gmail.com"
            />
          </View>
          <DualText
            style={{marginTop: mvs(10), fontSize: 14}}
            content={'By continuing. you agree to our'}
            highlightTextStyle={{fontSize: 14}}
            highlightText={' Terms of use'}>
            <Regular label={' and'} />
          </DualText>

          <DualText
            style={{marginTop: mvs(1), fontSize: 14}}
            highlightTextStyle={{fontSize: 14}}
            content={'confirm that you have read '}
            highlightText={'Privacy policy.'}
          />

          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={saveProfile}
            //onClick={() => navigation.navigate('MyVehicle')}
            textStyle={{...styles.buttonText, color: colors.white}}
            style={{...styles.button}}
            title={'Continue'}
          />
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default About;
