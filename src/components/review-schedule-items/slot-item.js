import React from "react";
import { StyleSheet,View } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import Row from "../atoms/row";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import ActionButton from "./action-button";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const SlotItem = ({
  slotText='12 February 2021 9:30 AM-10:00 AM',
  details='The first available slot',
  noMore=false,
  noSlot=false,
  showAccept=false,
  showRemove=false,
  showFind=false,
  showChange=false,
  onAcceptClick,
  onChangeClick,
  onFindClick,
  onRemoveClick
}) => {
  return (
     <Row alignItems="center" style={styles.CONTAINER}>
       <View style={{flex:1}}>
           <Medium label={'Date & Time'} size={15} color={colors.black}/>
           <Regular label={slotText} color={!noSlot?colors.lightgrey1:colors.primary} size={13}/>
           <Regular label={details} color={!noMore?colors.lightgrey1:colors.red} size={13}/>
       </View>
       <View>
           {showAccept && 
           (
             <ActionButton title="Accept" onClick={onAcceptClick}/>
           )}
           {showChange && 
           (
             <ActionButton title="Change" 
              onClick={onChangeClick} 
              bgColor={colors.lightGreen1}
              borderColor={colors.green}
              titleColor={colors.green}/>
           )}
           {showFind && 
           (
             <ActionButton title="Find" 
              onClick={onFindClick}
              style={{width:mvs(62),alignItems:'center',justifyContent:'center'}}/>
           )}
           {showRemove && 
           (
             <ActionButton title="Remove" 
              onClick={onRemoveClick}
              bgColor={colors.lightPink1}
              borderColor={colors.red}
              titleColor={colors.red}/>
           )}
       </View>
    </Row>
  );
};
export default SlotItem;
const styles = StyleSheet.create({
  CONTAINER: {
    marginVertical: mvs(11),
  },
 });
