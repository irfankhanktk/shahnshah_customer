import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Map, RightArrow, Total} from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import {mvs} from '../../../services/metrices';
import Row from '../../atoms/row';
import colors from '../../../services/colors';
import Regular from '../../../presentation/typography/regular-text';
import RatingStar from '../rating-star';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Medium from '../../../presentation/typography/medium-text';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const TotalRateMap = ({
  reviewSchedule,
  loading,
  data,
  address = '',
  smallImg = false,
}) => {
  return (
    <Row
      alignItems="center"
      style={{
        paddingVertical: mvs(12),
        paddingHorizontal: mvs(18),
        borderBottomWidth: 0.5,
        borderColor: colors.GD8D8D8,
        backgroundColor: colors.white,
      }}>
      <ShimmerPlaceholder
        style={{
          width: smallImg ? mvs(46) : mvs(82),
          height: smallImg ? mvs(46) : mvs(77),
        }}
        visible={loading}>
        {!smallImg && data?.businessReviews?.logo && (
          <Image
            source={{uri: data?.businessReviews?.logo}}
            resizeMode="contain"
            style={{
              // width: mvs(100), height: mvs(100)
              borderRadius: mvs(8),
              width: mvs(82),
              height: mvs(77),
            }}
          />
        )}
        {smallImg && (
          <Image
            source={{
              uri: data?.logo,
            }}
            resizeMode="cover"
            style={{
              // width: mvs(100), height: mvs(100)
              borderRadius: mvs(8),
              width: mvs(46),
              borderRadius: mvs(46),
              height: mvs(46),
              // backgroundColor: 'red',
            }}
          />
        )}
      </ShimmerPlaceholder>

      <View style={{flex: 1, marginLeft: mvs(20)}}>
        <ShimmerPlaceholder visible={loading}>
          <Medium
            label={smallImg ? data?.title : data?.businessReviews?.title}
            size={mvs(16)}
            color={colors.black}
          />
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          <Row
            style={{
              marginVertical: mvs(8),
            }}
            justifyContent="flex-start">
            {/* <Map /> */}
            <Regular
              size={mvs(14)}
              style={{transform: [{translateY: mvs(-3)}]}}
              color={colors.G9B9B9B}
              label={` ${address}`}
            />
          </Row>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          {data?.businessReviews?.rating &&
            data?.businessReviews?.rating?.length > 0 && (
              <RatingStar
                tintColor={colors.white}
                ratingSelectedColor={colors.primary}
                ratingUnSelectedColor={colors.GDFDFDF}
                width={mvs(84)}
                rate={data?.businessReviews?.rating[7]}
              />
            )}
          {data?.rating?.length > 0 && (
            <RatingStar
              tintColor={colors.white}
              ratingSelectedColor={colors.primary}
              ratingUnSelectedColor={colors.GDFDFDF}
              width={mvs(84)}
              rate={data?.rating[7]}
            />
          )}
        </ShimmerPlaceholder>
      </View>
      {/* <TouchableOpacity>
                <RightArrow />
            </TouchableOpacity> */}
    </Row>
  );
};
export default TotalRateMap;
