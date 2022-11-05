import React, {useState} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 10 : 0;

const GeneralStatusBarColor = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default GeneralStatusBarColor;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
});
