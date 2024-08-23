import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSearchResults, setLoading, addFavorite } from '../redux/movieSlice';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.movie.searchResults);
  const loading = useSelector((state) => state.movie.loading);
  const navigation = useNavigation();

  const searchMovies = async () => {
    if (query.trim() === '') return;

    dispatch(setLoading(true));
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=ee1b6e3`);
      dispatch(setSearchResults(response.data.Search || []));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchMovies}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.Poster }} style={styles.thumbnail} />
              <View style={styles.details}>
                <Text style={styles.title}>{item.Title} ({item.Year})</Text>
                <View style={{height:10}}/>
                <Button
                  title="View Details"
                  onPress={() => navigation.navigate('Details', { movieId: item.imdbID })}
                />
                <View style={{height:10}}/>
                <Button
                  title="Go to Favorites"
                  onPress={() => navigation.navigate('Favorites', { movieId: item.imdbID })}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8,color:'black' },
  item: { flexDirection: 'row', marginBottom: 16 },
  thumbnail: { width: 100, height: 150 },
  details: { flex: 1, justifyContent: 'center', marginLeft: 16 },
  title: { fontSize: 16, fontWeight: 'bold',color:'black' },
});

export default SearchScreen;
