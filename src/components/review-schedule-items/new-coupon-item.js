import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Percent } from '../../assets/common-icons';
// import { {} } from '../../assets/common-icons';
import { CouponIcon, NoCouponIcon } from '../../assets/images';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import ImagePlaceholder from '../atoms/Placeholder';
import Row from '../atoms/row';
import Shimmer from '../shimmer';
const NewCouponItem =
  ({
    title = 'No Discount is Applied',
    subTitle = 'You have discounts to apply',
    isExpiring = false,
    highlightedText = 'Cash Voucher',
    statusLine = 'Booking at full price',
    showCoupon = false,
    showHighLighted = false,
    cover,
    loading,
  }) => {
    return (
      <View>
        <Row style={{ marginVertical: mvs(10) }}>
          <Shimmer visible={loading} shimmerStyle={styles.image}>
            <ImagePlaceholder containerStyle={styles.image} uri={cover ? { uri: cover } : NoCouponIcon} />
          </Shimmer>
          <View style={{ marginLeft: mvs(10), }}>
            <Shimmer visible={loading}>
              <Medium size={mvs(15)} label={title} color={colors.black} />
            </Shimmer>
            <Shimmer visible={loading}>
              <Regular color={colors.lightgrey1} size={mvs(13)} label={subTitle} />
            </Shimmer>

            {/* <Row alignItems='center' style={styles.highlighted}>
              <Percent />
              <Regular color={colors.black}
                size={mvs(13)} label={highlightedText}
                style={{ marginLeft: mvs(6), flex: 1, }}
              />
            </Row> */}
          </View>
        </Row>
        <Shimmer visible={loading}>
          <Regular
            color={showCoupon & !isExpiring ? colors.lightgrey1 : isExpiring ? colors.red : colors.primary}
            size={mvs(13)} label={statusLine} numberOfLines={1} />
        </Shimmer>
      </View>
    );
  };
export default NewCouponItem;
const styles = StyleSheet.create({
  image: {
    height: mvs(45.23),
    width: mvs(48),
    borderRadius: mvs(8),
    alignSelf: 'center'
  },
  highlighted: {
    paddingHorizontal: mvs(9),
    paddingVertical: mvs(4),
    backgroundColor: colors.lightYellow,
    borderRadius: 4,
    marginTop: mvs(7)
  }
});