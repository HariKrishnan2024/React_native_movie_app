import {View, StyleSheet, Dimensions, FlatList, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, spacing} from '../theme/theme';
import SubMovieCard from '../Components/SubMovieCard';
import InputHeader from '../Components/InputHeader';
import {baseImgPath, searchMovies} from '../api/apiCalls';

const {width, height} = Dimensions.get('window');

export default function SearchScreen({navigation, route}) {
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    if (route?.params?.value) {
      fetchSearchMovies(route.params.value);
    }
  }, [route?.params?.value]);

  const fetchSearchMovies = async name => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction ', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View>
        <FlatList
          data={searchList}
          keyExtractor={item => item.id}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={fetchSearchMovies} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shoudlMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 2 - spacing.space_12 * 2}
              title={item.original_title}
              imagePath={baseImgPath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_28,
    marginBottom: spacing.space_28 - spacing.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },
});
