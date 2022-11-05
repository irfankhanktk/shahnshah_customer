import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('always')
      .then(resp => {
        console.log('ios response ', resp);
      })
      .catch(e => console.log('ios error ::', e));
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location',
          message: ' Allow This App to Access Device Location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        //alert("You can use the location");
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
