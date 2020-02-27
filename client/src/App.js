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

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
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
    {console.log('state from App: ', movieList)}
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path= '/update-movie/:id'>
        <UpdateFrom 
          getMovieList= {getMovieList}
          setMovieList= {setMovieList} 
          movieList= {movieList}
          />
      </Route>
    </>
  );
};

export default App;
