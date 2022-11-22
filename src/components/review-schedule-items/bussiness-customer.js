import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "../atoms/row";
// import * as SVG from "../../assets/common-icons";
import ImagePlaceholder from "../atoms/Placeholder";
import Medium from "../../presentation/typography/medium-text";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { Gulf, Service, WaterIcon } from "../../assets/images";
import Shimmer from "../shimmer";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const loading = true;
const BussinessCustomer = ({
  item,
  image = require("../../assets/images/car-owner.png"),
}) => {
  return (
    <View style={styles.CONTAINER}>
      <View style={{ borderBottomColor: colors.gray, borderBottomWidth: 1, }}>
        <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
          <Shimmer shimmerStyle={styles.SERVICE_IMAGE} visible={loading}>
            <ImagePlaceholder containerStyle={styles.SERVICE_IMAGE} uri={Service} />
          </Shimmer>
          <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
            <Shimmer shimmerStyle={{}} visible={loading}>
              <Medium label={item?.offering?.title} size={16} />
            </Shimmer>
            <Shimmer shimmerStyle={{ marginTop: mvs(10) }} visible={loading}>
              <Regular label={item?.offering?.subTitle} size={13} />
            </Shimmer>
          </View>
          <Image style={styles.WATER_IMAGE} source={WaterIcon} />
        </Row>
        <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
          <ImagePlaceholder containerStyle={styles.IMAGE} uri={Gulf} />
          <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
            <Medium label={item?.business?.title} size={16} />
            <Regular label={item?.business?.view?.address} size={13} numberOfLines={2} />
          </View>
        </Row>
        <Row style={{ ...styles.UPPERROW, paddingTop: mvs(13), paddingBottom: mvs(19) }}>
          <Row style={{ width: '50%' }} alignItems='center'>
            <ImagePlaceholder
              containerStyle={styles.IMAGE}
              uri={image}
              borderRadius={10} />

            <View style={styles.bussinessView}>
              <Medium label={item?.customer?.name} size={14} />
              <Regular label={item?.customer?.mobile} size={11} style={{ width: mvs(103) }}
              />
            </View>
          </Row>

          <Row style={{ paddingLeft: mvs(15), width: '50%', alignItems: "center" }}>
            {/* <SVG.VehicleTwo /> */}
            <View style={{ marginHorizontal: mvs(5), flex: 1 }}>
              <Medium label={item?.vehicle?.make + ' ' + item?.vehicle?.model} size={14} color={colors.black} />
              <Regular label={item?.vehicle?.registration} size={12} numberOfLines={1} />
            </View>
          </Row>
        </Row>
      </View>
    </View>
  );
};
export default BussinessCustomer;
const styles = StyleSheet.create({
  CONTAINER: {
    marginTop: mvs(12.5),
  },
  IMAGE: {
    height: mvs(45),
    width: mvs(45),
    borderRadius: mvs(1000),
  },
  BOTTOMIMG: {
    height: mvs(49),
    width: mvs(52),
    borderRadius: mvs(10),
  },
  UPPERROW: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  SERVICE_IMAGE: {
    height: mvs(46),
    width: mvs(43),
    borderRadius: 8,
  },
  BUTTON: {
    backgroundColor: colors.lightBlue,
    marginVertical: mvs(12.5),
    width: '93%',
    alignSelf: 'center'
  },
  WATER_IMAGE: {
    height: mvs(28),
    width: mvs(28),
    borderRadius: 1000,
    alignSelf: 'flex-start'
  },
  BUTTONTEXT: {
    color: colors.blue,
  },
  TIMETOPVIEW: {
    paddingVertical: mvs(14.5),
    paddingHorizontal: mvs(3),
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  bussinessView: {
    paddingHorizontal: mvs(7),
    borderRightColor: colors.gray,
    borderRightWidth: 1,
    flex: 1
  }
});
