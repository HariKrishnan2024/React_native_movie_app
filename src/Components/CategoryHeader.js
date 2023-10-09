import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, spacing} from '../theme/theme';

function CategoryHeader({title}) {
  return <Text style={styles.text}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: spacing.space_36,
    paddingVertical: spacing.space_28,
  },
});
export default CategoryHeader;
