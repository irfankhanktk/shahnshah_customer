import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { AmericanExpressCard, CirrusCard, DirectDebitCard, DiscoverCard, MasterCard, VisaCard } from '../../assets/common-icons';
import { Back } from '../../assets/headers-icons';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import Buttons from '../atoms/Button';
import Row from '../atoms/row';
import PaymentInput from './payment-input';
const NewPaymentSheet =React.forwardRef((props,ref,) => {
    const [newMethod,setNewMethod]=React.useState({
      Card:"",
      Number:'',
      Icon:"Caret",
      Name:''
    });
    const {setPaymentMethods,paymentMethods}=props;
    console.log('paymentMethods::',paymentMethods);
    return (
       <RBSheet
        ref={ref}
        height={mvs(662)}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            paddingTop:mvs(25)
          }
        }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
          <View style={{paddingHorizontal:mvs(18)}}>
               <Row style={{...styles.sheetRowView}}>
                <TouchableOpacity onPress={()=>ref?.current?.close()}>
                  <Back/>
                </TouchableOpacity>
                  <Regular label={"Add New Method"} size={20} style={{flex:1,marginHorizontal:mvs(20)}}/>
              </Row>
              <View style={{marginTop:mvs(5),marginHorizontal:mvs(18)}}>
                  <PaymentInput onChange={(t)=>setNewMethod({...newMethod,Name:t})} placeholder='John Doe' label='Cardholder Name'/>
                  <PaymentInput onChange={(t)=>setNewMethod({...newMethod,Number:t})} placeholder='1234 5678 9123 8978' label='Card Number'/>
                  
                  <Row style={{ justifyContent:'space-between',marginTop:mvs(5)}}>
                    <PaymentInput  onChange={(t)=>setNewMethod({...newMethod,expiryDate:t})} placeholder='' label='Exp. Date' style={{width:'45%'}}/>
                    <PaymentInput onChange={(t)=>setNewMethod({...newMethod,cvc:t})} placeholder='123' label='CVV\CVC' style={{width:'45%'}}/>
                  </Row>
                  <Regular numberOfLines={3} style={{marginTop:mvs(16)}} size={15} label={"To verify your card, a small amount will be charged to it. After verification the amount will be automatically refunded"}/>
                  <Bold label={"We Accept"} size={15}  style={{marginTop:mvs(16)}}/>
                  <Row style={{ justifyContent:'flex-start',marginTop:mvs(5)}}>
                      <VisaCard/>
                      <MasterCard style={{marginLeft:4}}/>
                      <DiscoverCard style={{marginLeft:4}}/>
                      <AmericanExpressCard style={{marginLeft:4}}/>
                      <DirectDebitCard style={{marginLeft:4}}/>
                      <CirrusCard style={{marginLeft:4}}/>
                      
                  </Row>
                  <Buttons.ButtonPrimary onClick={()=>{
                    setPaymentMethods([...paymentMethods,{Card:"VisaCard",Number:'**** **** **** 8748',Icon:"Caret",Selected:false}])
                  }} title='Save Card' style={{marginTop:mvs(51)}}/>
              </View>
          </View>
          </ScrollView>
      </RBSheet>
    );
});
export default NewPaymentSheet;
const styles = StyleSheet.create({
      sheetRowView:{
        borderBottomWidth:0,
        paddingVertical:mvs(0),
        alignItems:'center',
        paddingLeft:0,paddingRight:0
      }
});
