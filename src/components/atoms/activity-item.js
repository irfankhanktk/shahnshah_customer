import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Row from './row';
import * as SVG from '../../assets/common-icons';
import Bold from '../../presentation/typography/bold-text';
import ImagePlaceholder from './Placeholder';
import Medium from '../../presentation/typography/medium-text';
import * as Progress from 'react-native-progress';
import Shimmer from '../shimmer';
const ActivityItem = ({
  onPress,
  image = require('../../assets/images/carwash.png'),
  subImage = require('../../assets/images/carwash.png'),
  price = '0.0',
  rating,
  progress,
  bussinessName = 'Total Al Safeer Car Wash…',
  address = 'Sharjah Al nahada road',
  bookingTime = '12 February 2021-9:30 AM-10:00 AM',
  details = 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
  subDetails = 'Lorem ipsum dolor sit amet...',
  isLiked = false,
  status = 'cancel',
  section = "schedule",
  onLikePress,
  onResumePress,
  loading
}) => {
  return (
    <View style={styles.CONTAINER}>
      <Row style={styles.UPPERROW}>
        <Shimmer visible={loading} shimmerStyle={styles.IMAGE}>
          <ImagePlaceholder containerStyle={styles.IMAGE} uri={image} />
        </Shimmer>
        <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
          <Shimmer visible={loading}>
            <Medium numberOfLines={1} label={details} />
          </Shimmer>
          <Shimmer visible={loading}>
            <Regular label={subDetails} style={{ fontSize: 12 }} />
          </Shimmer>
          <Shimmer visible={loading}>
            <Regular label={bookingTime} style={{ fontSize: 10, color: colors.primary }} />
          </Shimmer>
        </View>
        {/* <View style={{ alignItems: 'center' }}>
          {status == 'schedule' || status == "Completed" ?
            tab == "history" ?
              <Row style={styles.RATING}>
                <SVG.Star />
                <Bold label={rating||'0'} />
              </Row>
              :
              <Progress.Circle size={36} color={status == "Completed" ? colors.green : colors.primary} borderColor={colors.gray}
                progress={progress} showsText textStyle={styles.PROGRESSTEXT} />

            : null}
          <Bold label={"$" + price} style={{ marginTop: mvs(14) }} />
        </View> */}
      </Row>
      <Row style={{ ...styles.UPPERROW, ...styles.BOTTOMROW }}>
        <Shimmer shimmerStyle={styles.SUBIMAGE} visible={loading}>
          <ImagePlaceholder containerStyle={styles.SUBIMAGE} uri={subImage} />
        </Shimmer>
        <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
          <Shimmer visible={loading}>
            <Medium label={bussinessName} />
          </Shimmer>
          <Shimmer visible={loading}>
            <Regular label={address} style={{ fontSize: 13 }} />
          </Shimmer>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          {section == "draft" ?
            <TouchableOpacity style={{ ...styles.BUTTON, backgroundColor: colors.gray }} onPress={onResumePress}>
              <Regular label={'Resume'} style={{ ...styles.BUTTONTEXT, color: colors.lightgrey1 }} />
            </TouchableOpacity> :
            status == "No Show" ?
              <View style={{ ...styles.BUTTON, backgroundColor: colors.gray }} onPress={onPress}>
                <Regular label={'No Show'} style={{ ...styles.BUTTONTEXT, color: colors.lightgrey1 }} />
              </View> :
              // status == "Booked" ?
              //   <TouchableOpacity style={{ ...styles.BUTTON, backgroundColor: colors.gray }} onPress={onResumePress}>
              //     <Regular label={'Make Payment'} style={{ ...styles.BUTTONTEXT, color: colors.lightgrey1 }} />
              //   </TouchableOpacity> :
              (section === 'Completed' || status === 'Completed' && !rating) ?
                <TouchableOpacity style={{ ...styles.BUTTON, marginLeft: mvs(4) }} onPress={onLikePress}>
                  {isLiked == false ? <SVG.Like style={{ marginRight: mvs(5) }} /> : <SVG.Liked style={{ marginRight: mvs(5) }} />}
                  <Regular label={'Like'} style={{ ...styles.BUTTONTEXT }} />
                </TouchableOpacity>
                : rating ?
                  <Row style={styles.RATING}>
                    <SVG.Star />
                    <Bold label={rating || '0'} />
                  </Row> : progress ?
                    <Progress.Circle size={36}
                      color={status == "Completed" ? colors.green : colors.primary}
                      borderColor={colors.gray}
                      progress={Math.fround(progress / 100)}
                      showsText
                      animated={false}
                      textStyle={styles.PROGRESSTEXT} />
                    : null
            //  status == "Completed" ?
            //   <TouchableOpacity style={{ ...styles.BUTTON }} onPress={onPress}>
            //     {isLiked == false ? <SVG.Like style={{ marginRight: mvs(5) }} /> : <SVG.Liked style={{ marginRight: mvs(5) }} />}
            //     <Regular label={isLiked == false ? 'Like' : 'Liked'} style={{ ...styles.BUTTONTEXT }} />
            //   </TouchableOpacity>
            // : status == "cancel" ?
            //   <TouchableOpacity style={{ ...styles.BUTTON, backgroundColor: colors.gray }} onPress={onPress}>
            //     <Regular label={'Cancelled'} style={{ ...styles.BUTTONTEXT, color: colors.lightgrey1 }} />
            //   </TouchableOpacity>
            // : null
          }



          {/* <Bold label={"$" + price} style={{ marginTop: mvs(14) }} /> */}

        </View>
      </Row>
    </View>

  );
};
export default ActivityItem;
const styles = StyleSheet.create({
  CONTAINER: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.shadow,
    padding: mvs(8),
    borderWidth: 0.7,
    borderColor: colors.gray,
    marginTop: mvs(9.1)

  },
  IMAGE: {
    height: mvs(71),
    width: mvs(67),
    borderRadius: 10
  },
  UPPERROW: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  BOTTOMROW: {
    borderTopWidth: 0.4,
    borderColor: colors.gray,
    marginTop: mvs(10),
    paddingVertical: mvs(15),
    paddingHorizontal: mvs(1)
  },
  PROGRESSTEXT: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 10,

  },
  SUBIMAGE: {
    height: mvs(41),
    width: mvs(41),
    borderRadius: 1000
  },
  BUTTON: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightYellow,
    // width: mvs(90),
    height: mvs(29),
    borderRadius: 6,
    paddingHorizontal: mvs(5)

  },
  BUTTONTEXT: {
    color: colors.primary,
    fontSize: mvs(11)
  },
  RATING: {
    borderWidth: 0.4,
    borderRadius: 10,
    shadowColor: colors.shadow,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    width: mvs(62),
    height: mvs(29),
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});