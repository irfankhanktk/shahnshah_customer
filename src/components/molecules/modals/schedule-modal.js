// import moment from 'moment';
// import React from 'react';
// import {
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   View,
//   Text,
// } from 'react-native';
// import ReactNativeModal from 'react-native-modal';
// import {
//   LeftBlackArrow,
//   RightBlackArrow,
//   SelectedCard,
//   UnSelectedCard,
// } from '../../../assets/common-icons';
// import {mvs, width} from '../../../services/metrices';
// import Buttons from '../../atoms/Button';
// import Bold from './../../../presentation/typography/bold-text';
// import colors from './../../../services/colors';
// import Row from './../../atoms/row';
// const ScheduleModal = ({
//   date,
//   setDate = arg => {},
//   value,
//   setValue,
//   visible,
//   items,
//   setVisible = bool => {},
//   setItems = items => {},
//   onContinue
// }) => {
//   return (
//     <ReactNativeModal
//       propagateSwipe
//       isVisible={visible}
//       // onBackdropPress={setVisible}
//       onSwipeComplete={setVisible}
//       swipeDirection="down"
//       style={{margin: 0}}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           flexGrow: 1,
//           backgroundColor: '#FFF',
//         }}>
//         <Row style={{width: '100%'}} alignItems={'center'}>
//           <TouchableOpacity
//             style={{padding: 20}}
//             onPress={() => setDate(moment(date).subtract(1, 'd'))}>
//             <LeftBlackArrow />
//           </TouchableOpacity>
//           <Bold size={mvs(16)} label={date?.format('DD MMMM YYYY')} />
//           <TouchableOpacity
//             style={{padding: 20}}
//             onPress={() => setDate(moment(date).add(1, 'd'))}>
//             <RightBlackArrow />
//           </TouchableOpacity>
//         </Row>
//         <View style={{...styles.priceView}}>
//           <Bold label={'Morning'} size={20} />
//           <Bold label={items?.Morning?.timing} size={14} />
//         </View>
//         <View style={styles.timingView}>
//           {items?.Morning?.slots?.length > 0 ? (
//             items?.Morning?.slots?.map((morning, index) => (
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{flexGrow: 1}}>
//                 <TouchableOpacity
//                   key={index}
//                   style={{width: '100%'}}
//                   onPress={() => {
//                     setValue(morning);
//                     // setVisible(false);
//                   }}>
//                   <Row style={{...styles.PAYMENTDROPDOWN}}>
//                     <Bold
//                       size={15}
//                       style={{flex: 1, marginHorizontal: mvs(8)}}
//                       label={morning?.from[0]+":"+morning?.from[1]+"-"+morning?.to[0]+":"+morning?.to[1]}
//                     />
//                     <View>
//                       {morning === value ? (
//                         <SelectedCard />
//                       ) : (
//                         <UnSelectedCard />
//                       )}
//                     </View>
//                   </Row>
//                 </TouchableOpacity>
//               </ScrollView>
//             ))
//           ) : (
//             <View
//               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={{fontSize: 20}}>No time slots available</Text>
//             </View>
//           )}
//         </View>

//         <View style={{...styles.priceView}}>
//           <Bold label={'Afternoon'} size={20} />
//           <Bold label={items?.Afternoon?.timing} size={14} />
//         </View>
//         <View style={styles.timingView}>
//           {items?.Afternoon?.slots?.length > 0 ? (
//             items?.Afternoon?.slots?.map((afternoon, index) => (
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{flexGrow: 1}}>
//                 <TouchableOpacity
//                   style={{width: '100%'}}
//                   onPress={() => {
//                     setValue(afternoon);
//                     // setVisible(false);
//                   }}>
//                   <Row style={{...styles.PAYMENTDROPDOWN}}>
//                     <Bold
//                       size={15}
//                       style={{flex: 1, marginHorizontal: mvs(8)}}
//                       label={afternoon?.from[0]+":"+afternoon?.from[1]+"-"+afternoon?.to[0]+":"+afternoon?.to[1]}
//                     />
//                     <View>
//                       {afternoon === value ? (
//                         <SelectedCard />
//                       ) : (
//                         <UnSelectedCard />
//                       )}
//                     </View>
//                   </Row>
//                 </TouchableOpacity>
//               </ScrollView>
//             ))
//           ) : (
//             <View
//               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={{fontSize: 20}}>No time slots available</Text>
//             </View>
//           )}
//         </View>

//         <View style={{...styles.priceView, marginBottom: 5}}>
//           <Bold label={'Evening'} size={20} />
//           <Bold label={items?.Evening?.timing} size={15} />
//         </View>
//         <View style={styles.timingView}>
//           {items?.Evening?.slots?.length > 0 ? (
//             items?.Evening?.slots?.map((evening, index) => (
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{flexGrow: 1}}>
//                 <TouchableOpacity
//                   style={{width: '100%'}}
//                   onPress={() => {
//                     setValue(evening);
//                     // setVisible(false);
//                   }}>
//                   <Row style={{...styles.PAYMENTDROPDOWN}}>
//                     <Bold
//                       size={15}
//                       style={{flex: 1, marginHorizontal: mvs(8)}}
//                       label={evening?.from[0]+":"+evening?.from[1]+"-"+evening?.to[0]+":"+evening?.to[1]}
//                     />
//                     <View>
//                       {evening === value ? (
//                         <SelectedCard />
//                       ) : (
//                         <UnSelectedCard />
//                       )}
//                     </View>
//                   </Row>
//                 </TouchableOpacity>
//               </ScrollView>
//             ))
//           ) : (
//             <View
//               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <Text style={{fontSize: 20}}>No time slots available</Text>
//             </View>
//           )}
//         </View>
//         <View style={{width: '95%', alignSelf: 'center'}}>
//           <Buttons.ButtonPrimary
//             onClick={onContinue}
//             style={{
//               marginVertical: mvs(30),
//             }}
//             title={'Continue'}
//           />
//         </View>
//       </ScrollView>
//     </ReactNativeModal>
//   );
// };
// export default ScheduleModal;
// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     borderWidth: 1,
//     width: width,
//     backgroundColor: colors.white,
//     borderTopLeftRadius: mvs(15),
//     borderTopRightRadius: mvs(15),
//     padding: 10,
//     //alignItems: 'center',
//     alignSelf: 'center',
//   },
//   priceView: {
//     //borderWidth: 1,
//     width: '95%',
//     //paddingVertical: 10,
//     alignSelf: 'center',
//     marginVertical: 10,
//     marginLeft: mvs(20),
//   },
//   PAYMENTDROPDOWN: {
//     justifyContent: 'space-between',
//     height: mvs(50),
//     alignItems: 'center',
//     borderRadius: 10,
//     top: mvs(8),
//     borderBottomWidth: 0.7,
//     borderColor: colors.gray,
//     paddingHorizontal: mvs(11),
//   },
//   timingView: {
//     // height: '45%',
//   },
// });

import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import {
  LeftBlackArrow,
  RightBlackArrow,
  SelectedCard,
  UnSelectedCard,
} from "../../../assets/common-icons";
import { mvs, width } from "../../../services/metrices";
import Buttons from "../../atoms/Button";
import Bold from "./../../../presentation/typography/bold-text";
import colors from "./../../../services/colors";
import Row from "./../../atoms/row";

const ScheduleModal = ({
  date,
  setDate = (arg) => {},
  value,
  setValue,
  visible,
  disabled,
  updateSlot,
  loadingState,

  setVisible = (bool) => {},
  items = [],
  setItems = (items) => {},
}) => {
  //console.log(date);
  return (
    <ReactNativeModal
      propagateSwipe
      isVisible={visible}
      onBackdropPress={() => {}}
      onSwipeComplete={() => {}}
      swipeDirection="up"
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <>
          <Row style={{ width: "100%" }} alignItems={"center"}>
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => setDate(moment(date).subtract(1, "d"))}
            >
              <LeftBlackArrow />
            </TouchableOpacity>
            <Bold
              size={mvs(16)}
              label={date?.format("DD MMMM YYYY")}
              color={colors.black}
            />
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => setDate(moment(date).add(1, "d"))}
            >
              <RightBlackArrow />
            </TouchableOpacity>
          </Row>
          <Row
            style={{ width: "100%" }}
            alignItems={"flex-start"}
            // alignSelf={"flex-start"}
          >
            <View style={styles.Rows}>
              <Text style={styles.text}>Morning</Text>
              <Text style={styles.text}>
                {"  "}(
                {`${items?.Morning?.timing?.split("-")[0]} AM - ${
                  items?.Morning?.timing?.split("-")[1]
                } PM`}
                )
              </Text>
            </View>
          </Row>
          {items?.Morning?.slots?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ width: "100%" }}
              onPress={() => {
                setValue(item);

                //morningValue(item);
                setVisible(false);
              }}
            >
              <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                <Bold
                  size={15}
                  style={{ flex: 1, marginHorizontal: mvs(8) }}
                  label={`${item?.from[0]} : ${item?.from[1]} AM - ${item?.to[0]} : ${item?.to[1]} AM`}
                />
                <View>
                  {item === value ? <SelectedCard /> : <UnSelectedCard />}
                </View>
              </Row>
            </TouchableOpacity>
          ))}
          <View style={styles.Rows}>
            <Text style={styles.text}>Afternoon</Text>
            <Text style={styles.text}>
              {"  "}(
              {`${items?.Afternoon?.timing?.split("-")[0]} AM - ${
                items?.Afternoon?.timing?.split("-")[1]
              } PM`}
              )
            </Text>
          </View>
          {items?.Afternoon?.slots?.map((item, index) => (
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                setValue(item);
                //afternoonValue(item);
                setVisible(false);
              }}
            >
              <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                <Bold
                  size={15}
                  style={{ flex: 1, marginHorizontal: mvs(8) }}
                  label={`${item?.from[0]} : ${item?.from[1]} AM - ${item?.to[0]} : ${item?.to[1]} PM`}
                />
                <View>
                  {item === value ? <SelectedCard /> : <UnSelectedCard />}
                </View>
              </Row>
            </TouchableOpacity>
          ))}
          <View style={styles.Rows}>
            <Text style={styles.text}>Evening</Text>
            <Text style={styles.text}>
              {"  "}(
              {`${items?.Evening?.timing?.split("-")[0]} AM - ${
                items?.Evening?.timing?.split("-")[1]
              } PM`}
              )
            </Text>
          </View>
          {items?.Evening?.slots?.map((item, index) => (
            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                setValue(item);
                // eveningValue(item);
                setVisible(false);
              }}
            >
              <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                <Bold
                  size={15}
                  style={{ flex: 1, marginHorizontal: mvs(8) }}
                  label={`${item?.from[0]} : ${item?.from[1]} AM - ${item?.to[0]} : ${item?.to[1]} PM`}
                />
                <View>
                  {item === value ? <SelectedCard /> : <UnSelectedCard />}
                </View>
              </Row>
            </TouchableOpacity>
          ))}
          {/* <Buttons.ButtonPrimary onClick={()=>setVisible(false)} style={{marginVertical: mvs(30),}} title={'Continue'}/> */}
        </>
        <View style={{ marginVertical: 20, width: "100%" }}>
          <Buttons.ButtonPrimary
            textStyle={styles.buttonBlackText}
            title="Update Slot"
            disabled={disabled}
            loading={loadingState}
            style={styles.button}
            onClick={updateSlot}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
export default ScheduleModal;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  PAYMENTDROPDOWN: {
    justifyContent: "space-between",
    height: mvs(50),
    alignItems: "center",
    borderRadius: 10,
    top: mvs(8),
    borderBottomWidth: 0.7,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
  },
  Rows: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginVertical: mvs(10),
    alignSelf: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: mvs(18),
    fontWeight: "bold",
  },
  button: {},
});
