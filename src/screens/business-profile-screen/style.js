import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    // paddingHorizontal:mvs(22),
    paddingBottom: mvs(30),
  },
  item: {
    marginBottom: mvs(15),
    paddingVertical: mvs(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  camera: {
    width: mvs(100),
    height: mvs(100),
    borderRadius: mvs(50),
    marginTop: mvs(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: mvs(30),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: mvs(50),
  },
  btn_container: {
    position: 'absolute',
    width: '100%',
    paddingBottom: mvs(40),
    paddingHorizontal: mvs(22),
    bottom: 0,
  },
  contactInformation: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: mvs(45),
    // borderBottomWidth: 0.5,
    // borderBottomColor: colors.border,
    // backgroundColor: 'red',
    // marginBottom: 10,
    // borderWidth: 1,
  },
  contactInformationtime: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colors.GE1E1E1,
    height: mvs(50),
    marginBottom: 10,
    // borderBottomColor: colors.border,
    // borderBottomWidth: 0.7,
  },
  downimg: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
    //position: 'absolute',
  },
  ratingBar: {
    height: mvs(6),
    borderRadius: mvs(5),
    backgroundColor: colors.ratingLine,
    width: '100%',
    marginTop: mvs(5.5),
  },
  ratingPercentage: {
    height: mvs(6),
    borderRadius: mvs(5),
    backgroundColor: colors.primary,
  },
});
