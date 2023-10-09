import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from './AppHeader';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../Components/CustomIcon';

export default function TicketScreen({navigation, route}) {
  const [ticketData, setTicketData] = useState(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}></LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>
        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.timeContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateText}>{ticketData?.date.date}</Text>
              <Text style={styles.dayText}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.timeText}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray.slice(0, 3).map((item, index, arr) => {
                  return item + (index == arr.length - 1 ? '' : ', ');
                })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
}
// EncryptedStorage.removeItem('ticket');
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: spacing.space_36,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 270,
    borderTopLeftRadius: BORDERRADIUS.radius_15 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_15 * 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '80%',
  },
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    width: 300,
    backgroundColor: COLORS.Orange,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomRightRadius: BORDERRADIUS.radius_15 * 2,
    borderBottomLeftRadius: BORDERRADIUS.radius_15 * 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.space_20 * 3,
    marginVertical: spacing.space_12,
  },
  dateText: {
    fontSize: FONTSIZE.size_24,
  },
  dayText: {
    fontSize: FONTSIZE.size_10,
    textAlign: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_10 * 2.5,
    color: COLORS.White,
    paddingTop: spacing.space_10,
    paddingBottom: spacing.space_4,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: FONTSIZE.size_10,
    textAlign: 'center',
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: spacing.space_24 * 1.8,
    marginTop: spacing.space_10,
  },
  subheading: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
    marginVertical: spacing.space_20,
  },
  blackCircle: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.Black,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
});
