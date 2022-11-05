import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import Row from "../atoms/row";
import ActionButton from "./action-button";
import Medium from "../../presentation/typography/medium-text";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const LifeCycleItem = ({
  item,
  buttonText,
  onClick,
}) => {
  return (
     <Row alignItems="center" style={styles.CONTAINER}>
        <Medium label={item?.label} color={colors.black} size={16}/>
        {item?.action?
        <ActionButton 
         title={buttonText}
         onClick={onClick}
         bgColor={colors.lightGreen1}
         borderColor={colors.green}
         titleColor={colors.green}/>:
         <Medium label={item?.at} color={colors.black} size={16}/>
         }
     </Row>
  );
};
export default LifeCycleItem;
const styles = StyleSheet.create({
  CONTAINER: {
    paddingVertical:mvs(8),
    borderBottomColor:colors.lightgrey1,
    borderBottomWidth:mvs(0.3)
  },
 });
