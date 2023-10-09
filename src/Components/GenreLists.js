import {StyleSheet, View, Text} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';
import {isObject} from 'lodash';

function GenreLists({lists = []}) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentry',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystry',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  return (
    <View style={styles.genresContainer}>
      {lists.map((item, idx) => {
        return (
          <View key={idx} style={styles.genre}>
            <Text style={styles.genreText}>
              {isObject(item) ? genres[item.id] : genres[item]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genresContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.space_16,
  },
  genre: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_25,
    paddingVertical: spacing.space_4,
    paddingHorizontal: spacing.space_16,
  },
  genreText: {
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.WhiteRGBA50,
  },
});
export default GenreLists;
