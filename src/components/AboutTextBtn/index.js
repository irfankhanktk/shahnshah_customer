import React from 'react';
import { Pressable, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Shimmer from '../shimmer';

const AboutTextBtn = ({
  loading,
  value,
  showMore,
  trimLimit,
  maxTextLimit,
  setIsMoreBtn,
  paddingVerticall,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: mvs(18),
        backgroundColor: colors.white,
        paddingVertical: mvs(15),
      }}>
      <Shimmer visible={loading} shimmerStyle={{ height: mvs(30), width: '100%' }}>
        <>
          <Regular
            label={(value?.length > maxTextLimit && showMore) ? `${value?.slice(0, trimLimit)} ...` : `${value}`}
            size={mvs(16)}
            color={colors.B1E1E1E}
          />
          {showMore && value?.length > maxTextLimit && (
            <Pressable onPress={() => setIsMoreBtn(false)}>
              <Regular color={colors.primary} label={'Read More'} />
            </Pressable>
          )}
        </>
      </Shimmer>


    </View>
  );
};

export default AboutTextBtn;
