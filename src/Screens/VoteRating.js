import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, FONTSIZE, spacing} from '../theme/theme';
import CustomIcon from '../Components/CustomIcon';

function VoteRating({average, count, style = {}}) {
  return (
    <View style={{...styles.rateContainer, ...style}}>
      <CustomIcon name="star" style={styles.starIcon} />
      <Text>{average.toFixed(1) + '(' + count + ')'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rateContainer: {
    flexDirection: 'row',
    gap: spacing.space_10,
    marginTop: spacing.space_10,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
});

export default VoteRating;
