import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';

import * as SVGS from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import {mvs} from '../../../services/metrices';
import RatingStar from '../rating-star';
import Medium from './../../../presentation/typography/medium-text';
import colors from './../../../services/colors';
import Row from './../../atoms/row';
const ServiceCard = ({
  title = 'Services',
  value = '5 services',
  icon,
  middleText,
  div = true,
  onPress,
  rating = 3,
}) => {
  const Icon = SVGS[icon];
  return (
    <>
      <Row
        alignItems="center"
        justifyContent="center"
        style={{
          width: mvs(125),
          height: mvs(48),
          marginTop: mvs(10),
          // backgroundColor: 'red',
          // borderRightColor: colors.G9B9B9Bborder,
          // borderRightWidth: 0.4,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            width: mvs(90),
            height: '100%',
          }}>
          <Medium
            style={{
              textTransform: 'uppercase',
              fontSize: mvs(10),
              color: colors.G9B9B9B,
            }}
            label={title}
          />
          <View
            style={{
              height: mvs(40),
              marginVertical: mvs(14),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {middleText ? (
              <Medium
                style={{
                  textTransform: 'uppercase',
                  fontSize: mvs(23),
                  color: colors.G9B9B9B,
                }}
                label={middleText}
              />
            ) : icon === 'Reviews' ? (
              <Medium size={mvs(23)} color={colors.G9B9B9B}>
                {rating}
              </Medium>
            ) : (
              <Icon width={30} height={30} />
            )}
          </View>

          {value ? (
            <Medium
              style={{
                textTransform: 'uppercase',
                fontSize: mvs(10),
                color: colors.G9B9B9B,
              }}
              label={value}
            />
          ) : (
            <RatingStar
              style={{alignSelf: 'center'}}
              rate={rating}
              fill={'red'}
              ratingSelectedColor={'#FEA409'}
              ratingUnSelectedColor={colors.GDFDFDF}
            />
          )}
        </TouchableOpacity>
      </Row>
      <Divider
        insetType="right"
        width={0.3}
        color={colors.G9B9B9Bborder}
        orientation="vertical"
      />
      {/* <View
        style={{
          borderRightWidth: 0.39,
          borderRightColor: colors.G9B9B9Bborder,
          height: mvs(45),
          alignSelf: 'center',
        }}
      /> */}
    </>
  );
};
export default ServiceCard;
