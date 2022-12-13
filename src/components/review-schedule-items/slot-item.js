import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import Shimmer from '../shimmer';
import ActionButton from './action-button';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const SlotItem = ({
  slotText = '12 February 2021 9:30 AM-10:00 AM',
  details = 'The first available slot',
  noMore = false,
  loading = false,
  noSlot = false,
  showAccept = false,
  showRemove = false,
  showFind = false,
  showChange = false,
  onAcceptClick,
  onChangeClick,
  onFindClick,
  onRemoveClick,
}) => {
  return (
    <Row alignItems="center" style={styles.CONTAINER}>
      <View style={{ flex: 1 }}>
        <Row>
          <Medium label={'Date & Time'} size={15} color={colors.black} />
          {showAccept && (
            <ActionButton
              loading={loading}
              style={styles.button}
              title="Accept"
              onClick={onAcceptClick}
            />
          )}
          {showFind && (
            <ActionButton
              loading={loading}
              title="Find"
              onClick={onFindClick}
              style={styles.button}
            />
          )}
        </Row>
        <Shimmer visible={loading}>
          <Regular
            label={slotText}
            color={!noSlot ? colors.lightgrey1 : colors.primary}
            size={13}
          />
        </Shimmer>
        <Row style={{ alignItems: 'center' }}>
          <Shimmer visible={loading}>
            <Regular
              label={details}
              color={!noMore ? colors.lightgrey1 : colors.red}
              size={13}
            />
          </Shimmer>
          {showChange && (
            <ActionButton
              loading={loading}
              style={styles.button}
              title="Change"
              onClick={onChangeClick}
              bgColor={colors.lightGreen1}
              // borderColor={colors.green}
              titleColor={colors.green}
            />
          )}

          {showRemove && (
            <ActionButton
              loading={loading}
              style={styles.button}
              title="Remove"
              onClick={onRemoveClick}
              bgColor={colors.lightPink1}
              borderColor={colors.red}
              titleColor={colors.red}
            />
          )}
        </Row>
      </View>
      <View></View>
    </Row>
  );
};
export default SlotItem;
const styles = StyleSheet.create({
  CONTAINER: {
    marginVertical: mvs(15),
    // borderBottomWidth: 0.7,
    paddingBottom: mvs(15),
    borderBottomColor: colors.lightgrey1,
    borderBottomWidth: 0.2,
  },
  button: {
    width: mvs(62),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
});
