import React from 'react';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import { View ,StyleSheet} from 'react-native';
const BookingDetailsHeader = ({customer}) => {
    return (
        <View style={styles.conntainer}>
            <Row style={{...styles.UPPERROW,...styles.TIMETOPVIEW}}>
                <ImagePlaceholder containerStyle={styles.IMAGE} uri={require('../../assets/images/car-owner.png')} />
                <View style={{marginHorizontal:mvs(10),flex:1}}>
                    <Medium label={customer?.name} size={16}/>
                    <Regular label={"+96 123 4567890"} size={13}/>
                    <Regular label={customer?.vehicle} size={12} numberOfLines={1}/>
                </View>
              </Row>
        </View>
    );
};
export default BookingDetailsHeader;

const styles = StyleSheet.create({
    conntainer: {
       
      },
      TIMETOPVIEW:{
        paddingVertical:mvs(14.5),
        borderBottomColor:colors.gray,
        borderBottomWidth:1
     },
     PROGRESSTEXT:{
        color:colors.black,
        fontWeight:'bold',
        fontSize:10,
      
    },
    UPPERROW:{
        justifyContent:'space-between',
        alignItems:'center'
    },
    IMAGE:{
       height:mvs(60),
       width:mvs(60),
       borderRadius:mvs(1000)
    },
    BOTTOMIMG:{
        height:mvs(49),
        width:mvs(52),
        borderRadius:mvs(10)
     },
});
