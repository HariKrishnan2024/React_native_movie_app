import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from './AppHeader';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';
import CustomIcon from '../Components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

export default function SeatBookingScreen({navigation, route}) {
  const [twoDSeatArray, setTwoDArray] = useState(generateSeats());
  const [price, setPrice] = useState(0);
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [dateArray, setDateArray] = useState(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [selectedTimeIndex, setSelectedTimeIndex] = useState();

  const selectSeat = (index, subindex, num) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDArray(temp);
    }
  };
  const timeArray = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:00'];
  const radioButtons = [
    {
      text: 'Available',
      color: COLORS.White,
    },
    {
      text: 'Taken',
      color: COLORS.Grey,
    },
    {
      text: 'Selected',
      color: COLORS.Orange,
    },
  ];

  const BookSeats = async () => {
    if (
      selectedSeatArray.length &&
      timeArray[selectedTimeIndex] &&
      dateArray[selectedDateIndex]
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.PosterImage,
          }),
        );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error,
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{
            uri: route.params.BgImage,
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>
      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem, subindex) => {
                  return (
                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {
                        selectSeat(index, subindex, subitem.number);
                      }}>
                      <CustomIcon
                        name="seat"
                        style={[
                          styles.seatIcon,
                          subitem.taken ? {color: COLORS.Grey} : {},
                          subitem.selected ? {color: COLORS.Orange} : {},
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.seatRadioContainer}>
          {radioButtons.map((radio, index) => {
            return (
              <View style={styles.radioContainer} key={index}>
                <CustomIcon
                  name="radio"
                  style={[styles.radioIcon, {color: radio.color}]}
                />
                <Text style={styles.radioText}>{radio.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDateIndex(index);
                }}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: spacing.space_24}
                      : index == dateArray.length - 1
                      ? {marginRight: spacing.space_24}
                      : {},
                    index == selectedDateIndex
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.time}>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTimeIndex(index);
                }}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? {marginLeft: spacing.space_24}
                      : index == dateArray.length - 1
                      ? {marginRight: spacing.space_24}
                      : {},
                    index == selectedTimeIndex
                      ? {
                          backgroundColor: COLORS.Orange,
                          borderColor: COLORS.Orange,
                        }
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.priceButtonContainer}>
        <View>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity style={styles.buttonBG} onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
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
    marginHorizontal: spacing.space_14,
    marginVertical: spacing.space_14,
  },
  linearGradient: {
    height: '100%',
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  screenText: {
    textAlign: 'center',
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA50,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  seatContainer: {
    marginVertical: spacing.space_20,
  },
  containerGap20: {
    gap: spacing.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.space_14,
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginVertical: spacing.space_14,
    gap: spacing.space_10 * 2.5,
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space_6,
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
  },
  containerGap24: {
    gap: spacing.space_24,
  },
  dateContainer: {
    width: 90,
    height: 120,
    backgroundColor: COLORS.Grey,
    borderRadius: BORDERRADIUS.radius_25 * 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  time: {
    marginVertical: spacing.space_16,
  },
  timeContainer: {
    paddingVertical: spacing.space_10,
    paddingHorizontal: spacing.space_20,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    borderRadius: spacing.space_16 * 2,
  },
  timeText: {
    color: COLORS.White,
  },
  buttonBG: {
    marginVertical: spacing.space_24,
  },
  buttonText: {
    backgroundColor: COLORS.Orange,
    paddingHorizontal: spacing.space_18,
    paddingVertical: spacing.space_14,
    borderRadius: BORDERRADIUS.radius_25,
  },
  priceButtonContainer: {
    marginHorizontal: spacing.space_18 * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalPriceText: {
    color: COLORS.WhiteRGBA50,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
});
