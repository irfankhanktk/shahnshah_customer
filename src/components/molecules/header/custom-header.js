import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BlackBack } from '../../../assets/headers-icons';
import { mvs } from '../../../services/metrices';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../services/colors';
import Medium from '../../../presentation/typography/medium-text';
import Row from '../../atoms/row';
export const CustomAppHeader = ({
  title = 'Home',
  color=colors?.primary,
  size=18,
  style,
}) => {
  const navigation=useNavigation();
  return (
    <Row alignItems='center' style={[styles.CONTAINER,style]}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
              <BlackBack />
             </TouchableOpacity>
           
              <View style={{ flex:1, alignItems: 'center' }}>
                <Medium
                  label={title}
                  style={{ ...styles.TITLE}}
                  color={color}
                  size={size}
                />
             </View>
     </Row>
  );
};


const styles = StyleSheet.create({
  CONTAINER: {
    paddingHorizontal:mvs(10),
  }
});
