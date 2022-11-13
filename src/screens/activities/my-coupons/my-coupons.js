//import liraries
import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StatusBar, SafeAreaView, } from 'react-native';
import { connect } from 'react-redux';
import Bold from '../../../presentation/typography/bold-text';
import Regular from '../../../presentation/typography/regular-text';
import { MyCoupon } from '../../../assets/common-icons';
import styles from './my-coupons-styles';
import { mvs } from '../../../services/metrices';
import allColors from '../../../services/colors';
import CouponItem from '../../../components/atoms/coupon-item';
import Medium from '../../../presentation/typography/medium-text';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
import COUPONS from '../../../constants/customer coupons.json';

// create a component
const MyCoupons = props => {

  const { navigation, get_coupons } = props;
  const [actives, setActivesCoupon] = useState(COUPONS?.active || []);
  const [expires, setExpiresCoupons] = useState(COUPONS?.expired || []);
  const [draft, setDraftData] = useState(COUPONS?.draft || []);

  useEffect(() => {
    getCouponsHistory();
  }, [])
  const getCouponsHistory = async () => {
    const customerId = await getData("customer_id");
    const response = await get_coupons(customerId)
    console.log('response?.data of mycoupons=>', response?.data)
    // setActivesCoupon(response?.data?.active);
    // setExpiresCoupons(response?.data?.expired);
    // setDraftData(response?.data?.draft);
    //response?.data?.draft 
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(16),
          backgroundColor: allColors.tabBackground,
        }}>
        {actives.length > 0 || expires.length > 0 ? (
          <View
            style={{
              flex: 1,
              paddingTop: mvs(10),
              backgroundColor: allColors.tabBackground,
            }}>
            {actives.length > 0 ? (
              <>
                <Medium
                  label={'Active Coupons'}
                  style={{ ...styles.title, marginTop: 0 }}
                />
                <FlatList
                  data={actives}
                  renderItem={({ item }) => (
                    <CouponItem
                      onPaymentPress={() => { }}
                      address={item?.view?.address}
                      bussinessName={item?.business?.title}
                      expireTime={item?.conditions?.to}
                      discount={item?.coupon?.discountValue}
                      status={item?.status}
                      AED={item?.coupon?.price}
                      onViewPress={() =>
                        props?.navigation?.navigate('CouponDetails', { id: item?.couponId, bId: item?.businessId })
                      }
                      progress={0.4}
                      image={{ uri: item?.cover }}
                      price={item?.coupon?.price}
                    />
                  )}
                />
              </>
            ) : null}
            {draft.length > 0 ? (
              <>
                <Medium
                  label={'Draft Coupons'}
                  style={{ ...styles.title, marginTop: mvs(10) }}
                />
                <FlatList
                  data={draft}
                  renderItem={({ item }) => (
                    <CouponItem
                      onPaymentPress={() => { }}
                      address={item?.view?.address}
                      bussinessName={item?.business?.title}
                      expireTime={item?.conditions?.to}
                      discount={item?.coupon?.discountValue}
                      status={item?.status}
                      AED={item?.coupon?.price}
                      onViewPress={() =>
                        props?.navigation?.navigate('CouponDetails', { id: item?.couponId, bId: item?.businessId })
                      }
                      progress={0.4}
                      image={{ uri: item?.cover }}
                      price={item?.coupon?.price}

                    />
                  )}
                />
              </>
            ) : null}

            {expires.length > 0 ? (
              <>
                <Medium
                  label={'Expired Coupons'}
                  style={{ ...styles.title, marginTop: mvs(10) }}
                />
                <FlatList
                  data={expires}
                  renderItem={({ item }) => (
                    <CouponItem
                      onPaymentPress={() => { }}
                      address={item?.view?.address}
                      bussinessName={item?.business?.title}
                      expireTime={item?.conditions?.to}
                      discount={item?.coupon?.discountValue}
                      status={item?.status}
                      AED={item?.coupon?.price}
                      progress={0.4}
                      image={{ uri: item?.cover }}
                      price={item?.coupon?.price}
                    />
                  )}
                />
              </>
            ) : null}
          </View>
        ) : (
          <View style={styles.body}>
            <MyCoupon />
            <Bold label={'No Coupons'} style={styles.welcomeText} />
            <Regular
              label={
                'Don’t have any active coupons. Your all coupons will show here.'
              }
              numberOfLines={2}
              style={styles.welcomeSubText}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
});
const mapDispatchToProps = {
  get_coupons: (id) => DIVIY_API.get_customer_coupons_history(id)
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCoupons);
