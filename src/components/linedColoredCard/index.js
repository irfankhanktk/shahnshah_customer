import React from 'react';
import {View, StyleSheet} from 'react-native';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const LinedColoredCard = ({color, title, subTitle}) => {
  console.log('color:', color, 'title:::', title, ' subTitle::', subTitle);
  const applyBackgroundColor = color => {
    console.log('color:', color);
    if (color === 'orange') return '#FDF3E1';
    else if (color === 'green') return '#E1FFEA';
    else if (color === 'blue') return '#E4F4FF';
    else return '#FFE3E6';
  };
  return (
    <View
      style={{
        // marginVertical: mvs(18),
        paddingVertical: mvs(18),
        backgroundColor: colors.white,
      }}>
      <View style={styles.warningMainCard}>
        <View
          style={[
            styles.redLinedInnerView,
            {
              backgroundColor: applyBackgroundColor(color),
              borderLeftColor: color,
            },
          ]}>
          <Medium
            style={{
              lineHeight: mvs(15),
              marginRight: mvs(10),
              //transform: [{translateY: mvs(2)}],
            }}
            color={color}
            size={mvs(13)}
            // label={
            //   totalDistance.length > 3
            //     ? `${totalDistance.slice(0, 3)} KM`
            //     : totalDistance + 'KM'
            // }
            label={title}
          />
          <Regular
            style={{
              // width: '90%',
              lineHeight: mvs(15),
              marginVertical: mvs(5),
            }}
            color={color}
            size={mvs(11)}
            label={subTitle}
          />
        </View>
      </View>
    </View>
  );
};

export default LinedColoredCard;

const styles = StyleSheet.create({
  warningMainCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
    height: mvs(100),
    alignSelf: 'center',
    padding: mvs(6),
    elevation: 5,
    // overflow: 'hidden',
    borderRadius: mvs(6),
    backgroundColor: colors.white,
  },
  redLinedInnerView: {
    borderLeftWidth: mvs(6),
    borderLeftColor: '#DA0016',
    height: '100%',
    backgroundColor: '#FFE3E6',
    borderRadius: mvs(6),
    padding: mvs(7),
  },
});
