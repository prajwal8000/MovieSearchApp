import React from 'react';
import { View, FlatList, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../redux/movieSlice';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movie.favorites);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.Poster }} style={styles.thumbnail} />
            <View style={styles.details}>
              <Text style={{color:'black'}}>{item.Title} ({item.Year})</Text>
              <View style={{height:20}}/>
              <Button
                title="Remove from Favorites"
                onPress={() => dispatch(removeFavorite(item.imdbID))}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', marginBottom: 16 },
  thumbnail: { width: 100, height: 150 },
  details: { flex: 1, justifyContent: 'center', marginLeft: 16 },
 
});
export default FavoritesScreen;