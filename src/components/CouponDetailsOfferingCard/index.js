import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import Regular from '../../presentation/typography/regular-text';
import Medium from '../../presentation/typography/medium-text';
import colors from '../../services/colors';
import { mvs, width } from '../../services/metrices';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Row from '../atoms/row';
import { globalStyles } from '../../styles/globalStyles';
import Shimmer from '../shimmer';

const CouponDetailsOfferingCard = ({ navigation, moveTo, data, loading }) => {
  console.log('data:::', data);
  return (
    <Pressable style={{ flex: 1, paddingLeft: mvs(10) }} onPress={() => navigation.navigate(moveTo, { id: data?.id })}>
      <Row justifyContent="flex-start" style={styles.shadowOfferCard}>
        <Shimmer shimmerStyle={styles.offerCardImg} visible={loading}>
          <Image source={{ uri: data?.cover }} style={styles.offerCardImg} />
        </Shimmer>
        <View style={styles.textBtnView}>
          <Shimmer visible={loading}>
            <Medium size={mvs(16)} label={data?.title} color={colors.black} />
          </Shimmer>
          <Shimmer shimmerStyle={{ marginTop: mvs(5) }} visible={loading}>
            <Regular
              numberOfLines={2}
              style={{ textAlign: 'justify' }}
              size={mvs(14)}
              label={data?.subTitle}
              color={colors.G9B9B9B}
            />
          </Shimmer>
          <Shimmer shimmerStyle={[styles.bookNowBtn,]} visible={loading}>
            <Pressable
              onPress={() => navigation.navigate(moveTo, { id: data?.id })}
              style={styles.bookNowBtn}
            >
              <Regular
                size={mvs(10)}
                color={colors.black}
                label={'Book Now'}
              />
            </Pressable>
          </Shimmer>
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
    shadowRadius: mvs(3),
    elevation: 5,
    marginVertical: mvs(5),
    // width: width - mvs(130),
    // height: mvs(99.69),
    backgroundColor: colors.white,
    borderRadius: mvs(8),
    padding: mvs(6),
    marginRight: mvs(6),
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
    zIndex: 10,
    height: mvs(22.77),
    marginTop: mvs(10),
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  textBtnView: {
    // flex: 1,
    backgroundColor: colors.white,
    // height: '100%',
    marginHorizontal: mvs(10),
    // width: '100%'
    // backgroundColor: 'red',
  },
});
