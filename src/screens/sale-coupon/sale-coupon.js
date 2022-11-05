import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Buttons from '../../components/atoms/Button';
import Row from '../../components/atoms/row';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {Styles as styles} from './style';
import BookingPaymentView from '../../components/booking-payment-view';
import BookingCoupon from '../../components/coupon-promo/booking-coupon';
import BookingDetailsHeader from '../../components/booking-details-header';
import {getData} from '../../localStorage';
import Toast from 'react-native-toast-message';
const SaleCoupon = props => {
  const {
    get_coupon_sale_details,
    route,
    update_coupon_payment,
    complete_coupon_purchase,
  } = props;
  const navigation = useNavigation();
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: 'top',
      autoHide: true,
      visibilityTime: 3000,
    });
  };
  const [payMethod, setPayMethod] = useState('Cash');
  const [saleData, setSaleData] = useState();
  const [payload, setpayload] = useState({
    updateStart: false,
  });
  useEffect(() => {
    getSaledetails();
  }, []);
  const getSaledetails = async () => {
    const customerId = await getData('customer_id');
    var saleId = route.params?.saleId;
    const response = await get_coupon_sale_details(1, 8);
    console.log('Sale Data ===> ', response?.data);
    setSaleData(response?.data);
  };
  const purchaseCoupon = async () => {
    setpayload({...payload, updateStart: true});
    var id = await getData('customer_id');
    id = 1;
    showToast('success', 'Booking confirmed');
    console.log('customer id', id);
    console.log('coupon id', saleData?.couponId);
    const paymentResponse = await update_coupon_payment(id, saleData?.couponId);
    console.log('payment Response', paymentResponse?.data);
    const completeResponse = await complete_coupon_purchase(
      id,
      saleData?.couponId,
    );
    console.log('payment Response', completeResponse?.data);
    setpayload({...payload, updateStart: false});
  };
  return (
    <View style={{...styles.container, backgroundColor: colors.white}}>
      <CustomHeader
        colors={colors}
        title={saleData?.customer?.name}
        titleStyle={{color: colors.black}}
        allowBackBtn
        spacebetween
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(16)}}>
        <View style={styles.body}>
          <BookingDetailsHeader customer={saleData?.customer} />
          <Row style={{...styles.bottomBorder}}>
            <BookingCoupon coupon={saleData?.coupon} />
          </Row>

          <Row
            style={{
              ...styles.TIMETOPVIEW,
              paddingHorizontal: 0,
              borderBottomWidth: 0,
              paddingBottom: 5,
            }}>
            <View>
              <Bold label={'Payment Method'} size={15} />
              <Regular
                label={
                  payMethod == 'Cash' ? 'Cash on Delivery' : 'Online payment'
                }
                size={16}
                numberOfLines={1}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: mvs(40),
              }}>
              <Bold
                label={saleData?.invoice?.total + ' AED'}
                size={16}
                color={colors.primary}
                style={{alignSelf: 'flex-end'}}
              />
            </View>
          </Row>

          <View style={styles.paymentView}>
            <BookingPaymentView
              Vat={saleData?.invoice?.vat}
              subTotal={saleData?.invoice?.subTotal}
              total={saleData?.invoice?.total}
            />
            <Buttons.ButtonPrimary
              title="Confirm"
              style={styles.button}
              onClick={() => purchaseCoupon()}
              loading={payload.updateStart}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  get_coupon_sale_details: (cId, sId) =>
    DIVIY_API.get_coupon_sale_details(cId, sId),
  update_coupon_payment: (id, cid) => DIVIY_API.update_coupon_payment(id, cid),
  complete_coupon_purchase: (id, cid) =>
    DIVIY_API.complete_coupon_purchase(id, cid),
};
export default connect(mapStateToProps, mapDispatchToProps)(SaleCoupon);
