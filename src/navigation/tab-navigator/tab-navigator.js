import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabActivityIcon, TabHomeIcon, TabProfileIcon } from '../../assets/common-icons';
import BottomMenu from '../../components/atoms/BottomMenu';
import Row from '../../components/atoms/row';
import Regular from '../../presentation/typography/regular-text';
import Profile from '../../screens/profile/profile';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import TopTabNavigator from '../tab-navigator/top-tab-navigator';
import Home from './../../screens/tab-screens/home-tab/home-tab';
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <BottomTab.Navigator
        // options={{tabBarHideOnKeyboard:true}}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true}}
        tabBar={props => <BottomMenu {...props} colors={colors} />}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: focused => (
              <Row style={{...styles.tabOption,backgroundColor:focused==true?colors.lightYellow:colors.white}}>
                  <TabHomeIcon/>
                  {focused==true?<Regular label={"Home"} style={styles.lableStyle}/>:null}
                 
              </Row>
              
              // <BottomMenuIcon name="home" focused={focused} />
            ),
          }}
        />
        {/* <BottomTab.Screen
          name="Search"
          component={SearchTab}
          options={{
            title: 'Search',
            tabBarIcon: focused => (
              <Row style={{...styles.tabOption,backgroundColor:focused==true?colors.lightYellow:colors.white}}>
                  {focused==true?<Regular label={"Search"} style={styles.lableStyle}/>:null}
                  <TabSearchIcon/>
              </Row>
            ),
          }}
        /> */}
        <BottomTab.Screen
          name="Activity"
          component={TopTabNavigator}
          options={{
            title: 'Activity',
            tabBarIcon: focused => (
              <Row style={{...styles.tabOption,backgroundColor:focused==true?colors.lightYellow:colors.white}}>
                  <TabActivityIcon/>
                  {focused==true?<Regular label={"Activity"} style={styles.lableStyle}/>:null}
              </Row>
            ),
          }}
        />
        

        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: '',
            tabBarIcon: focused => (
              <Row style={{...styles.tabOption,backgroundColor:focused==true?colors.lightYellow:colors.white}}>
              <TabProfileIcon/>
              {focused==true?<Regular label={"Profile"} style={styles.lableStyle}/>:null}
             </Row>
            ),
          }}
        />
      </BottomTab.Navigator>
    
    </View>
  );
};
const styles = StyleSheet.create({
  tabOption: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width:mvs(88),
    borderRadius:6,
    height:mvs(32),
    paddingHorizontal:mvs(9)
  },
  lableStyle:{
    color:colors.primary,
    fontSize:14
  }
});
export default TabNavigator;
