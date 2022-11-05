import React from 'react';
import Row from '../../components/atoms/row';
import Medium from '../../presentation/typography/medium-text';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import { View ,StyleSheet} from 'react-native';
const BookingPaymentView = ({subTotal="45.00",Vat="2.00",total='47.00'}) => {
    return (
        <View style={styles.conntainer}>
            <Row style={{...styles.priceView,marginTop:mvs(16.3)}}>
                    <Medium label={"Sub Total"} size={14}/>  
                    <Medium label={subTotal+" AED"} size={14}/>
            </Row>
            <Row style={{...styles.priceView}}>
                    <Medium label={"VAT (10%)"} size={14} color={colors.lightgrey1}/>  
                    <Medium label={Vat+" AED"} size={14} color={colors.lightgrey1}/>
            </Row>
            <Row style={styles.bottomBorder}>
                    <Bold label={"Grand Total"} size={14}/>  
                    <Bold label={total+" AED"} size={14}/>
            </Row>
        </View>
    );
};
export default BookingPaymentView;

const styles = StyleSheet.create({
    conntainer: {
       
    },
    priceView:{
        justifyContent:'space-between',
        marginTop:mvs(14)
    },
    bottomBorder:{
        paddingVertical:mvs(14.5),
        borderBottomColor:colors.gray,
        borderBottomWidth:1
    },
});
