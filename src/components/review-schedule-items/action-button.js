import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Regular from '../../presentation/typography/regular-text';
import Shimmer from '../shimmer';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ActionButton = ({
  title = 'Accept',
  borderColor = colors.lightgrey1,
  bgColor = colors.gray,
  titleColor = colors.lightgrey1,
  onClick,
  style,
}) => {
  return (
    <Shimmer
      shimmerStyle={{
        ...styles.CONTAINER,
        ...style,
        borderColor: borderColor,
        backgroundColor: bgColor,
      }}>
      <TouchableOpacity
        style={{
          ...styles.CONTAINER,
          ...style,
          borderColor: borderColor,
          backgroundColor: bgColor,
        }}
        onPress={onClick}>
        <Regular label={title} color={titleColor} size={10} />
      </TouchableOpacity>
    </Shimmer>
  );
};
export default ActionButton;
const styles = StyleSheet.create({
  CONTAINER: {
    paddingHorizontal: mvs(10.1),
    paddingVertical: mvs(3.5),
    marginTop: mvs(9),
    borderRadius: 3,
    borderWidth: 1,
  },
});
