import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-svg';
import * as SVG from '../../../assets/common-icons';
import Regular from '../../../presentation/typography/regular-text';
import colors from '../../../services/colors';
import {mvs} from '../../../services/metrices';
import Row from '../../atoms/row';
const PaymentItem = ({
  onClick,
  value,
  style,
  leftIcon = 'MasterCard',
  rightIcon = 'Caret',
}) => {
  const LeftSvg = SVG[leftIcon];
  const RightSvg = SVG[rightIcon];
  return (
    <TouchableOpacity onPress={onClick}>
      <Row style={{...styles.PAYMENTDROPDOWN, ...style}}>
        {/* <LeftSvg /> */}
        <Text style={{fontSize: mvs(20)}}>{value}</Text>
        <Regular
          size={13}
          style={{flex: 1, marginHorizontal: mvs(8)}}
          label={value}
        />
        <TouchableOpacity onPress={onClick}>
          <RightSvg />
        </TouchableOpacity>
      </Row>
    </TouchableOpacity>
  );
};
export default PaymentItem;
const styles = StyleSheet.create({
  PAYMENTDROPDOWN: {
    justifyContent: 'space-between',
    height: mvs(50),
    alignItems: 'center',
    borderRadius: 10,
    top: mvs(8),
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
  },
});
