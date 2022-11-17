import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BaseURL } from '../../../ApiServices';
import Buttons from '../../../components/atoms/Button';
import SERVICES from '../../../services/common-services';
// import HomeCard from './../../../components/molecules/home-card/home-card';
import { mvs } from '../../../services/metrices';
import { Home_Styles as styles } from './home-styles';

const Home = props => {
  const { businessId } = props?.route?.params;
  const [payLoad, setpayLoad] = useState({
    laoding: true,
    data: [],
  });

  const getData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    await fetch(`${BaseURL}auth/all_business`, requestOptions)
      .then(response => {
        if (!response.ok)
          throw response;
        return response.json();
      })
      .then(result => {

        if (result != null) {
          console.log('vendor data=====', result);
          setpayLoad({ ...payLoad, data: result.data.result[0], laoding: false });
        }
      })
      .catch(error => {
        console.log('error in home', SERVICES._returnError(error));
      });
  };

  useEffect(() => {
    // getData();
  }, [payLoad.laoding]);

  return (
    <View style={{ ...styles.conntainer }}>
      <ScrollView contentContainerStyle={styles.body}>
        {/* {payLoad?.data &&
          payLoad?.data?.map((item, index) => (
            <View style={{marginVertical: mvs(10)}} key={index}>
              <Buttons.ButtonPrimary    
                onClick={() =>
                  props?.navigation?.navigate('BusinessProfile', {id: item.id})
                }
                title={item?.title}
              />
            </View>
          ))} */}
        <Buttons.ButtonPrimary
          onClick={() =>
            props?.navigation?.navigate('BusinessProfile', { id: 3333 })
          }
          title={'Business Name 3333'}
        />
        <Buttons.ButtonPrimary
          style={{ marginTop: mvs(10) }}
          onClick={() =>
            props?.navigation?.navigate('BusinessProfile', { id: 1 })
          }
          title={'Business Name 01'}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
