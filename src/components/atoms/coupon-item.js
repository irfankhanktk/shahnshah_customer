import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Edit } from '../../assets/common-icons';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import fonts from '../../services/fonts';
import { mvs } from '../../services/metrices';
import Row from './row';
import * as SVG from '../../assets/common-icons';
import Bold from '../../presentation/typography/bold-text';
import ImagePlaceholder from './Placeholder';
import Medium from '../../presentation/typography/medium-text';
import * as Progress from 'react-native-progress';
import Shimmer from '../shimmer';
const CouponItem = ({
    onPress,
    image = require('../../assets/images/carwash.png'),
    subImage = require('../../assets/images/carwash.png'),
    price = '0.0',
    progress = 0.5,
    bussinessName = 'Total Al Safeer Car Wash…',
    address = 'Sharjah Al nahada road',
    expireTime = '12 February 2021',
    discount = '50',
    AED = '30.00',
    status = 'active',
    onViewPress,
    onPaymentPress,
    item = {},
    loading,
}) => {
    return (

        <View style={styles.CONTAINER}>
            <Row style={styles.UPPERROW}>
                <Shimmer shimmerStyle={{ ...styles.IMAGE, marginTop: 0 }} visible={loading}>
                    <ImagePlaceholder containerStyle={styles.IMAGE} uri={image} />
                </Shimmer>
                <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
                    <Shimmer shimmerStyle={{ height: mvs(20), }} visible={loading}>
                        <Medium numberOfLines={2} label={discount + "% OFF Car Wash"} />
                    </Shimmer>
                    <Shimmer shimmerStyle={{ height: mvs(15), }} visible={loading}>
                        <Regular label={item?.subTitle} style={{ fontSize: 12 }} />
                    </Shimmer>
                    <Row alignItems='center' style={styles.highlighted}>
                        <SVG.Percent />
                        <Shimmer visible={loading}>
                            <Regular color={colors.black}
                                size={mvs(13)} label={item?.highlight}
                                style={{ marginLeft: mvs(6), }}
                            />
                        </Shimmer>
                    </Row>
                    {/* <Row style={{ justifyContent: 'flex-start' }}>
                        {status == 'active' ? <SVG.PrimaryPercentage /> : <SVG.GrayPercentage />}
                        <Regular label={item?.highlight} style={{ fontSize: 12, marginHorizontal: mvs(3), color: status == "active" ? colors.primary : colors.lightgrey1 }} />
                    </Row> */}
                    {/* <Regular label={"Expires On " + expireTime} style={{ fontSize: 13, color: colors.lightgrey1 }} /> */}
                </View>
                {/* <View style={{ alignItems: 'center' }}>
                    {status == 'active' ?
                        <Progress.Circle size={36} color={colors.primary} borderColor={colors.gray}
                            progress={progress} showsText textStyle={styles.PROGRESSTEXT} />
                        : null}
                    <Bold label={"$" + price} style={{ marginTop: mvs(14) }} />
                </View> */}
            </Row>
            <Row style={{ ...styles.UPPERROW, ...styles.BOTTOMROW }}>
                <Shimmer visible={loading} shimmerStyle={styles.SUBIMAGE}>
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
                    <Shimmer shimmerStyle={{ ...styles.BUTTON, width: mvs(80) }} visible={loading}>
                        {
                            status === 'Draft' ?
                                <TouchableOpacity style={{ ...styles.BUTTON }} onPress={onPaymentPress}>
                                    <Regular label={'Resume'} style={{ ...styles.BUTTONTEXT }} />
                                </TouchableOpacity>
                                : status === 'Booked' ?
                                    <TouchableOpacity style={{ ...styles.BUTTON }} onPress={onPaymentPress}>
                                        <Regular label={'Make Payment'} style={{ ...styles.BUTTONTEXT }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={{ ...styles.BUTTON }} onPress={onViewPress}>
                                        <Regular label={'View'} style={{ ...styles.BUTTONTEXT }} />
                                    </TouchableOpacity>
                        }
                    </Shimmer>
                </View>
            </Row>
        </View>

    );
};
export default CouponItem;
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
    highlighted: {
        paddingHorizontal: mvs(9),
        paddingVertical: mvs(4),
        backgroundColor: colors.lightYellow,
        borderRadius: 4,
        marginTop: mvs(7),
        alignSelf: 'flex-start',
        // width: mvs(130),
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
        // width: mvs(80),
        height: mvs(29),
        borderRadius: 6,
        paddingHorizontal: mvs(7)

    },
    BUTTONTEXT: {
        color: colors.primary,
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