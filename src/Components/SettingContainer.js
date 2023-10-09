import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomIcon from './CustomIcon';
import {COLORS, FONTFAMILY, FONTSIZE, spacing} from '../theme/theme';

function SettingContainer({data = {}}) {
  return (
    <View style={styles.container}>
      <View style={styles.Setting}>
        <CustomIcon name={data.icon} style={styles.settingIcon} />
        <View style={styles.settingContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.subTitleText}>{data.subtitle}</Text>
          <Text style={styles.subHeading}>{data.subheading}</Text>
        </View>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.space_20,
  },

  Setting: {
    flexDirection: 'row',
    gap: spacing.space_18,
  },
  settingIcon: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    // paddingHorizontal: spacing.space_16,
  },
  titleText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
  },
  subTitleText: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.Grey,
  },
  subHeading: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.Grey,
  },
  iconBG: {
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: FONTSIZE.size_20,
  },
});
export default SettingContainer;
