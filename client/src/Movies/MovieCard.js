import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  const history= useHistory();

  const deleteMovie= id => {
    if(window.confirm('Are you sure you want to delete this movie?')){
      axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(delRes => {
          props.getMovieList()
          history.push('/')
          console.log('delRes: ', delRes);
        })
        .catch(delErr => {
          console.log('delErr: ', delErr);
        })
    }//end if confirm
  }//end deleteMovie

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {
      useHistory().location.pathname.includes('movies') && <Link id= 'updateBtn' to= {`/update-movie/${id}`}>Edit Me</Link>}
      {useHistory().location.pathname.includes('movies') &&
      <button onClick= {() => deleteMovie(`${id}`)} id= 'deleteBtn'>Delete</button>
      }
    </div>
  );
};

export default MovieCard;
