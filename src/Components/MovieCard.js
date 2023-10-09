import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import GenreLists from './GenreLists';
import VoteRating from '../Screens/VoteRating';

function MovieCard({
  title,
  imagePath,
  shouldMarginatedAtEnd = true,
  isFirst = false,
  isLast = false,
  cardWidth,
  shouldMarginatedAround,
  genre = [],
  vote_average,
  vote_count,
  onCardClick = () => {},
}) {
  return (
    <TouchableOpacity onPress={onCardClick}>
      <View
        style={[
          styles.container,
          shouldMarginatedAtEnd
            ? isFirst
              ? {marginLeft: spacing.space_36}
              : isLast
              ? {marginRight: spacing.space_36}
              : {}
            : {},
          shouldMarginatedAround ? {margin: spacing.space_12} : {},
          {maxWidth: cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: cardWidth}]}
          source={{uri: imagePath}}
        />
        <View>
          {/* <View style={styles.rateContainer}>
            <CustomIcon name="star" style={styles.starIcon} />
            <Text>{vote_average + '(' + vote_count + ')'}</Text>
          </View> */}
          <VoteRating
            average={vote_average}
            count={vote_count}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Text numberOfLines={1} style={styles.textTitle}>
            {title}
          </Text>
          <GenreLists lists={genre} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: spacing.space_10,
  },
};
export default MovieCard;
