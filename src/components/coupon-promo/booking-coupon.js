import React from 'react';
import Row from '../../components/atoms/row';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import { OffCarWash, WhitePercentage } from '../../assets/common-icons';
import { View,StyleSheet} from 'react-native';
import ImagePlaceholder from '../atoms/Placeholder';
const BookingCoupon = ({coupon}) => {
    return (
        <View style={styles.conntainer}>
         <Row style={{ paddingVertical:mvs(10)}} alignItems='center'>
                    <ImagePlaceholder uri={{uri:coupon?.cover}} containerStyle={styles.image}/>
                    <View style={{marginHorizontal:mvs(9)}}>
                        <SemiBold label={coupon?.title} size={16} color={colors.black}/>
                        <Regular label={coupon?.price+" AED"} size={14}/>
                        <Row style={styles.voucherView}>
                            <WhitePercentage/>
                            <Regular label={coupon?.hihlight} size={10} color={colors.white} style={{flex:1,marginLeft:5}}/>
                        </Row>
                </View>
            </Row>
        </View>
    );
};
export default BookingCoupon;

const styles = StyleSheet.create({
   voucherView:{
        backgroundColor:colors.primary,
        borderRadius:8,
        justifyContent:'space-evenly',
        height:mvs(25),
        width:mvs(156),
        alignItems:'center',
        padding:mvs(1),
        top:mvs(5),
        paddingHorizontal:mvs(5)
    },
    image:{
        height:mvs(100),
        width:mvs(100),
        borderRadius:10
    }
});
