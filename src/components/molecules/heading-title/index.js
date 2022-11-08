import React from 'react';
import {View} from 'react-native';
import {mvs} from '../../../services/metrices';
import Medium from './../../../presentation/typography/medium-text';
import colors from './../../../services/colors';
const HeadingTitle = ({
  paddingBottom,
  size,
  paddingTop,
  paddingVertical = mvs(7),
  marginVertical = mvs(15),
  title = 'I am Title',
  style,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: mvs(18),
        // height:mvs(30),
        marginVertical: marginVertical,
        backgroundColor: colors.FBF8F8,
        // paddingBottom: paddingBottom,
        // paddingTop: 7,
        paddingVertical: paddingVertical,
        ...style,
      }}>
      <Medium
        size={size ? size : mvs(20)}
        label={title}
        color={colors.G777373}
      />
    </View>
  );
};
export default HeadingTitle;
