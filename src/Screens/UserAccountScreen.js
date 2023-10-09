import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';
import AppHeader from './AppHeader';
import SettingContainer from '../Components/SettingContainer';

export default function UserAccountScreen({navigation}) {
  const settingDetails = [
    {
      title: 'Account',
      subheading: 'Edit Profile',
      subtitle: 'Change Password',
      icon: 'user',
    },
    {
      title: 'Settings',
      subheading: 'Theme',
      subtitle: 'Permissions',
      icon: 'setting',
    },
    {
      title: 'Offers and Refferals',
      subheading: 'Offer',
      subtitle: 'Refferrals',
      icon: 'dollar',
    },
    {
      title: 'About',
      subheading: 'About Movies',
      subtitle: 'more',
      icon: 'info',
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>
      <View style={styles.settingContainer}>
        {settingDetails.map((detail, index) => (
          <SettingContainer data={detail} key={index} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: spacing.space_36,
    marginVertical: spacing.space_28,
  },
  profileContainer: {
    alignItems: 'center',
    gap: spacing.space_10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  avatarText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
  },
  settingContainer: {
    alignItems: 'center',
    padding: spacing.space_36,
  },
});
