// In App.js in a new project

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import BusinessProfile from '../../screens/business-profile-screen';
import Otp from '../../screens/otp-screen/otp';
import Splash from '../../screens/splash-screen/splash';
import Onboarding from './../../screens/onboarding-screen/onboarding';
import Signin from './../../screens/signin-screen/signin';
import colors from './../../services/colors';
import ServiceDetails from './../../screens/service-details-screen/index';
import ServiceOfferingDetails from './../../screens/service-offering-details-screen/index';
import CouponDetails from './../../screens/coupon-details-screen/index';
import About from '../../screens/about/about';
import MyVehicle from '../../screens/my-vehicle/my-vehicle';
import Congratulation from '../../screens/congratulation/congratulation';
import PersonalDetails from '../../screens/personal-details/personal-details';
import Profile from '../../screens/profile/profile';
import TabNavigator from '../tab-navigator/tab-navigator';
import WalkIn from '../../screens/walk-in/walk-in';
import SaleCoupon from '../../screens/sale-coupon/sale-coupon';
const Stack = createStackNavigator();
const horizontalAnimation = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export const MainNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <Stack.Navigator initialRouteName='Splash' screenOptions={horizontalAnimation}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="BottomTab" component={TabNavigator} />
        <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="ServiceOfferingDetails" component={ServiceOfferingDetails} />
        <Stack.Screen name="CouponDetails" component={CouponDetails} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="MyVehicle" component={MyVehicle} />
        <Stack.Screen name="Congratulation" component={Congratulation} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="WalkIn" component={WalkIn} />
        <Stack.Screen name="SaleCoupon" component={SaleCoupon} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
