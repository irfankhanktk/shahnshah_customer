import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CashVoucher,
  Discount,
  DiscountExpiring,
  LeftBlackArrow,
  Percent,
} from '../../assets/common-icons';
import {Bg} from '../../assets/images';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs, width} from '../../services/metrices';
import Buttons from '../atoms/Button';
import ImagePlaceholder from '../atoms/Placeholder';
import Row from '../atoms/row';
import {Avatar, Text} from 'react-native-elements';
import Bold from './../../presentation/typography/bold-text';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useBusinessProfile} from '../../screens/business-profile-screen/useBusinessProfile';
import {globalStyles} from '../../styles/globalStyles';
import Medium from '../../presentation/typography/medium-text';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ServiceOffering = ({
  totalDistance,
  data,
  checkprice,
  loading,
  isCouponOffering = false,
  moveTo = 'ServiceOfferingDetails',
}) => {
  const {isObjectEmpty} = useBusinessProfile();
  const navigation = useNavigation();

  return (
    // <View style={{backgroundColor: colors.white}}>
    <View>
      {data?.length === 1 && (
        <View
          style={{
            paddingHorizontal: mvs(18),
            paddingVertical: mvs(20),
            backgroundColor: colors.white,
            // overflow: 'visible',
          }}>
          {data
            ?.map((ele, index) => {
              const {discount} = ele;
              console.log(ele?.discount?.view?.statusLine?.color);
              return (
                <Pressable
                  // style={globalStyles.boxShadow}
                  style={[
                    globalStyles.boxShadow,
                    {
                      backgroundColor: colors.white,
                      width:
                        data?.length === 1 ? width - mvs(30) : width - mvs(70),
                      height: mvs(242),
                      marginRight: mvs(10),
                      borderRadius: mvs(8),
                      // backgroundColor: 'red',
                      // overflow: 'hidden',
                    },
                  ]}
                  key={index}
                  onPress={() =>
                    navigation.navigate(moveTo, {
                      id: ele?.id,
                      distance: totalDistance,
                    })
                  }>
                  <ShimmerPlaceholder
                    contentStyle={{
                      // height: mvs(152),
                      width: '100%',
                    }}
                    visible={loading}>
                    <ImagePlaceholder
                      containerStyle={{
                        height: mvs(150),
                        width: '100%',
                        borderTopRightRadius: mvs(8),
                        borderTopLeftRadius: mvs(8),
                      }}
                      uri={{uri: ele?.cover}}
                    />
                    <View style={styles.roundedView}>
                      <Avatar
                        size={mvs(32)}
                        // style={{backgroundColor: 'transparent'}}
                        rounded
                        source={{uri: ele?.service?.icon}}
                        key={ele?.service?.id}
                      />
                    </View>
                    {ele?.discount?.highlight && (
                      <View style={styles.discountImgView}>
                        <CashVoucher width={mvs(20)} height={mvs(20)} />
                        <Regular
                          size={mvs(12)}
                          color={colors.black}
                          numberOfLines={2}
                          label={ele?.discount?.highlight}
                        />
                      </View>
                    )}
                  </ShimmerPlaceholder>
                  <View
                    style={{
                      padding: mvs(5),
                      paddingHorizontal: mvs(15),

                      // ...colors.shadow,

                      backgroundColor: colors.white,
                      // backgroundColor: 'red',
                      // height: '100%',
                    }}>
                    <View
                      style={[
                        styles.rowItem,
                        {
                          justifyContent: 'space-between',
                        },
                      ]}>
                      <View>
                        <ShimmerPlaceholder
                          style={{
                            // height: mvs(24),
                            width: mvs(220),
                          }}
                          visible={loading}>
                          <Medium
                            size={mvs(16)}
                            color={colors.black}
                            numberOfLines={2}
                            label={ele?.title}
                          />
                        </ShimmerPlaceholder>

                        <ShimmerPlaceholder
                          style={{
                            marginTop: mvs(2),
                          }}
                          visible={loading}>
                          <Regular
                            size={mvs(14)}
                            color={colors.serviceSubHeading}
                            numberOfLines={2}
                            label={ele?.subTitle}
                          />
                        </ShimmerPlaceholder>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center',
                          paddingRight: mvs(50),
                        }}>
                        {ele?.discount && (
                          <View style={styles.rowItem}>
                            <Regular
                              textDecoration={'line-through'}
                              size={mvs(8)}
                              style={{top: 4}}
                              color={colors.G9B9B9B}
                              label={'AED'}
                            />
                            <Medium
                              textDecoration={'line-through'}
                              size={mvs(20)}
                              color={colors.B2E3036}
                              label={' ' + ele?.price}
                            />
                          </View>
                        )}
                        {ele?.discount?.rate && (
                          <Regular
                            style={{
                              bottom: mvs(5),
                              // top: mvs(15),
                              left: mvs(20),
                            }}
                            size={mvs(12)}
                            color={colors.primary}
                            label={' ' + ele?.discount?.rate + '% Off'}
                          />
                        )}
                      </View>
                    </View>
                    {!isCouponOffering && (
                      <ShimmerPlaceholder
                        style={{
                          // height: mvs(100),
                          marginTop: mvs(2),
                          width: '100%',
                        }}
                        visible={loading}>
                        <Row
                          justifyContent={
                            ele?.discount &&
                            ele?.discount.view !== undefined &&
                            ele?.discount?.view?.statusLine?.shortLine
                              ? 'space-between'
                              : 'flex-end'
                          }>
                          {isObjectEmpty(ele?.discount) && (
                            <Row>
                              <DiscountExpiring
                                style={{
                                  colors: `${ele?.discount?.view?.statusLine?.color}`,
                                }}
                                width={mvs(20)}
                                height={mvs(20)}
                                // stroke={
                                //   ele?.discount?.view?.statusLine?.color
                                // }
                                fill={ele?.discount?.view?.statusLine?.color}
                                fillColor={
                                  ele?.discount?.view?.statusLine?.color
                                }
                              />
                              <Regular
                                size={mvs(14)}
                                color={ele?.discount?.view?.statusLine?.color}
                                label={
                                  ' ' +
                                  ele?.discount?.view?.statusLine?.shortLine
                                }
                              />
                            </Row>
                          )}
                          <Row alignItems="center">
                            <Regular
                              style={{
                                position: 'absolute',
                                top: mvs(13),
                                left: mvs(25),
                              }}
                              size={mvs(7)}
                              color={colors.G9B9B9B}
                              label={'AED'}
                            />
                            <Buttons.ButtonPrimary
                              title={ele?.newPrice ? ele?.newPrice : ele?.price}
                              textStyle={
                                ele?.discount
                                  ? {
                                      fontSize: mvs(12),
                                      color: colors.primary,
                                      // textDecorationLine: 'line-through',
                                      // textDecorationStyle: 'solid',
                                    }
                                  : {
                                      fontSize: mvs(12),
                                      color: colors.primary,
                                    }
                              }
                              style={{
                                width: mvs(100),
                                borderRadius: mvs(5),
                                //  marginBottom: 20,
                                height: mvs(30),
                                backgroundColor: `${colors.primary}30`,
                              }}
                            />
                          </Row>
                        </Row>
                      </ShimmerPlaceholder>
                    )}
                  </View>
                </Pressable>
              );
            })
            .filter(Boolean)}
        </View>
      )}

      {data?.length > 0 && data?.length !== 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: mvs(18),
            paddingVertical: mvs(20),
            // backgroundColor: colors.white,
          }}>
          {data?.length > 1 &&
            data
              ?.map((ele, index) => {
                const {discount} = ele;
                console.log(ele?.discount?.view?.statusLine?.color);
                return (
                  <Pressable
                    // style={globalStyles.boxShadow}
                    style={[
                      globalStyles.boxShadow,
                      {
                        backgroundColor: colors.white,
                        width:
                          data?.length === 1
                            ? width - mvs(30)
                            : width - mvs(70),
                        height: mvs(242),
                        marginRight: mvs(10),
                        // borderTopRightRadius: mvs(8),
                        // borderTopLeftRadius:mvs(8),
                        borderRadius: mvs(8),
                        // borderWidth: 1,
                        overflow: 'hidden',
                      },
                    ]}
                    key={index}
                    onPress={() =>
                      navigation.navigate(moveTo, {
                        id: ele?.id,
                        distance: totalDistance,
                      })
                    }>
                    <ShimmerPlaceholder
                      contentStyle={{
                        // height: mvs(152),
                        width: '100%',
                      }}
                      visible={loading}>
                      <ImagePlaceholder
                        containerStyle={{
                          height: mvs(150),
                          width: '100%',
                        }}
                        uri={{uri: ele?.cover}}
                      />
                      <View style={styles.roundedView}>
                        <Avatar
                          size={mvs(32)}
                          // style={{backgroundColor: 'transparent'}}
                          rounded
                          source={{uri: ele?.service?.icon}}
                          key={ele?.service?.id}
                        />
                      </View>
                      {ele?.discount?.highlight && (
                        <View style={styles.discountImgView}>
                          <CashVoucher width={mvs(20)} height={mvs(20)} />
                          <Regular
                            size={mvs(12)}
                            color={colors.black}
                            numberOfLines={2}
                            label={ele?.discount?.highlight}
                          />
                        </View>
                      )}
                    </ShimmerPlaceholder>
                    <View
                      style={{
                        padding: mvs(5),
                        paddingHorizontal: mvs(15),

                        // ...colors.shadow,
                        // backgroundColor: 'red',
                        backgroundColor: colors.white,
                        // backgroundColor: 'red',
                        // borderBottomLeftRadius: mvs(8),
                        // borderBottomRightRadius: mvs(8),
                      }}>
                      <View
                        style={[
                          styles.rowItem,
                          {
                            justifyContent: 'space-between',
                          },
                        ]}>
                        <View>
                          <ShimmerPlaceholder
                            style={{
                              // height: mvs(24),
                              width: mvs(220),
                            }}
                            visible={loading}>
                            <Medium
                              size={mvs(16)}
                              color={colors.black}
                              numberOfLines={2}
                              label={ele?.title}
                            />
                          </ShimmerPlaceholder>

                          <ShimmerPlaceholder
                            style={{
                              marginTop: mvs(2),
                            }}
                            visible={loading}>
                            <Regular
                              size={mvs(14)}
                              color={colors.serviceSubHeading}
                              numberOfLines={2}
                              label={ele?.subTitle}
                            />
                          </ShimmerPlaceholder>
                        </View>
                        <View
                          style={{
                            alignSelf: 'center',
                            paddingRight: mvs(50),
                          }}>
                          {ele?.discount && (
                            <View style={styles.rowItem}>
                              <Regular
                                textDecoration={'line-through'}
                                size={mvs(8)}
                                style={{top: 4}}
                                color={colors.G9B9B9B}
                                label={'AED'}
                              />
                              <Medium
                                textDecoration={'line-through'}
                                size={mvs(20)}
                                color={colors.B2E3036}
                                label={' ' + ele?.price}
                              />
                            </View>
                          )}
                          {ele?.discount?.rate && (
                            <Regular
                              style={{
                                bottom: mvs(5),
                                // top: mvs(15),
                                left: mvs(20),
                              }}
                              size={mvs(12)}
                              color={colors.primary}
                              label={' ' + ele?.discount?.rate + '% Off'}
                            />
                          )}
                        </View>
                      </View>
                      {!isCouponOffering && (
                        <ShimmerPlaceholder
                          style={{
                            // height: mvs(100),
                            marginTop: mvs(2),
                            width: '100%',
                          }}
                          visible={loading}>
                          <Row
                            justifyContent={
                              ele?.discount &&
                              ele?.discount.view !== undefined &&
                              ele?.discount?.view?.statusLine?.shortLine
                                ? 'space-between'
                                : 'flex-end'
                            }>
                            {isObjectEmpty(ele?.discount) && (
                              <Row>
                                <DiscountExpiring
                                  style={{
                                    colors: `${ele?.discount?.view?.statusLine?.color}`,
                                  }}
                                  width={mvs(20)}
                                  height={mvs(20)}
                                  // stroke={
                                  //   ele?.discount?.view?.statusLine?.color
                                  // }
                                  fill={ele?.discount?.view?.statusLine?.color}
                                  fillColor={
                                    ele?.discount?.view?.statusLine?.color
                                  }
                                />
                                <Regular
                                  size={mvs(14)}
                                  color={ele?.discount?.view?.statusLine?.color}
                                  label={
                                    ' ' +
                                    ele?.discount?.view?.statusLine?.shortLine
                                  }
                                />
                              </Row>
                            )}
                            <Row alignItems="center">
                              <Regular
                                style={{
                                  position: 'absolute',
                                  top: mvs(13),
                                  left: mvs(25),
                                }}
                                size={mvs(7)}
                                color={colors.G9B9B9B}
                                label={'AED'}
                              />
                              <Buttons.ButtonPrimary
                                title={
                                  ele?.newPrice ? ele?.newPrice : ele?.price
                                }
                                textStyle={
                                  ele?.discount
                                    ? {
                                        fontSize: mvs(12),
                                        color: colors.primary,
                                        // textDecorationLine: 'line-through',
                                        // textDecorationStyle: 'solid',
                                      }
                                    : {
                                        fontSize: mvs(12),
                                        color: colors.primary,
                                      }
                                }
                                style={{
                                  width: mvs(100),
                                  borderRadius: mvs(5),
                                  //  marginBottom: 20,
                                  height: mvs(30),
                                  backgroundColor: `${colors.primary}30`,
                                }}
                              />
                            </Row>
                          </Row>
                        </ShimmerPlaceholder>
                      )}
                    </View>
                  </Pressable>
                );
              })
              .filter(Boolean)}
        </ScrollView>
      )}
    </View>
    // </View>
  );
};
export default ServiceOffering;

const styles = StyleSheet.create({
  roundedView: {
    // top: '5%',
    // right: mvs(5),
    top: '8%',
    right: mvs(15),
    width: mvs(35),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#edeff2',
    opacity: 0.5,
    height: mvs(35),
    borderRadius: mvs(20),
    position: 'absolute',
  },
  discountImgView: {
    width: mvs(130),
    //padding: mvs(5),
    height: mvs(25),
    borderRadius: mvs(3),
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    paddingHorizontal: 5,
    top: '70%',
    right: mvs(15),
    bottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // opacity: 0.8,
    backgroundColor: '#edeff2',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
