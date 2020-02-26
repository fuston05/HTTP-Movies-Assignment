import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//styles
import './UpdateForm.scss';

const UpdateForm = ({movieList, setMovieList}) => {
  const [movieToEdit, setMovieToEdit] = useState({});
  const {id} = useParams();

  useEffect(() => {
    const itemToEdit= movieList.find( movie => `${movie.id}` === id );
    if(itemToEdit){
      setMovieToEdit(itemToEdit);
    }//end if
  }, [id, movieList])

  const handleChange = e => {
    let value= e.target.value;

    setMovieToEdit({
      ...movieToEdit,
      [e.target.name]: value
    });
    console.log('handleChange: ');
  }//end handleChange

  const handleSubmit = e => {
    e.preventDefault();
    //cleanup stars array data
    const cleanStars= [];
    if(Array.isArray(movieToEdit.stars) === false){ 
      movieToEdit.stars.split(',').map(star => {
        return cleanStars.push(star);
      })
      setMovieToEdit({
        ...movieToEdit,
        stars: cleanStars
      });
    }//end if is array
    // console.log('new stars: ', cleanStars);
    console.log('cleanstars: ', cleanStars);
  
    //axios.put
    axios.put(`http://localhost:5000/api/movies/:${movieToEdit.id}`, movieToEdit)
      .then(putRes => {console.log('putRes.data: ', putRes.data)})
      .catch(putErr => {console.log('putErr: ', putErr)})


    console.log('submitted!');
  }//end handleSubmit

  return (
    <div className='updateCont'>
      
      {console.log('movieToEdit from state: ', movieToEdit)}
      <form onSubmit={handleSubmit}>

        <label htmlFor='title'>Title</label>
        <input
          onChange={handleChange}
          value={movieToEdit.title}
          type='text'
          name='title'
          id='title'
          placeholder='Title'
        />

        <label htmlFor='director'>Director</label>
        <input
          onChange={handleChange}
          value={movieToEdit.director}
          type='text'
          name='director'
          id='director'
          placeholder='Director'
        />

        <label htmlFor='metascore'>Metascore</label>
        <input
          onChange={handleChange}
          value={movieToEdit.metascore}
          type='text'
          name='metascore'
          id='metascore'
          placeholder='Metascore'
        />

        <label htmlFor='actors'>Stars</label>
        <input
          onChange={handleChange}
          value={movieToEdit.stars}
          type='text'
          name='stars'
          id='stars'
          placeholder='Stars'
        />

        <button
          id='updateSubmitBtn'
        >Submit Changes</button>
      </form>
    </div>
  )
}

export default UpdateForm;