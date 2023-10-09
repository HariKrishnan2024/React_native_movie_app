import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseImgPath, movieCastDetails, movieDetails} from '../api/apiCalls';
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
import GenreLists from '../Components/GenreLists';
import VoteRating from './VoteRating';
import moment from 'moment';
import CategoryHeader from '../Components/CategoryHeader';
import CastCard from '../Components/CastCard';

export default function MovieDetailsScreen({navigation, route}) {
  const [movieDetailsData, setMovieDetailsData] = useState({});
  const [movieCast, setMovieCast] = useState({});
  const movie_id = route.params.movie_id;

  useEffect(() => {
    fetchMovieDetails(movie_id);
    fetchMoviesCast(movie_id);
  }, [movie_id]);

  const fetchMovieDetails = async movieId => {
    try {
      const response = await fetch(movieDetails(movieId));
      const json = await response.json();
      setMovieDetailsData(json);
    } catch {
      console.error('Something went wrong');
    }
  };

  const fetchMoviesCast = async movieId => {
    try {
      const response = await fetch(movieCastDetails(movieId));
      const json = await response.json();
      setMovieCast(json);
    } catch {
      console.error('Something went wrong');
    }
  };
  return (
    <>
      {Object.keys(movieDetailsData).length && Object.keys(movieCast).length ? (
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <StatusBar hidden />
          <View>
            <ImageBackground
              source={{
                uri: baseImgPath('w780', movieDetailsData.backdrop_path),
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
            <View style={styles.imageBG}></View>
            <Image
              source={{uri: baseImgPath('w342', movieDetailsData?.poster_path)}}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.timeContainer}>
            <CustomIcon name="clock" style={styles.clockIcon} />
            <Text style={styles.runtimeText}>
              {Math.floor(movieDetailsData?.runtime / 60)}h{' '}
              {Math.floor(movieDetailsData?.runtime % 60)}m
            </Text>
          </View>
          <View>
            <Text style={styles.titleText}>
              {movieDetailsData.original_title}
            </Text>
            <GenreLists lists={movieDetailsData?.genres} />
            <Text style={styles.tagLine}>{movieDetailsData.tagline}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.voteContainer}>
              <VoteRating
                average={movieDetailsData.vote_average}
                count={movieDetailsData.vote_count}
              />
              <Text style={styles.releaseDate}>
                {moment(movieDetailsData.release_date).format('DD MMMM YYYY')}
              </Text>
            </View>
            <Text style={styles.overview}>{movieDetailsData.overview}</Text>
          </View>
          <View>
            <CategoryHeader title="Top Cast" />
            <FlatList
              data={movieCast.cast}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.containerGap24}
              renderItem={({item}) => <CastCard data={item} />}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonBG}
              onPress={() => {
                navigation.push('SeatBooking', {
                  BgImage: baseImgPath('w780', movieDetailsData.backdrop_path),
                  PosterImage: baseImgPath(
                    'original',
                    movieDetailsData.poster_path,
                  ),
                });
              }}>
              <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={''}
              action={() => navigation.goBack()}
            />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: spacing.space_14,
    marginVertical: spacing.space_14,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.space_16,
    gap: spacing.space_6,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
  },
  runtimeText: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    paddingTop: spacing.space_2,
  },
  titleText: {
    textAlign: 'center',
    marginTop: spacing.space_14,
    marginBottom: spacing.space_10,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.White,
  },
  tagLine: {
    textAlign: 'center',
    marginVertical: spacing.space_10,
    fontFamily: FONTFAMILY.poppins_thin,
    fontStyle: 'italic',
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  infoContainer: {
    marginHorizontal: spacing.space_24,
    gap: spacing.space_10,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space_16,
  },
  releaseDate: {
    marginTop: spacing.space_6,
  },
  overview: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    marginLeft: spacing.space_24,
    marginRight: spacing.space_24,
    gap: spacing.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: spacing.space_24,
  },
  buttonText: {
    backgroundColor: COLORS.Orange,
    paddingHorizontal: spacing.space_18,
    paddingVertical: spacing.space_14,
    borderRadius: BORDERRADIUS.radius_25,
  },
});
