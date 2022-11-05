import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Buttons from '../../components/atoms/Button';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {Congrates} from '../../assets/common-icons';
import {Congratulation_Styles as styles} from './congratulation-styles';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import allColors from '../../services/colors';
import {addUser} from '../../Redux/Reducers';

const Congratulation = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const {colors} = useTheme();

  const onSigin = async () => {};

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(16),
          paddingBottom: mvs(30),
        }}>
        <View style={styles.body}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Congrates />
            <Bold label={'Congratulations!'} style={styles.welcomeText} />
            <Regular
              label={'You have successfully created your'}
              style={styles.welcomeSubText}
            />
            <Regular label={'account'} style={styles.welcomeSubText} />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={() => navigation.navigate('BottomTab')}
              textStyle={{...styles.buttonText, color: colors.white}}
              style={{...styles.button}}
              title={"Let's Explore Services"}
            />
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={() => {
                dispatch(addUser(true));
                navigation.navigate('Onboarding');
              }}
              textStyle={styles.buttonText}
              style={{
                ...styles.button,
                backgroundColor: colors.white,
                borderColor: allColors.primary,
                borderWidth: 2,
              }}
              title={'How it works?'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Congratulation;
