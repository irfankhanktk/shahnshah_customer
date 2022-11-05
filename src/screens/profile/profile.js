//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {useNavigation, CommonActions, useTheme} from '@react-navigation/native';
import User from '../../assets/images/user.png';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import styles from './profile.styles';
import colors from '../../services/colors';
import Buttons from '../../components/atoms/Button';
import DisplayText from '../../components/atoms/displayText';
import {mvs} from '../../services/metrices';
import Row from '../../components/atoms/row';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import {Edit} from '../../assets/common-icons';
import ProfileAction from '../../components/atoms/profile-action';
import {getData, removeData} from '../../localStorage';
import {BaseURL} from '../../ApiServices';

// create a component
const Profile = props => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState(true);
  const [value2, setValue2] = React.useState(true);
  const state = useSelector(state => state.common);
  console.log('state======', state.customerData);

  const logOut = () => {
    return Alert.alert('Warning', 'Are you sure you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'LogOut',
        onPress: async () => {
          const res = await removeData('token');
          console.log('res=======', res);
          if (res) {
            navigation.navigate('Onboarding');
          } else {
            console.log('Something went wrong!');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <CustomHeader
            colors={colors}
            title="Profile"
            titleStyle={{color: colors.black, fontSize: 19}}
            spacebetween
          />
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={styles.imageView}>
              <ImagePlaceholder isUser={true} style={styles.profileImage} />
            </View>
            <View
              style={{flex: 1, paddingLeft: mvs(10), justifyContent: 'center'}}>
              <Bold
                label={state?.customerData?.name}
                style={styles.welcomeText}
              />
              <Regular
                label={state?.customerData?.email}
                style={styles.welcomeSubText}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PersonalDetails', {
                  mobile: state?.customerData?.phone,
                })
              }>
              <Text>
                <Edit />
              </Text>
            </TouchableOpacity>
          </Row>
        </View>
        <View style={styles.input_container}>
          <ProfileAction
            label={'My Coupons'}
            leftIcon={'Coupon'}
            rightIcon={'Arrow'}
            subLabel={''}
            selected={true}
          />
          <ProfileAction
            label={'Toyota Corolla'}
            leftIcon={'Vehicle'}
            rightIcon={'Arrow'}
            subLabel={'C19001-Sharjah'}
            selected={false}
          />
          <ProfileAction
            // value={value}
            // onChange={setValue}
            label={'Notifications'}
            leftIcon={'Notification'}
            rightIcon={'Arrow'}
            subLabel={'Manage All notifications'}
            selected={false}
            style={{borderBottomLeftRadius: 2, borderBottomRightRadius: 2}}
          />
          <ProfileAction
            value={value2}
            onChange={setValue2}
            label={'Push Notifications'}
            leftIcon={'Notification'}
            rightIcon={'Arrow'}
            subLabel={'Manage All notifications'}
            selected={false}
            style={{
              marginTop: mvs(0),
              borderTopLeftRadius: 1,
              borderTopRightRadius: 1,
              borderWidth: 0.3,
            }}
          />

          <ProfileAction
            label={'Personal Details'}
            leftIcon={'Personal'}
            rightIcon={'Arrow'}
            subLabel={'Your name, number, email address'}
            selected={false}
            style={{
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
              borderBottomWidth: 0.3,
            }}
          />
          <ProfileAction
            label={'Security & Privacy'}
            leftIcon={'Security'}
            rightIcon={'Arrow'}
            subLabel={'Passwords & other security settings'}
            selected={false}
            style={{borderRadius: 2, marginTop: mvs(0), borderWidth: 0.3}}
          />
          <ProfileAction
            label={'Terms & Conditions'}
            leftIcon={'Tcondition'}
            rightIcon={'Arrow'}
            subLabel={'Read all our terms and conditions'}
            selected={false}
            style={{borderRadius: 2, marginTop: mvs(0), borderWidth: 0.3}}
          />
          <ProfileAction
            label={'Support'}
            leftIcon={'PSupport'}
            rightIcon={'Arrow'}
            subLabel={'We will be happy to help'}
            selected={false}
            style={{
              marginTop: mvs(0),
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              borderTopWidth: 0.3,
            }}
          />
          <ProfileAction
            label={'Logout'}
            leftIcon={'Logout'}
            rightIcon={''}
            onPress={logOut}
            subLabel={''}
            labelStyle={{marginTop: mvs(15)}}
            selected={false}
            style={{
              marginBottom: mvs(10),
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
