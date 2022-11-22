import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import Buttons from '../../components/atoms/Button';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import AlertMessage from '../../components/review-schedule-items/alert-message';
import BillView from '../../components/review-schedule-items/bill-view';
import PaymentCard from '../../components/review-schedule-items/payment-card';
import SaleCouponBusinessCustomer from '../../components/review-schedule-items/sale-coupon-business-customer';
import { getData } from '../../localStorage';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import { Styles as styles } from './style';
const SaleCoupon = props => {
  // const booking = {
  //   id: 244,
  //   offeringId: 3334,
  //   offering: {
  //     cover: '####/3334_suv-fw-cover.jpg',
  //     title: 'SUV Full Wash',
  //     subTitle: 'SUV Full Wash Sub Title',
  //     conditions: {
  //       cashOnDelivery: 1,
  //       vehicleRestriction: 1,
  //       advanceCancellation: 6,
  //       cancellationAllowed: true,
  //     },
  //   },
  //   serviceId: 3333,
  //   service: {
  //     icon: 'carwash.png',
  //     title: 'Car Wash',
  //   },
  //   businessId: 3333,
  //   business: {
  //     id: 3333,
  //     lat: 'lat',
  //     lng: 'lng',
  //     area: 'Al Taawun',
  //     city: 'Sharjah',
  //     logo: '####/3333_logo.jpg',
  //     title: 'AL Safeer Car Wash',
  //     rating: [1, 2, 3, 4, 2, 12, 40, 3.5],
  //     street: 'Al Taawun St.',
  //     view: {
  //       address: 'Sharjah, Al Taawun, Al Taawun St.',
  //     },
  //   },
  //   customerId: 3333,
  //   customer: {
  //     name: 'Zaka Shah',
  //     email: 'zakashah@hotmail.com',
  //     image: '####/3333_cus-img.jpg',
  //     mobile: '971-507285969',
  //   },
  //   vehicleId: 3333,
  //   vehicle: {
  //     make: 'Toyota',
  //     type: 'Sedan',
  //     year: 2014,
  //     color: 'Grey',
  //     model: 'Corolla',
  //     emirate: 'Dubai',
  //     registration: 'P 52789',
  //   },
  //   queueId: 3334,
  //   queue: {
  //     alias: 'Q 3334',
  //     title: 'Queue 3334',
  //     walkin: 0,
  //   },
  //   discountId: 3335,
  //   discount: {
  //     use: {
  //       date: '2022-10-23',
  //       daily: 2,
  //       total: 5,
  //       value: 250,
  //       weekly: 3,
  //       yearly: 5,
  //       monthly: 5,
  //       discount: 75,
  //       discountId: 3335,
  //     },
  //     rate: 30,
  //     type: 'Instant',
  //     cover: '####/3335_discount-cover.jpg',
  //     title: 'Flat Discount 30%',
  //     value: null,
  //     active: 1,
  //     subTitle: 'Flat Discount 30% Sub Title',
  //     highlight: 'Flat Discount 30%',
  //     conditions: {
  //       to: '2022-12-30',
  //       from: '2022-08-02',
  //       dailyLimit: 113,
  //       totalLimit: 112,
  //       weeklyLimit: 113,
  //       yearlyLimit: 114,
  //       monthlyLimit: 110,
  //     },
  //     view: {
  //       message: 'The Instant Discount is applied',
  //       caption: 'Instant Discount',
  //     },
  //   },
  //   workerId: null,
  //   worker: null,
  //   slot: {
  //     id: '3334_2022-10-23_21,50_22,40_0',
  //     to: [22, 40],
  //     end: [22, 40],
  //     date: '2022-10-23T00:00:00.000Z',
  //     from: [21, 50],
  //     start: [21, 50],
  //     preTime: 0,
  //     queueId: 3334,
  //     byWalkin: '0',
  //     postTime: 0,
  //     preGrace: 0,
  //     postGrace: 0,
  //     offeringId: 3334,
  //     queueAlias: 'Q 3334',
  //     queueTitle: 'Queue 3334',
  //     processTime: 40,
  //     processGrace: 10,
  //     view: {
  //       title: 'Sun, Oct 23, 09:50 PM - 10:40 PM',
  //       message: 'This is the selected slot',
  //     },
  //   },
  //   invoice: {
  //     vat: '1.67',
  //     total: '35.00',
  //     vatRate: 5,
  //     subTotal: '50.00',
  //     discountTitle: '30% instant cash',
  //     discountValue: '15.00',
  //     totalBeforeVat: '33.33',
  //   },
  //   payment: {
  //     view: {
  //       message: 'The selected payment method is Pay at station',
  //     },
  //   },
  //   paymentStatus: 0,
  //   date: '2022-10-23T16:11:08.000Z',
  //   walkin: 0,
  //   status: 'Booked',
  //   bookingDate: '2022-10-23T16:14:10.000Z',
  //   checkinDate: null,
  //   startDate: null,
  //   endDate: null,
  //   cancelledDate: null,
  //   noshowDate: null,
  //   isDraft: 0,
  //   isBooked: 1,
  //   isCancelled: 0,
  //   isCompleted: 0,
  //   isNoshow: 0,
  //   isCheckin: 0,
  //   isInprogress: 0,
  //   view: {
  //     message: {
  //       message:
  //         'The booking is completed successfully, You may wish to check in now',
  //       color: 'green',
  //       booked: true,
  //       satus: 'Booked',
  //     },
  //   },
  //   lifecycle: {
  //     booked: {
  //       label: 'Booked',
  //       at: 'Sun, Oct 23 08:14',
  //     },
  //     checkin: {
  //       label: 'Check in',
  //       action: true,
  //     },
  //   },
  //   paymentOptions: [
  //     {
  //       id: 1,
  //       icon: '####/po_cc_icon.png',
  //       title: 'Credit Card',
  //       selectable: false,
  //       color: 'grey',
  //     },
  //     {
  //       id: 2,
  //       icon: '####/po_pas_icon.png',
  //       title: 'Pay at station',
  //       selectable: false,
  //       color: 'green',
  //       selected: true,
  //     },
  //     {
  //       id: 3,
  //       icon: '####/po_my_icon.png',
  //       title: 'My Balance',
  //       selectable: false,
  //       color: 'grey',
  //     },
  //   ],
  // };
  const {
    route,
    get_coupon_sale,
    get_coupon_sale_details,
    update_payment_coupon,
    complete_purchase_coupon,
  } = props;
  const navigation = useNavigation();
  // const customerId = 3333;
  const { couponId, businessId = 3333, saleId } = route?.params;
  console.log('couponId====>', couponId);
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
  const [booking, setSaleData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [payload, setpayload] = useState({
    updateStart: false,
  });
  useEffect(() => {
    getSaledetails();
  }, [refresh]);
  const getSaledetails = async () => {
    const customerId = await getData('customer_id');
    const response = await get_coupon_sale_details(customerId, saleId);
    // const response = await get_coupon_sale(couponId, businessId, customerId);
    console.log('Coupon Sale Data ===> ', response?.data);
    setSaleData(response?.data);
  };
  const updatePayment = async method => {
    try {
      const customerId = await getData('customer_id');
      await update_payment_coupon(saleId, customerId, method);
      setRefresh(!refresh);
    } catch (error) {
      console.log('error=>>> updatePayment', error);
    }

  };
  const purchaseCoupon = async () => {
    try {
      const customerId = await getData('customer_id');
      const res = await complete_purchase_coupon(saleId, customerId);
      console.log('res=> purchaseCoupon', res?.data);
      setRefresh(!refresh);
    } catch (error) {
      console.log('error=>', error);
    }
  };
  return (
    <View style={{ ...styles.container, backgroundColor: colors.white }}>
      <CustomHeader
        colors={colors}
        title={'Sale Coupon'}
        titleStyle={{ color: colors.black }}
        allowBackBtn
        spacebetween
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}>
        <View style={styles.body}>
          <SaleCouponBusinessCustomer item={booking} />
          <Medium
            label={'Payment Method'}
            color={colors.black}
            size={16}
            style={{ marginVertical: mvs(15) }}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: mvs(12) }}
            data={booking?.paymentOptions}
            renderItem={({ item, index }) => (
              <PaymentCard
                key={index}
                title={item?.title}
                icon={item?.icon}
                borderColor={item?.color}
                selected={item?.selected}
                selectable={item?.selectable}
                onClick={() => {
                  if (item?.selectable) {
                    updatePayment(item?.id);
                  }
                }}
              />
            )}
          />
          <Regular
            label={booking?.payment?.view?.message}
            color={
              booking?.payment?.view?.error ? colors.red : colors.lightgrey1
            }
            size={14}
          />
          <BillView invoice={booking?.invoice} />
          <View style={styles.paymentView}>
            {booking?.view?.continue ?
              <View style={{ height: mvs(70) }}>
                <Buttons.ButtonPrimary
                  title={'Confirm'}
                  style={styles.button}
                  onClick={() => purchaseCoupon()}
                  loading={payload.updateStart}
                />
              </View>
              :
              <AlertMessage
                view={booking?.view}
                color={booking?.view?.message?.color}
                title={booking?.view?.message?.message}
                bgColor={
                  booking?.view?.message?.color == 'green'
                    ? colors.lightGreen1
                    : booking?.view?.message?.color == 'red'
                      ? colors.lightPink1
                      : booking?.view?.message?.color == 'blue'
                        ? colors.lightBlue
                        : booking?.view?.message?.color == 'grey'
                          ? colors.lightgrey
                          : null
                }
                fillColor={
                  booking?.view?.message?.color == 'green'
                    ? colors.green
                    : booking?.view?.message?.color == 'red'
                      ? colors.red
                      : booking?.view?.message?.color == 'blue'
                        ? colors.blue
                        : booking?.view?.message?.color == 'grey'
                          ? colors.lightgrey1
                          : null
                }
              />
            }
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

  get_coupon_sale: (couponId, businessId, customerId) =>
    DIVIY_API.get_coupon_sale(couponId, businessId, customerId),
  update_payment_coupon: (id, cid, method) =>
    DIVIY_API.update_payment_coupon(id, cid, method),
  complete_purchase_coupon: (id, cid) =>
    DIVIY_API.complete_purchase_coupon(id, cid),
};
export default connect(mapStateToProps, mapDispatchToProps)(SaleCoupon);
