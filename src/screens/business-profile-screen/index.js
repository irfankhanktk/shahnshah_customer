import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  LayoutAnimation,
  Alert,
  Share,
  ImageBackground,
  Pressable,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  HeartIcon,
  HeartOutline,
  Map,
  Minute,
  Ratings,
  Share as ShareIcon,
  ShareBlackIcon,
  SpeedoMeter,
  SpeedometerPrimary,
} from '../../assets/common-icons';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import ServiceCard from '../../components/molecules/service-card';
import ThemeContext from '../../context/theme-context';
import Regular from '../../presentation/typography/regular-text';
import {height, mvs, width} from '../../services/metrices';
import HeadingTitle from './../../components/molecules/heading-title/index';
import LabelValue from './../../components/molecules/label-value-row/index';
import ReviewsRaing from './../../components/molecules/reviews-rating/index';
import ServiceOffering from './../../components/service-offering/index';
import Bold from './../../presentation/typography/bold-text';
import colors from './../../services/colors';
import {STYLES as styles} from './style';
import RatingStar from './../../components/molecules/rating-star/index';
import ReviewModal from './../../components/molecules/modals/review-modal';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {getData} from '../../localStorage';
import {BaseURL} from '../../ApiServices';
import {addReviews} from '../../Redux/Reducers/ReviewsReducer';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SERVICES from '../../services/common-services';
import CouponPromo from '../../components/coupon-promo';
import DIVIY_API from '../../store/api-calls';
import {useBusinessProfile} from './useBusinessProfile';
import AboutTextBtn from '../../components/AboutTextBtn';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const about =
//   'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const BusinessProfile = props => {
  const {get_bussiness_coupons, route} = props;
  const {getUpdatedBusinessHours, handleGetBusinessesReviews} =
    useBusinessProfile(businessHourse);
  const rendertabview = () => {
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setindex}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
        activeColor={colors.primary}
        inactiveColor={colors.black}
      />
    );
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{backgroundColor: colors.primary}}
      // tabStyle={{width: mvs(120)}}
      indicatorContainerStyle={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
        },
        backgroundColor: colors.white,
      }}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: focused ? colors.black : colors.black,
            fontSize: 15,
          }}>
          {route.title}
        </Text>
      )}
      style={{backgroundColor: 'transparent'}}
    />
  );
  const layout = useWindowDimensions();
  const FirstRoute = () => (
    <View
      style={{
        //padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#0e0',
      }}></View>
  );
  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ef4f'}}></View>
  );
  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: '#000'}}></View>
  );
  const FourthRoute = () => (
    <View style={{flex: 1, backgroundColor: 'red'}}></View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const [index, setindex] = useState(0);

  const {user_info} = props;
  const {id} = route.params;
  console.log('ididididid:', id);
  const navigation = useNavigation();
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
  const {showAlert} = React.useContext(ThemeContext);
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
    getBusinessReviewsLoading,
    getBusinessReviewsSuccess,
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
      .then(response =>{
        if(!response?.ok)
        throw response;
         return response.json();
        })
      .then(result => {
        console.log('result=>>> business profile',result);
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
          // setPayload({
          //   ...payload,
          //   rating: result.rating,
          // });
          setpayyload({
            ...payyload,
            services: result?.services,
            // bill:result.bills
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
          setPayload({...payload, picsArrayReviews: myArra});
        }
      })
      .catch(error => {
        console.log('Business reviews error', error);
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
    setBussinessCoupons(res?.data||[]);
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
    {icon: 'Schedule', title: 'Availability', value: 'See Schedule'},
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
    } catch (error) {}
  };
  const [showMoreAddress, setShowMoreAddress] = useState(false);
  const updatedBusiness = getUpdatedBusinessHours(businessHourse);
  console.log('businessProfile?.gallery:::', businessProfile?.gallery);
  return (
    <View style={styles.container}>
      <View style={{...styles.body}}>
        <ScrollView
          // onScroll={e => {
          //   console.log('this scrol Value', e?.nativeEvent?.contentOffset?.y);
          // }}
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{height: mvs(210), width: width}}>
            <ShimmerPlaceholder
              style={{width: '100%', height: '100%'}}
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
              style={{position: 'absolute', left: mvs(20), top: mvs(20)}}>
              <FontAwesome
                size={mvs(25)}
                color={colors.white}
                name="angle-left"
              />
            </TouchableOpacity>
          </View>

          <Row
            style={{
              paddingHorizontal: mvs(36),

              marginTop: mvs(25),
            }}>
            <View
              style={{
                padding: mvs(3),
                borderRadius: mvs(23),
                borderColor: colors.GDFDFDF,
              }}>
              <ShimmerPlaceholder
                style={{
                  width: mvs(45),
                  borderRadius: mvs(27),
                  height: mvs(45),
                }}
                visible={loading}>
                <ImagePlaceholder
                  borderRadius={mvs(18)}
                  uri={{uri: businessProfile?.logo}}
                  containerStyle={{
                    width: mvs(45),
                    height: mvs(45),
                  }}
                />
              </ShimmerPlaceholder>
            </View>

            <View
              style={{
                width: '100%',
                // backgroundColor: 'red',
                marginLeft: mvs(13),
              }}>
              <ShimmerPlaceholder visible={loading}>
                <Row>
                  <Bold
                    numberOfLines={2}
                    style={{flex: 1}}
                    label={
                      businessProfile?.title?.length > 20
                        ? `${businessProfile?.title?.slice(0, 15)}...`
                        : businessProfile?.title
                    }
                    size={mvs(20)}
                  />
                  <Row
                    justifyContent={'space-between'}
                    style={{width: mvs(60)}}>
                    <TouchableOpacity onPress={() => onShare()}>
                      {/* <ShareIcon /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(true);
                      }}>
                      {/* <HeartOutline /> */}
                    </TouchableOpacity>
                  </Row>
                </Row>

                <Row alignItems="center" justifyContent="flex-start">
                  <Row
                    style={
                      {
                        // justifyContent: 'flex-start',
                        // alignItems: 'center',
                        // width: mvs(190),
                        // backgroundColor: 'red',
                      }
                    }>
                    {/* <Map /> */}
                    <Regular
                      color={colors.G9B9B9B}
                      size={mvs(16)}
                      label={
                        businessProfile?.view?.address?.length > 25
                          ? `${businessProfile?.view?.address?.slice(0, 25)}...`
                          : businessProfile?.view?.address
                      }
                      // label={`${businessProfile?.view?.address}`}
                    />
                  </Row>
                  <Row
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{
                      marginLeft: mvs(6),
                      width: mvs(250),
                    }}>
                    <View style={{}}>
                      <SpeedometerPrimary width={mvs(22)} height={mvs(11.63)} />
                    </View>
                    <Regular
                      style={{
                        lineHeight: mvs(15),
                        marginRight: mvs(5),
                        transform: [{translateY: mvs(2)}],
                      }}
                      color={colors.G9B9B9B}
                      size={mvs(14)}
                      label={
                        totalDistance.length > 3
                          ? `${totalDistance.slice(0, 3)} KM`
                          : totalDistance + 'KM'
                      }
                    />
                  </Row>
                </Row>
              </ShimmerPlaceholder>
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
                  ref?.current?.scrollTo({x: 0, y: y, animated: true});
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
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <View style={{paddingHorizontal: mvs(18)}}>
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
                  height: mvs(200),
                  width: width - mvs(30),
                  borderRadius: mvs(8),
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
                    uri={{uri: businessProfile?.gallery[0]}}
                  />
                </View>
              </ShimmerPlaceholder>
            </View>
          )}
          {businessProfile?.gallery?.length > 1 && (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: mvs(18),
                // paddingVertical: 4,
              }}
              horizontal>
              {businessProfile?.gallery?.length > 1 &&
                businessProfile?.gallery?.map((ele, index) => {
                  console.log('GALEERY ELE :', ele);
                  return (
                    <ShimmerPlaceholder
                      style={{
                        marginRight: mvs(10),
                        height: mvs(200),
                        width: width - mvs(70),
                        borderRadius: mvs(8),
                        // backgroundColor: 'orange',
                      }}
                      visible={loading}>
                      <View
                        key={index}
                        style={{
                          // marginRight: mvs(4),
                          height: '100%',
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
                          uri={{uri: ele}}
                        />
                      </View>
                    </ShimmerPlaceholder>
                  );
                })}
            </ScrollView>
          )}

          <HeadingTitle
            size={mvs(18)}
            paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
            title="Contact information"
          />
          <View>
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue
                label={'Address'}
                value={businessProfile?.view?.contact?.Address}
              />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue
                label={'Website'}
                value={businessProfile?.contact?.webiste}
              />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue label={'Phone'} value={contact?.Phone} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue
                bw={0}
                label={'Email Address'}
                value={contact?.Email}
                // bw={0}
              />
            </ShimmerPlaceholder>
          </View>
          {updatedBusiness && (
            <>
              <HeadingTitle
                size={mvs(18)}
                paddingBottom={mvs(10)}
                paddingTop={mvs(22)}
                // marginVertical={0}
                // paddingVertical={mvs(12)}
                title="Business Hours"
              />

              {updatedBusiness?.map((item, index) => {
                return (
                  <ShimmerPlaceholder
                    style={[
                      styles.contactInformationtime,
                      {
                        marginBottom: 0,
                      },
                    ]}
                    visible={loading}>
                    {item?.workingTime != 'Closed' ? (
                      <>
                        <LabelValue
                          bw={index === 6 ? 0 : 1}
                          // businessHoursCard={true}
                          label={item?.day}
                          value={item?.workingTime}
                        />
                      </>
                    ) : (
                      <LabelValue
                        // bw={0}
                        // businessHoursCard={true}
                        label={item?.day}
                        vColor={colors.red}
                        value={'Closed'}
                      />
                    )}
                  </ShimmerPlaceholder>
                );
              })}
            </>
          )}

          <View
            style={{
              // backgroundColor: colors.FBF8F8,
              flexGrow: 1,
              // borderWidth: 1,
              // paddingBottom: mvs(30),
              // marginTop: mvs(20),
            }}>
            {businessServices?.length > 0 && (
              <HeadingTitle
                marginVertical={0}
                size={mvs(18)}
                // paddingBottom={mvs(10)}
                // paddingTop={mvs(22)}
                title="Service offering"
              />
            )}
            <ServiceOffering
              totalDistance={totalDistance}
              data={businessServices}
              loading={loading}
              moveTo="ServiceOfferingDetails"
            />
            {bussinessCoupons?.length > 0 && (
              <CouponPromo
                coupons={bussinessCoupons}
                loading={loading}
                business={businessProfile}
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
              // backgroundColor: 'red',
            }}>
            <Row justifyContent={'space-between'}>
              <ShimmerPlaceholder style={{width: mvs(110)}} visible={loading}>
                <Bold
                  color={colors.ratingg}
                  style={{transform: [{translateY: -mvs(12)}]}}
                  size={mvs(48)}
                  label={ratingg?.length > 0 ? ratingg[7] : 0}
                />
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={{flex: 1, height: mvs(60)}}
                visible={loading}>
                <Row justifyContent="flex-start" alignItems="center">
                  <View style={{justifyContent: 'space-between'}}>
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      size={mvs(10)}
                      list={[1, 2, 3, 4, 5]}
                      width={mvs(40)}
                      style={{alignSelf: 'flex-end'}}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      size={mvs(10)}
                      ratingCount={4}
                      list={[1, 2, 3, 4]}
                      width={mvs(32)}
                      style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      size={mvs(10)}
                      list={[1, 2, 3]}
                      width={mvs(24)}
                      ratingCount={3}
                      style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                    />
                    <RatingStar
                      ratingSelectedColor={colors.primary}
                      ratingUnSelectedColor={colors.ratingLine}
                      rate={5}
                      ratingCount={2}
                      size={mvs(10)}
                      list={[1, 2]}
                      width={mvs(16)}
                      style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                    />
                    <RatingStar
                      ratingUnSelectedColor={colors.ratingLine}
                      ratingSelectedColor={colors.primary}
                      rate={5}
                      ratingCount={1}
                      size={mvs(10)}
                      list={[1]}
                      width={mvs(16)}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: mvs(5),
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{...styles.ratingBar, marginTop: mvs(0)}}>
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
              </ShimmerPlaceholder>
            </Row>
            <Row>
              <Regular
                style={{left: mvs(5), bottom: mvs(20)}}
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
