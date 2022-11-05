import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Back} from '../../assets/headers-icons';
import PaymentItem from '../molecules/payment-item/payment-item';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
const PaymentSheet = ({
  onAddClick,
  setVisible,
  visible = false,
  paymentMethods = [],
  onChange,
}) => {
  return (
    <ReactNativeModal
      onBackdropPress={setVisible}
      onBackButtonPress={setVisible}
      isVisible={visible}
      style={{margin: 0}}>
      <View style={styles.container}>
        <Row style={{...styles.sheetRowView}}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Back />
          </TouchableOpacity>
          <Regular
            label={'Payment Method'}
            size={20}
            style={{flex: 1, marginHorizontal: mvs(20)}}
          />
          {/* <TouchableOpacity onPress={onAddClick}>
                        <Regular label={"Add New"} size={15} color={colors.primary}/>
                  </TouchableOpacity> */}
        </Row>
        <View style={{marginVertical: mvs(20)}}>
          {paymentMethods.map((element, index) => {
            return (
              <View key={index} style={{marginTop: mvs(12)}}>
                <PaymentItem
                  onClick={() => {
                    let copy = [...paymentMethods];
                    copy = copy?.map(x => ({...x, Selected: false}));
                    copy[index].Selected = true;
                    onChange(copy, copy[index]);
                    setVisible(false)
                  }}
                  value={element.Number}
                  leftIcon={element.Card}
                  rightIcon={
                    element.Selected ? 'SelectedCard' : 'UnSelectedCard'
                  }
                />
              </View>
            );
          })}
        </View>
        {/* <Buttons.ButtonPrimary title='Choose' style={{marginTop:mvs(37)}}/> */}
      </View>
    </ReactNativeModal>
  );
};
export default PaymentSheet;
const styles = StyleSheet.create({
  sheetRowView: {
    borderBottomWidth: 0,
    paddingVertical: mvs(8),
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
  container: {
    paddingHorizontal: mvs(18),
    width: '100%',
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
  },
});
