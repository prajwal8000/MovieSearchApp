import React, { useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFavorite, removeFavorite } from '../redux/movieSlice';

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movie.favorites);
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=ee1b6e3`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!movie) {
    return <Text>No movie data</Text>;
  }

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.thumbnail} />
      <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
      <Text style={{color:'black'}}>Genre: {movie.Genre}</Text>
      <Text style={{color:'black'}}>Director: {movie.Director}</Text>
      <Text style={{color:'black'}}>Actors: {movie.Actors}</Text>
      <Text style={{color:'black'}}>Plot: {movie.Plot}</Text>
      <View style={{height:20}}/>
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={() => {
          if (isFavorite) {
            dispatch(removeFavorite(movie.imdbID));
          } else {
            dispatch(addFavorite(movie));
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  thumbnail: { width: '100%', height: 300 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10,color:'black' },
});

export default DetailsScreen;
