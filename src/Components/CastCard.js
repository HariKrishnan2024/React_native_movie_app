import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {baseImgPath} from '../api/apiCalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  spacing,
} from '../theme/theme';

function CastCard({data = {}}) {
  return (
    <View style={styles.castContainer}>
      <Image
        source={{
          uri: baseImgPath('w780', data.profile_path),
        }}
        style={styles.cardImage}
      />
      <Text style={styles.title} numberOfLines={1}>
        {data.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  castContainer: {
    maxWidth: 80,
  },
  cardImage: {
    width: 80,
    aspectRatio: 1 / 1.5,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
});
export default CastCard;
