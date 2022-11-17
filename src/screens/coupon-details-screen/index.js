import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import HeadingTitle from '../../components/molecules/heading-title';
import LabelValue from '../../components/molecules/label-value-row';
import TotalRateMap from '../../components/molecules/total-rate-map/index';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import CouponCard from './../../components/molecules/coupon-card/index';
import { Styles as styles } from './styles';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ServiceOffering from './../../components/service-offering/index';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import { getData } from '../../localStorage';
import DIVIY_API from '../../store/api-calls';
import Buttons from '../../components/atoms/Button';
import SemiBold from '../../presentation/typography/semibold-text';
import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';
import LinedColoredCard from '../../components/linedColoredCard';
import AboutTextBtn from '../../components/AboutTextBtn';
import Row from '../../components/atoms/row';
import Medium from '../../presentation/typography/medium-text';
import CouponDetailsOfferingCard from '../../components/CouponDetailsOfferingCard';
import { color } from 'react-native-elements/dist/helpers';

const CouponDetails = props => {
  const { route, navigation, get_details, avail_coupon } = props;
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [coupon, setCoupon] = useState({});
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getCouponDetails();
  }, [refresh]);
  console.log('coupon?.view:', coupon?.view);
  const getCouponDetails = async () => {
    var id = await getData('customer_id');
    const response = await get_details(route.params?.id, route.params.bId, id);
    if (response?.data) {
      console.log(response?.data);
      setCoupon(response?.data);
    }
  };
  function getString(list) {
    console.log(list.tos);
  }
  const availCoupon = async () => {
    try {
      console.log('availCoupon func :');
      var id = await getData('customer_id');
      const availResponse = await avail_coupon(id, coupon?.id);
      console.log('Avail Response', availResponse?.data);
      setRefresh(!refresh);
      navigation.navigate('SaleCoupon', { saleId: availResponse?.data });
    } catch (error) {
      console.log('error availCoupon', error);
    }

  };
  return (
    <View style={styles.conntainer}>
      <GeneralStatusBarColor
        translucent
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />

      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.lightgrey,
          }}>
          <CustomHeader
            style={{
              backgroundColor: colors.white,
              borderBottomWidth: 0.3,
              borderBottomColor: colors.GD8D8D8,
            }}
            iconBgcolor={colors.white}
            spacebetween
            allowBackBtn
            title={'Coupon Details'}
            colors={colors}
          />

          <CouponCard loading={loading} coupon={coupon} />

          <TotalRateMap
            loading={loading}
            data={{ businessReviews: coupon?.business }}
            address={coupon?.business?.view?.address}
          />

          {coupon?.view?.statusLine && (
            <LinedColoredCard
              color={coupon?.view?.statusLine?.color}
              title={coupon?.view?.statusLine?.shortLine}
              subTitle={coupon?.view?.statusLine?.line}
            />
          )}
          <HeadingTitle
            marginVertical={0}
            title="About Coupon"
            size={mvs(18)}
            paddingTop={mvs(22)}
            paddingBottom={mvs(10)}
          />
          <AboutTextBtn
            loading={loading}
            value={coupon?.about}
            showMore={isMoreBtn}
            setIsMoreBt={setIsMoreBtn}
            maxTextLimit={185}
            trimLimit={183}
          />

          {coupon?.offerings?.length > 0 && (
            <>
              <HeadingTitle
                marginVertical={0}
                title="Offering"
                size={mvs(18)}
                // paddingBottom={mvs(10)}
                paddingTop={mvs(22)}
              />
              <View style={styles.offeringWrapperView}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={coupon?.offerings || []}
                  renderItem={({ item, index }) => {
                    return (
                      <CouponDetailsOfferingCard
                        navigation={navigation}
                        moveTo="ServiceOfferingDetails"
                        data={item}
                        loading={loading}
                      />
                    );
                  }}
                />

                {/* <CouponDetailsOfferingCard loading={loading} /> */}
              </View>
            </>
          )}

          {/* <HeadingTitle
            paddingTop={mvs(22)}
            size={mvs(18)}
            marginVertical={0}
            title={'Redemptions Details'}
          /> */}
          {/* <View style={{backgroundColor: colors.white}}>
            <ShimmerPlaceholder
              style={{width: '95%', alignSelf: 'center'}}
              visible={loading}>
              <LabelValue
                value={'AED ' + coupon?.price}
                label={'Total Value'}
              />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={{width: '95%', alignSelf: 'center'}}
              visible={loading}>
              {coupon?.discountValue != null && (
                <LabelValue
                  value={'Total Discount'}
                  label={'AED ' + coupon?.discountValue}
                />
              )}
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={{width: '95%', alignSelf: 'center'}}
              visible={loading}>
              <LabelValue value={'22 May 2020'} label={'AED79.00 35% 27.65'} />
            </ShimmerPlaceholder>
          </View> */}
          <HeadingTitle
            title={'Coupon Terms & Conditions'}
            marginVertical={0}
            size={mvs(18)}
            // paddingBottom={mvs(10)}
            paddingTop={mvs(22)}
          />
          <View
            style={{
              backgroundColor: colors.white,
              paddingTop: mvs(10),
            }}>
            {coupon?.view?.tncs &&
              Object.entries(coupon?.view?.tncs).map(([key, value], index) => {
                const lastIndexx = Object.keys(coupon?.view?.tncs).length;
                console.log('lastIndex:', lastIndexx);
                console.log('value:', value);
                console.log('index:>', index);
                return (
                  <LabelValue
                    bw={index === lastIndexx - 1 ? 0 : 1}
                    size={mvs(14)}
                    paddingTop={mvs(10)}
                    label={'' + key}
                    value={coupon?.view?.tncs[key]?.value}
                  />
                );
              })}
          </View>
          {coupon?.otherConditions && (
            <HeadingTitle
              marginVertical={0}
              style={{ backgroundColor: colors.white, color: colors.black }}
              title="Other Conditions"
            />
          )}
          <ShimmerPlaceholder
            style={{ width: '100%', backgroundColor: colors.white }}
            visible={loading}>
            <View
              style={{
                paddingHorizontal: mvs(20),
                paddingBottom: mvs(10),
              }}>
              {coupon?.otherConditions?.map((item, index) => {
                console.log('item:', item);
                return (
                  <Row
                    alignItems="center"
                    style={styles.salesConditionView}
                    justifyContent="flex-start">
                    <Regular
                      size={mvs(8)}
                      color={colors.black}
                      label={'\u2B24'}
                    />
                    <Row style={{ flex: 1 }} justifyContent="flex-start">
                      <Regular
                        style={{ marginLeft: mvs(10) }}
                        size={mvs(11)}
                        label={item}
                        color={colors.B323232}
                      />
                    </Row>
                  </Row>
                );
              })}

              {/* {coupon?.saleConditions?.map((item, index) => {
                return;
              })} */}
            </View>
          </ShimmerPlaceholder>

          {coupon?.view?.resume && (
            <View style={{ marginTop: mvs(10), alignItems: 'center' }}>
              <SemiBold
                label={coupon?.view?.resumeMessage}
                size={14}
                numberOfLines={3}
                color={colors.lightgrey2}
              />
            </View>
          )}
        </ScrollView>
        {coupon?.view?.sellable && (
          <View style={styles.fixedButtonView}>
            <Buttons.ButtonPrimary
              title={coupon?.view?.buttonTitle}
              style={{
                marginHorizontal: mvs(22),
                width: '90%',
              }}
              onClick={() => {
                coupon?.saleId == null
                  ? availCoupon()
                  : navigation.navigate('SaleCoupon', { saleId: coupon?.saleId });
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
});
const mapDispatchToProps = {
  get_details: (id, bid, cid) => DIVIY_API.get_coupons_details(id, bid, cid),
  avail_coupon: (id, cid) => DIVIY_API.avail_coupon(id, cid),
};
export default connect(mapStateToProps, mapDispatchToProps)(CouponDetails);
