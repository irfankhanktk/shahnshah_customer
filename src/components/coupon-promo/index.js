import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import {
  CashVoucher,
  Cross,
  DiscountExpiring,
  Percent,
} from '../../assets/common-icons';
import { Bg } from '../../assets/images';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import { mvs, width } from '../../services/metrices';
import ImagePlaceholder from '../atoms/Placeholder';
import HeadingTitle from '../molecules/heading-title';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import Row from '../atoms/row';
import Buttons from '../atoms/Button';
import { useBusinessProfile } from '../../screens/business-profile-screen/useBusinessProfile';
import Svg from 'react-native-svg';
import fonts from '../../services/fonts';
import { globalStyles } from '../../styles/globalStyles';
import Medium from '../../presentation/typography/medium-text';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const CouponPromo = ({ coupons = [], business = {}, ...props }) => {
  const navigation = useNavigation();
  const { isObjectEmpty } = useBusinessProfile();
  console.log('business=>>>', business);
  return (
    <View style={{ margin: 0 }}>
      <HeadingTitle
        title="Coupons & Promos"
        marginVertical={0}
        size={mvs(18)}
      // paddingBottom={mvs(10)}
      // paddingTop={mvs(22)}
      />
      <View>
        {coupons?.length === 1 && (
          <View
            style={{
              paddingHorizontal: mvs(18),
              paddingVertical: mvs(20),
              backgroundColor: colors.white,
              // backgroundColor: 'red',
            }}>
            {coupons?.map((ele, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('CouponDetails', {
                      id: ele?.id,
                      bId: business?.id,
                    });
                  }}
                  style={[
                    globalStyles.boxShadow,
                    {
                      backgroundColor: colors.white,
                      width:
                        coupons?.length === 1
                          ? width - mvs(30)
                          : width - mvs(70),
                      height: mvs(242),
                      marginRight: mvs(10),
                      // borderTopRightRadius: mvs(8),
                      borderRadius: mvs(8),
                      // borderWidth: 1,
                      // overflow: 'hidden',

                      // overflow: 'hidden',
                    },
                  ]}>
                  <ShimmerPlaceholder
                    style={{ height: mvs(150), width: '100%' }}
                    visible={props.loading}>
                    <ImagePlaceholder
                      containerStyle={{
                        height: mvs(150),
                        borderTopLeftRadius: mvs(8),
                        borderTopRightRadius: mvs(8),
                        width: '100%',
                      }}
                      uri={ele?.cover ? { uri: ele?.cover } : Bg}
                    />
                    {ele?.service?.icon && (
                      <View style={styles.roundedView}>
                        <Avatar
                          size={mvs(32)}
                          rounded
                          source={{ uri: ele?.service?.icon }}
                        // key={ele?.service?.id}
                        />
                      </View>
                    )}
                  </ShimmerPlaceholder>
                  <View
                    style={{
                      padding: mvs(5),
                      paddingHorizontal: mvs(15),
                      backgroundColor: colors.white,
                      borderBottomLeftRadius: mvs(8),
                      borderBottomRightRadius: mvs(8),
                    }}>
                    <Row justifyContent="space-between">
                      <View>
                        <ShimmerPlaceholder
                          style={{
                            // height: mvs(24),
                            width: mvs(220),
                          }}
                          visible={props.loading}>
                          <Medium
                            size={mvs(16)}
                            color={colors.black}
                            numberOfLines={2}
                            label={ele?.title}
                          />
                        </ShimmerPlaceholder>
                      </View>

                      <Pressable
                        style={{
                          width: mvs(100),
                          height: mvs(25),
                          borderRadius: mvs(3),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          paddingHorizontal: 8,
                          top: mvs(8),
                          // marginTop: mvs(8),
                          backgroundColor: `${colors.primary}30`,
                        }}>
                        <CashVoucher width={mvs(20)} height={mvs(20)} />
                        <Regular
                          label={
                            ele?.highlight.length > 15
                              ? `${ele?.highlight?.slice(0, 15)}...`
                              : ele?.highlight
                          }
                          style={{
                            textTransform: 'uppercase',
                            fontSize: mvs(8),
                            color: colors.black,
                            marginLeft: mvs(4),
                          }}
                        />
                      </Pressable>
                    </Row>

                    <ShimmerPlaceholder
                      style={{
                        // height: mvs(20),
                        top: mvs(-3),
                        // backgroundColor: 'red',
                        // width: mvs(200),
                      }}
                      visible={props.loading}>
                      <Regular
                        size={mvs(14)}
                        color={colors.G5E5E5E}
                        label={ele?.subTitle}
                      />

                      <Row
                        style={{ marginTop: mvs(8) }}
                        justifyContent={
                          isObjectEmpty(ele) ? 'space-between' : 'flex-end'
                        }>
                        {isObjectEmpty(ele) && (
                          <Row alignItems="center" justifyContent="flex-start">
                            <DiscountExpiring
                              fill={ele?.view?.statusLine?.color}
                              width={14}
                              height={14}
                            />
                            <Regular
                              label={ele?.view?.statusLine?.shortLine}
                              color={ele?.view?.statusLine?.color}
                              numberOfLines={2}
                              size={mvs(14)}
                              style={{
                                zIndex: 1,
                                marginLeft: mvs(5),
                                // textAlign: 'center',
                              }}
                            />
                          </Row>
                        )}
                        {ele?.price && (
                          <Row
                            style={{
                              position: isObjectEmpty(ele)
                                ? 'absolute'
                                : 'relative',
                              alignItems: 'center',
                              bottom: 1,
                              right: 25,
                            }}>
                            <Regular
                              label={'AED'}
                              style={{
                                textTransform: 'uppercase',
                                fontSize: mvs(7),
                                marginRight: mvs(5),
                                top: mvs(Platform?.OS === 'android' ? 1 : 3),
                                // marginTop: 7,
                                color: colors.G9B9B9B,
                              }}
                            />
                            <Medium
                              size={mvs(16)}
                              color={colors.primary}
                              label={ele?.price}
                            />
                          </Row>
                        )}
                      </Row>
                    </ShimmerPlaceholder>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {coupons?.length !== 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: mvs(18),
              paddingVertical: mvs(20),
              backgroundColor: colors.white,
            }}>
            {coupons.map((ele, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('CouponDetails', {
                      id: ele?.id,
                      bId: business?.id,
                    });
                  }}
                  style={[
                    globalStyles.boxShadow,
                    {
                      backgroundColor: colors.white,
                      width:
                        coupons?.length === 1
                          ? width - mvs(30)
                          : width - mvs(70),
                      height: mvs(242),
                      marginRight: mvs(10),
                      // borderTopRightRadius: mvs(8),
                      borderRadius: mvs(8),
                      // borderWidth: 1,
                      // overflow: 'hidden',
                      // width:
                      //   coupons?.length === 1 ? width - mvs(30) : width - mvs(70),
                      // // height: mvs(270),
                      // marginRight: mvs(10),
                      // borderTopRightRadius: mvs(8),
                      // borderRadius: mvs(8),
                      // overflow: 'hidden',
                    },
                  ]}>
                  <ShimmerPlaceholder
                    style={{ height: mvs(150), width: '100%' }}
                    visible={props.loading}>
                    <ImagePlaceholder
                      containerStyle={{ height: mvs(150), width: '100%' }}
                      uri={ele?.cover ? { uri: ele?.cover } : Bg}
                    />
                    {ele?.service?.icon && (
                      <View style={styles.roundedView}>
                        <Avatar
                          size={mvs(32)}
                          rounded
                          source={{ uri: ele?.service?.icon }}
                        // key={ele?.service?.id}
                        />
                      </View>
                    )}
                  </ShimmerPlaceholder>
                  <View
                    style={{
                      padding: mvs(5),
                      paddingHorizontal: mvs(15),
                      backgroundColor: colors.white,
                      borderBottomLeftRadius: mvs(8),
                      borderBottomRightRadius: mvs(8),
                    }}>
                    <Row justifyContent="space-between">
                      <View style={{ width: '60%' }}>
                        <ShimmerPlaceholder
                          style={{
                            // height: mvs(24),
                            width: mvs(220),
                          }}
                          visible={props.loading}>
                          <Medium
                            size={mvs(16)}
                            color={colors.black}
                            numberOfLines={2}
                            label={ele?.title}
                          />
                        </ShimmerPlaceholder>
                      </View>

                      <Pressable
                        style={{
                          width: mvs(100),
                          height: mvs(25),
                          borderRadius: mvs(3),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          paddingHorizontal: 8,
                          top: mvs(8),
                          // marginTop: mvs(8),
                          backgroundColor: `${colors.primary}30`,
                        }}>
                        <CashVoucher width={mvs(20)} height={mvs(20)} />
                        <Regular
                          label={
                            ele?.highlight.length > 15
                              ? `${ele?.highlight?.slice(0, 15)}...`
                              : ele?.highlight
                          }
                          style={{
                            textTransform: 'uppercase',
                            fontSize: mvs(8),
                            color: colors.black,
                            marginLeft: mvs(4),
                            width: mvs(70),
                          }}
                        />
                      </Pressable>
                    </Row>

                    <ShimmerPlaceholder
                      style={{
                        // height: mvs(20),
                        top: mvs(-3),
                        // backgroundColor: 'red',
                        // width: mvs(200),
                      }}
                      visible={props.loading}>
                      <Regular
                        size={mvs(14)}
                        color={colors.G5E5E5E}
                        label={ele?.subTitle}
                        style={{
                          width: '60%',
                        }}
                      />

                      <Row
                        style={{ marginTop: mvs(8) }}
                        justifyContent={
                          isObjectEmpty(ele) ? 'space-between' : 'flex-end'
                        }>
                        {isObjectEmpty(ele) && (
                          <Row alignItems="center" justifyContent="flex-start">
                            <DiscountExpiring
                              fill={ele?.view?.statusLine?.color}
                              width={14}
                              height={14}
                            />
                            <Regular
                              label={ele?.view?.statusLine?.shortLine}
                              color={ele?.view?.statusLine?.color}
                              numberOfLines={2}
                              size={mvs(14)}
                              style={{
                                zIndex: 1,
                                marginLeft: mvs(5),
                                // textAlign: 'center',
                              }}
                            />
                          </Row>
                        )}
                        {ele?.price ? (
                          <Row
                            style={{
                              position: isObjectEmpty(ele)
                                ? 'absolute'
                                : 'relative',
                              alignItems: 'center',
                              bottom: 1,
                              right: 25,
                            }}>
                            <Regular
                              label={'AED'}
                              style={{
                                textTransform: 'uppercase',
                                fontSize: mvs(7),
                                marginRight: mvs(5),
                                top: mvs(Platform?.OS === 'android' ? 1 : 3),
                                // marginTop: 7,
                                color: colors.G9B9B9B,
                              }}
                            />
                            <Medium
                              size={mvs(16)}
                              color={colors.primary}
                              label={ele?.price}
                            />
                          </Row>
                        ) : null}
                      </Row>
                    </ShimmerPlaceholder>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default CouponPromo;

const styles = StyleSheet.create({
  roundedView: {
    top: '10%',
    right: mvs(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeff2',
    height: mvs(25),
    width: mvs(25),
    borderRadius: mvs(25),
    position: 'absolute',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    marginHorizontal: mvs(1),
    shadowRadius: mvs(1),
    elevation: 4,
  },
});
