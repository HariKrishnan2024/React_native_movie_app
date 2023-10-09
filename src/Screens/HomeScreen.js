import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  upcomingMovies,
  nowPlayingMovies,
  baseImgPath,
  popularMovies,
} from '../api/apiCalls';
import {COLORS, spacing} from '../theme/theme';
import InputHeader from '../Components/InputHeader';
import CategoryHeader from '../Components/CategoryHeader';
import SubMovieCard from '../Components/SubMovieCard';
import MovieCard from '../Components/MovieCard';

const {width, height} = Dimensions.get('window');
export default function HomeScreen({navigation}) {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState([]);
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);

  const getNowPlayingMoviesList = async () => {
    try {
      let response = await fetch(nowPlayingMovies);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(
        ' Something went wrong in getNowPlayingMoviesList Function',
        error,
      );
    }
  };

  const getUpcomingMoviesList = async () => {
    try {
      let response = await fetch(upcomingMovies);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(
        ' Something went wrong in getUpcomingMoviesList Function',
        error,
      );
    }
  };

  const getPopularMoviesList = async () => {
    try {
      let response = await fetch(popularMovies);
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(
        ' Something went wrong in getPopularMoviesList Function',
        error,
      );
    }
  };

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, []);

  const onSearch = value => {
    navigation.navigate('Search', {
      value,
    });
  };
  if (
    !nowPlayingMoviesList.length &&
    !nowPlayingMoviesList.length &&
    !popularMoviesList.length
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={onSearch} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={onSearch} />
      </View>
      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + spacing.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <>
            {!item.original_title ? (
              <View
                style={{
                  width: (width - (width * 0.7 + spacing.space_36 * 2)) / 2,
                }}></View>
            ) : (
              <MovieCard
                title={item.original_title}
                imagePath={baseImgPath('w780', item.poster_path)}
                shouldMarginatedAtEnd={true}
                bounces={false}
                snapToInterval={width * 0.7 + spacing.space_36}
                cardWidth={width * 0.7}
                isFirst={index === 0 ? true : false}
                isLast={
                  index === nowPlayingMoviesList.length - 1 ? true : false
                }
                onCardClick={() => {
                  navigation.push('MovieDetails', {movie_id: item.id});
                }}
                genre={item.genre_ids.slice(1, 4)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            )}
          </>
        )}
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + spacing.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title}
            imagePath={baseImgPath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === popularMoviesList.length - 1 ? true : false}
            onCardClick={() => {
              navigation.push('MovieDetails', {movie_id: item.id});
            }}
          />
        )}
      />
      <CategoryHeader title={'Upcoming'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + spacing.space_36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            title={item.original_title}
            imagePath={baseImgPath('w342', item.poster_path)}
            shouldMarginatedAtEnd={true}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMoviesList.length - 1 ? true : false}
            onCardClick={() => {
              navigation.push('MovieDetails', {movie_id: item.id});
            }}
          />
        )}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_28,
  },
  containerGap36: {
    gap: spacing.space_36,
  },
});
