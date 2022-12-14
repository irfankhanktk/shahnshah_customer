import React, { useEffect, useState } from 'react';
import {
  FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { BaseURL } from '../../ApiServices';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import CouponPromo from '../../components/coupon-promo/index';
import HeadingTitle from '../../components/molecules/heading-title';
import { getData } from '../../localStorage';
import Bold from '../../presentation/typography/bold-text';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { height, mvs, width } from '../../services/metrices';
import { Styles as styles } from './styles';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  DiscountIcon, SettingIcon, SpeedometerPrimary
} from '../../assets/common-icons';
import Buttons from '../../components/atoms/Button';
import ReviewsRaing from '../../components/molecules/reviews-rating';
import { addBookingID, addOfferingID } from '../../Redux/Reducers';

import { Avatar } from 'react-native-elements';
import LinedColoredCard from '../../components/linedColoredCard';
import RatingStar from '../../components/molecules/rating-star';
import SemiBold from '../../presentation/typography/semibold-text';
import { useServicesOfferingProps } from './useServicesOfferingProps';
import Shimmer from '../../components/shimmer';
const about =
  'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const services = [
  { icon: 'Services', title: '2.5K Reviews', value: '5 Services' },
  { icon: 'Schedule', title: 'Book Service', value: 'Availability' },
  { icon: 'Discount', title: 'Discounts', value: 'View Promos' },
];
const ServiceOfferingDetails = props => {
  const { route } = props;
  const navigation = useNavigation();
  const { joinTwoArrays, isObjectEmpty, isDiscountEmpty } =
    useServicesOfferingProps(navigation);
  const { id, distance } = route.params;
  console.log('route.params:', route.params);
  const dispatch = useDispatch();
  const state = useSelector(state => state.businessReviews);
  const bookingState = useSelector(state => state.common);
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [ratingg, setRatingg] = useState([]);
  const [stock, setstock] = useState(true);
  const ref = React.useRef(null);
  const [payload, setpayload] = useState({
    bookNowStart: false,
  });

  const [serviceDetails, setserviceDetails] = useState([]);
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
  const delayAPI = (responseID, businessID) => {
    navigation.navigate('ReviewAndSchedule', {
      bookingId: responseID,
      businessId: businessID,
    });
  };
  const BookNow = async () => {
    setpayload({ ...payload, bookNowStart: true });
    const token = await getData('token');
    const customerID = await getData('customer_id');
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customerID,
        offeringId: id,
        // byCustomer: 0,
      }),
      redirect: 'follow',
    };

    await fetch(`${BaseURL}p/public/bookings`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setpayload({ ...payload, bookNowStart: false });
          showToast('success', 'Booking confirmed');
          dispatch(addBookingID(result));
          dispatch(addOfferingID(id));
          getServiceDetails();
          delayAPI(result, id);
          console.log('booking Confirmed=====', result);
        }
      })
      .catch(error => {
        setpayload({ ...payload, bookNowStart: false });
        console.log('error', error);
      });
  };

  const getServiceDetails = async () => {
    const customerID = await getData('customer_id');
    const token = await getData('token');
    if (token != null) {
      var requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },

        redirect: 'follow',
      };
    }
    await fetch(
      `${BaseURL}p/public/offerings/${id}?customerId=${customerID}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          console.log('result getServiceDetails=>', result);
          setserviceDetails(result);
          getTags(result?.options, result.specs);
          setRatingg(result?.business?.rating);
          setLoading(true);
          console.log('service details========', serviceDetails);
          console.log(serviceDetails?.otherConditions);
        }
      })
      .catch(error => {
        setLoading(true);
        console.log('error', error);
      });
  };

  useEffect(() => {
    getServiceDetails();
  }, [loading]);
  const [tagsList, setTagsList] = useState([]);
  // console.log('serviceDetails.option:', serviceDetails?.options);
  // console.log('specs', serviceDetails?.specs);
  const getTags = (options, specs) => {
    if (options !== undefined && specs !== undefined) {
      let tags = joinTwoArrays(options, specs);
      const mergedArr = [...options, ...specs];
      console.log('mergedArr with spread:', mergedArr);
      console.log('tags:', tags);
      setTagsList(tags);
    }
    return;
  };
  const {
    getBusinessReviewsLoading,
    getBusinessReviewsSuccess,
    getBusinessReviews,
  } = useSelector(state => state?.businessReviews);
  console.log(
    'serviceDetails?.rating[7]:',
    serviceDetails?.business?.rating[7],
  );
  console.log('serviceDetails?.coupons::', serviceDetails?.coupons);
  return (
    <View style={styles.conntainer}>
      <View
        style={[
          styles.body,
          {
            paddingTop: mvs(15),
          },
        ]}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <Row style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => props?.navigation?.goBack()}
            style={{ top: mvs(7) }}>
            <FontAwesome
              size={mvs(30)}
              color={colors.black}
              name="angle-left"
            />
          </TouchableOpacity>
          <Medium
            numberOfLines={2}
            size={mvs(16)}
            style={{
              alignSelf: 'center',
              // fontFami
              top: mvs(7),
              color: colors.black,
            }}
            label={'Service Offering Details'}
          />
          <Regular />
        </Row>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: mvs(20)
          }}>
          <View
            style={{
              flex: 1,
              overflow: 'hidden',
              width: width,
              paddingBottom: mvs(100),
              backgroundColor: colors.white,

            }}>

            <View
              style={{
                height: mvs(210),
                width: width,
              }}>
              <ShimmerPlaceholder
                style={{ width: width, height: mvs(240) }}
                visible={loading}>
                <ImageBackground
                  imageStyle={{
                    width: width,
                    height: height,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: serviceDetails?.cover,
                  }}>
                </ImageBackground>
              </ShimmerPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: mvs(40),
                  width: mvs(300),
                  bottom: mvs(110),
                }}>
                <Shimmer visible={loading} shimmerStyle={{ height: mvs(32), width: mvs(32), borderRadius: mvs(16) }}>
                  <Avatar
                    size={mvs(32)}
                    rounded
                    source={{ uri: serviceDetails?.service?.icon }}
                    key={serviceDetails?.service?.id}
                  />
                </Shimmer>

                {/* {serviceDetails?.discount?.highlight !== undefined && ( */}
                <View
                  style={{
                    backgroundColor: colors.GDFDFDF,
                    borderRadius: mvs(2),
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <DiscountIcon />
                  <Medium
                    style={{ marginLeft: 5, minWidth: mvs(120), }}
                    color={colors.black}
                    label={serviceDetails?.discount?.highlight}
                  />
                </View>
                {/* )} */}
              </View>

              <View style={styles.detailsInnerCard}>
                <View style={{ height: mvs(55) }}>
                  <Shimmer visible={loading} shimmerStyle={{ height: mvs(23) }}>
                    <Medium
                      numberOfLines={2}
                      size={mvs(16)}
                      style={{
                        color: colors.black,
                      }}
                      label={serviceDetails?.title}
                    />
                  </Shimmer>
                  {/* time price view starts  */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {/* time view */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: mvs(60),

                        // marginVertical: 5,
                      }}>
                      <SettingIcon width={mvs(15)} height={mvs(15)} />
                      <Shimmer visible={loading} shimmerStyle={{ width: mvs(30) }}>
                        <Medium
                          size={mvs(11)}
                          color={colors.black}
                          label={`${serviceDetails?.leadTime} Min`}
                        />
                      </Shimmer>
                    </View>

                    {/* price view */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        marginRight: mvs(20),
                        // marginVertical: 5,
                      }}>
                      <Regular
                        size={mvs(8)}
                        color={colors.G9B9B9B}
                        label={`AED `}
                        style={{ marginTop: Platform.OS === 'android' ? 3 : 5.5 }}
                      />
                      <Shimmer visible={loading} shimmerStyle={{ width: mvs(30) }}>
                        <Medium
                          size={mvs(19)}
                          color={colors.primary}
                          label={`${serviceDetails?.newPrice || serviceDetails.price
                            }`}
                          style={{ marginLeft: 4 }}
                        />
                      </Shimmer>
                    </View>
                  </View>
                  {/* time price view ends  */}

                </View>

                <View style={styles.yellowInnerLine} />

                <Row
                  style={{
                    height: mvs(55),
                    borderRadius: 5,
                    paddingTop: mvs(3),
                  }}>
                  <View
                    style={{
                      borderRadius: mvs(23),
                      borderColor: colors.GDFDFDF,
                    }}>
                    <ShimmerPlaceholder
                      style={{
                        width: mvs(45),
                        borderRadius: mvs(22.5),
                        height: mvs(45),
                      }}
                      visible={loading}>
                      <ImagePlaceholder
                        borderRadius={mvs(18)}
                        uri={{ uri: serviceDetails?.business?.logo }}
                        containerStyle={{
                          width: mvs(45),
                          height: mvs(45),
                        }}
                      />
                    </ShimmerPlaceholder>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: mvs(13),
                    }}>
                    <Shimmer shimmerStyle={{ height: mvs(23) }} visible={loading}>
                      <Regular
                        numberOfLines={2}
                        color={colors.black}
                        // style={{ flex: 1 }}
                        label={
                          serviceDetails?.business?.title?.length > 20
                            ? `${serviceDetails?.business?.title?.slice(0, 20)}...`
                            : serviceDetails?.business?.title
                        }
                        size={mvs(13)}
                      />
                    </Shimmer>
                    <Row alignItems="center" justifyContent="flex-start">
                      <Row
                        justifyContent="flex-start"
                        style={{
                          flex: 1,
                        }}>
                        <View style={{}}>

                          <Shimmer shimmerStyle={{ height: mvs(20), marginTop: mvs(2) }} visible={loading}>
                            <Row>
                              <Regular
                                color={colors.G9B9B9B}
                                size={mvs(14)}
                                label={
                                  serviceDetails?.business?.view?.address
                                    ?.length > 25
                                    ? `${serviceDetails?.business?.view?.address?.slice(
                                      0,
                                      18,
                                    )}...`
                                    : serviceDetails?.business?.view?.address
                                }
                              />
                              <Row
                                alignItems="center"
                                justifyContent="flex-end"
                                style={{
                                  width: '25%',
                                  marginLeft: mvs(15),
                                  marginTop: mvs(3),
                                }}>
                                <View style={{}}>
                                  <SpeedometerPrimary
                                    width={mvs(22)}
                                    color={colors.black}
                                    height={mvs(11.63)}
                                  />
                                </View>
                                <Regular
                                  style={{
                                    lineHeight: mvs(15),
                                    marginLeft: mvs(8),
                                  }}
                                  color={colors.black}
                                  size={mvs(11)}
                                  label={`${distance} KM`}
                                />
                              </Row>
                            </Row>
                          </Shimmer>
                          {serviceDetails?.business?.rating?.length > 0 && (
                            <RatingStar
                              ratingSelectedColor={colors.primary}
                              rate={
                                serviceDetails?.business?.rating[7]
                                  ? serviceDetails?.business?.rating[7]
                                  : 0
                              }
                              ratingUnSelectedColor={colors.GDFDFDF}
                              size={mvs(10)}
                              list={[1, 2, 3, 4, 5]}
                              width={mvs(40)}
                              style={{
                                alignSelf: 'flex-start',
                                marginVertical: mvs(3),
                              }}
                            />
                          )}
                        </View>

                      </Row>
                    </Row>

                  </View>
                </Row>
              </View>
            </View>
          </View>

          <Shimmer visible={loading} shimmerStyle={{
            alignSelf: 'center',
            marginHorizontal: mvs(35),
            height: mvs(32),
          }}>
            <View
              style={{
                alignItems: 'center',
                paddingHorizontal: mvs(35),
              }}>
              {tagsList !== undefined && tagsList.length > 1 && (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={tagsList || []}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.tagsView}>
                        <Regular
                          style={{
                            lineHeight: mvs(15),
                          }}
                          color={colors.G777373}
                          size={mvs(10)}
                          label={item}
                        />
                      </View>
                    );
                  }}
                />)}
            </View>
          </Shimmer>

          {loading ?
            <Shimmer visible={loading} shimmerStyle={{ height: mvs(115), marginTop: mvs(15) }} /> :
            isObjectEmpty(serviceDetails?.discount) && (
              <LinedColoredCard
                color={serviceDetails?.discount?.view?.statusLine?.color}
                title={serviceDetails?.discount?.view?.statusLine?.shortLine}
                subTitle={serviceDetails?.discount?.view?.statusLine?.line}
              />
            )}

          <HeadingTitle
            title="About"
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
          />

          <View style={{ paddingHorizontal: mvs(18) }}>
            <ShimmerPlaceholder style={{ width: '90%', minHeight: mvs(25) }} visible={loading}>
              <Regular
                numberOfLines={null}
                label={
                  serviceDetails?.about?.length > 185 && isMoreBtn
                    ? `${serviceDetails?.about?.slice(0, 183)} ...`
                    : serviceDetails?.about
                }
                size={mvs(16)}
                color={colors.B1E1E1E}
              />
              {isMoreBtn && serviceDetails?.about?.length > 185 && (
                <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                  <Regular color={colors.primary} label={'Read More'} />
                </TouchableOpacity>
              )}
            </ShimmerPlaceholder>
          </View>
          {/* 
          <View
            style={{
              backgroundColor: colors.white,
              flexGrow: 1,
              // paddingBottom: mvs(30),
            }}> */}
          {
            !loading ?
              (
                <>
                  <HeadingTitle
                    title="Coupons & Promos"
                    marginVertical={0}
                    size={mvs(18)}
                  />
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingHorizontal: mvs(18),
                    }}
                    horizontal>
                    <ShimmerPlaceholder
                      style={{
                        marginTop: mvs(15),
                        marginRight: mvs(10),
                        height: mvs(240),
                        borderRadius: mvs(8),
                        width: width - mvs(70),
                      }}
                      visible={loading} />
                    <ShimmerPlaceholder
                      style={{
                        marginTop: mvs(15),
                        height: mvs(240),
                        marginRight: mvs(10),
                        borderRadius: mvs(8),
                        width: width - mvs(70),
                      }}
                      visible={loading} />
                  </ScrollView>
                </>
              ) :
              serviceDetails?.coupons && (
                <CouponPromo
                  {...props}
                  loading={loading}
                  coupons={serviceDetails?.coupons}
                  business={serviceDetails?.business}
                />
              )}
          {/* </View> */}

          <HeadingTitle
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
            title="Rating & Reviews"
          />
          <View style={{ paddingHorizontal: mvs(18), }}>
            <ShimmerPlaceholder style={{ width: '100%', height: mvs(60) }} visible={loading}>
              <Row justifyContent={'space-between'}>
                <Bold
                  color={colors.ratingg}
                  style={{ transform: [{ translateY: -mvs(12) }] }}
                  size={mvs(48)}
                  label={ratingg?.length > 0 ? ratingg[7] : 0}
                />
                <Row justifyContent="flex-start" alignItems="center">
                  <View style={{ justifyContent: 'space-between' }}>
                    <RatingStar
                      ratingUnSelectedColor={colors.ratingLine}
                      ratingSelectedColor={colors.primary}
                      rate={5}
                      size={mvs(10)}
                      list={[1, 2, 3, 4, 5]}
                      width={mvs(40)}
                      style={{ alignSelf: 'flex-end' }}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      rate={5}
                      ratingUnSelectedColor={colors.ratingLine}
                      size={mvs(10)}
                      ratingCount={4}
                      list={[1, 2, 3, 4]}
                      width={mvs(32)}
                      style={{ alignSelf: 'flex-end', marginTop: mvs(2.4) }}
                    />
                    <RatingStar
                      ratingUnSelectedColor={colors.ratingLine}
                      ratingSelectedColor={colors.primary}
                      rate={5}
                      size={mvs(10)}
                      list={[1, 2, 3]}
                      width={mvs(24)}
                      ratingCount={3}
                      style={{ alignSelf: 'flex-end', marginTop: mvs(2.4) }}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      ratingCount={2}
                      size={mvs(10)}
                      list={[1, 2]}
                      width={mvs(16)}
                      style={{ alignSelf: 'flex-end', marginTop: mvs(2.4) }}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      ratingCount={1}
                      size={mvs(10)}
                      list={[1]}
                      width={mvs(16)}
                      style={{ alignSelf: 'flex-end' }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: mvs(5),
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ ...styles.ratingBar, marginTop: mvs(0) }}>
                      <View
                        style={{
                          ...styles.ratingPercentage,

                          width: mvs(ratingg[0] ? (ratingg[0] / 5) * 100 : 0),
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: mvs(ratingg[1] ? (ratingg[1] / 5) * 100 : 0),
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: mvs(ratingg[2] ? (ratingg[2] / 5) * 100 : 0),
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: mvs(ratingg[3] ? (ratingg[3] / 5) * 100 : 0),
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: mvs(ratingg[4] ? (ratingg[4] / 5) * 100 : 0),
                        }}
                      />
                    </View>
                  </View>
                </Row>

              </Row>
            </ShimmerPlaceholder>
            <Row>
              <Regular
                // style={{ left: mvs(5), bottom: mvs(20) }}
                color={colors.black}
                size={mvs(16)}
                label={'Out of 5'}
              />
              <Regular
                color={colors.G9B9B9B}
                size={mvs(12)}
                label={
                  ratingg?.length > 0 ? `${ratingg[5]} ratings` : 0 + ' ratings'
                }
              />
            </Row>
          </View>
          {loading ? <Shimmer style={{ height: mvs(200), marginTop: mvs(20), backgroundColor: 'red' }} visible={loading} />
            : <ReviewsRaing
              picsArray={payload?.picsArrayReviews}
              data={getBusinessReviews?.map(item => item)}
              loading={loading}
              style={{ paddingTop: mvs(17) }}
            />}


          {serviceDetails?.view?.resume && (
            <View
              style={{
                marginTop: mvs(10),
                alignItems: 'center',
                paddingHorizontal: mvs(22),
              }}>
              <SemiBold
                numberOfLines={2}
                label={serviceDetails?.view?.resumeMessage}
                size={14}
                color={colors.green}
              />
            </View>
          )}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: mvs(18),
            backgroundColor: colors.FBF8F8,
            paddingVertical: mvs(20),
          }}>
          <Buttons.ButtonPrimary
            style={styles.lgBtn}
            onClick={() =>
              serviceDetails?.bookingId != null
                ? navigation.navigate('ReviewAndSchedule', {
                  bookingId: serviceDetails?.bookingId,
                  businessId: bookingState?.serviceBooking?.offeringID,
                })
                : BookNow()
            }
            disabled={payload.bookNowStart}
            loading={payload.bookNowStart}
            // onClick={() => props?.navigation?.navigate('ReviewAndSchedule')}
            title={serviceDetails?.view?.buttonTitle}
          />
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default ServiceOfferingDetails;
