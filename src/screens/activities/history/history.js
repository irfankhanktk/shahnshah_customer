//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import Bold from '../../../presentation/typography/bold-text';
import Regular from '../../../presentation/typography/regular-text';
import styles from './history-styles';
import { History1 } from '../../../assets/common-icons';
import { mvs } from '../../../services/metrices';
import ActivityItem from '../../../components/atoms/activity-item';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
import BOOKING from '../../../constants/customer bookings.json';
import SERVICES from '../../../services/common-services';
import allColors from '../../../services/colors';
import Medium from '../../../presentation/typography/medium-text';
import { useIsFocused } from '@react-navigation/native';

// create a component
const History = props => {
  const { get_bookings, rate_booking } = props;
  const [schedule, setScheduleData] = useState([]);
  const [draft, setDrafteData] = useState([]);
  const [completed, setCompletedData] = useState([]);
  const [cancelled, setCancelledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistoryData] = useState([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getBookings();
    }
  }, [isFocus]);


  const getBookings = async () => {
    const customerId = await getData("customer_id");
    const response = await get_bookings(customerId);
    console.log('response of history=>', response?.data?.history);
    setHistoryData(response?.data?.history)
    // setCancelledData(response?.data?.cancelled)
    // setCompletedData(response?.data?.completed)
    // setScheduleData(response?.data?.scheduled)
    setLoading(false);

  }

  const onLikePress = async (bookingId) => {
    try {
      const customerId = await getData("customer_id");
      const response = await rate_booking(customerId, bookingId)
      console.log("review response =>", response?.data)
      // if(response?.data){
      //   const reviewRateReponse=await update_review_rating(customerId,response?.data,5)
      //   console.log("Review Rate Response ",reviewRateReponse?.data);
      // }
      setReviewModal(true);
      // setBookingId(id)
    } catch (error) {
      console.log('SERVICES._returnError(error)=>', SERVICES._returnError(error));

      // showToast('error', SERVICES._returnError(error));
    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}>
        {loading ?
          <FlatList
            data={[{}, {}, {}, {}]}
            renderItem={({ item }) => (
              <ActivityItem
                address={item?.business?.view?.address || ''}
                bussinessName={item?.business?.title}
                bookingTime={item?.slot?.title}
                details={item?.offering?.title}
                status={item?.view?.status}
                section=""
                subDetails={item?.offering?.subTitle}
                onPress={() => { }}
                onResumePress={() => { }}
                progress={item?.view?.progress?.minutes}
                isLiked={false}
                price={item?.offering?.price}
                onLikePress={() => { }}
                rating={item?.rate}
              />
            )}
          /> :
          draft.length > 0 || history.length > 0 || schedule.length > 0 || completed.length > 0 || cancelled.length > 0 ? (
            <View
              style={{
                flex: 1,
                paddingTop: mvs(10),
                backgroundColor: allColors.tabBackground,
              }}>
              {history.length > 0 ? (
                <>
                  {/* <Medium
                  label={'Draft'}
                  style={{ ...styles.title, marginTop: 0 }}
                /> */}
                  <FlatList
                    data={history}
                    renderItem={({ item }) => (
                      <ActivityItem
                        loading={!loading}
                        address={item?.business?.view?.address || ''}
                        bussinessName={item?.business?.title}
                        bookingTime={item?.slot?.title}
                        details={item?.offering?.title}
                        status={item?.view?.status}
                        section="history"
                        subDetails={item?.offering?.subTitle}
                        onPress={() => { }}
                        onResumePress={() => navigation?.navigate('ReviewAndSchedule',
                          {
                            bookingId: item?.id,
                            businessId: item?.businessId,
                          })}
                        progress={item?.view?.progress?.minutes}
                        isLiked={false}
                        price={item?.offering?.price}
                        onLikePress={() => onLikePress(item?.id)}
                        rating={item?.rate}
                      />
                    )}
                  />
                </>
              ) : null}
              {/* {draft.length > 0 ? (
              <>
                <Medium
                  label={'Draft'}
                  style={{ ...styles.title, marginTop: 0 }}
                />
                <FlatList
                  data={draft}
                  renderItem={({ item }) => (
                    <ActivityItem
                      address={item?.business?.view?.address || ''}
                      bussinessName={item?.business?.title}
                      bookingTime={item?.slot?.title}
                      details={item?.offering?.title}
                      status={item?.view?.status}
                      section="draft"
                      subDetails={item?.offering?.subTitle}
                      onPress={() => { }}
                      onResumePress={() => navigation?.navigate('ReviewAndSchedule',
                        {
                          bookingID: item?.id,
                          businessID: item?.businessId,
                        })}
                      progress={item?.view?.progress?.minutes}
                      isLiked={false}
                      price={item?.offering?.price}
                      onLikePress={() => onLikePress(item?.id)}
                      rating={item?.rate}
                    />
                  )}
                />
              </>
            ) : null}
            {schedule.length > 0 ? (
              <>
                <Medium
                  label={'Scheduled'}
                  style={{ ...styles.title, marginTop: 0 }}
                />
                <FlatList
                  data={schedule}
                  renderItem={({ item }) => (
                    <ActivityItem
                      address={item?.business?.view?.address || ''}
                      bussinessName={item?.business?.title}
                      bookingTime={item?.slot?.title}
                      details={item?.offering?.title}
                      status={item?.view?.status}
                      section="schedule"
                      subDetails={item?.offering?.subTitle}
                      onPress={() => { }}
                      onResumePress={() => navigation?.navigate('ReviewAndSchedule',
                        {
                          bookingID: item?.id,
                          businessID: item?.businessId,
                        })}
                      progress={item?.view?.progress?.minutes}
                      isLiked={false}
                      price={item?.offering?.price}
                      onLikePress={() => onLikePress(item?.id)}
                      rating={item?.rate}
                    />
                  )}
                />
              </>
            ) : null}
            {completed.length > 0 ? (
              <>
                <Medium label={'Completed'} style={styles.title} />
                <FlatList
                  data={completed}
                  renderItem={({ item }) => (
                    <ActivityItem
                      address={item?.business?.view?.address || ''}
                      bussinessName={item?.business?.title}
                      bookingTime={item?.slot?.title}
                      details={item?.offering?.title}
                      status={item?.view?.status}
                      section={'Completed'}
                      subDetails={item?.offering?.subTitle}
                      onPress={() => alert('Complete')}
                      progress={item?.view?.progress?.minutes}
                      isLiked={false}
                      price={item?.offering?.price}
                      onLikePress={() => onLikePress(item?.id)}
                      rating={item?.rate}

                    />
                  )}
                />
              </>
            ) : null}
            {cancelled.length > 0 ? (
              <>
                <Medium
                  label={'Cancelled'}
                  style={{ ...styles.title, color: allColors.red }}
                />
                <FlatList
                  data={cancelled}
                  renderItem={({ item }) => (
                    <ActivityItem
                      address={item?.business?.view?.address || ''}
                      bussinessName={item?.business?.title}
                      bookingTime={item?.slot?.title}
                      details={item?.offering?.title}
                      status={item?.view?.status}
                      section={'Cancelled'}
                      subDetails={item?.offering?.subTitle}
                      onPress={() => alert('cancel')}
                      progress={item?.view?.progress?.minutes}
                      isLiked={true}
                      price={item?.offering?.price}
                      rating={item?.rate}
                    />
                  )}
                />
              </>
            ) : null} */}
            </View>
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
  //  get_bookings:(id)=>DIVIY_API.get_customer_bookings_history(id)
  get_bookings: (id) => DIVIY_API.get_customer_bookings(id)
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
