import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DiscountIcon, OffCarWash, Percent } from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import Medium from '../../../presentation/typography/medium-text';
import Regular from '../../../presentation/typography/regular-text';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native-elements';
import LinedColoredCard from '../../linedColoredCard';
import Shimmer from '../../shimmer';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const CouponCard = ({ loading, coupon = {} }) => {
  console.log('coupon comp :', coupon);
  return (
    <View style={{ backgroundColor: colors.white }}>
      <Row
        justifyContent="flex-start"
        style={{
          paddingVertical: mvs(12),
          marginHorizontal: mvs(18),
          // backgroundColor: 'orange',
          borderBottomWidth: 0.7,
          backgroundColor: colors.white,
          borderBottomColor: colors.yellowLightLine,
        }}>
        <Shimmer
          shimmerStyle={{ width: mvs(82), height: mvs(77), borderRadius: mvs(8), }}
          visible={loading}>
          <Image
            style={{
              borderRadius: mvs(8),
              width: mvs(82),
              height: mvs(77),
            }}
            source={{ uri: coupon?.cover }}
          />
        </Shimmer>

        <View
          style={{
            marginLeft: mvs(20),

            flex: 1,
          }}>
          <Shimmer visible={loading}>
            <Medium size={mvs(16)} label={coupon?.title?.toUpperCase()} />
          </Shimmer>
          <Shimmer shimmerStyle={{ marginTop: mvs(5) }} visible={loading}>
            <Regular
              style={{
                marginBottom: mvs(8),
              }}
              color={colors.G777373}
              size={mvs(14)}
              label={coupon?.subTitle}
            />
            {/* <Regular
            color={colors.G777373}
            size={mvs(16)}
            label={coupon?.price + ' AED'}
          /> */}
          </Shimmer>
          <Shimmer shimmerStyle={{ marginTop: mvs(5) }} visible={loading}>
            <View style={styles.discountVouchedIconView}>
              <DiscountIcon width={mvs(14)} height={mvs(13)} />
              <Medium
                size={mvs(10)}
                style={{ marginLeft: 5 }}
                color={colors.black}
                label={coupon?.highlight}
              />
            </View>

            {/* <Row style={{marginTop: mvs(3)}} justifyContent="flex-start">
            <Percent height={mvs(16)} width={mvs(16)} />
            <Regular
              style={{textTransform: 'uppercase'}}
              size={mvs(12)}
              color={colors.primary}
              label={' ' + coupon?.highlight}
            />
          </Row> */}
          </Shimmer>
        </View>
      </Row>
    </View>
  );
};
export default CouponCard;

const styles = StyleSheet.create({
  discountVouchedIconView: {
    backgroundColor: colors.yellowLightLine,
    borderRadius: mvs(2),
    width: mvs(120),
    paddingHorizontal: mvs(10),
    height: mvs(22.77),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
