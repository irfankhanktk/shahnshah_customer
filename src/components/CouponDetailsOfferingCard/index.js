import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import Regular from '../../presentation/typography/regular-text';
import Medium from '../../presentation/typography/medium-text';
import colors from '../../services/colors';
import {mvs, width} from '../../services/metrices';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Row from '../atoms/row';
import {globalStyles} from '../../styles/globalStyles';

const CouponDetailsOfferingCard = ({navigation, moveTo, data, loading}) => {
  console.log('data:::', data);
  return (
    <Pressable onPress={() => navigation.navigate(moveTo, {id: data?.id})}>
      <Row justifyContent="flex-start" style={styles.shadowOfferCard}>
        <Image source={{uri: data?.cover}} style={styles.offerCardImg} />
        <View style={styles.textBtnView}>
          <Medium size={mvs(16)} label={data?.title} color={colors.black} />
          <Regular
            numberOfLines={2}
            style={{textAlign: 'justify'}}
            size={mvs(14)}
            label={data?.subTitle}
            color={colors.G9B9B9B}
          />
          <ShimmerPlaceholder visible={loading}>
            <Pressable
              onPress={() => navigation.navigate(moveTo, {id: data?.id})}
              style={styles.bookNowBtn}>
              <Regular
                size={mvs(10)}
                color={colors.black}
                label={'Book Now'}
                //   label={coupon?.highlight}
              />
            </Pressable>
          </ShimmerPlaceholder>
        </View>
      </Row>
    </Pressable>
  );
};

export default CouponDetailsOfferingCard;

const styles = StyleSheet.create({
  shadowOfferCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    marginHorizontal: mvs(1),
    shadowRadius: mvs(1),
    elevation: 1,
    marginVertical: mvs(3),
    marginHorizontal: mvs(1),
    width: width - mvs(130),
    height: mvs(99.69),
    backgroundColor: colors.white,
    borderRadius: mvs(8),
    padding: mvs(6),
    marginRight: mvs(12),
  },
  offerCardImg: {
    height: mvs(88),
    width: mvs(96.61),
    borderRadius: mvs(5),
  },
  bookNowBtn: {
    backgroundColor: colors.yellowLightLine,
    borderRadius: mvs(2),
    width: mvs(97.35),
    paddingHorizontal: mvs(10),
    justifyContent: 'center',
    marginTop: mvs(5),
    // top: mvs(5),
    zIndex: 10,
    height: mvs(22.77),
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  textBtnView: {
    flex: 1,
    backgroundColor: colors.white,
    // height: '100%',
    marginHorizontal: mvs(10),
    // backgroundColor: 'red',
  },
});
