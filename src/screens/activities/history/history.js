//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import Bold from '../../../presentation/typography/bold-text';
import Regular from '../../../presentation/typography/regular-text';
import styles from './history-styles';
import {History1} from '../../../assets/common-icons';
import {mvs} from '../../../services/metrices';
import ActivityItem from '../../../components/atoms/activity-item';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
// create a component
const History = props => {
  const{get_bookings}=props;
  const [history, setHistoryData] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 1,
      price: 34.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      rating: 4.0,
      isCancelled: false,
      isLiked: true,
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 1,
      price: 84.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      isCancelled: false,
      rating: 3.2,
      isLiked: false,
    },
  ]);
  useEffect(()=>{
    getBookings();
 },[])
 
 const getBookings=async()=>{
  const customerId=await getData("customer_id");
  console.log(customerId)
  const response=await get_bookings(1)
  setHistoryData(response?.data)
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(16)}}>
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={({item}) => (
              <ActivityItem
                address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                bussinessName={item?.business?.title}
                bookingTime={item?.slot?.date+" "+item?.slot?.from[0]+":"+item?.slot?.from[1]+"-"+item?.slot?.to[0]+":"+item?.slot?.to[1]}
                details={item?.offering?.title}
                status="complete"
                subDetails={item?.offering?.subTitle}
                onPress={() => {}}
                progress={0.3}
                isLiked={true}
                price={item?.offering?.price}
                tab={'history'}
                rating={4.0}
              />
            )}
          />
        ) : (
          <View style={styles.body}>
            <History1 />
            <Bold label={'No History'} style={styles.welcomeText} />
            <Regular
              label={'Wait for the booking. Your all bookings will show here.'}
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
   get_bookings:(id)=>DIVIY_API.get_customer_bookings_history(id)
 };
 export default connect(mapStateToProps, mapDispatchToProps)(History);
