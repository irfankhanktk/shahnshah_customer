//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import Bold from '../../../presentation/typography/bold-text';
import styles from './booking-styles';
import { mvs } from '../../../services/metrices';
import { Booking } from '../../../assets/common-icons';
import Regular from '../../../presentation/typography/regular-text';
import ActivityItem from '../../../components/atoms/activity-item';
import allColors from '../../../services/colors';
import Medium from '../../../presentation/typography/medium-text';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
import ReviewModal from '../../../components/molecules/modals/review-modal';
import BOOKING from '../../../constants/customer bookings.json';
import SERVICES from '../../../services/common-services';
// createa component
const Bookings = props => {
  const { get_bookings, update_review_rating, rate_booking, update_review_remarks, upload_review_picture } = props;
  const navigation = useNavigation();
  const [reviewModal, setReviewModal] = useState(false)
  const [bookingId, setBookingId] = useState(273)
  const [remarks, setRemarks] = useState(' ')
  const [ratingValue, setRatingValue] = useState(5)
  // console.log('BOOKING=>>>', BOOKING);
  const [schedule, setScheduleData] = useState([]);
  const [draft, setDrafteData] = useState([]);
  const [completed, setCompletedData] = useState([]);
  const [cancelled, setCancelledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      getBookings();
    }
    // onLikePress(273);
    // onUploadImage(273)
  }, [isFocus])

  const onLikePress = async (bookingId) => {
    try {
      const customerId = await getData("customer_id");
      const response = await rate_booking(customerId, bookingId)
      console.log("review rponse id data=>es", response?.data)
      if (response?.data) {
        const reviewRateReponse = await update_review_rating(customerId, response?.data, 5)
        console.log("Review Rate Response ", reviewRateReponse?.data);
      }
      setReviewModal(true);
      setBookingId(bookingId)
    } catch (error) {
      console.log('SERVICES._returnError(error)=>', SERVICES._returnError(error));
      // showToast('error', SERVICES._returnError(error));
    }

  }
  const onUploadImage = async (image) => {
    try {
      const customerId = await getData("customer_id");
      const response = await upload_review_picture(customerId, bookingId, { picture: 'picture1' })
      console.log("review onUploadImage =>", response)

    } catch (error) {
      console.log('SERVICES._returnError(error)=>', SERVICES._returnError(error));
      SERVICES?.showToast('error', SERVICES._returnError(error));
    }

  }
  const getBookings = async () => {
    try {

      const customerId = await getData("customer_id");
      const response = await get_bookings(customerId);
      console.log('response of bookings=>>>>', response?.data);
      setCancelledData(response?.data?.cancelled)
      setCompletedData(response?.data?.completed)
      setScheduleData(response?.data?.scheduled)
      setDrafteData(response?.data?.draft)
      //response?.data?.draft
      //response?.data?.history
      //response?.data?.cancelled
    } catch (error) {
      console.log('error in booking=>', error);
    } finally {
      setLoading(false)
    }
  }
  const submitReview = async () => {
    const customerId = await getData("customer_id");
    const response = await rate_booking(customerId, bookingId)
    console.log("Review Response ", response?.data)
    if (response?.data) {
      const reviewRateReponse = await update_review_rating(customerId, response?.data, ratingValue)
      console.log("Review Rate Response ", reviewRateReponse?.data)
      const reviewRemarksReponse = await update_review_remarks(customerId, response?.data, { "remark": remarks })
      console.log("Review Remarks Response ", reviewRemarksReponse?.data)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(9),
          backgroundColor: allColors.tabBackground,
        }}>
        <>
          {
            loading ?
              <FlatList
                data={[{}, {}, {}, {}]}
                renderItem={({ item }) => (
                  <ActivityItem
                    address={item?.business?.view?.address || ''}
                    bussinessName={item?.business?.title}
                    image={{ uri: item?.business?.logo }}
                    bookingTime={item?.slot?.title}
                    details={item?.offering?.title}
                    status={item?.view?.status}
                    section=""
                    subDetails={item?.offering?.subTitle}
                    subImage={{ uri: item?.offering?.cover }}
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
              (draft.length > 0 || schedule.length > 0 || completed.length > 0 || cancelled.length > 0) ? (
                <View
                  style={{
                    flex: 1,
                    paddingTop: mvs(10),
                    backgroundColor: allColors.tabBackground,
                  }}>
                  {draft.length > 0 ? (
                    <>
                      <Medium
                        label={'Draft'}
                        style={{ ...styles.title, marginTop: 0 }}
                      />
                      <FlatList
                        data={draft}
                        renderItem={({ item }) => (
                          <ActivityItem
                            loading={!loading}
                            address={item?.business?.view?.address || ''}
                            bussinessName={item?.business?.title}
                            image={{ uri: item?.business?.logo }}
                            bookingTime={item?.slot?.title}
                            details={item?.offering?.title}
                            status={item?.view?.status}
                            section="draft"
                            subDetails={item?.offering?.subTitle}
                            subImage={{ uri: item?.offering?.cover }}
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

                  {schedule.length > 0 ? (
                    <>
                      <Medium
                        label={'Scheduled'}
                        style={{ ...styles.title, marginTop: mvs(10) }}
                      />
                      <FlatList
                        data={schedule}
                        renderItem={({ item }) => (
                          <ActivityItem
                            loading={!loading}
                            address={item?.business?.view?.address || ''}
                            bussinessName={item?.business?.title}
                            image={{ uri: item?.business?.logo }}
                            bookingTime={item?.slot?.title}
                            details={item?.offering?.title}
                            status={item?.view?.status}
                            section="Schedule"
                            subDetails={item?.offering?.subTitle}
                            subImage={{ uri: item?.offering?.cover }}
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
                  {completed.length > 0 ? (
                    <>
                      <Medium label={'Completed'} style={styles.title} />
                      <FlatList
                        data={completed}
                        renderItem={({ item }) => (
                          <ActivityItem
                            loading={!loading}

                            address={item?.business?.view?.address || ''}
                            bussinessName={item?.business?.title}
                            image={{ uri: item?.business?.logo }}
                            bookingTime={item?.slot?.title}
                            details={item?.offering?.title}
                            status={item?.view?.status}
                            section={'Completed'}
                            subDetails={item?.offering?.subTitle}
                            subImage={item?.offering?.cover}
                            onPress={() => alert('Complete')}
                            progress={item?.view?.progress?.minutes}
                            isLiked={false}
                            price={item?.offering?.price}
                            onLikePress={() => onLikePress(item?.id)}
                            rating={item?.rate}
                            onResumePress={() => navigation?.navigate('ReviewAndSchedule',
                              {
                                bookingId: item?.id,
                                businessId: item?.businessId,
                              })}

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
                            loading={!loading}

                            address={item?.business?.view?.address || ''}
                            bussinessName={item?.business?.title}
                            image={{ uri: item?.business?.logo }}
                            bookingTime={item?.slot?.title}
                            details={item?.offering?.title}
                            status={item?.view?.status}
                            section={'Cancelled'}
                            subDetails={item?.offering?.subTitle}
                            subImage={{ uri: item?.offering?.cover }}
                            onPress={() => alert('cancel')}
                            progress={item?.view?.progress?.minutes}
                            isLiked={true}
                            price={item?.offering?.price}
                            rating={item?.rate}
                            onResumePress={() => navigation?.navigate('ReviewAndSchedule',
                              {
                                bookingId: item?.id,
                                businessId: item?.businessId,
                              })}
                          />
                        )}
                      />
                    </>
                  ) : null}
                </View>
              ) : (
                <View style={styles.body}>
                  <Booking />
                  <Bold label={'No Bookings'} style={styles.welcomeText} />
                  <Regular
                    label={'Wait for the booking. Your all bookings will show here.'}
                    numberOfLines={2}
                    style={styles.welcomeSubText}
                  />
                </View>
              )}
        </>
      </ScrollView>
      <ReviewModal
        visible={reviewModal}
        onUploadImage={(image) => onUploadImage(image)}
        rating={ratingValue}
        setRating={(rate) => {
          setRatingValue(rate)
        }}
        setItems={(items) => {
          console.log("Pictures selected......\n")
          console.log(items)
        }}
        onTextChange={(val) => setRemarks(val)}
        setVisible={(val) => {
          setReviewModal(false)
          submitReview();
        }} />
    </SafeAreaView>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
});
const mapDispatchToProps = {
  get_bookings: (id) => DIVIY_API.get_customer_bookings(id),
  rate_booking: (cid, bid) => DIVIY_API.rate_booking(cid, bid),
  update_review_rating: (cid, rid, rate) => DIVIY_API.update_review_rating(cid, rid, rate),
  update_review_remarks: (cid, rid, remarks) => DIVIY_API.update_review_remarks(cid, rid, remarks),
  upload_review_picture: (customerId, bookingId, payload) => DIVIY_API.upload_review_picture(customerId, bookingId, payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
