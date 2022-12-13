import React, { useState } from 'react';
import {
  Alert, ImageBackground,
  Pressable, ScrollView, Share, TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch, useSelector } from 'react-redux';
import { BaseURL } from '../../ApiServices';
import {
  HeartIcon, ShareBlackIcon, SpeedometerPrimary
} from '../../assets/common-icons';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import CouponPromo from '../../components/coupon-promo';
import ServiceCard from '../../components/molecules/service-card';
import { getData } from '../../localStorage';
import Regular from '../../presentation/typography/regular-text';
import { addReviews } from '../../Redux/Reducers/ReviewsReducer';
import SERVICES from '../../services/common-services';
import { height, mvs, width } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import HeadingTitle from './../../components/molecules/heading-title/index';
import LabelValue from './../../components/molecules/label-value-row/index';
import ReviewModal from './../../components/molecules/modals/review-modal';
import RatingStar from './../../components/molecules/rating-star/index';
import ReviewsRaing from './../../components/molecules/reviews-rating/index';
import ServiceOffering from './../../components/service-offering/index';
import Bold from './../../presentation/typography/bold-text';
import colors from './../../services/colors';
import { STYLES as styles } from './style';
import { useBusinessProfile } from './useBusinessProfile';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const BusinessProfile = props => {
  const { get_bussiness_coupons, route } = props;
  const { getUpdatedBusinessHours, handleGetBusinessesReviews } =
    useBusinessProfile(businessHourse);


  const [index, setindex] = useState(0);
  //business-id is id here
  const { id } = route.params;
  console.log('business id=>>>>', id);
  const dispatch = useDispatch();
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [payload, setPayload] = React.useState({
    image: '',
    last_name: '',
    first_name: '',
    rating: [],
    picsArrayReviews: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const ref = React.useRef(null);
  const [businessProfile, setbusinessProfile] = React.useState([]);
  const [businessServices, setbusinessServices] = useState([]);
  const [businessReviews, setbusinessReviews] = useState([]);
  const [contact, setcontact] = useState([]);
  const [businessHourse, setbusinessHourse] = useState(null);
  const [ratingg, setratingg] = useState([]);
  const [bussinessCoupons, setBussinessCoupons] = useState([]);
  const [servicesdata, setservicesdata] = useState([]);
  const [totalDistance, setDistance] = useState(0.0);
  const [payyload, setpayyload] = useState({
    services: [],
  });
  const [addForm, setaddForm] = useState({
    id: '',
    icon: '',
    title: '',
    serviceId: '',
  });
  const {
    getBusinessReviews,
  } = useSelector(state => state?.businessReviews);



  const getBusinessProfile = async () => {
    const res = await getData('token');
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${res}`,
      },
      redirect: 'follow',
    };
    await fetch(`${BaseURL}p/public/businesses/${id}/profile`, requestOptions)
      .then(response => {
        if (!response?.ok)
          throw response;
        return response.json();
      })
      .then(result => {
        console.log('result=>>> business profile', result);
        console.log('result.rating', result.rating);
        if (result != null) {
          setbusinessProfile(result);
          dispatch(addReviews(result));
          setcontact(result.view.contact);
          setbusinessHourse(result.view.hours);
          setratingg(result.rating);
          setbusinessServices(result);
          setservicesdata(result.services);
          getUserLocation(result?.lat, result?.lng);
          getBussinessCoupons(id);
          setpayyload({
            ...payyload,
            services: result?.services,
          });
        }
      })
      .catch(error => {
        console.log('Business profile error', error);
      });
    console.log('before reviwe ::::id::', id);

    await fetch(
      `${BaseURL}p/public/businesses/${id}/reviews?page=1`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('business review response:::', result);
        if (result != null) {
          setbusinessReviews(result);
          const myArra = [];
          for (let i = 0; i < result.length; i++) {
            myArra?.push(result[i]?.pics);
          }
          setPayload({ ...payload, picsArrayReviews: myArra });
        }
      })
      .catch(error => {
        console.log('Business reviews error', error);
        SERVICES.showToast('error', SERVICES._returnError(error))
      });

    await fetch(
      `${BaseURL}p/public/businesses/${id}/services/${id}/offerings`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setLoading(true);
          setbusinessServices(result);
        }
      })
      .catch(error => {
        setLoading(true);
        // navigation.goBack();
        console.log('Business services error', error);
      });
  };
  const getUserLocation = async (restLati, restLongi) => {
    const position = await SERVICES._get_current_location();
    var distance = SERVICES._get_distance(
      restLati,
      restLongi,
      position.coords.latitude,
      position.coords.longitude,
    );

    setDistance(distance);
  };
  const renderNewOffers = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODM0MTkyMzE0ZjUzNjljZWFjY2JiMzFkMTgxOTBkMjhkMmZmZjkxYzJmOWI0OTM3MjU0NjJkZGYzODAzN2I0MzA5ODU4NjE5MzRlYWFmODgiLCJpYXQiOjE2NjIzNzUxMjAuNDMyMjgxLCJuYmYiOjE2NjIzNzUxMjAuNDMyMjg2LCJleHAiOjE2OTM5MTExMjAuNDIzNTI0LCJzdWIiOiI0NSIsInNjb3BlcyI6W119.Zl9X8RX4fffUxPynU3DzzGFRlZVfRCychFvbRKpxE-QReIbLmkVG6RU816vEjhm_ptE6o1ry1qJwGKJMKNV-HkDzROIOM00-_ltvE4ljZ2tCu1qmfNOp9NUYSKZhBl74nm8B2uo93PUn3ZMrXkYNO-XYG_aA9xhRmtrDNMW1E7cABIQ1EOW2yuhqoMG4gt_0wVsaH_Y9jyZ886hG0ox4I-qAcp0u469CnqIPVbpWX4DuSu_8aTJgC_3Cxhw8r9-UWrpnONnGf4JlS471kZg81wjEq067qGt4q3_oywLtQ6gqpw9QJ9DLukaMySDrrE2CR9u1Q6WBqPi2vWV5mJ3hZaoK0SoNObnvReQ_8sVry6-EFsDM6hGHnNj5KFQz_03uMyrEsr08cKNDcePgIe4g1XROpSl0jm-M-_i13TiYwraB8lnE7Awb0s48PZxWVgfJpT4G2YKrV-RjXTxmWMZp8LEM0QpOFeBP9iy4RErIE_xvTLzFh57bhq0RlTGNd9W8e2gD36-_kiCGX9cZ7Tbhviks_U91bx26H-VgCug4sPBu_KgWJXBx7Ydjfdk-YxNEqjXPA7SNjrq7S4GxVx2OuxTJD3e_bgXowv4Vmvw5TuYiROq5oz_tQS8W1ctj1Ov4YSHdSDEg1RPub7zXnhri7YsB2ESnk0zONRsn1tlV3vw',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}p/public/businesses/${id}/services/${id}/offerings`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setLoading(true);
          setbusinessServices(result);
        }
      })
      .catch(error => {
        setLoading(true);
        // navigation.goBack();
        // console.log('Business services error', error);
      });
  };
  const getBussinessCoupons = async id => {
    //id=1
    const res = await get_bussiness_coupons(id);
    console.log('getBussinessCoupons::res?.data=>', res?.data);
    setBussinessCoupons(res?.data || []);
  };
  console.log('business CoupinssssS::', bussinessCoupons);
  const services = [
    {
      icon: 'Services',
      title: 'Services',
      value:
        businessServices?.length > 0
          ? `${businessServices?.length} Service`
          : '0 Service',
    },
    {
      icon: 'Photos',
      title: 'Photos',
      value: businessProfile.gallery
        ? businessProfile.gallery.length + ' Photos'
        : '0 Photos',
    },
    {
      icon: 'Reviews',
      title:
        ratingg.length > 0 && ratingg[5]
          ? ratingg[5] + ' Reviews'
          : 0 + ' Reviews',
      value: '5 Services',
    },
    { icon: 'Schedule', title: 'Availability', value: 'See Schedule' },
    {
      icon: 'Discount',
      title: 'Discounts',
      value:
        bussinessCoupons?.length > 0
          ? `${bussinessCoupons?.length} Promos`
          : 'View Promos',
    },
  ];
  // var ServicesData = businessProfile.services;

  // businessProfile.services ? businessProfile.services.length;
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'SERVICES',
    },
    {
      key: 'second',
      title: 'Services',
    },
    {
      key: 'third',
      title: 'Services',
    },
    {
      key: 'fourth',
      title: 'Services',
    },
  ]);
  React.useEffect(() => {
    getBusinessProfile();
    handleGetBusinessesReviews(id);
  }, [loading]);
  // if (loading) {
  //   return <View style={{ flex: 1 }}>
  //     <PageLoader />
  //   </View>
  // }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'App Link',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) { }
  };
  const updatedBusiness = getUpdatedBusinessHours(businessHourse);
  return (
    <View style={styles.container}>
      <View style={{ ...styles.body }}>
        <ScrollView
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{ height: mvs(210), width: width }}>
            <ShimmerPlaceholder
              style={{ width: '100%', height: '100%' }}
              visible={loading}>
              <ImageBackground
                imageStyle={{
                  width: width,
                  height: height,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: businessProfile?.cover,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  paddingRight: mvs(20),
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  paddingBottom: mvs(20),
                }}>
                <View
                  style={{
                    width: mvs(70),
                    height: mvs(29),
                    paddingHorizontal: mvs(7),
                    borderRadius: mvs(4),
                    backgroundColor: '#eee',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Pressable
                    // activeOpacity={0.7}
                    onPress={() => Alert.alert('share')}>
                    <ShareBlackIcon
                      fill="black"
                      width={mvs(18)}
                      height={mvs(18)}
                    />
                  </Pressable>
                  <View
                    style={{
                      borderLeftWidth: 0.3,
                      borderLeftColor: colors.border,
                      height: mvs(20),
                    }}
                  />
                  <Pressable
                    activeOpacity={0.7}
                    onPress={() => Alert.alert('like')}>
                    <HeartIcon width={mvs(18)} height={mvs(18)} />
                  </Pressable>
                </View>
              </ImageBackground>
            </ShimmerPlaceholder>
            <TouchableOpacity
              onPress={() => props?.navigation?.goBack()}
              style={{ position: 'absolute', left: mvs(20), top: mvs(20) }}>
              <FontAwesome
                size={mvs(25)}
                color={colors.white}
                name="angle-left"
              />
            </TouchableOpacity>
          </View>
          <Row
            style={{
              paddingHorizontal: mvs(20),
              marginTop: mvs(25),
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
                  uri={{ uri: businessProfile?.logo }}
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
              <ShimmerPlaceholder style={{ height: mvs(23) }} visible={loading}>
                <Bold
                  numberOfLines={2}
                  label={
                    businessProfile?.title?.length > 20
                      ? `${businessProfile?.title?.slice(0, 15)}...`
                      : businessProfile?.title
                  }
                  size={mvs(20)}
                />
              </ShimmerPlaceholder>
              <Row style={{ marginTop: mvs(5), }} alignItems="center">
                <ShimmerPlaceholder style={{ height: mvs(20) }} visible={loading}>
                  <Regular
                    color={colors.G9B9B9B}
                    size={mvs(16)}
                    label={
                      businessProfile?.view?.address?.length > 25
                        ? `${businessProfile?.view?.address?.slice(0, 25)}...`
                        : businessProfile?.view?.address
                    }
                  />
                </ShimmerPlaceholder>
                <Row
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{
                    marginLeft: mvs(3),
                    // width: mvs(250),
                  }}>
                  <View style={{ height: mvs(20), justifyContent: 'center' }}>
                    <SpeedometerPrimary width={mvs(22)} height={mvs(11.63)} />
                  </View>
                  <ShimmerPlaceholder style={{ height: mvs(20), width: mvs(50), marginHorizontal: mvs(20), }} visible={loading}>
                    <Regular
                      style={{
                        // lineHeight: mvs(15),
                        marginLeft: mvs(5),
                        // transform: [{ translateY: mvs(2) }],
                      }}
                      color={colors.G9B9B9B}
                      size={mvs(14)}
                      label={
                        totalDistance.length > 3
                          ? `${totalDistance.slice(0, 3)} KM`
                          : totalDistance + 'KM'
                      }
                    />
                  </ShimmerPlaceholder>
                </Row>
              </Row>

            </View>
          </Row>
          <View
            style={{
              borderBottomWidth: 0.7,
              borderColor: colors.GE1E1E1,
              marginTop: mvs(25),
              // marginBottom: mvs(16),
              marginHorizontal: mvs(16),
            }}
          />
          <ScrollView
            horizontal
            fadingEdgeLength={1}
            // persistentScrollbar={true}

            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,

              // paddingHorizontal: mvs(),
            }}>
            {services.map((item, index) => (
              <ServiceCard
                onPress={() => {
                  let y = 421;
                  if (index === 0) {
                    y = 1050;
                  } else if (index === 1) {
                    y = 133;
                  } else if (index === 2) {
                    y = 1600;
                  } else if (index === 3) {
                    y = 799;
                  } else if (index === 4) {
                    y = 1350;
                  }
                  ref?.current?.scrollTo({ x: 0, y: y, animated: true });
                }}
                middleText={index === 0 ? '' : null}
                value={index === 2 ? null : item.value}
                title={item.title}
                icon={item.icon}
                rating={ratingg.length > 0 && ratingg[7] ? ratingg[7] : 0}
                div={services.length - 1 !== index}
              />
            ))}
          </ScrollView>
          <HeadingTitle
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
            title="About"
          />
          {/* <AboutTextBtn
            paddingVerticall={mvs(1)}
            loading={loading}
            value={businessProfile?.about}
            showMore={isMoreBtn}
            setIsMoreBt={setIsMoreBtn}
            maxTextLimit={185}
            trimLimit={183}
          /> */}
          <ShimmerPlaceholder
            style={{ width: '95%', alignSelf: 'center', minHeight: mvs(30), }}
            visible={loading}>
            <View style={{ paddingHorizontal: mvs(18) }}>
              <Regular
                numberOfLines={null}
                label={
                  businessProfile?.about?.length > 185 && isMoreBtn
                    ? `${businessProfile?.about?.slice(0, 183)} ...`
                    : businessProfile?.about
                }
                size={mvs(16)}
                color={colors.B1E1E1E}
              />
              {isMoreBtn && businessProfile?.about?.length > 185 && (
                <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                  <Regular
                    size={mvs(16)}
                    color={colors.primary}
                    label={'Read More'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </ShimmerPlaceholder>
          <HeadingTitle
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
            title="Gallery"
          />

          {businessProfile?.gallery?.length === 1 && (
            <View
              style={{
                alignItems: 'center',
                marginLeft: mvs(15),
              }}>
              <ShimmerPlaceholder
                style={{
                  marginRight: mvs(10),
                  height: '100%',
                  borderRadius: mvs(8),
                  width: width - mvs(30),
                }}
                visible={loading}>
                <View
                  key={index}
                  style={{
                    // marginRight: mvs(4),
                    height: '100%',
                    borderRadius: mvs(8),
                    width: width - mvs(30),
                  }}>
                  <ImagePlaceholder
                    containerStyle={{
                      height: '100%',
                      width: '100%',
                      borderRadius: mvs(8),
                    }}
                    uri={{ uri: businessProfile?.gallery[0] }}
                  />
                </View>
              </ShimmerPlaceholder>
            </View>
          )}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: mvs(18),
              // paddingVertical: 4,
            }}
            horizontal>
            {
              !loading ?
                (<>
                  <ShimmerPlaceholder
                    style={{
                      marginRight: mvs(10),
                      height: 200,
                      borderRadius: mvs(8),
                      width: width - mvs(70),
                    }}
                    visible={loading} />
                  <ShimmerPlaceholder
                    style={{
                      height: 200,
                      marginRight: mvs(10),
                      borderRadius: mvs(8),
                      width: width - mvs(70),
                    }}
                    visible={loading} />
                </>) :
                businessProfile?.gallery?.length > 1 &&
                businessProfile?.gallery?.map((ele, index) => {
                  return (

                    <View
                      key={index}
                      style={{
                        // marginRight: mvs(4)
                        marginRight: mvs(10),
                        height: 200,
                        borderRadius: mvs(8),
                        width: width - mvs(70),
                      }}>

                      <ImagePlaceholder
                        resizeMode="cover"
                        containerStyle={{
                          height: '100%',
                          width: '100%',
                          borderRadius: mvs(8),
                        }}
                        uri={{ uri: ele }}
                      />

                    </View>

                  );
                })}
          </ScrollView>

          <HeadingTitle
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
            title="Contact information"
          />
          <View>

            <LabelValue
              label={'Address'}
              value={businessProfile?.view?.contact?.Address}
              loading={loading}
            />


            <LabelValue
              loading={loading}
              label={'Website'}
              value={businessProfile?.contact?.webiste}
            />
            <LabelValue
              loading={loading}
              label={'Phone'} value={contact?.Phone} />
            <LabelValue
              loading={loading}
              bw={0}
              label={'Email Address'}
              value={contact?.Email}
            />

          </View>

          <>
            <HeadingTitle
              size={mvs(18)}
              paddingBottom={mvs(10)}
              paddingTop={mvs(22)}
              title="Business Hours"
            />
            {updatedBusiness?.map((item, index) => {
              return (
                <>
                  {item?.workingTime != 'Closed' ? (
                    <>
                      <LabelValue
                        bw={index === 6 ? 0 : 1}
                        businessHoursCard={true}
                        label={item?.day}
                        value={item?.workingTime}
                        loading={loading}
                      />
                    </>
                  ) : (
                    <LabelValue
                      label={item?.day}
                      vColor={colors.red}
                      value={'Closed'}
                      loading={loading}
                    />
                  )}
                </>
              );
            })}
          </>


          <View
            style={{
              flexGrow: 1,
            }}>
            <HeadingTitle
              marginVertical={0}
              size={mvs(18)}
              title="Service offering"
            />
            <ServiceOffering
              totalDistance={totalDistance}
              data={businessServices}
              loading={loading}
              moveTo="ServiceOfferingDetails"
            />
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
                          marginRight: mvs(10),
                          height: mvs(240),
                          borderRadius: mvs(8),
                          width: width - mvs(70),
                        }}
                        visible={loading} />
                      <ShimmerPlaceholder
                        style={{
                          height: mvs(240),
                          marginRight: mvs(10),
                          borderRadius: mvs(8),
                          width: width - mvs(70),
                        }}
                        visible={loading} />
                    </ScrollView>
                  </>
                ) :
                bussinessCoupons?.length > 0 && (
                  <CouponPromo
                    coupons={bussinessCoupons}
                    loading={loading}
                    business={businessProfile}
                    businessId={id}
                  />
                )}
          </View>
          <HeadingTitle
            marginVertical={0}
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
            title="Rating & Reviews"
          />
          <View
            style={{
              paddingHorizontal: mvs(18),
              paddingVertical: mvs(20),
              backgroundColor: colors.white,
            }}>
            <Row justifyContent={'space-between'}>
              <ShimmerPlaceholder style={{ width: mvs(110), minHeight: mvs(60) }} visible={loading}>
                <Bold
                  color={colors.ratingg}
                  style={{ transform: [{ translateY: -mvs(12) }] }}
                  size={mvs(48)}
                  label={ratingg?.length > 0 ? ratingg[7] : 0}
                />
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={{ flex: 1, height: mvs(60) }}
                visible={loading}>
                <Row justifyContent="flex-start" alignItems="center">
                  <View style={{ justifyContent: 'space-between' }}>
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      size={mvs(10)}
                      list={[1, 2, 3, 4, 5]}
                      width={mvs(40)}
                      style={{ alignSelf: 'flex-end' }}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      size={mvs(10)}
                      ratingCount={4}
                      list={[1, 2, 3, 4]}
                      width={mvs(32)}
                      style={{ alignSelf: 'flex-end', marginTop: mvs(2.4) }}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
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
                      ratingUnSelectedColor={colors.ratingLine}
                      ratingSelectedColor={colors.primary}
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
                          width: `${ratingg[0] ? (ratingg[0] / 5) * 100 : 0}%`,
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: `${ratingg[1] ? (ratingg[1] / 5) * 100 : 0}%`,
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: `${ratingg[2] ? (ratingg[2] / 5) * 100 : 0}%`,
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: `${ratingg[3] ? (ratingg[3] / 5) * 100 : 0}%`,
                        }}
                      />
                    </View>
                    <View style={styles.ratingBar}>
                      <View
                        style={{
                          ...styles.ratingPercentage,
                          width: `${ratingg[4] ? (ratingg[4] / 5) * 100 : 0}%`,
                        }}
                      />
                    </View>
                  </View>
                </Row>
              </ShimmerPlaceholder>
            </Row>
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
          <ReviewsRaing
            picsArray={payload?.picsArrayReviews}
            data={getBusinessReviews?.map(item => item)}
            loading={loading}
          />
        </ScrollView>
      </View>

      <ReviewModal
        setVisible={() => setVisible(false)}
        items={images}
        setItems={setImages}
        visible={visible}
      />
    </View>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
});
const mapDispatchToProps = {
  get_bussiness_coupons: id => DIVIY_API.get_bussiness_coupons(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
