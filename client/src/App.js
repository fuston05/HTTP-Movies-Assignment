import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import axios from 'axios';

//components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateFrom from './components/UpdateForm/UpdateForm';

//styles
import './sass/index.scss';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const formatMovies= (movies) => {
    movies.forEach(ele => {
      if (Array.isArray(ele.stars) === false) {
        let splitStars= ele.stars.split(',');
        return ele.stars= splitStars;
      }else {
        return ele;
      }//end if array
    })
    return movies;
  }//end formatMovies

  const getMovieList = async () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        let data = res.data;
        setMovieList(formatMovies(data));
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);


  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie 
          addToSavedList={addToSavedList} 
          getMovieList= {getMovieList}
          />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateFrom
          getMovieList={getMovieList}
          setMovieList={setMovieList}
          movieList={movieList}
        />
      </Route>
    </>
  );
};

export default App;
