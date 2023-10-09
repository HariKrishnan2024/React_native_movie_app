import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';

function SubMovieCard({
  title,
  imagePath,
  shouldMarginatedAtEnd = true,
  isFirst = false,
  isLast = false,
  cardWidth,
  shouldMarginatedAround,
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
        <Text numberOfLines={1} style={styles.textTitle}>
          {title}
        </Text>
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
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: spacing.space_10,
  },
};
export default SubMovieCard;
