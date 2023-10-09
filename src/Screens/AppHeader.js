import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from '../Components/CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';

function AppHeader({name = 'close', header = '', action = () => {}}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={action}>
        <CustomIcon name={name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBG: {
    backgroundColor: COLORS.Orange,
    height: spacing.space_24,
    width: spacing.space_24,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLORS.White,
  },
});
export default AppHeader;
