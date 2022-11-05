import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {StarFill, StarOutline} from '../../../assets/common-icons';
import colors from '../../../services/colors';
import {mvs} from '../../../services/metrices';
import Row from '../../atoms/row';
import {Rating} from 'react-native-elements';
const RatingStar = ({
  size = 16,
  fill = colors.primary,
  stroke = colors.border,
  rate = 2,
  ratingCount = 5,
  tintColor = colors.white,
  width = '100%',
  disabled = true,
  list = [1, 2, 3, 4, 5],
  onPress = rate => {},
  ratingSelectedColor,
  ratingUnSelectedColor,
  style,
}) => {
  return (
    <Rating
      imageSize={size}
      readonly
      fractions={1}
      startingValue={rate}
      style={{...styles.rating, ...style}}
      type="custom"
      ratingBackgroundColor={ratingUnSelectedColor}
      ratingColor={ratingSelectedColor}
      ratingCount={ratingCount}
      tintColor={tintColor}
    />
    // <Row style={{width: width, ...style}}>
    //   {list?.map((item, index) =>
    //     //  <AntDesign key={index} name={item>rate?'staro':'star'} size={size} color={item>rate?stroke:fill}/>
    //     item > rate ? (
    //       <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
    //         <StarOutline width={mvs(size)} height={mvs(size)} />
    //       </TouchableOpacity>
    //     ) : (
    //       <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
    //         <StarFill width={mvs(size)} height={mvs(size)} />
    //       </TouchableOpacity>
    //     ),
    //   )}
    // </Row>
  );
};
export default RatingStar;
const styles = StyleSheet.create({
  rating: {
    alignSelf: 'flex-start',
  },
});
