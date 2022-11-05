import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect, useSelector, useDispatch} from 'react-redux';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Buttons from '../../components/atoms/Button';
import allColors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {INPUT_FIELD} from '../../components/atoms';
import {Vehicle_Styles as styles} from './my-vehicle-styles';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import Row from '../../components/atoms/row';
import PickerModal from '../../components/molecules/modals/picker-modal';
import Toast from 'react-native-toast-message';
import {BaseURL} from '../../ApiServices';
import {getData} from '../../localStorage';

const MyVehicle = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const state = useSelector(state => state.common);
  //console.log('state in vehicle======', state.customerData.customer_id);
  const [items, setItems] = React.useState([
    '9:30 AM - 10:00 AM',
    '9:30 AM - 11:00 AM',
    '9:20 AM - 10:00 AM',
  ]);
  const [selectedValue, setSelectedValue] =
    React.useState('9:30 AM - 10:00 AM');

  const [payload, setPayload] = React.useState({
    vehical: '',
    registration: '',
    type: '',
    model: '',
    year: '',
    color: '',
    vin: '',
  });
  const [VehicleName, setVehicleName] = React.useState([]);
  const [VehicleType, setVehicleType] = React.useState([]);
  const [VehicleModel, setVehicleModel] = React.useState([]);
  const {colors} = useTheme();
  const [userToken, setuserToken] = useState('');
  let [fetchingData, setfetchingData] = useState(true);

  const fetchingDataApi = async () => {
    const token = await getData('token');
    if (token != null) {
      setuserToken(token);
      console.log('token Vehicle=======', userToken);
    }
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    await fetch(BaseURL + 'auth/vehicle_types', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setVehicleName(result);
          console.log('setVehicleName======', result);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    await fetch(BaseURL + 'auth/vehicle_model', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setVehicleModel(result);
          console.log(' setVehicleModel========', result);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    await fetch(BaseURL + 'auth/vehicle_make', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setVehicleType(result);
          setfetchingData(false);
          console.log(' setVehicleType=====', result);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    fetchingDataApi();
  }, [fetchingData]);
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
  const delayAPI = () => {
    setTimeout(() => {
      navigation.navigate('Congratulation');
    }, 4000);
  };

  const addVehicle = async () => {
    var customer_id=await getData("customer_id");
    if (payload.vehical === '') {
      return showToast('error', 'Please select vehicle');
    } else if (payload.registration === '') {
      return showToast('error', 'Please enter registration number');
    } else if (payload.type === '') {
      return showToast('error', 'Please select vehicle type');
    } else if (payload.model === '') {
      return showToast('error', 'Please select vehicle model');
    } else if (payload.vehical === '') {
      return showToast('error', 'Please select vehicle');
    } else if (payload.year === '') {
      return showToast('error', 'Please select year');
    } else if (payload.color === '') {
      return showToast('error', 'Please select color');
    } else {
      setLoading(true);
      var raw = JSON.stringify({
        type: payload.type,
        registration: payload.registration,
        make: payload.vehical,
        model: payload.model,
        year: payload.year,
        color: payload.color,
      });

      var requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      };
      console.log(customer_id)
      await fetch(
        `${BaseURL}b/om/businesses/1/customers/${customer_id}/vehicles`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          if (result != null) {
            setLoading(false);
            showToast('success', 'Vehicle Added Successfully');
            delayAPI();
            console.log('Vehicle Added====', result);
          }
        })
        .catch(error => {
          setLoading(false);
          showToast('error', 'Something went wrong!');
          console.log('error', error);
        });
    }
  };

  return (
    <>
      {fetchingData ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={{...styles.container, backgroundColor: colors.background}}>
          <CustomHeader colors={colors} title="" allowBackBtn />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: mvs(16),
              paddingBottom: mvs(30),
            }}>
            <View style={styles.body}>
              <Bold label={'My Vehicle'} style={{fontSize: 24}} />
              <Regular
                label={'Add your vehicle to use our services'}
                style={{fontSize: 18}}
              />
              <View style={styles.input_container}>
                <INPUT_FIELD.InputDropDown
                  title={'Vehical'}
                  items={VehicleName?.map(item => item.name)}
                  value={payload.vehical}
                  onChangeText={t => setPayload({...payload, vehical: t})}
                  label="VEHICLE"
                  placeholder="Select your vehicle"
                />
                <INPUT_FIELD.InputView
                  value={payload.registration}
                  onChangeText={t => setPayload({...payload, registration: t})}
                  label="REGISTRATION NUMBER"
                  placeholder="Enter you Registration"
                />

                <INPUT_FIELD.InputDropDown
                  items={['Sudan', 'Suzuki']}
                  value={payload.type}
                  onChangeText={t => setPayload({...payload, type: t})}
                  label="TYPE"
                  placeholder="Select Type"
                />

                <INPUT_FIELD.InputDropDown
                  items={VehicleModel?.map(item => item.name)}
                  value={payload.model}
                  onChangeText={t => setPayload({...payload, model: t})}
                  label="VEHICLE MODEL"
                  placeholder="Select Model"
                />
                <Row style={{justifyContent: 'space-between'}}>
                  <INPUT_FIELD.InputDropDown
                    items={[
                      '2000',
                      '2001',
                      '2002',
                      '2003',
                      '2004',
                      '2005',
                      '2006',
                      '2007',
                      '2008',
                      '2009',
                      '2010',
                      '2011',
                      '2012',
                      '2013',
                    ]}
                    value={payload.year}
                    style={{width: '46%'}}
                    onChangeText={t => setPayload({...payload, year: t})}
                    label="YEAR"
                    placeholder="Select"
                  />

                  <INPUT_FIELD.InputDropDown
                    items={[
                      'White',
                      'Black',
                      'Gray',
                      'Silver',
                      'Red',
                      'Blue',
                      'Brown',
                      'Green',
                      'Beige',
                      'Orange',
                      'Gold',
                      'Yellow',
                      'Purple',
                    ]}
                    value={payload.color}
                    style={{width: '46%'}}
                    dropdownStyle={{flex: 1}}
                    onChangeText={t => setPayload({...payload, color: t})}
                    label="COLOR"
                    placeholder="Select"
                  />
                </Row>
                <INPUT_FIELD.InputView
                  value={payload.vin}
                  onChangeText={t => setPayload({...payload, vin: t})}
                  label="VIN"
                  placeholder="Enter VIN number"
                />
              </View>
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={addVehicle}
                //onClick={() => navigation.navigate('Congratulation')}
                textStyle={{...styles.buttonText, color: colors.white}}
                style={{...styles.button}}
                title={'Proceed'}
              />
            </View>
          </ScrollView>
          <Toast />
        </View>
      )}
    </>
  );
};

export default MyVehicle;
