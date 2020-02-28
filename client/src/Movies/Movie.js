import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({getMovieList, addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  //this page only recieves one movie, so we need to format the 'array' portion of the  movie if it's a string.
  const formatMovie= (movieData) => {
    if(Array.isArray(movieData.stars) === false){
      //string to array
      let newArr= movieData.stars.split(',');
      //assign the new array to the movie
      movieData.stars= newArr;
      return movieData;
    }else{
      return movieData;
    }
  }//end formatMovie

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        let movieData= res.data
        setMovie(formatMovie(movieData));
      })
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard 
        getMovieList= {getMovieList}
        movie={movie} />
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
