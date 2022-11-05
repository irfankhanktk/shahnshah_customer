import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
const PageLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size={'small'} />
    </View>
  );
};

export default PageLoader;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: mvs(10),
    height: mvs(20),
    width: mvs(20),
    borderRadius: mvs(10),
    backgroundColor: colors.white,
  },
});
