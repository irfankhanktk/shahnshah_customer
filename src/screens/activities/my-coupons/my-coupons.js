//import liraries
import React, {useState, useEffect} from 'react';
import { View,ScrollView,FlatList,StatusBar,SafeAreaView,} from 'react-native';
import {connect} from 'react-redux';
import Bold from '../../../presentation/typography/bold-text';
import Regular from '../../../presentation/typography/regular-text';
import {MyCoupon} from '../../../assets/common-icons';
import styles from './my-coupons-styles';
import {mvs} from '../../../services/metrices';
import allColors from '../../../services/colors';
import CouponItem from '../../../components/atoms/coupon-item';
import Medium from '../../../presentation/typography/medium-text';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
// create a component
const MyCoupons = props => {
  
  const {navigation,get_coupons} = props;
  const [actives, setActivesCoupon] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 0.4,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 0.7,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
  ]);
  const [expires, setExpiresCoupons] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 1,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 1,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
  ]);
  useEffect(()=>{
     getCouponsHistory();
  },[])
  const getCouponsHistory=async()=>{
    const customerId=await getData("customer_id");
    const response=await get_coupons(1)
    console.log(response?.data)
    var booked=[];
    var draft=[];
    for(var i=0;i<response?.data.length;i++){
       if(response?.data[i]?.status=="Draft"){
        draft.push(response?.data[i])
       }else{
        booked.push(response?.data[i])
       }
    }
    console.log("Length of  Draft  ",draft.length)
    console.log("Bought of  Draft  ",booked.length)
    setActivesCoupon(booked)
    setExpiresCoupons(draft)
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
                  style={{...styles.title, marginTop: 0}}
                />
                <FlatList
                  data={actives}
                  renderItem={({item}) => (
                    <CouponItem
                      address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                      bussinessName={item?.business?.title}
                      expireTime={item?.conditions?.to}
                      discount={item?.coupon?.discountValue}
                      status="active"
                      AED={item?.coupon?.price}
                      onPress={() =>
                        props?.navigation?.navigate('CouponDetails',{id:item?.couponId,bId:item?.businessId})
                      }
                      progress={0.4}
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
                  style={{...styles.title, marginTop: mvs(10)}}
                />
                <FlatList
                  data={expires}
                  renderItem={({item}) => (
                    <CouponItem
                    address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                    bussinessName={item?.business?.title}
                      expireTime={item?.conditions?.to}
                      discount={item?.coupon?.discountValue}
                      status="expire"
                      AED={item?.coupon?.price}
                      onPress={() => alert('Expired')}
                      progress={0.4}
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
   get_coupons:(id)=>DIVIY_API.get_customer_coupons_history(id)
 };
 export default connect(mapStateToProps, mapDispatchToProps)(MyCoupons);
