import { StyleSheet } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';

export const Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    // paddingTop: mvs(20),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    marginBottom: mvs(20),
    ...colors.shadow,
  },
  image: {
    height: mvs(200),
    width: '100%',
  },
  fixedButtonView: {
    paddingHorizontal: mvs(18),
    backgroundColor: colors.FBF8F8,
    paddingVertical: mvs(20),
  },
  salesConditionView: {
    paddingTop: mvs(10),
    backgroundColor: colors.white,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.lightgrey,
    // paddingBottom: mvs(5),
  },
  offeringWrapperView: {
    paddingHorizontal: mvs(18),
    backgroundColor: colors.white,
    marginVertical: mvs(2),
    flexDirection: 'row',
    paddingVertical: mvs(18),
  },
});
