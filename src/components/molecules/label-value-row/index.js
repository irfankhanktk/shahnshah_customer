import React from 'react';
import SemiBold from '../../../presentation/typography/semibold-text';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Regular from './../../../presentation/typography/regular-text';
import Row from './../../atoms/row';
import { StyleSheet } from 'react-native';
import Medium from '../../../presentation/typography/medium-text';
import Shimmer from '../../shimmer';
const LabelValue = ({
  label = 'I am Title',
  paddingTop,
  paddingBottom,
  value = 'value here',
  mb = mvs(10),
  vColor = colors.B323232,
  lcolor = colors.B323232,
  bw = StyleSheet.hairlineWidth,
  lines = 1,
  businessHoursCard,
  loading,
  style,
}) => {
  return (
    <Row
      style={{
        justifyContent: 'space-between',
        marginHorizontal: mvs(18),
        paddingTop: paddingTop ? paddingTop : 0,
        paddingVertical: businessHoursCard ? 0 : mvs(6),
        marginBottom: mb,
        borderBottomWidth: bw,
        borderBottomColor: colors.GE1E1E1,
        // borderColor: colors.GE1E1E1,
      }}>
      <Regular
        style={style}
        size={mvs(14)}
        numberOfLines={lines}
        label={label}
        color={colors.B323232}
      />
      <Shimmer visible={loading} shimmerStyle={{ height: 20, minWidth: '60%' }}>
        <Medium
          style={style}
          size={mvs(14)}
          label={value}
          color={vColor}
          numberOfLines={2}
        />
      </Shimmer>

    </Row>
  );
};
export default LabelValue;
