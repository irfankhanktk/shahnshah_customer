import { Platform, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { mvs } from '../services/metrices';

export const globalStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    // marginHorizontal: mvs(1),
    shadowRadius: 3.82,
    elevation: 8,
    backgroundColor: colors.white,
    backgroundColor: colors.white,
    // borderRadius: mvs(5),
  },
});
