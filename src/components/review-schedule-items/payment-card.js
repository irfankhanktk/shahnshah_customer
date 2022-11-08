import React from "react";
import { StyleSheet,TouchableOpacity,View } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import Regular from "../../presentation/typography/regular-text";
import * as SVG from '../../assets/common-icons/payment-method/index'
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const PaymentCard = ({
  title='Accept',
  borderColor=colors.lightgrey1,
  icon='',
  selected=false,
  onClick,
  selectable=true
}) => {
    const Icon=SVG[icon]
  return (
     <TouchableOpacity activeOpacity={selectable?0:1}
           style={{...styles.CONTAINER,borderColor:borderColor}} onPress={onClick}>
          <Regular label={title} color={colors.lightgrey1} size={14} style={{marginBottom:mvs(5)}}/>
          {Icon &&(
             <Icon/>
          )}
         {selected &&
         ( 
          <View style={{position:'absolute',right:-10,top:-15}}>
            <SVG.SelectedIcon/>
          </View>
         )}
    </TouchableOpacity>
  );
};
export default PaymentCard;
const styles = StyleSheet.create({
  CONTAINER: {
    paddingHorizontal:mvs(10),
    paddingVertical:mvs(10),
    height: mvs(78),
    width:mvs(130),
    marginRight:mvs(16),
    borderRadius:5,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
 });
