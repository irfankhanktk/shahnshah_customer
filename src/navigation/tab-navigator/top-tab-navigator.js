import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Bookings from '../../screens/activities/bookings/bookings';
import History from '../../screens/activities/history/history';
import MyCoupons from '../../screens/activities/my-coupons/my-coupons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bold from '../../presentation/typography/bold-text';
import { mvs } from '../../services/metrices';
import allColors from '../../services/colors';
const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const {colors} = useTheme();
  return (
    <View style={{flex:1}}>
      <Bold label={"Activities"} style={{alignSelf: 'center',fontSize:17,marginTop:mvs(32)}}/>
    <Tab.Navigator  screenOptions={{
      tabBarActiveTintColor: allColors.black,
      tabBarLabelStyle: { fontSize: 13,fontWeight:'600' },
      tabBarStyle: { backgroundColor: 'white',marginTop:mvs(14)},
      tabBarIndicatorStyle:{
        backgroundColor:allColors.primary
      }
    }}>
      <Tab.Screen  name="Bookings" component={Bookings} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="MyCoupons" component={MyCoupons} />
    </Tab.Navigator>
    </View>
   
    
  );
};

export default TopTabNavigator;
