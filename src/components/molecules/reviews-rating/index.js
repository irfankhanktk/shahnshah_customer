import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {mvs, width} from '../../../services/metrices';
import Row from './../../atoms/row';
import colors from './../../../services/colors';
import ImagePlaceholder from './../../atoms/Placeholder';
import SemiBold from './../../../presentation/typography/semibold-text';
import RatingStar from './../rating-star/index';
import Regular from './../../../presentation/typography/regular-text';
import {Bg} from '../../../assets/images';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import HumanizeDuration from 'humanize-duration';
import moment from 'moment';
import fonts from '../../../services/fonts';
import {color} from 'react-native-elements/dist/helpers';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ReviewsRaing = ({bg = '#ffedce', picsArray, data, loading, style}) => {
  return (
    <View style={{...style}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: mvs(18)}}>
        {data?.length > 0 &&
          data?.map((ele, index) => (
            <View
              key={index}
              style={{
                paddingHorizontal: mvs(12),
                marginRight: mvs(10),
                width: data?.length === 1 ? width - mvs(30) : width - mvs(70),
                paddingVertical: mvs(16),
                backgroundColor: bg,
                borderRadius: mvs(5),
              }}>
              <Row justifyContent="space-between" alignItems="flex-start">
                <Row>
                  <ShimmerPlaceholder
                    style={{
                      height: mvs(50),
                      width: mvs(33),
                      borderRadius: mvs(17),
                    }}
                    visible={loading}>
                    <ImagePlaceholder
                      containerStyle={{
                        height: mvs(33),
                        width: mvs(33),
                        borderRadius: mvs(17),
                      }}
                      uri={
                        ele?.customer?.image
                          ? {uri: ele?.customer?.image}
                          : {
                              uri: 'http://124.29.208.60:4146/service/1792132988.avatar.webp',
                            }
                      }
                    />
                  </ShimmerPlaceholder>
                  <View
                    style={{
                      marginLeft: mvs(10),
                      width: mvs(120),

                      // flex: 1,
                    }}>
                    <ShimmerPlaceholder
                      style={{
                        height: mvs(50),
                        width: width - mvs(270),
                        flex: 1,
                      }}
                      visible={loading}>
                      <SemiBold
                        size={mvs(12)}
                        color={colors.B1B1B1B}
                        label={ele?.customer?.name}
                      />
                      <RatingStar
                        ratingSelectedColor={colors.black}
                        ratingUnSelectedColor={colors.G9B9B9B}
                        size={10}
                        fill={colors.B323232}
                        rate={ele?.rate}
                        width={mvs(90)}
                        tintColor={'#ffedce'}
                      />
                    </ShimmerPlaceholder>
                  </View>
                </Row>

                <ShimmerPlaceholder
                  style={{
                    width: mvs(120),
                    height: mvs(50),
                  }}
                  visible={loading}>
                  <View style={{marginRight: mvs(10)}}>
                    <Regular
                      style={{
                        alignSelf: 'flex-end',
                        fontFamily: fonts.medium,
                        color: colors.G9B9B9B,
                        fontSize: mvs(12),
                      }}
                      label={moment(ele?.date).fromNow()}
                    />
                  </View>
                </ShimmerPlaceholder>
              </Row>
              <ShimmerPlaceholder
                style={{
                  height: mvs(50),
                  width: width - mvs(100),
                  alignSelf: 'flex-start',
                  // marginVertical: mvs(2),
                }}
                visible={loading}>
                <Regular
                  style={{
                    height: mvs(50),
                    width: width - mvs(100),
                    fontFamily: fonts.medium,
                  }}
                  size={mvs(12)}
                  color={colors.filter_divider}
                  numberOfLines={2}
                  label={ele?.remark}
                />
              </ShimmerPlaceholder>

              {ele?.pics?.length > 0 && (
                <FlatList
                  contentContainerStyle={{}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={ele?.pics}
                  renderItem={({item, index}) => (
                    <View
                      key={index}
                      style={{
                        height: mvs(52),
                        width: mvs(52),
                        marginHorizontal: mvs(10),
                      }}>
                      <ShimmerPlaceholder
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: mvs(7),
                        }}
                        visible={loading}>
                        <ImagePlaceholder
                          containerStyle={{
                            height: '100%',
                            width: '100%',
                            borderRadius: mvs(7),
                          }}
                          uri={{uri: item}}
                        />
                      </ShimmerPlaceholder>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};
export default ReviewsRaing;
